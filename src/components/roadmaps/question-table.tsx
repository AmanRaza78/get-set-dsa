import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Card, CardContent } from "../ui/card"
import { getQuestions } from "@/action"

interface getQuestionProps{
  tag: string
}

  export async function QuestionTable({tag}: getQuestionProps) {
    const data = await getQuestions(tag)

    if(!data){
      throw new Error("Something Went Wrong")
    }
    return (
    <Card  className="w-full">
        <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Problem</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Difficulty</TableHead>
            <TableHead>Solution</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((question) => (
            <TableRow key={question.id}>
              <TableCell className="font-medium">{question.title}</TableCell>
              <TableCell>{question.status}</TableCell>
              <TableCell>{question.level}</TableCell>
              <TableCell>Solution Link</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </CardContent>
      </Card>
    )
  }
  