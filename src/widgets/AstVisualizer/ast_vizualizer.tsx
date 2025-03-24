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
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { Label } from '@/shared/ui/label';
import { ScrollArea } from '@/shared/ui/scroll-area';

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
    setSelectedNode(node);
  };

  return (
    <>
      <ReactFlow
        colorMode={'dark'}
        zoomOnScroll={true}
        nodes={nodes}
        edges={edges}
        onNodeClick={handleNodeClick}
        onNodesChange={onNodesChange}
        onClickCapture={() => setOpen(false)}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView={true}
        className={'relative'}
      >
        <Popover open={open}>
          <PopoverTrigger asChild>
            <div></div>
          </PopoverTrigger>
          <PopoverContent
            side={'left'}
            className="min-w-[300px] w-auto bg-primary-black text-primary-text absolute"
          >
            {selectedNode && (
              <ScrollArea
                className={
                  'flex flex-col gap-y-4 max-h-[700px] h-auto px-2'
                }
              >
                <Label>
                  Lex name - {selectedNode.data.label}
                </Label>
                <br />
                <Label>Value node: </Label>
                <pre>
                  <code>
                    {JSON.stringify(
                      selectedNode.data.description,
                      null,
                      2,
                    )}
                  </code>
                </pre>
              </ScrollArea>
            )}
          </PopoverContent>
        </Popover>
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
    </>
  );
};

export default AstVisualizer;
