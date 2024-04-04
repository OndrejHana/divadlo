export default function ErrorBanner({ message }: { message: string }) {
    return (
        <p className="w-full rounded-sm bg-destructive p-2 text-destructive-foreground">
            {message}
        </p>
    );
}
