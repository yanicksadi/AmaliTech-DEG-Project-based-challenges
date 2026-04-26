import { useState, useEffect } from "react";

const TreeNode = ({ node, onSelect, level = 0, search }) => {
  const [isOpen, setIsOpen] = useState(false);

  const isFolder = node.type === "folder";

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
    <div onClick={handleClick} style={{cursor: "pointer", padding: "6px", borderRadius: "4px" }}> 
      {isFolder ? (isOpen ? "folder" : "folder") : "file"}{node.name}
    </div>
    {isFolder && isOpen && node.children?.map((child) => (<TreeNode key={child.id} node={child} onselect={onSelect} level={level + 1} search={search}/>))}
  </div>
  );  
};

export default TreeNode;