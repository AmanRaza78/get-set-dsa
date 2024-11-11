import GridHeader from "@/components/roadmaps/gird-header"
import { QuestionTable } from "@/components/roadmaps/question-table"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"

export default async function Roadmap({params}:{params:{name:string}}){
    const {getUser} = getKindeServerSession()
    const user = await getUser()

    if(!user){
        return redirect("/api/auth/login")
    }
    const {name} = params
    return(
        <div className="p-4 flex flex-col items-center justify-center gap-4">
            <GridHeader title={name}/>
            <QuestionTable tag={name}/>
        </div>
    )
}