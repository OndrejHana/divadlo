import { dbGetHall } from "@/db-handler/db-halls";
import UpdataHallForm from "./update-hall-form";

export default async function Page({ params }: { params: { slug: string } }) {
    const hall = await dbGetHall(parseInt(params.slug));

    return (
        <div className="flex h-full w-full justify-center">
            {hall ? (
                <UpdataHallForm hall={hall} />
            ) : (
                <h1 className="text-center text-4xl font-bold text-primary">
                    Sál nebyl nalezen
                </h1>
            )}
        </div>
    );
}
