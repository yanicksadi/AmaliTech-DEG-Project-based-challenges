import { useState } from "react";

const TreeNode = ({ node, onSelect, level = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);

  const isFolder = node.type === "folder";

  const handleClick = () => {
    if (isFolder) {
      setIsOpen(!isOpen);
    } else {
      onSelect(node);
    }
  };

return ( 
  <div style={{ marginLeft: level * 16 }}>
    <div onClick={handleClick} style={{cursor: "pointer", padding: "6px", borderRadius: "4px" }}> 
      {isFolder ? (isOpen ? "folder" : "folder") : "file"}{node.name}
    </div>
    {isFolder && isOpen && node.children?.map((child) => (<TreeNode key={child.id} node={child} onselect={onSelect} level={level + 1}/>))}
  </div>
  );  
};

export default TreeNode;