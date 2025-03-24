import ReactCodeMirror from '@uiw/react-codemirror';
import { ebnf } from '@codemirror/legacy-modes/mode/ebnf';
import { StreamLanguage } from '@codemirror/language';
import { Dispatch, FC, SetStateAction, useCallback } from 'react';
import { toast } from '@/shared/hooks/use-toast';

interface IGrammarEditorProps {
  selected_grammar: string
  setGrammar: Dispatch<SetStateAction<string>>
}

const GrammarEditor: FC<IGrammarEditorProps> = ({
  selected_grammar,
  setGrammar
}) => {
  const handleChangeGrammar = useCallback(async (value: string) => {
    try {
      setGrammar(value);
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
      value={selected_grammar}
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
