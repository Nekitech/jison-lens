import { FC, ReactElement } from 'react';
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from '@/shared/ui/resizable.tsx';

interface SplitPageProps {
    left: ReactElement;
    right: ReactElement;
}

const SplitPane: FC<SplitPageProps> = ({ left, right }) => {
    return (
        <ResizablePanelGroup direction="horizontal" className="w-full">
            <ResizablePanel defaultSize={40}>{left}</ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={60}>{right}</ResizablePanel>
        </ResizablePanelGroup>
    );
};

export default SplitPane;
