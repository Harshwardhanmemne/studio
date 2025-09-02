"use server";

import { generateLinkedInPosts, type GenerateLinkedInPostsInput } from "@/ai/flows/generate-linkedin-posts";
import { z } from "zod";

const formSchema = z.object({
  topic: z.string().min(1),
  tone: z.enum(["Professional", "Casual", "Storytelling"]).optional(),
  audience: z.enum(["Founders", "Students", "Recruiters"]).optional(),
  postLength: z.enum(["Short", "Medium", "Long"]).optional(),
  hashtagsOrKeywords: z.string().optional(),
  numberOfPosts: z.number().int().min(1).max(5).optional(),
});

export async function generatePostsAction(input: GenerateLinkedInPostsInput): Promise<{ posts?: string[]; error?: string }> {
  const parsedInput = formSchema.safeParse(input);

  if (!parsedInput.success) {
    return { error: "Invalid input provided." };
  }

  try {
    const posts = await generateLinkedInPosts(parsedInput.data);
    return { posts };
  } catch (error) {
    console.error("Error generating posts:", error);
    return { error: "An unexpected error occurred while generating posts. Please try again." };
  }
}
