import TreeNode from "./TreeNode";

const FileExplorer = ({ data, onSelect, search, selectedFile}) => {
  return (
    <div style={{ padding: "10px" }}>
      {data.map((node) => (<TreeNode key={node.id} node={node} onSelect={onSelect} search={search} selectedFile={selectedFile}/>))}
    </div>
  );
};

export default FileExplorer;