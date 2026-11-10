import type { BackgroundRequest, BackgroundResponse } from './types';

export async function sendMessage<T = undefined>(
  request: BackgroundRequest,
): Promise<T> {
  const response = (await chrome.runtime.sendMessage(request)) as
    | BackgroundResponse<T>
    | undefined;
  if (!response) {
    throw new Error('The Lurker Drops background worker did not respond.');
  }
  if (!response.ok) {
    throw new Error(response.error ?? 'Something went wrong.');
  }
  return response.data as T;
}

export function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
