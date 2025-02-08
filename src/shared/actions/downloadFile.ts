'use server';

import * as fs from 'node:fs';
import path from 'node:path';

export default async function downloadFile(file: string) {
    const filePath = path.join(process.cwd(), file);
    return fs.readFileSync(filePath);
}
