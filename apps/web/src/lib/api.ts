import { z } from "zod";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

/** Zod schema for health endpoint response — example of validating API responses */
const HealthResponseSchema = z.object({
  status: z.string(),
});

export type HealthResponse = z.infer<typeof HealthResponseSchema>;

/**
 * Fetch backend health and validate with Zod.
 * Example: always validate external API responses so you get typed, safe data.
 */
export async function getHealth(): Promise<HealthResponse> {
  const res = await fetch(`${apiBaseUrl}/health`, { cache: "no-store" });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API health check failed (${res.status}): ${text || res.statusText}`);
  }
  const data = await res.json();
  return HealthResponseSchema.parse(data);
}

const ExampleResponseSchema = z.object({
  message: z.string(),
});

export type ExampleResponse = z.infer<typeof ExampleResponseSchema>;

export async function getExample(): Promise<ExampleResponse> {
  const res = await fetch(`${apiBaseUrl}/api/example`, { cache: "no-store" });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API example failed (${res.status}): ${text || res.statusText}`);
  }
  const data = await res.json();
  return ExampleResponseSchema.parse(data);
}
