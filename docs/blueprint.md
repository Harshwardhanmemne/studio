# **App Name**: LinkedWrite

## Core Features:

- Post Generation: Generate LinkedIn posts based on topic, tone, audience, and length using an AI tool.
- Customizable Input Form: An input form allowing users to specify topic, tone, audience, length, hashtags, and the number of posts to generate.
- Post Display: Display the generated posts in clear, individual cards.
- Copy to Clipboard: Provide a button for each post to copy the text to the clipboard.
- Parameter Handling: Pass topic, tone, target audience, post length, hashtags or keywords, number of posts parameters correctly between front end and back end.
- Health Check Endpoint: Implement a `/health` endpoint that returns a 200 OK status to indicate the app is running.

## Style Guidelines:

- Primary color: Blue (#2869FF) to convey trust, professionalism, and innovation, aligning with LinkedIn's core values. Avoid teal.
- Background color: Light gray (#F0F2F5) to provide a clean and neutral backdrop that is easy on the eyes.
- Accent color: Purple (#9F52FF) to highlight interactive elements like the generate button and copy button, adding a touch of modern flair.
- Font: 'Inter' (sans-serif) for a clean, modern, and highly readable interface, suitable for both headlines and body text.
- Use a grid-based layout for displaying posts in individual cards, ensuring a structured and visually appealing presentation.
- Use simple, clear icons for actions like copying text, making the interface intuitive and easy to navigate.
- Incorporate subtle animations, such as a loading spinner while generating posts, to provide user feedback and enhance the app's interactivity.