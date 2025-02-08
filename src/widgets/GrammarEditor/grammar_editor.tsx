import ReactCodeMirror from '@uiw/react-codemirror';
import { ebnf } from '@codemirror/legacy-modes/mode/ebnf';
import { StreamLanguage } from '@codemirror/language';
import { useCallback, useState } from 'react';
import { testGrammar } from '@/shared/examples/testGrammar';
import updateGrammar from '@/shared/actions/updateGrammar';
import { toast } from '@/shared/hooks/use-toast';

const GrammarEditor = () => {
    const [grammar, setGrammar] = useState(testGrammar);
    const handleChangeGrammar = useCallback(async (value: string) => {
        setGrammar(value);
        try {
            await updateGrammar
                .bind(null, value)()
                .then((res) => {
                    if (!res.success) {
                        throw new Error(res.message);
                    }
                });
        } catch (err) {
            toast({
                title: 'Error',
                description: err.message,
                variant: 'destructive',
            });
        }
    }, []);
    return (
        <ReactCodeMirror
            className={
                'scrollbar-thin scrollbar-thumb-primary-black scrollbar-track-gray-300 overflow-y-scroll h-full'
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
