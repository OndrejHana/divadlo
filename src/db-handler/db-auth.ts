import { supabase } from "@/lib/supabase";
import { Person } from "@/types/actor";
import { LoginFormObject } from "@/types/login";
import { AuthResponse, RegisterCredentials } from "@/types/register";
import { Visitor } from "@/types/visitor";

export async function supabaseLoginUser(
    loginObject: LoginFormObject,
): Promise<AuthResponse | null> {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: loginObject.email,
        password: loginObject.password,
    });

    if (error !== null) {
        console.error(error);
        return null;
    }

    if (!data || !data.user || !data.session) {
        return null;
    }

    const user = data.user;

    const { data: visitorData, error: visitorError } = await supabase
        .from("visitor")
        .select()
        .eq("user_id", user.id);

    if (visitorError !== null) {
        console.error(visitorError);
        return null;
    }

    if (!visitorData) {
        return null;
    }

    const visitor: Visitor = visitorData[0];

    await supabase.auth.setSession(data.session);

    return {
        session: data.session,
        visitor: visitor,
        user: user,
    };
}

export async function supabaseRegisterUser(
    loginFormData: RegisterCredentials,
): Promise<AuthResponse | null> {
    const { data: userData, error: userError } = await supabase.auth.signUp({
        email: loginFormData.email,
        password: loginFormData.password,
    });

    if (userError !== null) {
        console.error(userError);
        return null;
    }

    if (!userData || !userData.user || !userData.session) {
        return null;
    }

    const user = userData.user;

    const { data: personData, error: personError } = await supabase
        .from("person")
        .insert({
            first_name: loginFormData.firstname,
            last_name: loginFormData.lastname,
        })
        .select();

    if (personError !== null) {
        console.error(personError);
        return null;
    }

    if (!personData) {
        return null;
    }

    const person: Person = personData[0];

    const { data: visitorData, error: visitorError } = await supabase
        .from("visitor")
        .insert({
            id: person.id,
            email: loginFormData.email,
            phone: null,
            address_id: null,
            user_id: user.id,
            role: "Visitor",
        })
        .select();

    if (visitorError !== null) {
        console.error(visitorError);
        return null;
    }

    if (!visitorData) {
        return null;
    }

    const visitor: Visitor = {
        id: visitorData[0].id,
        email: visitorData[0].email,
        phone: visitorData[0].phone,
        user_id: visitorData[0].user_id,
        role: visitorData[0].role,
        address: visitorData[0].address,
    };

    await supabase.auth.setSession(userData.session);

    return {
        user: userData.user,
        visitor,
        session: userData.session,
    };
}

export async function dbLogoutUser(): Promise<void> {
    await supabase.auth.signOut();
}
