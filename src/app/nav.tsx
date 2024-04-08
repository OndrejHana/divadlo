import { Button } from "@/components/ui/button";
import { AuthSessionOptions } from "@/lib/utils";
import { UserSessionData } from "@/types/register";
import { getIronSession } from "iron-session";
import { Theater } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Nav() {
    const session = await getIronSession<UserSessionData>(
        cookies(),
        AuthSessionOptions,
    );

    return (
        <nav className="flex items-center gap-2 bg-primary p-4 text-primary-foreground lg:gap-16">
            <Link href="/" className="flex h-full items-center">
                <h1 className="flex items-center gap-2 text-2xl font-bold">
                    <Theater className="w-6" />
                    Domů
                </h1>
            </Link>
            <div className="flex grow items-center gap-2">
                <Button asChild variant="ghost">
                    <Link href="/">Úvod</Link>
                </Button>
                <Button asChild variant="ghost">
                    <Link href="/">Program</Link>
                </Button>
                <Button asChild variant="ghost">
                    <Link href="/">Repertoár</Link>
                </Button>
                <Button asChild variant="ghost">
                    <Link href="/">Herci</Link>
                </Button>
                <Button asChild variant="ghost">
                    <Link href="/">O Divadle</Link>
                </Button>
            </div>
            {session.isLoggedIn ? (
                <Link href="/logout" className="flex h-full items-center">
                    <Button variant="ghost">Odhlásit se</Button>
                </Link>
            ) : (
                <Link href="/login" className="flex h-full items-center">
                    <Button variant="ghost">Přihlásit se</Button>
                </Link>
            )}
        </nav>
    );
}
