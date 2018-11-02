import { copySync } from 'fs-extra';
import { build } from 'ng-packagr';
import { join } from 'path';

async function main() {
  // build package
  await build({
    project: join(process.cwd(), 'src/lib/package.json'),
  });

  // copy everything else
  copySync('README.md', join(process.cwd(), 'dist/README.md'));
  copySync('LICENSE', join(process.cwd(), 'dist/LICENSE'));
}

main()
  .then(() => console.log('success'))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
