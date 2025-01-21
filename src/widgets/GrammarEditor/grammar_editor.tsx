import ReactCodeMirror from '@uiw/react-codemirror';
import { ebnf } from '@codemirror/legacy-modes/mode/ebnf';
import { StreamLanguage } from '@codemirror/language';
import { useCallback, useState } from 'react';
import { testGrammar } from '@/shared/examples/testGrammar';
import updateGrammar from '@/shared/actions/updateGrammar';

const GrammarEditor = () => {
    const [grammar, setGrammar] = useState(testGrammar);
    const handleChangeGrammar = useCallback(async (value: string) => {
        setGrammar(value);
        const updateGrammarWithArgs = updateGrammar.bind(null, value);
        await updateGrammarWithArgs();
    }, []);
    return (
        <ReactCodeMirror
            className={
                'scrollbar-thin scrollbar-thumb-primary-blue scrollbar-track-gray-300 overflow-y-scroll h-full'
            }
            extensions={[StreamLanguage.define(ebnf)]}
            value={grammar}
            onChange={handleChangeGrammar}
            basicSetup={{ dropCursor: true, indentOnInput: true }}
            style={{
                fontSize: 16,
            }}
            autoFocus={true}
            theme={'dark'}
        />
    );
};

export default GrammarEditor;
