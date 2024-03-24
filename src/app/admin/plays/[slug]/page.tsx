import { dbGetPlay } from "@/db-handler/db-plays";
import UpdatePlayForm from "./update-play-form";

export default async function Page({ params }: { params: { slug: string } }) {
    const play = await dbGetPlay(parseInt(params.slug));

    return (
        <div className="flex h-full w-full justify-center">
            {play ? (
                <UpdatePlayForm play={play} />
            ) : (
                <h1 className="text-center text-4xl font-bold text-primary">
                    Divadelní hra nebyla nalezena
                </h1>
            )}
        </div>
    );
}
