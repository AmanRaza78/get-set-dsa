import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function Admin() {
    const { getUser, getPermission } = getKindeServerSession();
    const user = await getUser();
  
    if(!user){
      return redirect("/admin/login")
    }
  
    const requiredPermission = await getPermission("create:question")
    console.log("Hey permissions are here",requiredPermission)
    if(!requiredPermission?.isGranted){
      redirect("/dashboard")
    }
  
  return (
  <div>
    Admin
  </div>
  
  )
  ;
}
