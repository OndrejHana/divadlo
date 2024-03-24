import AdminNav from "./adminNav";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen w-full grow flex-col">
            <AdminNav />
            <div className="flex p-2">{children}</div>
        </div>
    );
}
