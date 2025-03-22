'use server';
import * as acorn from 'acorn';

import { extractJsCodeFromGrammar } from '@/shared/utils/grammar';

export default async function checkErrorGrammar(grammarText: string) {
  try {
    const jsCode = extractJsCodeFromGrammar(grammarText);

    if (!jsCode) {
      return {
        success: true,
        message: 'JS код не найден в данной грамматике'
      }
    }
    acorn.parse(jsCode, { ecmaVersion: 'latest' });

    return {
      success: true,
      message: 'Грамматика валидна, JavaScript-код корректен.',
    };
  } catch (e) {
    return {
      success: false,
      message: `Ошибка в JavaScript-коде: ${e.message}`,
      error: {
        message: e.message,
        line: e.loc?.line, // Номер строки с ошибкой
        column: e.loc?.column, // Номер колонки с ошибкой
      },
    };
  }
}
