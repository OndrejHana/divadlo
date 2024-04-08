"use server";

import { RegisterCredentials, RegisterUserFormState, ZRegisterUserFormObject } from "@/types/register";
import { User, createClient } from "@supabase/supabase-js";

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
    const data = ZRegisterUserFormObject.safeParse({
        firstname: formData.get("firstname") as string,
        lastname: formData.get("lastname") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    });

    if (!data.success) {
        return {
            ...prevState,
            message: data.error.errors.map((e) => e.message).join(", "),
        };
    }

    const registerFormData = data.data;
    const a = await supabaseRegisterUser(registerFormData);
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

export async function supabaseRegisterUser(loginFormData: RegisterCredentials): Promise<User | null> {
    const { data, error } = await supabase.auth.signUp({
        email: loginFormData.email,
        password: loginFormData.password,
    });

    if (error !== null || data.user == null) {
        console.log(error);
        return null;
    }
    
    return data.user;

}