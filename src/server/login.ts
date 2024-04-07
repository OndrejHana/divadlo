"use server";

import { ZLoginFormObject, Credentials, LoginUserFormState } from "@/types/login";

import { User, createClient } from "@supabase/supabase-js";

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
    const data = ZLoginFormObject.safeParse({
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    });

    if (!data.success) {
        return {
            ...prevState,
            message: data.error.errors.map((e) => e.message).join(", "),
        };
    }

    const loginFormData = data.data;
    const a = await supabaseLoginUser(data.data);
    if (a == null) {
        return {
            message: "Nepodařilo se přihlásit",
        };
    } else{
        console.log(a);
        return {
            message: "Přihlášení proběhlo úspěšně",
        };
    }

    // revalidatePath("/admin");
    // redirect("/admin");
}

export async function supabaseLoginUser(loginFormData: Credentials): Promise<User | null> {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: loginFormData.email,
        password: loginFormData.password,
    });

    if (error !== null) {
        console.log(error);
        return null;
    }

    return data.user;

}