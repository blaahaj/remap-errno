# @blaahaj/remap-errno

A node module to simplify the extraction and handling of `ENOENT`, etc from `error.code`.

## Usage

A type to hold `errno` codes:

```js
// "EPERM" | "ENOENT" | "EISDIR" | ...
import { type Errno } from "@blaahaj/remap-errno";
```

Extract an `Errno` from an error:

```js
import { errnoFrom } from "@blaahaj/remap-errno";
import { readFile } from "node:fs/promises";

await readFile("no such file!!").catch((error) => {
  const errno = errnoFrom(error); // Errno | undefined
  // ...
});
```

Turn errors with specific `Errno` values, into non-error values:

```js
import { remapErrno } from "@blaahaj/remap-errno";
import { readFile } from "node:fs/promises";

const readFileIfExists = remapErrno(readFile, {
  ENOENT: undefined,
  EPERM: undefined,
});
const content = await readFileIfExists("somefile.json", "utf-8"); // string | undefined
```

Any errors not listed in the mapping are left unchanged, i.e. are still thrown.
