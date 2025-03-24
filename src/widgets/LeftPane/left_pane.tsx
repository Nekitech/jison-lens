'use client';
import React, { useEffect, useState } from 'react';
import GrammarEditor from '@/widgets/GrammarEditor';
import { Button } from '@/shared/ui/button';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/shared/ui/resizable';
import { Textarea } from '@/shared/ui/textarea';
import { useParsingDataContext } from '@/shared/context/parsingDataContext';
import ParsingData from '@/shared/actions/parsingData';
import { toast } from '@/shared/hooks/use-toast';
import { Toaster } from '@/shared/ui/toaster';
import createParser from '@/shared/actions/createParser';
import DownloadParser from '@/features/downloadParser/download_parser';
import DownloadGrammar from '@/features/downloadGrammar/download_grammar';
import { Separator } from '@/shared/ui/separator';
import { ArrowUpDown, Hammer } from 'lucide-react';
import {
  Menubar,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/shared/ui/menubar';
import DownloadTSParser from '@/features/downloadTSParser/download_ts_parser';
import executeParsingVM from '@/shared/actions/compileJS';
import CustomSelectGrammar from '@/features/selectGrammar/custom_select_grammar';
import downloadFile from '@/shared/actions/downloadFile';
import { grammars } from '@/shared/utils/grammar';

const LeftPane = () => {
  const [text, setText] = useState('');
  const { setData } = useParsingDataContext();
  const [selected_grammar, setSelectGrammar] = useState(() => grammars[0].name_file)
  const [grammar, setGrammar] = useState('')
  const parsingDataAction = executeParsingVM.bind(null, text, grammar)

  // const onCreateParser = async () => {
  //   createParser()
  //     .then((res) => {
  //       if (!res.success) {
  //         throw new Error(res.message);
  //       }
  //       const { success, message } = res;
  //       if (success) {
  //         toast({
  //           title: 'Success',
  //           description: message,
  //           variant: 'default',
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       toast({
  //         title: 'Error',
  //         description: err.message,
  //         variant: 'destructive',
  //       });
  //     });
  // };

  useEffect(() => {
    downloadFile(`src/shared/grammars/${selected_grammar}`).then(grammar => {
      setGrammar(grammar)
    }).catch(err => console.log(err))
  }, [selected_grammar])
  const onParsing = async () => {
    const { err, value, ast_tree } = await parsingDataAction();
    if (!err) {
      setData({
        resultedValue: value,
        tree: ast_tree,
      });
    } else {
      toast({
        title: `Error parsing -  ${err.name}`,
        description: err.message,
        variant: 'destructive',
      });
    }
  };
  return (
    <>
      <Toaster />
      <ResizablePanelGroup direction="vertical" className="w-full">
        <div
          className={
            'flex items-center justify-end w-full h-16 bg-primary-black p-4 gap-x-4'
          }
        >
          <CustomSelectGrammar setSelectGrammar={setSelectGrammar} />
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger className={'cursor-pointer'}>
                Download / Upload
              </MenubarTrigger>
              <MenubarContent>
                <MenubarGroup>
                  <MenubarItem>
                    {/* <DownloadParser /> */}
                  </MenubarItem>
                  <MenubarItem>
                    <DownloadTSParser />
                  </MenubarItem>
                </MenubarGroup>
                <MenubarSeparator
                  className={'bg-primary-black'}
                />

                <MenubarItem>
                  {/* <DownloadGrammar /> */}
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>

          <Separator orientation={'vertical'} />
          {/* <Button variant={'default'} onClick={onCreateParser}> */}
          {/*   <Hammer /> */}
          {/*   Generate parser */}
          {/* </Button> */}
          <Button variant={'secondary'} onClick={onParsing}>
            <ArrowUpDown />
            Parsing
          </Button>
        </div>
        <ResizablePanel defaultSize={70}>
          <GrammarEditor setGrammar={setGrammar} selected_grammar={grammar} />
        </ResizablePanel>
        <ResizableHandle
          withHandle
          style={{
            backgroundColor: '#1e1e1e',
            boxShadow: '0 4px 10px rgba(0, 255, 255, 0.7)',
            width: '100%',
          }}
        />
        <ResizablePanel
          defaultSize={30}
          maxSize={40}
          className={'bg-primary-black'}
        >
          <Textarea
            placeholder={'Input data....'}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className={
              'h-full text-primary-text bg-secondary-black'
            }
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
};

export default LeftPane;
