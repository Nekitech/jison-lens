import { ESLint } from 'eslint';

async function lintCode(code) {
    const eslint = new ESLint({
        baseConfig: {
            rules: {
                // semi: 'error', // Добавьте любые правила, которые хотите проверить
                // quotes: ['error', 'double'],
            },
        },
    });

    const results = await eslint.lintText(code);

    // Форматируем и выводим результат
    results.forEach((result) => {
        result.messages.forEach((message) => {
            console.log(`Line ${message.line}: ${message.message}`);
        });
    });

    return results;
}

const codeToCheck = `
  var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/constants/index.ts
var ReservedList = ["end note, +INITIAL"];
var SpecialCharList = [
  "!",
  "@",
  "$",
  // Нужны двойные кавычки, т.к при одинарных некорректно импортируется в грамматику
  "%",
  "^",
  "&",
  "*",
  '"',
  "№",
  "(",
  ")",
  "[",
  "]",
  "{",
  "}",
  "+",
  "-",
  "=",
  ";",
  ":",
  "?",
  ".",
  ",",
  "/",
  "\\\\",
  "|"
];
var ExpressionTypes = {
  Function: "function",
  StringDeclaration: "string",
  ArrayDeclaration: "array",
  IntegerDeclaration: "integer",
  DecimalDeclaration: "decimal",
  FunctionProperty: "FunctionProperty",
  Constant: "constant",
  Payload: "payload",
  Context: "context",
  Identifier: "identifier"
};
var maxNestedFuncLevel = 8;

// src/grammar/jsGrammar.ts
var calcDepthFunc = recursiveDepth();
function recursiveDepth() {
  let counterDepth = 1;
  return (funcObj) => {
    const args = funcObj.FunctionDeclaration.Arguments;
    const funcArgs = args.filter((item) => "FunctionDeclaration" in item);
    if (args.length === 0 || funcArgs.length === 0) {
      return 1;
    } else {
      const arrArgs = [];
      for (const func of funcArgs) {
        arrArgs.push(calcDepthFunc(func));
      }
      counterDepth = Math.max(...arrArgs) + 1;
      return counterDepth;
    }
  };
}



`;

lintCode(codeToCheck).catch((error) =>
    console.error('Ошибка линтинга:', error),
);
