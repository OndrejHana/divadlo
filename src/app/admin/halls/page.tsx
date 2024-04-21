import HallList from "./hall-list";

export const dynamic = "force-dynamic"

export default function Page() {
    return (
        <div className="flex h-full w-full items-center justify-center">
            <HallList />
        </div>
    );
}
