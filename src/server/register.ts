"use server";

import {
    AuthResponse,
    RegisterCredentials,
    RegisterUserFormState,
    ZRegisterUserFormObject,
} from "@/types/register";
import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCookie } from "@/lib/cookies";
import { Visitor } from "@/types/visitor";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase URL or key is missing.");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export async function registerUserAction(
    prevState: RegisterUserFormState,
    formData: FormData,
): Promise<RegisterUserFormState> {
    const registerFormObject = ZRegisterUserFormObject.safeParse({
        firstname: formData.get("firstname") as string,
        lastname: formData.get("lastname") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    });

    if (!registerFormObject.success) {
        return {
            ...prevState,
            message: registerFormObject.error.errors
                .map((e) => e.message)
                .join(", "),
        };
    }

    const registerFormData = registerFormObject.data;
    const authResponse = await supabaseRegisterUser(registerFormData);

    if (!authResponse) {
        return {
            ...prevState,
            message: "Nepodařilo se zaregistrovat",
        };
    }

    const session = await getCookie();

    session.session = authResponse?.session;
    session.visitor = authResponse?.visitor;
    session.isLoggedIn = true;

    await session.save();

    revalidatePath("/");
    redirect("/");
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

    const { data: visitorData, error: visitorError } = await supabase
        .from("visitor")
        .insert({
            email: loginFormData.email,
            user_id: userData.user.id,
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

    return {
        user: userData.user,
        visitor,
        session: userData.session,
    };
}

export async function logoutUser(): Promise<void> {
    const session = await getCookie();

    session.session = null;
    session.visitor = null;
    session.isLoggedIn = false;

    await session.save();

    revalidatePath("/");
    redirect("/");
}
