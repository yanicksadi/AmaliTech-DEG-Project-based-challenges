export const SearchBar = ({ onSearch }) => {
  return (
    <input 
      type="text" 
      placeholder="search files ..." 
      onChange={(e) => onSearch(e.target.value)} style={{ 
        width: "95%", 
        padding: "10px", 
        background: "#000000", 
        color: "#fff", 
        border: "1px solid #374151", 
        borderRadius: "12px" 
      }}
    />
  );
};
