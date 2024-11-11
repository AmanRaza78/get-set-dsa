import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, Target, Trophy } from "lucide-react"

export default function MainSection() {
  const stats = [
    { title: "Questions Solved", value: 328, icon: Brain, color: "text-blue-500" },
    { title: "Current Streak", value: 12, icon: Target, color: "text-green-500" },
    { title: "Total Score", value: 9750, icon: Trophy, color: "text-yellow-500" },
  ]

  const recentQuestions = [
    { id: 1, title: "Binary Search Implementation", difficulty: "Medium", status: "Solved" },
    { id: 2, title: "Depth-First Search in a Graph", difficulty: "Hard", status: "Attempted" },
    { id: 3, title: "Two Sum Problem", difficulty: "Easy", status: "Solved" },
    { id: 4, title: "Merge Sort Algorithm", difficulty: "Medium", status: "Solved" },
    { id: 5, title: "Dynamic Programming: Knapsack", difficulty: "Hard", status: "Unsolved" },
  ]

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Your Pogress</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentQuestions.map((question) => (
              <div key={question.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{question.title}</p>
                  <Badge variant={
                    question.difficulty === "Easy" ? "secondary" :
                    question.difficulty === "Medium" ? "default" : "destructive"
                  }>
                    {question.difficulty}
                  </Badge>
                </div>
                <Badge variant={
                  question.status === "Solved" ? "default" :
                  question.status === "Attempted" ? "destructive" : "outline"
                }>
                  {question.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Overall Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={33} className="w-full" />
          <p className="text-sm text-muted-foreground mt-2">
            You've completed 33% of all available questions.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}