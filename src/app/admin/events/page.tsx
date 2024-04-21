import UpcomingEvents from "./upcoming-events";

export const dynamic = "force-dynamic"

export default async function Page() {
    return (
        <div className="flex h-full w-full items-center justify-center">
            <UpcomingEvents />
        </div>
    );
}
