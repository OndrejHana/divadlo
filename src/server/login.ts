import { ZLoginFormObject, Credentials } from "@/types/login";
import { SupabaseAuthClient } from "@supabase/supabase-js/dist/module/lib/SupabaseAuthClient";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase URL or key is missing.");
}
const supabase = createClient(supabaseUrl, supabaseKey);

export aync function loginUser (
    formData: FormData, 
): Promise<void> {
    const data = ZLoginFormObject.safeParse({
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    });

    if (!data.success) {
        return {
            message: data.error.errors.map((e) => e.message).join(", "),
        };
    }

    const a = await supabaseLoginUser(data.data);

    // revalidatePath("/admin");
    // redirect("/admin");
}

export async function supabaseLoginUser(loginFormData: Credentials): Promise<boolean> {
    const { user, session, error } = await supabase.auth.signInWithPassword({
        email: loginFormData.email,
        password: loginFormData.password,
    });

    if (error !== null) {
        console.log(error);
        return false;
    }

    return true;

}