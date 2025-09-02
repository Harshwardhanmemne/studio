"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import type { GenerateLinkedInPostsInput } from "@/ai/flows/generate-linkedin-posts";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  topic: z.string().min(1, { message: "Topic is required." }),
  tone: z.enum(["Professional", "Casual", "Storytelling"]).optional(),
  audience: z.enum(["Founders", "Students", "Recruiters"]).optional(),
  postLength: z.enum(["Short", "Medium", "Long"]).optional().default("Medium"),
  hashtagsOrKeywords: z.string().optional(),
  numberOfPosts: z.coerce.number().int().min(1).max(5).optional().default(3),
});

type PostGeneratorFormProps = {
  onSubmit: (data: GenerateLinkedInPostsInput) => void;
  isLoading: boolean;
};

const postLengthOptions: ("Short" | "Medium" | "Long")[] = ["Short", "Medium", "Long"];

export function PostGeneratorForm({ onSubmit, isLoading }: PostGeneratorFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
      tone: "Professional",
      audience: "Founders",
      postLength: "Medium",
      hashtagsOrKeywords: "",
      numberOfPosts: 3,
    },
  });

  function handleSubmit(values: z.infer<typeof formSchema>) {
    onSubmit(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Topic *</FormLabel>
              <FormControl>
                <Input placeholder="e.g., The future of AI in marketing" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="tone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tone</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a tone" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Professional">Professional</SelectItem>
                    <SelectItem value="Casual">Casual</SelectItem>
                    <SelectItem value="Storytelling">Storytelling</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="audience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Audience</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an audience" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Founders">Founders</SelectItem>
                    <SelectItem value="Students">Students</SelectItem>
                    <SelectItem value="Recruiters">Recruiters</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="postLength"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Post Length</FormLabel>
              <FormControl>
                <div className="grid grid-cols-3 gap-2">
                  {postLengthOptions.map((length) => (
                    <Button
                      key={length}
                      type="button"
                      variant="outline"
                      className={cn(
                        "font-normal",
                        field.value === length && "bg-accent text-accent-foreground"
                      )}
                      onClick={() => field.onChange(length)}
                    >
                      {length}
                    </Button>
                  ))}
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hashtagsOrKeywords"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hashtags or Keywords</FormLabel>
              <FormControl>
                <Input placeholder="e.g., #AI, #Marketing, innovation" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="numberOfPosts"
          render={({ field }) => (
            <FormItem>
              <FormLabel>How many posts?</FormLabel>
              <FormControl>
                <Input type="number" min="1" max="5" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-accent hover:bg-accent/90"
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
            </>
          ) : (
            "Generate Posts"
          )}
        </Button>
      </form>
    </Form>
  );
}
