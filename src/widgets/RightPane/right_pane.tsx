'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import AstVisualizer from '@/widgets/AstVisualizer/ast_vizualizer';

const RightPane = () => {
    return (
        <Tabs defaultValue={'ast'} className=" w-full h-full bg-primary-black">
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
                <TabsTrigger value="ast">AST</TabsTrigger>
                <TabsTrigger value="input_parser">Вывод парсера</TabsTrigger>
            </TabsList>

            <TabsContent value="ast">
                <div className={'w-full h-[100vh]'}>
                    <AstVisualizer />
                </div>
            </TabsContent>
            <TabsContent value="input_parser"></TabsContent>
        </Tabs>
    );
};

export default RightPane;
