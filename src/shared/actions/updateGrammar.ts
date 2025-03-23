'use server';

import path from 'node:path';
import * as fs from 'node:fs';
import checkErrorGrammar from '@/shared/actions/checkErrorGrammar';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = dirname(fileURLToPath(import.meta.url))

export default async function updateGrammar(grammar: string) {
  try {
    console.log(__dirname)
    const filePath = path.join(
      __dirname,
      '..',
      'generated',
      'grammar.jison',
    );
    fs.writeFileSync(filePath, grammar, 'utf8');
    const validateGrammar = await checkErrorGrammar(grammar);
    if (!validateGrammar.success) {
      throw new Error(validateGrammar.message);
    }

    return { success: true, message: 'Grammar saved successfully.' };
  } catch (error) {
    console.error('Error saving grammar:', error);
    return { success: false, message: 'Failed to save grammar.' };
  }
}
