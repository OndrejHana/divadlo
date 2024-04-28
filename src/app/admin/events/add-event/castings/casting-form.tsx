import { dbGetActors } from "@/db-handler/db-actors";
import CastingList from "./casting-list";

export default async function CastingForm() {
    const actors = await dbGetActors();

    return <CastingList actors={actors} />;
}
