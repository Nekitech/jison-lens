'use client';
import { FC, ReactElement } from 'react';
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from '@/shared/ui/resizable';

interface SplitPageProps {
    left: ReactElement;
    right: ReactElement;
}

const SplitPane: FC<SplitPageProps> = ({ left, right }) => {
    return (
        <ResizablePanelGroup direction="horizontal" className="w-full">
            <ResizablePanel defaultSize={40}>{left}</ResizablePanel>
            <ResizableHandle
                withHandle
                style={{
                    backgroundColor: '#1e1e1e',
                    boxShadow: '0 4px 10px rgba(0, 255, 255, 0.7)',
                    width: 6,
                }}
                className={'shadow-[0_6px_8px_rgba(0,255,255,0.15)]'}
            />
            <ResizablePanel defaultSize={60}>{right}</ResizablePanel>
        </ResizablePanelGroup>
    );
};

export default SplitPane;
