import Link from "next/link";
import { Button } from "@/components/ui/button";
import AddEventForm from "./add-event-form";
import { Label } from "@/components/ui/label";
import { HallInput, PlayInput } from "../form-buttons";

export default function Page() {
    return (
        <div className="flex h-full w-full justify-center">
            <AddEventForm>
                <Label htmlFor="play">Hra</Label>
                <div className="flex w-full gap-2">
                    <PlayInput />
                    <Button asChild>
                        <Link href="/admin/plays/add-play">Přidat hru</Link>
                    </Button>
                </div>
                <Label htmlFor="hall">Sál</Label>
                <div className="flex w-full gap-2">
                    <HallInput />
                    <Button asChild>
                        <Link href="/admin/halls/add-hall">Přidat sál</Link>
                    </Button>
                </div>
            </AddEventForm>
        </div>
    );
}
