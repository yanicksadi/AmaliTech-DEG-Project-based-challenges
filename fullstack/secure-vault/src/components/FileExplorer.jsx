import TreeNode from "./TreeNode.jsx";

const FileExplorer = ({ 
  data, 
  onSelect, 
  search, 
  selectedFile, 
  expandedNodes, 
  setExpandedNodes, 
  focusedId,
  setFocusedId,
}) => {
  if (!data || data.length === 0) {
    return (
      <div style={{ padding: "10px", color: "#9CA3AF" }}>
        No results Found
      </div>
    );
  }
  return (
  <div style={{ padding: "10px" }}>
      {data.map((node) => (
        <TreeNode 
        key={node.id} 
        node={node} 
        onSelect={onSelect} 
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

export default FileExplorer;