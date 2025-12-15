import * as os from "node:os";

export const Errno = os.constants.errno;
export type Errno = keyof typeof Errno;
