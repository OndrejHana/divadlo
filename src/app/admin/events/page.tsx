import UpcomingEvents from "./upcoming-events";

export default async function Page() {
    return (
        <div className="flex h-full w-full items-center justify-center">
            <UpcomingEvents />
        </div>
    );
}
