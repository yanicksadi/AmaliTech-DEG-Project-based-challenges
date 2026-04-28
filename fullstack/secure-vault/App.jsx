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
  const [focusedIndex, setFocusedIndex] = useState(0);
  const filteredData = filterTree(data, search);
  const flatList = flattenTree(filteredData, expandedNodes);

  useEffect(() => {
    if (!search) {
      setExpandedNodes({});
    } 
    setFocusedIndex(0);
  }, [search]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if(!flatList.length) return;

      if (e.key === "ArrowDown") {
        setFocusedIndex((prev) => Math.min(prev + 1, flatList.length - 1));
      }

      if (e.key === "ArrowUp") {
        setFocusedIndex((prev) => Math.max(prev - 1, 0));
      }

      // if (e.key === "Enter") {
      //   const node = flatList[focusedIndex];
      //   if (node.type === "file") {
      //     setSelectedFile(node);
      //   }
      // }

      if (e.key === "ArrowRight" || e.key === "Enter"){
        const node = flatList[focusedIndex];
        if (node.type === "folder"){
          setExpandedNodes((prev) => ({
            ...prev, [node.id]: true,
          }));
        } 

      if (node.type === "file"){
        setSelectedFile(node);
      }
      }

      if (e.key === "ArrowLeft") {
        const node = flatList[focusedIndex];
        if (node.type === "folder") {
          setExpandedNodes((prev) => ({
            ...prev, [node.id]: false,
          }));
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [flatList, focusedIndex]);

  return (
      <div style={{ background: "#0b1631", color: "#fff", minHeight: "100vh" }}>
      
      {/* search  */}
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
          flatList={flatList}
          focusedIndex={focusedIndex}

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