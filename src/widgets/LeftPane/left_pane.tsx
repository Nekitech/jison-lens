'use client';
import React, { useState } from 'react';
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

const LeftPane = () => {
    const [text, setText] = useState('');
    const { setData } = useParsingDataContext();
    const parsingDataAction = ParsingData.bind(null, text);
    return (
        <>
            <div
                className={
                    'flex items-center justify-end w-full h-16 bg-primary-black p-4 gap-x-4'
                }
            >
                <Button
                    variant={'default'}
                    onClick={async () => {
                        const { success, message, stderr } =
                            await createParser();
                        if (success) {
                            toast({
                                title: 'Parser created',
                                description: message,
                                variant: 'default',
                            });
                        } else {
                            toast({
                                title: 'Error',
                                description: stderr,
                                variant: 'destructive',
                            });
                        }
                    }}
                >
                    Generate parser
                </Button>
                <Button
                    variant={'secondary'}
                    onClick={async () => {
                        const { err, value, ast_tree } =
                            await parsingDataAction();
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
                    }}
                >
                    Parsing
                </Button>
            </div>
            <ResizablePanelGroup direction="vertical" className="w-full">
                <ResizablePanel defaultSize={70}>
                    <GrammarEditor />
                </ResizablePanel>
                <ResizableHandle
                    withHandle
                    style={{
                        backgroundColor: '#1e1e1e',
                        boxShadow: '0 4px 10px rgba(0, 255, 255, 0.7)',
                        width: 6,
                    }}
                    className={'shadow-[0_6px_8px_rgba(0,255,255,0.15)]'}
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
            <Toaster />
        </>
    );
};

export default LeftPane;
