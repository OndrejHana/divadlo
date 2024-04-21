"use server";

import {
    RegisterUserFormState,
    ZRegisterUserFormObject,
} from "@/types/register";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCookie } from "@/lib/cookies";
import {
    dbLogoutUser,
    supabaseLoginUser,
    supabaseRegisterUser,
} from "@/db-handler/db-auth";
import { LoginUserFormState, ZLoginFormObject } from "@/types/login";

import { supabase } from "@/lib/supabase";


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
    console.log("registerFormData: ", registerFormData);
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

    console.log("register: ", {
        ironSession: session,
        supabaseSession: await supabase.auth.getSession(),
        supabaseUser: await supabase.auth.getUser(),
    });

    await session.save();

    revalidatePath("/");
    redirect("/");
}

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

    console.log("login: ", {
        ironSession: session,
        supabaseSession: await supabase.auth.getSession(),
        supabaseUser: await supabase.auth.getUser(),
    });

    revalidatePath("/");
    redirect("/");
}

export async function logoutUser(): Promise<void> {
    console.log("logoutUser");
    const session = await getCookie();

    await dbLogoutUser();

    console.log("logout: ", {
        ironSession: session,
        supabaseSession: await supabase.auth.getSession(),
        supabaseUser: await supabase.auth.getUser(),
    });

    session.session = null;
    session.visitor = null;
    session.isLoggedIn = false;

    await session.save();

    revalidatePath("/");
    redirect("/");
}
