import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";


export default async function Page() {
    return (
        <main className="grid h-full w-full grow gap-4 p-4 content-center">
            <div className="flex flex-col gap-4 content-center items-center">
            <form className="flex flex-col gap-2 p-4 w-1/3 content-center">
                <Label htmlFor="name" className="text-md">
                    Uživatelské jméno
                </Label>
                <Input type="text" name="name" placeholder="" />
                <Label htmlFor="password" className="text-md">
                    Heslo
                </Label>
                <Input type="password" name="password" placeholder="" />
                <button className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">Přihlásit se</button>
            </form>
            </div>
        </main>
    );
}
