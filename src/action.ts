"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { z } from "zod";
import prisma from "./lib/db";
import { type Level } from "@prisma/client";

export type State = {
  status: "error" | "success" | undefined;
  errors?: {
    [key: string]: string[];
  };
  message?: string | null;
};

const CreateQuestionSchema = z.object({
  title: z
    .string()
    .min(10, {
      message: "Title is too short, should be at least 10 characters",
    })
    .max(50, { message: "Title is too long, should be at most 50 characters" }),
  description: z
    .string()
    .min(10, {
      message: "Description is too short, should be at least 10 characters",
    })
    .max(500, {
      message: "Description is too long, should be at most 500 characters",
    }),
  level: z.string().min(1, { message: "Difficulty Level is required" }),
  tags: z
    .array(
      z
        .string()
        .min(1, { message: "Each skill must be at least 1 character long" })
    )
    .min(1, { message: "At least one skill is required" }),
});

export async function CreateQuestion(prevState: any, formData: FormData) {
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

  try {
    const parsedData = CreateQuestionSchema.safeParse({
      title: formData.get("title"),
      description: formData.get("description"),
      level: formData.get("level"),
      tags: JSON.parse(formData.get("tags") as string),
    });

    if (!parsedData.success) {
      const state: State = {
        status: "error",
        errors: parsedData.error.flatten().fieldErrors,
        message: "Oops, I think there is a mistake with your inputs.",
      };
      return state;
    }

    const question = await prisma.question.create({
      data: {
        title: parsedData.data.title,
        description: parsedData.data.description,
        level: parsedData.data.level as Level,
        tags: parsedData.data.tags,
      },
    });

    const state: State = {
      status: "success",
      message: "Question Posted SuccessFully",
    };

    return state;
  } catch (error) {
    console.log(error);
  }
}

export async function getQuestions(tag:string){
  const {getUser} = getKindeServerSession()
  const user = await getUser()

  if(!user){
    return redirect("/api/auth/login")
  }

  try {
    const questions = await prisma.question.findMany({
      where:{
        tags:{
          has: tag
        }
      }
    })
    return questions
  } catch (error) {
    console.log("Error getting questions", error)
  }

}
