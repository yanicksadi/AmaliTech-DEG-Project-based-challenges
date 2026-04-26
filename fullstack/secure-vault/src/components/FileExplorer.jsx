import TreeNode from "./TreeNode";

const FileExplorer = ({ data, onSelect }) => {
  return (
    <div style={{ padding: "10px" }}>
      {data.map((node) => (<TreeNode key={node.id} node={node} onSelect={onSelect} />))}
    </div>
  );
};

export default FileExplorer;