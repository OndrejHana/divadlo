import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import MainPageEventList from "./event-list";
import MainPageActorList from "./actor-list";

export default function Page() {
    return (
        <div className="flex h-full w-full flex-col">
            <AspectRatio ratio={4 / 1}>
                <div className="h-full w-full bg-muted" />
            </AspectRatio>
            <MainPageEventList />
            <MainPageActorList />
        </div>
    );
}
