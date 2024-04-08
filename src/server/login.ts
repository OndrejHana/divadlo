"use server";

import { AuthSessionOptions } from "@/lib/utils";
import { ZLoginFormObject, LoginUserFormState } from "@/types/login";
import { UserSessionData } from "@/types/register";

import { createClient } from "@supabase/supabase-js";
import { getIronSession } from "iron-session";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase URL or key is missing.");
}
const supabase = createClient(supabaseUrl, supabaseKey);

export async function loginUserAction(
    prevState: LoginUserFormState,
    formData: FormData,
): Promise<LoginUserFormState> {
    const loginObject = ZLoginFormObject.safeParse({
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    });

    if (!loginObject.success) {
        return {
            ...prevState,
            message: loginObject.error.errors.map((e) => e.message).join(", "),
        };
    }

    const loginFormData = loginObject.data;

    const { data, error } = await supabase.auth.signInWithPassword({
        email: loginFormData.email,
        password: loginFormData.password,
    });

    if (error) {
        console.log(error);
        return {
            ...prevState,
            message: "Nepodařilo se přihlásit",
        };
    }

    if (!data || !data.user || !data.session) {
        return {
            ...prevState,
            message: "Nepodařilo se přihlásit",
        };
    }

    const dbSession = data.session;

    const session = await getIronSession<UserSessionData>(
        cookies(),
        AuthSessionOptions,
    );

    session.session = dbSession;
    session.isLoggedIn = true;

    await session.save();

    revalidatePath("/");
    redirect("/");
}

// export async function supabaseLoginUser(loginFormData: Credentials): Promise<User | null> {
//     const { data, error } = await supabase.auth.signInWithPassword({
//         email: loginFormData.email,
//         password: loginFormData.password,
//     });
//
//     if (error !== null) {
//         console.log(error);
//         return null;
//     }
//
//     return data.user;
//
// }
