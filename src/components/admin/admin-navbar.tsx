import Link from "next/link";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";

export async function AdminNavbar() {
  const { getUser, getPermission } = getKindeServerSession();
  const user = await getUser();

  if(!user){
    return redirect("/admin/login")
  }

  return (
    <nav className="flex justify-between items-center gap-x-2 px-4 py-2 bg-secondary">
      <div className="">
        <Link href="/admin">
          <h1 className="text-2xl font-semibold ">
            Welcome<span className="text-primary">Admin</span>
          </h1>
        </Link>
      </div>
      <div className="flex items-center gap-x-6">
        <Link href="">Create Questions</Link>

        <LogoutLink>
          <Button variant="destructive">Logout</Button>
        </LogoutLink>
      </div>
    </nav>
  );
}
