import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { dbGetActors } from "@/db-handler/db-actors";
import Link from "next/link";

export default async function ActorList() {
    const actors = await dbGetActors();
    return (
        <Card className="flex w-full max-w-2xl flex-col rounded-none shadow">
            <div className="flex items-center justify-between bg-primary p-4 text-primary-foreground">
                <div className="flex h-full flex-col">
                    <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                        Herci
                    </h2>
                    <p className="text-sm">Seznam všech herců v divadle</p>
                </div>
                <Button variant="secondary" asChild>
                    <Link href="/admin/actors/add-actor">Přidat herce</Link>
                </Button>
            </div>
            <div className="flex flex-col gap-[2px] bg-primary">
                {actors.map((actor) => (
                    <Link
                        href={`/admin/actors/${actor.id}`}
                        key={actor.id}
                        className="flex justify-between rounded-none bg-background p-2 px-4 transition-all duration-200 ease-in-out hover:bg-muted"
                    >
                        <div className="flex gap-2">
                            <h3 className="font-medium">
                                {actor.person.firstName} {actor.person.lastName}
                            </h3>
                        </div>
                    </Link>
                ))}
            </div>
        </Card>
    );
}
