'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import AstVisualizer from '@/widgets/AstVisualizer';
import { useParsingDataContext } from '@/shared/context/parsingDataContext';
import ReactCodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/legacy-modes/mode/javascript';
import { StreamLanguage } from '@codemirror/language';

const RightPane = () => {
    const { data } = useParsingDataContext();
    return (
        <Tabs
            defaultValue={'input_parser'}
            className="w-full bg-primary-black h-[100vh]"
        >
            <TabsList
                style={{
                    backgroundColor: 'var(--primary-black)',
                }}
                className={`w-full 
                                h-[64px] 
                                flex
                                gap-x-4
                                 items-center 
                                 text-primary-text
                                 shadow-[0_6px_8px_rgba(0,255,255,0.15)] 
                                 border-solid`}
            >
                <TabsTrigger value="input_parser">Парсинг данных</TabsTrigger>
                <TabsTrigger value="ast">AST</TabsTrigger>
            </TabsList>

            <TabsContent value="ast">
                <div className={'w-full h-[100vh]'}>
                    <AstVisualizer
                        initEdges={data?.tree.edges}
                        initNodes={data?.tree.nodes}
                    />
                </div>
            </TabsContent>
            <TabsContent
                value="input_parser"
                className={'text-primary-text h-full'}
            >
                <ReactCodeMirror
                    readOnly={true}
                    extensions={[[StreamLanguage.define(json)]]}
                    value={JSON.stringify(data?.resultedValue, null, 4)}
                    theme={'dark'}
                    className={'h-full'}
                />
            </TabsContent>
        </Tabs>
    );
};

export default RightPane;
