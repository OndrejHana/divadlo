import ActorList from "./actor-list";

export const dynamic = "force-dynamic"

export default function Page() {
    return (
        <div className="flex h-full w-full justify-center">
            <ActorList />
        </div>
    );
}
