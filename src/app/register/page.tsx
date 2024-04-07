import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import RegisteUserForm from "./register-user-form";


export default async function Page() {
    return (
        <main className="grid h-full w-full grow gap-4 p-4 content-center">
            <div className="flex flex-col gap-4 content-center items-center">
                <h1 className="text-4xl">Registrace</h1>
                <RegisteUserForm />
            </div>
        </main>
    );
}
