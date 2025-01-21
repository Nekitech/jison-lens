'use client';
import RightPane from '@/widgets/RightPane';
import SplitPane from '@/shared/ui/SplitPane/split_pane';
import LeftPane from '@/widgets/LeftPane';
import React from 'react';

export default function Home() {
    return (
        <>
            <SplitPane left={<LeftPane />} right={<RightPane />} />
        </>
    );
}
