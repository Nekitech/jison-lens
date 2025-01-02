import GrammarEditor from '@/widgets/GrammarEditor/grammar_editor.tsx';
import SplitPane from '@/shared/ui/SplitPane/split_pane.tsx';
import AstVisualizer from '@/widgets/AstVisualizer/ast_vizualizer.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs.tsx';

const MainPage = () => {
    return (
        <>
            <SplitPane
                left={<GrammarEditor />}
                right={
                    <Tabs
                        defaultValue={'ast'}
                        className=" w-full h-full bg-[#282c34]"
                    >
                        <TabsList
                            className={
                                'w-full flex items-center bg-[#282c34] color-[#fff]'
                            }
                        >
                            <TabsTrigger value="ast">AST</TabsTrigger>
                            <TabsTrigger value="input_parser">
                                some content
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="ast">
                            <div className={'w-full h-[100vh]'}>
                                <AstVisualizer />
                            </div>
                        </TabsContent>
                        <TabsContent value="input_parser">123</TabsContent>
                    </Tabs>
                }
            />
        </>
    );
};

export default MainPage;
