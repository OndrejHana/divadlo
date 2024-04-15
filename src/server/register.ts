"use server";

import {
    AuthResponse,
    RegisterCredentials,
    RegisterUserFormState,
    UserSessionData,
    ZRegisterUserFormObject,
} from "@/types/register";
import { getIronSession } from "iron-session";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { AuthSessionOptions } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
            message: "Nepodařilo se přihlásit",
        };
    }

    // TODO:  change user role to divadlo_visitor
    

    const session = await getIronSession<UserSessionData>(
        cookies(),
        AuthSessionOptions,
    );

    session.session = authResponse?.session;
    session.isLoggedIn = true;

    await session.save();

    revalidatePath("/");
    redirect("/");
}

export async function supabaseRegisterUser(
    loginFormData: RegisterCredentials,
): Promise<AuthResponse | null> {
    const { data, error } = await supabase.auth.signUp({
        email: loginFormData.email,
        password: loginFormData.password,
    });

    if (error !== null) {
        console.log(error);
        return null;
    }

    if (!data || !data.user || !data.session) {
        return null;
    }

    return {
        user: data.user,
        session: data.session,
    };
}

export async function logoutUser(): Promise<void> {
    const session = await getIronSession<UserSessionData>(
        cookies(),
        AuthSessionOptions,
    );

    session.session = null;
    session.isLoggedIn = false;

    await session.save();

    revalidatePath("/");
    redirect("/");
}
