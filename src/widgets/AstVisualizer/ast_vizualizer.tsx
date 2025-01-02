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
        // <div style={{ height: '100%', width: '100%' }}>
        <ReactFlow
            zoomOnScroll={true}
            width={100}
            height={100}
            nodes={nodes}
            fitView={true}
        >
            <Background
                color="#fff"
                variant={BackgroundVariant.Dots}
                bgColor={'#282c34'}
            />
            <Controls showInteractive={true} showZoom={true} />
        </ReactFlow>
        // </div>
    );
};

export default AstVisualizer;
