'use server';

import createNodesLexStructure from '@/shared/actions/createLexTree';
import buildLexTree from '@/shared/actions/buildLexTree';

export default async function parsingData(text: string = '') {
    try {
        const { parse, parser } = await import('@/shared/generated/grammar');

        const value = parse(text);
        const raw_data = await createNodesLexStructure(parser?.parserDebugger);
        const ast_tree = await buildLexTree(raw_data);

        return {
            value,
            ast_tree,
            err: null,
        };
    } catch (e: any) {
        console.log(e);
        return {
            value: null,
            err: new Error(e?.message),
        };
    }
}
