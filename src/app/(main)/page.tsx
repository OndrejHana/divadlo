import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import MainPageEventList from "./event-list";
import MainPageActorList from "./actor-list";
import image from "@/public/main.jpg";

export const dynamic = "force-dynamic";

export default function Page() {
    return (
        <div className="flex h-full w-full flex-col">
            <AspectRatio ratio={4 / 1}>
                <div className="h-full w-full bg-muted" />
                <Image
                    src={image}
                    layout="fill"
                    objectFit="cover"
                    alt="Theater"
                />
            </AspectRatio>
            <MainPageEventList />
            <MainPageActorList />
        </div>
    );
}
