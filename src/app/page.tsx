'use client';
import GrammarEditor from '@/widgets/GrammarEditor';
import RightPane from '@/widgets/RightPane';
import SplitPane from '@/shared/ui/SplitPane/split_pane';

export default function Home() {
    return (
        <>
            <SplitPane left={<GrammarEditor />} right={<RightPane />} />
        </>
    );
}
