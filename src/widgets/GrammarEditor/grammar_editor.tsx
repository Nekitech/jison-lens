import ReactCodeMirror from '@uiw/react-codemirror';
import { ebnf } from '@codemirror/legacy-modes/mode/ebnf';
import { StreamLanguage } from '@codemirror/language';

const GrammarEditor = () => {
    return (
        <ReactCodeMirror
            className={
                'scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-300'
            }
            extensions={[StreamLanguage.define(ebnf)]}
            value={''}
            basicSetup={{ dropCursor: true, indentOnInput: true }}
            style={{
                fontSize: 16,
            }}
            height={'100vh'}
            autoFocus={true}
            theme={'dark'}
        />
    );
};

export default GrammarEditor;
