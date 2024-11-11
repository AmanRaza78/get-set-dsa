"use client"
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import SelectLevels from "./select-levels";
import TagsInput from "./tag-input";
import { useFormState } from "react-dom";
import { CreateQuestion, type State } from "@/action";
import { toast } from "sonner";

export default function CreateQuestionForm() {
    const [tags, setTags] = useState<string[]>([]);
    const initalState: State = { message: "", status: undefined };    
    const [state, formAction] = useFormState(CreateQuestion, initalState);

    useEffect(()=>{
      if(state?.status==="success"){
          toast?.success(state.message)
      }
      else if(state?.status==="error"){
          toast.error(state.message)
      }
    }, [state])

  return (
    <form action={formAction} method="post">
      <CardHeader>
        <CardTitle>
          Create Question
        </CardTitle>
        <CardDescription>All Fields are required*</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-10">
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" type="text" placeholder="Title..." />
          {state?.errors?.["title"]?.[0] && (
            <p className="text-destructive">{state?.errors?.["title"]?.[0]}</p>
          )}
        </div>

        <div className="flex flex-col gap-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" placeholder="Question Description..."/>
          {state?.errors?.["description"]?.[0] && (
            <p className="text-destructive">{state?.errors?.["description"]?.[0]}</p>
          )}
        </div>

        <div className="flex flex-col gap-y-2">
          <Label>Difficulty Level</Label>
          <SelectLevels />
          {state?.errors?.["level"]?.[0] && (
            <p className="text-destructive">
              {state?.errors?.["level"]?.[0]}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-y-2">
          <TagsInput tags={tags} setTags={setTags}/>
          {state?.errors?.["tags"]?.[0] && (
            <p className="text-destructive">
              {state?.errors?.["tags"]?.[0]}
            </p>
          )}
        </div>
        


      </CardContent>
      <CardFooter>
        <Button type="submit">Create</Button>
      </CardFooter>
    </form>
  );
}
