import React, { useState, useRef, useCallback, useEffect } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  MarkerType,
  MiniMap,
} from "react-flow-renderer";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./theme";
import LoadSidebar from "./LoadSidebar";
import SaveSidebar from "./SaveSidebar";
import EventSidebar from "./EventSidebar";
import TestSidebar from "./TestSidebar";
import CauseSidebar from "./CauseSidebar";
import Toolbar from "./Toolbar";
import { nodeTypes } from "./Nodes";
import Modal from "./Modal";
import "reactflow/dist/style.css";
import "./index.css";
import MenuBar from "./MenuBar";
import axios from "./axios";

let id = 0;
const getId = () => `dndnode_${id++}`;

let entityNodeCount = 0;
let eventNodeCount = 0;
let testNodeCount = 0;
let causeNodeCount = 0;

const ReactFlowStyled = styled(ReactFlow)`
  background-color: ${(props) => props.theme.bg};
`;

const ControlsStyled = styled(Controls)`
  button {
    width: 30px;
    height: 30px;
    background-color: ${(props) => props.theme.controlsBg};
    color: ${(props) => props.theme.controlsColor};
    border: 1px solid ${(props) => props.theme.controlsBorder};
    &:hover {
      background-color: ${(props) => props.theme.controlsBgHover};
    }
    path {
      fill: currentColor;
    }
  }
`;

const defaultEdgeOptions = {
  style: { strokeWidth: 2 },
  type: "default",
  markerEnd: {
    type: MarkerType.ArrowClosed,
  },
};

const DnDFlow = ({ toggleMode }) => {
  const reactFlowWrapper = useRef(null);
  const textRef = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const [nodeName, setNodeName] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("");
  const [sidebarType, setSidebarType] = useState(null);
  const [iprocessList, setIprocessList] = useState([]);
  const [curIprocess, setCurIprocess] = useState(null);

  useEffect(() => {
    const node = nodes.filter((node) => {
      if (node.selected) return true;
      return false;
    });
    if (node[0]) {
      setSelectedNode(node[0]);
    } else {
      setSelectedNode(null);
      setIsSelected(false);
    }
  }, [nodes]);

  useEffect(() => {
    setNodeName(selectedNode?.data?.name || "");
    setDescription(selectedNode?.data?.description || "");
    setContent(selectedNode?.data?.content || "");
    setColor(selectedNode?.data?.color || "");
    // textRef?.current?.focus();
  }, [selectedNode]);

  const onConnect = (params) => {
    if (edges.some((edge) => edge.source === params.source && edge.sourceHandle === params.sourceHandle)) {
      window.alert("Only one link can be setup from an output anchor.");
      return;
    }
    let sourceType = "";
    let targetType = "";
    nodes.forEach((node) => {
      if (node.id === params.source) {
        sourceType = node.type;
      }
      if (node.id === params.target) {
        targetType = node.type;
      }
    });
    if (sourceType === "dottedrectangle" && targetType !== "dottedrectangle") {
      window.alert("Entities instances may only link other entities instances.");
      return;
    }
    setEdges((eds) => addEdge({ ...params }, eds));
  };

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onClickNode = () => {
    console.log("nodeClicked");
    setIsSelected(true);
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");
      if (typeof type === "undefined" || !type) {
        return;
      }
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      if (type == "entity") {
        const newNode = {
          id: getId(),
          type: "dottedrectangle",
          position,
          data: {
            name: type,
            deleteNode: deleteNode,
            description: "",
            content: "" + type + ++entityNodeCount,
            color: "",
          },
        };
        setNodes((nds) => nds.concat(newNode));
      } else if (type == "event") {
        const newNode = {
          id: getId(),
          type: "circle1",
          position,
          data: {
            name: type,
            deleteNode: deleteNode,
            description: "",
            content: "" + type + ++eventNodeCount,
            color: "",
          },
        };
        setNodes((nds) => nds.concat(newNode));
      } else if (type == "test") {
        const newNode = {
          id: getId(),
          type: "rectangle",
          position,
          data: {
            name: type,
            deleteNode: deleteNode,
            description: "",
            content: "" + type + ++testNodeCount,
            color: "",
          },
        };
        setNodes((nds) => nds.concat(newNode));
      } else if (type == "cause") {
        const newNode = {
          id: getId(),
          type: "circle2",
          position,
          data: {
            name: type,
            deleteNode: deleteNode,
            description: "",
            content: "" + type + ++causeNodeCount,
            color: "",
          },
        };
        setNodes((nds) => nds.concat(newNode));
      } else if (type == "toolbox") {
        const toolbox = document.getElementById("toolbox");
        const lbToolbox = window.getComputedStyle(toolbox);
        const ptbX = event.dataTransfer.getData("tbX");
        const ptbY = event.dataTransfer.getData("tbY");

        const { clientX, clientY } = event;
        const tbX = lbToolbox.left.replace("px", "");
        const tbY = lbToolbox.top.replace("px", "")
        toolbox.style.left = `${Number(tbX) + (clientX - ptbX)}px`;
        toolbox.style.top = `${Number(tbY) + (clientY - ptbY)}px`;
      }
    },
    [reactFlowInstance]
  );

  const viewAll = (e) => {
    document.getElementsByClassName("react-flow__controls-button react-flow__controls-fitview")[0].click();
  };

  const deleteNode = (id) => {
    setNodes((prev) => prev.filter((item) => item.id !== id));
  };

  const clear = (e) => {
    setEdges([]);
    setNodes([]);
  };

  const getCurFlow = () => {
    if (!reactFlowInstance) {
      return;
    }
    const flow = reactFlowInstance.toObject();
    flow.currentId = id;
    flow.entityNodeCount = entityNodeCount;
    flow.eventNodeCount = eventNodeCount;
    flow.testNodeCount = testNodeCount;
    flow.causeNodeCount = causeNodeCount;
    return flow;
  }

  const onSave = (e) => {
    setSidebarType("save");
    // if (!reactFlowInstance) {
    //   return;
    // }
    // const flow = reactFlowInstance.toObject();
    // flow.currentId = id;
    // flow.entityNodeCount = entityNodeCount;
    // flow.eventNodeCount = eventNodeCount;
    // flow.testNodeCount = testNodeCount;
    // flow.causeNodeCount = causeNodeCount;

    // const downloadLink = document.createElement("a");
    // const fileBlob = new Blob([JSON.stringify(flow)], {
    //   type: "application/json",
    // });
    // let d = new Date();
    // let name =
    //   "node-flow-" +
    //   d.getFullYear() +
    //   "-" +
    //   d.getMonth() +
    //   "-" +
    //   d.getDay() +
    //   "-" +
    //   d.getHours() +
    //   "-" +
    //   d.getMinutes() +
    //   "-" +
    //   d.getSeconds() +
    //   "-" +
    //   d.getMilliseconds() +
    //   ".json";
    // downloadLink.href = URL.createObjectURL(fileBlob);
    // downloadLink.download = name;
    // downloadLink.click();
  };

  const onLoad = async (e) => {
    setSidebarType("load");
    const { data } = await axios.get("/api/iprocess");
    setIprocessList(data);
    // const reader = new FileReader();
    // reader.onload = async (e) => {
    //   const text = e.target.result;
    //   const flow = JSON.parse(text);
    //   console.log(flow);

    //   if (flow) {
    //     setNodes(flow.nodes || []);
    //     setEdges(flow.edges || []);
    //     id = flow.currentId;
    //     entityNodeCount = flow.entityNodeCount;
    //     eventNodeCount = flow.eventNodeCount;
    //     testNodeCount = flow.testNodeCount;
    //     causeNodeCount = flow.causeNodeCount;
    //   }
    // };
    // reader.readAsText(e.target.files[0]);
  };
  const loadIProcess = data => {
    const { rflow: flow } = data;
    flow.nodes.forEach(node => node.data.deleteNode = deleteNode);
    setNodes(flow.nodes || []);
    setEdges(flow.edges || []);
    id = flow.currentId;
    entityNodeCount = flow.entityNodeCount;
    eventNodeCount = flow.eventNodeCount;
    testNodeCount = flow.testNodeCount;
    causeNodeCount = flow.causeNodeCount;
    setSidebarType(null);
    setCurIprocess(data);
  }

  const saveIProcess = async (name, description) => {
    const flow = getCurFlow();
    if(curIprocess) {
      await axios.post(`/api/iprocess/${curIprocess.uuid}`, {
        name,
        rflow: flow,
        description
      })
    } else {
      await axios.post('/api/iprocess/create/', {
        name,
        rflow: flow,
        description
      })
    }
    setSidebarType(null);
  }

  const onNodeClick = (e, node) => {
    e.stopPropagation();
    console.log("nodelclick", node);
    setSidebarType(node.data.name);
    setSelectedNode(node);
  }

  const closeSidebar = () => {
    setSidebarType(null);
  }

  return (
    <div className="dndflow flex h-screen">
      <ReactFlowProvider>
        <div className="flex-grow h-100" ref={reactFlowWrapper}>
          <Toolbar viewAll={viewAll} clear={clear} onSave={onSave} onLoad={onLoad} />
          <ReactFlowStyled
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            defaultEdgeOptions={defaultEdgeOptions}
            attributionPosition="top-right"
            deleteKeyCode="Delete"
          >
            <ControlsStyled className="right-2.5 !left-auto" />
          </ReactFlowStyled>
        </div>
        {/* {isSelected && (
          <Modal
            setIsSelected={setIsSelected}
            textRef={textRef}
            nodeName={nodeName}
            setNodeName={setNodeName}
            description={description}
            setDescription={setDescription}
            content={content}
            setContent={setContent}
            color={color}
            setColor={setColor}
          />
        )} */}
        {sidebarType == "load" && <LoadSidebar data={iprocessList} onLoad={loadIProcess}/>}
        {sidebarType == "save" && <SaveSidebar name={curIprocess ? curIprocess.name : ""} description={curIprocess ? curIprocess.description : ""} onSave={saveIProcess}/>}
        {sidebarType == "event" && <EventSidebar node={selectedNode} closeSidebar={closeSidebar} />}
        {sidebarType == "test" && <TestSidebar node={selectedNode} closeSidebar={closeSidebar} />}
        {sidebarType == "cause" && <CauseSidebar node={selectedNode} closeSidebar={closeSidebar}/>}
      </ReactFlowProvider>
    </div>
  );
};

export default () => {
  const [mode, setMode] = useState("light");
  const theme = mode === "light" ? lightTheme : darkTheme;

  const toggleMode = () => {
    setMode((m) => (m === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={theme}>
      <DnDFlow toggleMode={toggleMode} />
    </ThemeProvider>
  );
};
