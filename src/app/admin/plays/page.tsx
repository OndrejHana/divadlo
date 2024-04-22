import PlayList from "./play-list";

export const dynamic = "force-dynamic"

export default function Page() {
    return (
        <div className="flex h-full w-full justify-center">
            <PlayList />
        </div>
    );
}
