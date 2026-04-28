import { useState, useEffect } from "react";
import openFolderIcon from "../assets/icons/open-folder.png";
import fileIcon from "../assets/icons/document.png";
import folderIcon from "../assets/icons/folder.png";


const TreeNode = ({ 
  node, 
  onSelect, 
  level = 0, 
  search, 
  selectedFile,
  expandedNodes = {},
  setExpandedNodes,
  flatList = [],
  focusedIndex, 
}) => {
  const isFolder = node.type === "folder";
  const isOpen = expandedNodes[node.id];
  const isFocused = flatList[focusedIndex]?.id === node.id;
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
  }, [search]);

  const handleClick = () => {
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
    node.name = name;
    setIsEditing(false);
  }

return ( 
  <div style={{ marginLeft: level * 16 }}>
    <div 
    onClick={handleClick} 
      style={{
        cursor: "pointer", 
        padding: "10px", 
        borderRadius: "10px", 
        background: isSelected ? "#3B82F6" : isFocused ? "#475c7e" : "transparent", 
        display : "flex", 
        alignItems: "center"
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
          style={{background: "#111827",
            color: "#fff",
            border: "1px solid #374151",
            borderRadius: "4px",
            padding: "2px 6px",
          }}
        />
     ) : (
        <span onDoubleClick={() => setIsEditing(true)}>
          {isFolder ? (isOpen ? openFolderIcon : folderIcon) : fileIcon} {node.name}
        </span>
     )};
    </div>
    {isFolder && 
    isOpen && 
    node.children?.map((child) => (
    <TreeNode 
    key={child.id} 
    node={child} 
    onSelect={onSelect} 
    level={level + 1} 
    search={search} 
    selectedFile={selectedFile}
    expandedNodes={expandedNodes}
    setExpandedNodes={setExpandedNodes}
    flatList={flatList}
    focusedIndex={focusedIndex}
    />
    ))}
  </div>
  );  
};

export default TreeNode;