'use server';

/**
 * @fileOverview Generates multiple LinkedIn post drafts based on a given topic, tone, audience, and desired length.
 *
 * - generateLinkedInPosts - A function that handles the generation of LinkedIn posts.
 * - GenerateLinkedInPostsInput - The input type for the generateLinkedInPosts function.
 * - GenerateLinkedInPostsOutput - The return type for the generateLinkedInPosts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLinkedInPostsInputSchema = z.object({
  topic: z.string().describe('The topic of the LinkedIn posts.'),
  tone: z
    .enum([
      'Professional',
      'Casual',
      'Storytelling',
    ])
    .optional() // Make 'tone' optional
    .default('Professional')
    .describe('The desired tone of the LinkedIn posts.'),
  audience:
    z
      .string()
      .optional() // Make 'audience' optional
      .describe('The target audience for the LinkedIn posts.'),
  postLength:
    z
      .enum(['Short', 'Medium', 'Long'])
      .optional() // Make 'postLength' optional
      .default('Medium')
      .describe('The desired length of the LinkedIn posts.'),
  hashtagsOrKeywords:
    z
      .string()
      .optional() // Make 'hashtagsOrKeywords' optional
      .describe(
        'Hashtags or keywords to include in the LinkedIn posts (comma-separated).' // Improved description
      ),
  numberOfPosts:
    z
      .number()
      .optional() // Make 'numberOfPosts' optional
      .default(3)
      .describe('The number of LinkedIn post drafts to generate.'),
});

export type GenerateLinkedInPostsInput = z.infer<
  typeof GenerateLinkedInPostsInputSchema
>;

const GenerateLinkedInPostsOutputSchema = z.array(z.string());
export type GenerateLinkedInPostsOutput = z.infer<
  typeof GenerateLinkedInPostsOutputSchema
>;

export async function generateLinkedInPosts(
  input: GenerateLinkedInPostsInput
): Promise<GenerateLinkedInPostsOutput> {
  return generateLinkedInPostsFlow(input);
}

const generateLinkedInPostsPrompt = ai.definePrompt({
  name: 'generateLinkedInPostsPrompt',
  input: {schema: GenerateLinkedInPostsInputSchema},
  output: {schema: GenerateLinkedInPostsOutputSchema},
  prompt: `You are a LinkedIn post expert. Generate {{numberOfPosts}} LinkedIn posts based on the following criteria:

Topic: {{topic}}
Tone: {{tone}}
Audience: {{audience}}
Post Length: {{postLength}}
Hashtags/Keywords: {{hashtagsOrKeywords}}

Ensure each post is engaging and tailored to the specified criteria. Return array of posts.
`,
});

const generateLinkedInPostsFlow = ai.defineFlow(
  {
    name: 'generateLinkedInPostsFlow',
    inputSchema: GenerateLinkedInPostsInputSchema,
    outputSchema: GenerateLinkedInPostsOutputSchema,
  },
  async input => {
    const {output} = await generateLinkedInPostsPrompt(input);
    return output!;
  }
);
