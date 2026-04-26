import { usestate } from "react";
import data from "./data/data.json";
import FileExplorer from "./components/FileExplorer.jsx";
import PropertiesPanel from "./components/PropertiesPanel.jsx";
import SearchBar from "./components/SearchBar.jsx"

function App(){
  const [selectedFile, setSelectedFile] = useState(null);
  const [search, setSearch] = useState("");

  return (
      <div style={{ background: "#0B0F19", color: "#fff", height: "100vh" }}>
      
      {/* search  */}
      <div style={{ padding: "10px" }}>
        <searchBar onSearch={setSearch} />
      </div>
      
      {/* the main layout */}
      <div style={{ display: "flex", height: "90%" }}>
        {/* the side Bar */}
        <div style={{width: "40%", borderRight: "1px solid #374151" }}>
          <fileExplorer data={data} onSelect={setSelectedFile} />
        </div>
        {/* {The details Side} */}
        <div style={{ width: "60%" }}>
          <propertiesPanel file={selectedFile}/>
        </div>
      </div>
     </div>

    
  );
}

export default App;