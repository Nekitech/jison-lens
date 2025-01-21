import {
    addEdge,
    Background,
    BackgroundVariant,
    Controls,
    ReactFlow,
    useEdgesState,
    useNodesState,
} from '@xyflow/react';
import { FC, useCallback, useEffect, useState } from 'react';
import { Connection } from '@xyflow/system';
import { EdgeBase } from '@xyflow/system/dist/esm/types/edges';
import { NodeBase } from '@xyflow/system/dist/esm/types/nodes';

type TAstVisualizerProps = {
    initEdges: EdgeBase[];
    initNodes: NodeBase[];
};

const AstVisualizer: FC<TAstVisualizerProps> = ({ initNodes, initEdges }) => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);
    const [selectedNode, setSelectedNode] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setNodes(initNodes || []);
    }, [initNodes]);

    useEffect(() => {
        setEdges(initEdges || []);
    }, [initEdges]);

    const onConnect = useCallback(
        (params: EdgeBase | Connection) =>
            setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );
    const handleNodeClick = (event, node) => {
        setOpen(true);
        setSelectedNode(node); // Сохраняем выбранную ноду в состоянии
    };
    return (
        <ReactFlow
            colorMode={'dark'}
            zoomOnScroll={true}
            nodes={nodes}
            edges={edges}
            onNodeClick={handleNodeClick}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView={true}
        >
            {open && selectedNode && (
                <div
                    className={
                        'h-auto absolute top-0.5 right-[50%] bg-primary-blue text-primary-text p-4 rounded z-10'
                    }
                >
                    <button
                        className={' absolute top-2 right-2'}
                        onClick={() => setOpen(false)}
                    >
                        [X]
                    </button>
                    <h3>lex = {selectedNode.data.label}</h3>
                    <pre>
                        <code>
                            {JSON.stringify(
                                selectedNode.data.description,
                                null,
                                2,
                            )}
                        </code>
                    </pre>
                </div>
            )}
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
