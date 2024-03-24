import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { dbGetPlays } from "@/db-handler/db-plays";
import Link from "next/link";

export default async function PlayList() {
    const plays = await dbGetPlays();

    return (
        <Card className="flex w-full max-w-2xl flex-col rounded-none shadow">
            <div className="flex items-center justify-between bg-primary p-4 text-primary-foreground">
                <div className="flex h-full flex-col">
                    <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                        Divadelní hry
                    </h2>
                    <p className="text-sm">Seznam všech divadelních her</p>
                </div>
                <Button variant="secondary" asChild>
                    <Link href="/admin/plays/add-play">Přidat hru</Link>
                </Button>
            </div>
            <div className="flex flex-col gap-[2px] bg-primary">
                {plays.map((play) => (
                    <Link
                        href={`/admin/plays/${play.id}`}
                        key={play.id}
                        className="flex justify-between rounded-none bg-background p-2 px-4 transition-all duration-200 ease-in-out hover:bg-muted"
                    >
                        <div className="flex gap-2">
                            <h3 className="font-medium">{play.name}</h3>
                            <p className="text-muted-foreground">
                                {play.author}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </Card>
    );
}
