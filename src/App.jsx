import { useCallback, useMemo, useState } from "react";
import ReactFlow, { MiniMap, ReactFlowProvider, Controls, Background, addEdge, applyNodeChanges } from "reactflow";

import Sidebar from "./components/Sidebar/Sidebar";
import InputNode from "./components/Nodes/InputNode";
import DefaultNode from "./components/Nodes/DefaultNode";
import OutputNode from "./components/Nodes/OutputNode";
import Edges from "./components/Edges";

import 'reactflow/dist/style.css';

function App() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const nodeTypes = useMemo(() => ({
    Input: InputNode,
    Output: OutputNode,
    Default: DefaultNode
  }), []);

  const edgeTypes = useMemo(() => ({
    turbo: Edges
  }), []);

  const defaultEdgeOptions = {
    type: "turbo",
    markerEnd: "edge-circle",
  };

  const getId = () => `${Math.floor(Math.random() * 10000)}`;
  
  const onDrop = (e) => {
    const type = e.dataTransfer.getData("text/plain");
    const newNode = {
      id: getId(),
      type,
      position: { x: e.clientX, y: e.clientY },
      data: { label: `${type} Node` },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onNodeConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  return (
    <div style={{ position: "relative" }}>
      <div style={{ width: '100vw', height: '100vh' }}>
        <ReactFlowProvider>
          <ReactFlow 
            nodes={nodes}
            edges={edges}
            onDrop={onDrop}
            onDragOver={(e) => e.preventDefault()}
            onNodesChange={onNodesChange}
            onConnect={onNodeConnect}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            defaultEdgeOptions={defaultEdgeOptions}
          >
            <Background />
            <Controls />
            <MiniMap />
            <svg>
              <defs>
                <linearGradient id="edge-gradient">
                  <stop offset="0%" stopColor="#ae53ba" />
                  <stop offset="100%" stopColor="#2a8af6" />
                </linearGradient>
                <marker
                  id="edge-circle"
                  viewBox="-5 -5 10 10"
                  refX="0"
                  refY="0"
                  markerUnits="strokeWidth"
                  markerWidth="10"
                  markerHeight="10"
                  orient="auto"
                >
                  <circle stroke="#2a8af6" strokeOpacity="0.75" r="2" cx="0" cy="0" />
                </marker>
              </defs>
            </svg>
          </ReactFlow>
        </ReactFlowProvider>
      </div>
      <Sidebar />
    </div>
  );
}

export default App;