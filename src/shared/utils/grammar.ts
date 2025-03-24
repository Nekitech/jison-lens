export function extractJsCodeFromGrammar(grammarText: string) {
  const jsCodeRegex = /%\{\s*([\s\S]*?)\s*%\}/;

  const match = grammarText.match(jsCodeRegex);

  if (!match || !match[1]) {
    return null
  }

  return match[1].trim();
}

type TGrammarItem = {
  name_file: string;
  text_grammar: string
}

export const grammars: TGrammarItem[] = [
  {
    name_file: 'calculator.jison',
    text_grammar: 'Калькулятор'
  },
  {
    name_file: 'chords.jison',
    text_grammar: 'Музыкальные аккорды'
  }
]
