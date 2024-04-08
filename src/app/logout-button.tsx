import { Button } from "@/components/ui/button";
import { logoutUser } from "@/server/register";

export default async function LogoutButton() {
    return <form action={logoutUser}><Button variant="ghost">Odhlásit se</Button></form>;
}
