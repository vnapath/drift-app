export function getErrorMessage(error: unknown, fallback: string): string {
  if (typeof error === 'string' && error.length > 0) {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'object' && error !== null && 'message' in error) {
    const message = (error as { message?: unknown }).message;

    if (typeof message === 'string' && message.length > 0) {
      return message;
    }
  }

  try {
    const serializedError = JSON.stringify(error);

    if (serializedError && serializedError !== '{}') {
      return serializedError;
    }
  } catch {
    // Use the fallback below when the error cannot be serialized.
  }

  return fallback;
}
