import { useState, useEffect } from "react";
import openFolderIcon from "../assets/icons/open-folder.png";
import fileIcon from "../assets/icons/documents.png";
import folderIcon from "../assets/icons/folder.png";


const TreeNode = ({ node, onSelect, level = 0, search, selectedFile }) => {
  const [isOpen, setIsOpen] = useState(false);

  const isFolder = node.type === "folder";
  const isSelected = selectedFile?.id === node.id;

  useEffect(() => {
    if (search) {
      setIsOpen(true);
    }
  }, [search]);

  const handleClick = () => {
    if (isFolder) {
      setIsOpen(!isOpen);
    } else {
      console.log("selected:", node)
      onSelect(node);
    }
  };

return ( 
  <div style={{ marginLeft: level * 16 }}>
    <div onClick={handleClick} style={{cursor: "pointer", padding: "10px", borderRadius: "10px", background: isSelected ? "#3B82F6" : "transparent", display : "flex", alignItems: "center"}}> 
      <img src={isFolder ? isOpen ? openFolderIcon : folderIcon : fileIcon} alt="icon" style={{width: "15px", marginRight: "10px"}}/>{node.name}
    </div>
    {isFolder && isOpen && node.children?.map((child) => (<TreeNode key={child.id} node={child} onSelect={onSelect} level={level + 1} search={search} selectedFile={selectedFile}/>))}
  </div>
  );  
};

export default TreeNode;