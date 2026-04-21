import { streamText } from "ai"

export const maxDuration = 60

const systemPrompt = `You are an expert template generator for multiple platforms. Generate high-quality, production-ready code.

## Platforms & Requirements:

### WordPress Themes:
- Follow WordPress coding standards
- Include functions.php, style.css, and template files
- Add proper theme support declarations
- Use the Customizer API for options

### Shopify Themes:
- Use Liquid templating
- Follow Dawn theme structure
- Include schema settings
- Support Online Store 2.0

### Figma Design Systems:
- Describe component structure
- Include auto-layout specifications
- Define color and typography tokens
- Document component variants

### Next.js Applications:
- Use App Router
- Include TypeScript types
- Add proper metadata
- Follow React best practices

Always include:
1. Clear file structure
2. Complete, working code
3. Comments explaining key sections
4. Instructions for customization`

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = streamText({
    model: "google/gemini-2.0-flash",
    system: systemPrompt,
    messages,
    abortSignal: req.signal,
    maxTokens: 4000,
  })

  return result.toDataStreamResponse()
}
