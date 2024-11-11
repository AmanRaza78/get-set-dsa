import CreateQuestionForm from "@/components/admin/create-question-form";
import { Card } from "@/components/ui/card";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function () {
  const { getUser, getPermission } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/admin/login");
  }

  const requiredPermission = await getPermission("create:question");
  console.log("Hey permissions are here", requiredPermission);
  if (!requiredPermission?.isGranted) {
    redirect("/dashboard");
  }
  return(
    <section className="max-w-7xl my-4 mx-auto px-4 md:px-8 mb-14">
    <Card>
    <CreateQuestionForm/>
    </Card>
  </section>

  )
}
