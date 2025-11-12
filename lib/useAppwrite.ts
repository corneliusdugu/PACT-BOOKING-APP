import { useEffect, useState, useCallback } from "react";

/**
 * Custom React hook to handle asynchronous Appwrite API calls with loading and error states.
 * Provides automatic fetching on mount and a refetch method for manual reloads.
 *
 * @template T - The expected data type returned from the async function.
 * @param fn - The asynchronous function to call (e.g., Appwrite API function).
 * @param args - Arguments to pass into the async function.
 * @param skip - If true, the function call will be skipped until manually triggered.
 */
export function useAppwrite<T>(
  fn: (...args: any[]) => Promise<T>,  // Async function to execute
  args: any[] = [],                    // Arguments passed into the async function
  skip = false                         // Whether to skip initial execution
) {
  const [data, setData] = useState<T | null>(null);     // Store returned data
  const [loading, setLoading] = useState(!skip);        // Track loading state
  const [error, setError] = useState<string | null>(null); // Store any error messages

  // Core fetch function that executes the async call
  const run = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fn(...args);   // Run the async function with provided args
      setData(res);                    // Store successful result
    } catch (e: any) {
      setError(e?.message ?? "Unknown error"); // Capture and store error message
    } finally {
      setLoading(false);               // Stop loading state regardless of outcome
    }
  }, [fn, JSON.stringify(args)]); // Depend on serialized args to prevent unnecessary reruns

  // Automatically run on mount unless `skip` is true
  useEffect(() => {
    if (!skip) run();
  }, [run, skip]);

  // Refetch function for manually triggering data reloads
  // Optionally accepts new arguments to call `fn` with
  const refetch = async (...newArgs: any[]) => {
    return (useAppwrite as any)(fn, newArgs.length ? newArgs : args);
  };

  // Return useful state and helpers to consuming components
  return { data, loading, error, refetch, setData };
}
