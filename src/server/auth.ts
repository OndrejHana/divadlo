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
        console.error(registerFormObject.error);
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
    redirect("/");
}

export async function logoutUser(): Promise<void> {
    const session = await getCookie();

    await dbLogoutUser();

    session.session = null;
    session.visitor = null;
    session.isLoggedIn = false;

    await session.save();
    redirect("/");
}
