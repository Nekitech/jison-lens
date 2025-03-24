import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { grammars } from '@/shared/utils/grammar'
import React, { Dispatch, FC, SetStateAction } from 'react'

interface ICustomSelectGrammarProps {
  setSelectGrammar: Dispatch<SetStateAction<string>>

}

const CustomSelectGrammar: FC<ICustomSelectGrammarProps> = ({
  setSelectGrammar
}) => {
  const select_items = grammars.map((grammar) => {

    return {
      value: grammar.name_file,
      text: grammar.text_grammar
    }
  })
  return (
    <>

      <Select onValueChange={(value) => setSelectGrammar(value)}>
        <SelectTrigger className='text-primary-text w-fit' >
          <SelectValue placeholder='Select a grammar...' />
        </SelectTrigger>
        <SelectContent>
          {
            select_items.map((grammar, ix) => {

              return <SelectItem key={grammar.value + ix} value={grammar.value}>{grammar.text}</SelectItem>
            })
          }
        </SelectContent>
      </Select>
    </>
  )
}

export default CustomSelectGrammar
