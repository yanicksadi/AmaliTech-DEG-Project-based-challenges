const PropertiesPanel = ({ file }) => {
  if (!file) {
    return <div style={{ padding: "20px" }}> Select a file</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>{file.name}</h2>
      <p>Type: {file.type}</p>
      <p>Size: {file.size || "N/A"}</p>
    </div>
  );
};

export default PropertiesPanel;