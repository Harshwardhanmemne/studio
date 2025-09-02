"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type PostCardProps = {
  post: string;
};

export function PostCard({ post }: PostCardProps) {
  const { toast } = useToast();

  const handleCopy = () => {
    // This fallback method works in environments where navigator.clipboard is blocked.
    const textArea = document.createElement("textarea");
    textArea.value = post;
    
    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand("copy");
      if (successful) {
        toast({
          title: "Copied to clipboard!",
          description: "You can now paste the post on LinkedIn.",
        });
      } else {
        throw new Error("Copy command was not successful.");
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Failed to copy",
        description: "Could not copy text to clipboard.",
      });
      console.error("Fallback: Oops, unable to copy", err);
    }

    document.body.removeChild(textArea);
  };

  return (
    <Card className="relative flex h-full flex-col">
      <Button
        variant="ghost"
        size="icon"
        onClick={handleCopy}
        className="absolute top-2 right-2 h-8 w-8 text-muted-foreground hover:bg-accent/10 hover:text-accent-foreground"
      >
        <Copy className="h-4 w-4" />
        <span className="sr-only">Copy post</span>
      </Button>
      <CardContent className="flex-grow p-6">
        <p className="whitespace-pre-wrap text-sm">{post}</p>
      </CardContent>
    </Card>
  );
}
