export function extractJsCodeFromGrammar(grammarText: string) {
  // Регулярное выражение для поиска JavaScript-кода между %{ и %}
  const jsCodeRegex = /%\{\s*([\s\S]*?)\s*%\}/;

  // Ищем JavaScript-код в грамматике
  const match = grammarText.match(jsCodeRegex);

  if (!match || !match[1]) {
    return null
  }

  // Возвращаем извлечённый код
  return match[1].trim();
}
