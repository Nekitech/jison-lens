import {
    Background,
    BackgroundVariant,
    Controls,
    ReactFlow,
} from '@xyflow/react';

const nodes = [
    {
        id: '1', // required
        position: { x: 0, y: 0 }, // required
        data: { label: 'Hello' }, // required
    },
];

const AstVisualizer = () => {
    return (
        <ReactFlow zoomOnScroll={true} nodes={nodes} fitView={true}>
            <Background
                variant={BackgroundVariant.Dots}
                bgColor={'var(--primary-black)'}
            />
            <Controls
                className={'flex flex-col gap-y-2'}
                showInteractive={true}
                showZoom={true}
                position={'top-right'}
            />
        </ReactFlow>
    );
};

export default AstVisualizer;
