"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type PostCardProps = {
  post: string;
};

export function PostCard({ post }: PostCardProps) {
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(post).then(
      () => {
        toast({
          title: "Copied to clipboard!",
          description: "You can now paste the post on LinkedIn.",
        });
      },
      (err) => {
        toast({
          variant: "destructive",
          title: "Failed to copy",
          description: "Could not copy text to clipboard.",
        });
        console.error("Could not copy text: ", err);
      }
    );
  };

  return (
    <Card className="flex h-full flex-col">
      <CardContent className="flex-grow p-6">
        <p className="whitespace-pre-wrap text-sm">{post}</p>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" size="sm" onClick={handleCopy} className="text-accent-foreground hover:bg-accent/10">
          <Copy className="mr-2 h-4 w-4" />
          Copy
        </Button>
      </CardFooter>
    </Card>
  );
}
