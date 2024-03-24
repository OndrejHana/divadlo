import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { dbGetHalls } from "@/db-handler/db-halls";
import Link from "next/link";

export default async function HallList() {
    const halls = await dbGetHalls();
    return (
        <Card className="flex w-full max-w-2xl flex-col rounded-none shadow">
            <div className="flex items-center justify-between bg-primary p-4 text-primary-foreground">
                <div className="flex h-full flex-col">
                    <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                        Sály
                    </h2>
                    <p className="text-sm">Seznam sálů v divadle</p>
                </div>
                <Button variant="secondary" asChild>
                    <Link href="/admin/halls/add-hall">Přidat sál</Link>
                </Button>
            </div>
            <div className="flex flex-col gap-[2px] bg-primary">
                {halls.map((hall) => (
                    <Link
                        href={`/admin/halls/${hall.id}`}
                        key={hall.id}
                        className="flex justify-between rounded-none bg-background p-2 px-4 transition-all duration-200 ease-in-out hover:bg-muted"
                    >
                        <div className="flex gap-2">
                            <h3 className="font-medium">{hall.name}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </Card>
    );
}
