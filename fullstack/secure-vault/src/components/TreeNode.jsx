import { useState, useEffect } from "react";
import openFolderIcon from "../assets/icons/open-folder.png";
import fileIcon from "../assets/icons/documents.png";
import folderIcon from "../assets/icons/folder.png";


const TreeNode = ({ 
  node, 
  onSelect, 
  level = 0, 
  search, 
  selectedFile,
  expandedNodes = {},
  setExpandedNodes,
  focusedId,
  setFocusedId,
}) => {
  const isFolder = node.type === "folder";
  const isOpen = expandedNodes[node.id];
  const isFocused = focusedId === node.id;
  const isSelected = selectedFile?.id === node.id;

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(node.name)
  

  useEffect(() => {
    if (search && isFolder) {
      setExpandedNodes((prev) => ({
        ...prev,
        [node.id]: true,
      }));
    }
  }, [search, isFolder, node.id, setExpandedNodes]);

  const handleClick = () => {
    setFocusedId(node.id);
    
    if (isFolder) {
      setExpandedNodes((prev) => ({
        ...prev,
        [node.id]: !prev[node.id],
      }));
    } else {
      onSelect(node);
    }
  };

  const handleRename = () => {

    const trimmedName = name.trim();
    if (trimmedName === "") {
      setName(node.name)
    } else {
      node.name = trimmedName;
      setName(trimmedName);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleRename();
    }
    if (e.key === "Escape"){
      setName(node.name);
      setIsEditing(false)
    }
  };

return ( 
  <div style={{ marginLeft: level * 16 }}>
    <div 
    onClick={handleClick} 
      style={{
        cursor: "pointer", 
        padding: "6px 8px", 
        gap: "10px",
        borderRadius: "7px", 
        background: isSelected ? "#3B82F6" : isFocused ? "#475c7e" : "transparent", 
        display : "flex", 
        alignItems: "center",
        fontSize: "17px",
        height: "36px",
      }}
    > 
     {isEditing ? (
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={handleRename}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleRename();
          }}
          autoFocus
          style={{
            flex: 1,
            background: "#111827",
            color: "#fff",
            border: "1px solid #374151",
            borderRadius: "8px",
            padding: "2px 6px",
          }}
        />
     ) : (
        <>

          <img src={isFolder ? (isOpen ? openFolderIcon : folderIcon) : fileIcon}
          alt="icon"
          style={{
            width: "20px",
            height: "20px",
            minWidth: "20px",
            objectFit: "contain",
          }}
          />
          <span 
          onDoubleClick={() => setIsEditing(true)}
          style={{
            flex: 1,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}  
          >
            {node.name}
          </span>

        </>
     )}
    </div>
    {isFolder && isOpen && node.children?.map((child) => (
    <TreeNode 
    key={child.id} 
    node={child} 
    onSelect={onSelect} 
    level={level + 1} 
    search={search} 
    selectedFile={selectedFile}
    expandedNodes={expandedNodes}
    setExpandedNodes={setExpandedNodes}
    focusedId={focusedId}
    setFocusedId={setFocusedId}
    />
    ))}
  </div>
  );  
};

export default TreeNode;