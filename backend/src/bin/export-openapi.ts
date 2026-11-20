import swaggerSpec from '@src/swagger';
import { writeFileSync } from 'fs';

const outputPath = process.argv[2] ?? 'openapi.json';
writeFileSync(outputPath, `${JSON.stringify(swaggerSpec, null, 2)}\n`);
