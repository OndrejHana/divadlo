"use server";

import { getCookie } from "@/lib/cookies";
import {
    ZLoginFormObject,
    LoginUserFormState,
    LoginFormObject,
} from "@/types/login";
import { AuthResponse } from "@/types/register";
import { Visitor } from "@/types/visitor";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
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
    const authResponse = await supabaseLoginUser(loginFormData);
    const session = await getCookie();

    session.visitor = authResponse?.visitor ?? null;
    session.session = authResponse?.session ?? null;
    session.isLoggedIn = true;

    await session.save();

    revalidatePath("/");
    redirect("/");
}

async function supabaseLoginUser(
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

    return {
        session: data.session,
        visitor: visitor,
        user: user,
    };
}
