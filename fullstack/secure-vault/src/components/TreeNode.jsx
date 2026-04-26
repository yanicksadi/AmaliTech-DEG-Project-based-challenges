import { useState, useEffect } from "react";

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
      onSelect(node);
    }
  };

return ( 
  <div style={{ marginLeft: level * 16 }}>
    <div onClick={handleClick} style={{cursor: "pointer", padding: "10px", borderRadius: "10px", background: isSelected ? "#3B82F6" : "transparent"}}> 
      {isFolder ? (isOpen ? "📁" : "📁") : "📄"}{node.name}
    </div>
    {isFolder && isOpen && node.children?.map((child) => (<TreeNode key={child.id} node={child} onselect={onSelect} level={level + 1} search={search} selectedFile={selectedFile}/>))}
  </div>
  );  
};

export default TreeNode;