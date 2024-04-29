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
                <Image
                    src={image}
                    width={1920}
                    height={480}
                    className="h-full w-full object-cover object-center"
                    alt="Theater"
                />
            </AspectRatio>
            <MainPageEventList />
            <MainPageActorList />
        </div>
    );
}
