import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminNav() {
    return (
        <div className="flex w-full gap-2 bg-secondary p-2 text-secondary-foreground">
            <Button asChild variant="ghost">
                <Link href="/admin/events">Nadcházející akce</Link>
            </Button>
            <Button asChild variant="ghost">
                <Link href="/admin/plays">Divadelní hry</Link>
            </Button>
            <Button asChild variant="ghost">
                <Link href="/admin/actors">Herci</Link>
            </Button>
            <Button asChild variant="ghost">
                <Link href="/admin/halls">Sály</Link>
            </Button>
        </div>
    );
}
