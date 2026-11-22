// Cross-platform cleanup of build artifacts for the current package.
// Usage: node ../../scripts/clean.mjs [extra paths...]
import { rmSync } from 'node:fs';

const targets = process.argv.length > 2
  ? process.argv.slice(2)
  : ['.next', '.turbo', 'dist', 'out', 'tsconfig.tsbuildinfo', 'next-env.d.ts'];

for (const target of targets) {
  rmSync(target, { recursive: true, force: true });
}
