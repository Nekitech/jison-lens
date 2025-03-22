'use server';

// @ts-ignore
import { Jison } from 'jison'
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import * as vm from 'node:vm';
import createNodesLexStructure from '@/shared/actions/createLexTree';
import buildLexTree from '@/shared/actions/buildLexTree';
import md5 from 'md5'

const require = createRequire(import.meta.url);

interface Exports {
  parse?: (...args: any[]) => any;
  main?: (args: string[]) => any;
}

interface Context {
  exports: Exports;
  require?: NodeRequire;
}

let cachedParser: any = null;
let cachedGrammarHash: string = '';

function getGrammarHash(grammar: string): string {
  return md5(grammar);
}


export default async function executeParsingVM(value: string) {
  try {
    const path_grammar = path.resolve(process.cwd(), 'src', 'shared', 'generated', 'grammar.jison');
    const compiledGrammar = readFileSync(path_grammar, {
      encoding: 'utf8'
    })
    const currentGrammarHash = getGrammarHash(compiledGrammar);

    if (cachedGrammarHash !== currentGrammarHash || !cachedParser) {
      cachedParser = new Jison.Parser(compiledGrammar).generate();
      cachedGrammarHash = currentGrammarHash;
      console.log('New parser cached')
    }

    const context: Context = {
      exports: {},
      require: require,
    };
    vm.createContext(context);

    vm.runInContext(cachedParser, context);

    const parse = context.exports.parse;
    const completed_value = parse?.(value);
    const raw_data = await createNodesLexStructure(context.exports.parser.parserDebugger);
    const ast_tree = await buildLexTree(raw_data);
    return {
      value: completed_value,
      ast_tree,
      err: null,
    };
  } catch (e) {
    console.log(e);
    return {
      value: null,
      err: new Error(e?.message),
    };
  }
}

// console.log(await executeParsingVM( 'calculator.jison', '2 + 3'))
