import { useState,useEffect } from "react";
import data from "./data.json";
import FileExplorer from "./src/components/FileExplorer.jsx";
import PropertiesPanel from "./src/components/PropertiesPanel.jsx";
import SearchBar from "./src/components/SearchBar.jsx"
import { filterTree }  from "./src/utils/filterTree.js"
import { flattenTree }  from "./src/utils/flattenTree.js";



function App(){
  const [selectedFile, setSelectedFile] = useState(null);
  const [search, setSearch] = useState("");
  
  const [expandedNodes, setExpandedNodes] = useState({});
  const [focusedId, setFocusedId] = useState(null);
  const filteredData = filterTree(data, search);
  const flatList = flattenTree(filteredData, expandedNodes);
  

  useEffect(() => {
    if (!search) {
      setExpandedNodes({});
    } 
    setFocusedId(null);
  }, [search]);

useEffect(() => {
  const handleKeyDown = (e) => {
    if (!flatList.length) return;

    let currentIndex = flatList.findIndex(item => item.id === focusedId);

    if (currentIndex === -1 && flatList.length > 0) {
      setFocusedId(flatList[0].id);
      return;
    }

    const node = flatList[currentIndex];
    if (!node) {
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = Math.min(currentIndex + 1, flatList.length - 1);
      setFocusedId(flatList[nextIndex].id);
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevIndex = Math.max(currentIndex - 1, 0);
      setFocusedId(flatList[prevIndex].id);
    }


    if (e.key === "ArrowRight" || e.key === "Enter") {
      if (node.type === "folder") {
        setExpandedNodes(prev => ({
          ...prev,
          [node.id]: true,
        }));
      } else if (node.type === "file"){
        setSelectedFile(node);
      }
    }

    if (e.key === "ArrowLeft") {
      if (node.type === "folder") {
        setExpandedNodes(prev => ({
          ...prev,
          [node.id]: false,
        }));
      }
    }
  };

  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, [flatList, focusedId]);

  return (
      <div style={{ background: "#0B0F19", color: "#fff", minHeight: "100vh" }}>
      
      {/* searching space */}
      <div style={{ padding: "10px" }}>
        <SearchBar OnSearch={setSearch} />
      </div>
      
      {/* the main layout */}
      <div style={{ display: "flex", height: "90%" }}>

        {/* the side Bar */}
        <div style={{width: "100%", borderRight: "1px solid #292d33" }}>

          <FileExplorer 
          data={filteredData} 
          onSelect={setSelectedFile} 
          search={search} 
          selectedFile={selectedFile}
          expandedNodes = {expandedNodes}
          setExpandedNodes={setExpandedNodes}
          focusedId={focusedId}
          setFocusedId={setFocusedId}
          />
        </div>

        {/* {The details or the properties panel} */}
        <div style={{ width: "80%" }}>
          <PropertiesPanel file={selectedFile}/>
        </div>
      </div>
     </div>

    
  );
}

export default App;