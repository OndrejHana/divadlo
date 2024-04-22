import { Button } from "@/components/ui/button";
import { logoutUser } from "@/server/auth";

export default async function LogoutButton() {
    return <form action={logoutUser}><Button type="submit" variant="destructive">Odhlásit se</Button></form>;
}
