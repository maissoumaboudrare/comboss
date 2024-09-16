import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names using clsx and merges Tailwind classes.
 * 
 * @param inputs - Class values to be combined.
 * @returns The combined class name string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// TODO move to utils/api.ts 👇

/**
 * Fetches data from the API with provided endpoint and options.
 * 
 * @param endpoint - API endpoint to be accessed.
 * @param options - Optional configurations for the fetch request.
 * @returns Parsed JSON response from the API.
 * @throws Will throw an error if the fetch response is not ok.
 */
export const fetchAPI = async (endpoint: string, options = {}) => {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3010";
  
  const response = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Error: ${response.statusText}, Details: ${errorData.message || 'No additional error details provided'}`);
  }

  return response.json();
};