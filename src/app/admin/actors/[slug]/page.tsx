import { dbGetActor } from "@/db-handler/db-actors";
import UpdateActorForm from "./update-actor-form";

export default async function Page({ params }: { params: { slug: string } }) {
    const actor = await dbGetActor(parseInt(params.slug));

    return (
        <div className="flex h-full w-full justify-center">
            {actor ? (
                <UpdateActorForm actor={actor} />
            ) : (
                <h1 className="text-center text-4xl font-bold text-primary">
                    Herec nebyl nalezen
                </h1>
            )}
        </div>
    );
}
