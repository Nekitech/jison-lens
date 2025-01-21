'use server';
import { LexNodeType, ParserDebuggerType } from '@/shared/types/lex';

export default async function createNodesLexStructure(
    parserDebugger: ParserDebuggerType[],
): Promise<LexNodeType | null> {
    const unresolvedProductions: any = [];
    let root: LexNodeType | null = null;

    function handleShift(step: ParserDebuggerType) {
        for (let k = unresolvedProductions.length - 1; k >= 0; k--) {
            const unresolvedProduction = unresolvedProductions[k];
            if (unresolvedProduction.name === step.terminal) {
                // resolve as terminal, no children
                unresolvedProductions.splice(k, 1);
                unresolvedProduction.subtitle = step.text || '<<EOF>>';
            }
        }
    }

    function handleReduce(step: ParserDebuggerType) {
        let node;
        if (!root) {
            // root node
            node = root = {
                name: step.nonterminal,
                output: step.result,
                children: [],
            };
        } else {
            // non-root, non-terminal
            for (let k = unresolvedProductions.length - 1; k >= 0; k--) {
                const unresolvedProduction = unresolvedProductions[k];
                if (unresolvedProduction.name === step.nonterminal) {
                    // resolve
                    unresolvedProductions.splice(k, 1);
                    node = unresolvedProduction;
                    node.output = step.text;
                    break;
                }
            }
        }

        for (let j = 0; j < step.productions.length; j++) {
            const production = {
                name: step.productions[j],
                children: [],
            };
            node.children.push(production);
            unresolvedProductions.push(production);
        }
    }

    // the way the parserDebugger is built up, I can walk
    // through it backwards from the root node and
    // build up the hierarchy that way. The list of unresolvedProductions
    // can also be used to walk through backwards and find
    // the correct node in the case of ambiguities, due to
    // how LALR grammars are built up.
    for (let i = parserDebugger.length - 1; i >= 0; i--) {
        const step = parserDebugger[i];
        if (step.action === 'shift') {
            handleShift(step);
        } else if (step.action === 'reduce') {
            handleReduce(step);
        }
    }

    return root;
}
