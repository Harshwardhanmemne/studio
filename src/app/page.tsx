"use client";

import { useState } from 'react';
import { PostGeneratorForm } from '@/components/post-generator-form';
import { PostCard } from '@/components/post-card';
import { generatePostsAction } from './actions';
import type { GenerateLinkedInPostsInput } from '@/ai/flows/generate-linkedin-posts';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  const [posts, setPosts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGeneratePosts = async (data: GenerateLinkedInPostsInput) => {
    setIsLoading(true);
    setError(null);
    setPosts([]);

    const result = await generatePostsAction(data);

    if (result.error) {
      setError(result.error);
    } else if (result.posts) {
      setPosts(result.posts);
    }

    setIsLoading(false);
  };

  return (
    <main className="container mx-auto px-4 py-8 md:py-12">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">
          LinkedWrite
        </h1>
        <p className="mt-4 text-lg text-muted-foreground md:text-xl">
          Generate engaging LinkedIn posts in seconds. Just provide a topic and let our AI do the rest.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-2xl">
        <PostGeneratorForm onSubmit={handleGeneratePosts} isLoading={isLoading} />
      </div>

      <div className="mt-12">
        {error && (
           <Alert variant="destructive" className="mx-auto max-w-2xl">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {isLoading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-8 w-24" />
            </div>
             <div className="space-y-2">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-8 w-24" />
            </div>
             <div className="space-y-2">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-8 w-24" />
            </div>
          </div>
        )}

        {!isLoading && posts.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <PostCard key={index} post={post} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
