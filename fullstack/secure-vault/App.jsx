import { useState } from "react";
import data from "./data.json";
import FileExplorer from "./src/components/FileExplorer.jsx";
import PropertiesPanel from "./src/components/PropertiesPanel.jsx";
import SearchBar from "./src/components/SearchBar.jsx"
import { filterTree } from "./src/utils/filterTree.js"


function App(){
  const [selectedFile, setSelectedFile] = useState(null);
  const [search, setSearch] = useState("");
  
  const filteredData = filterTree(data, search);

  return (
      <div style={{ background: "#0b1631", color: "#fff", minHeight: "100vh" }}>
      
      {/* search  */}
      <div style={{ padding: "10px" }}>
        <SearchBar OnSearch={setSearch} />
      </div>
      
      {/* the main layout */}
      <div style={{ display: "flex", height: "90%" }}>

        {/* the side Bar */}
        <div style={{width: "60%", borderRight: "1px solid #292d33" }}>

          <FileExplorer data={filteredData} onSelect={setSelectedFile} search={search} selectedFile={selectedFile}/>
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