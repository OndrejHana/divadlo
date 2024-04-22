import { Button } from "@/components/ui/button";
import { Theater } from "lucide-react";
import Link from "next/link";
import { getCookie } from "@/lib/cookies";

export default async function Nav() {
    const session = await getCookie();

    return (
        <nav className="top-0 z-50 flex w-full items-center gap-0 bg-primary/40 p-4 text-primary-foreground drop-shadow-lg backdrop-blur-md lg:sticky lg:gap-16">
            <Link href="/" className="flex h-full items-center">
                <h1 className="flex items-center gap-2 text-center text-2xl font-bold">
                    <Theater className="w-6" />
                    Domů
                </h1>
            </Link>
            <div className="flex grow items-center gap-2">
                <Button asChild variant="ghost">
                    <Link href="/">Úvod</Link>
                </Button>
                <Button asChild variant="ghost">
                    <Link href="/schedule">Program</Link>
                </Button>
                <Button asChild variant="ghost">
                    <Link href="/plays">Repertoár</Link>
                </Button>
                <Button asChild variant="ghost">
                    <Link href="/actors">Herci</Link>
                </Button>
            </div>
            {session.isLoggedIn && session.visitor ? (
                <Link href={`/visitor/${session.visitor.id}`}>
                    <Button
                        variant="ghost"
                        className="mr-4 flex h-full items-center"
                    >
                        Můj účet
                    </Button>
                </Link>
            ) : (
                <Link href="/login" className="flex h-full items-center">
                    <Button variant="ghost">Přihlásit se</Button>
                </Link>
            )}
        </nav>
    );
}
