import { Button } from "@/components/ui/button";
import { Theater } from "lucide-react";
import Link from "next/link";

export default function Nav() {
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
                    <Link href="/program">Program</Link>
                </Button>
                <Button asChild variant="ghost">
                    <Link href="/">Repertoár</Link>
                </Button>
                <Button asChild variant="ghost">
                    <Link href="/actors">Herci</Link>
                </Button>
                <Button asChild variant="ghost">
                    <Link href="/about">O Divadle</Link>
                </Button>
            </div>
            <Link href="/login" className="flex h-full items-center">
                <Button variant="ghost">Přihlásit se</Button>
            </Link>
        </nav>
    );
}
