import { Errno } from "./errno.js";

export const errnoOf = (error: unknown): Errno | undefined => {
  if (
    error instanceof Error &&
    "code" in error &&
    typeof error.code === "string" &&
    error.code in Errno
  )
    return error.code as Errno;

  return undefined;
};
