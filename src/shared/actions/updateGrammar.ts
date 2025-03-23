
'use server';

import path from 'node:path';
import * as fs from 'node:fs';
import checkErrorGrammar from '@/shared/actions/checkErrorGrammar';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default async function updateGrammar(grammar: string) {
  try {
    // Определяем путь в зависимости от окружения
    const isProduction = process.env.NODE_ENV === 'production';
    const filePath = isProduction
      ? '/tmp/grammar.jison'
      : path.join(__dirname, '..', 'generated', 'grammar.jison');

    console.log('Saving grammar file at:', filePath);

    // Проверяем, существует ли файл, если нет — создаем
    if (!fs.existsSync(filePath)) {
      console.log('File does not exist. Creating new file...');
      fs.writeFileSync(filePath, '', 'utf8'); // Создаём пустой файл
    }

    // Записываем переданные данные
    fs.writeFileSync(filePath, grammar, 'utf8');

    // Проверяем валидность грамматики
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

