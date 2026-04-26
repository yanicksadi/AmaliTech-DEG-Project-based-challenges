const SearchBar = ({ OnSearch }) => {
  return (
    <input type="text" placeholder="search files ..." onChange={(e) => onSearch(e.target.value)} style={{ width: "100%", padding: "10px", background: "#111827", color: "#fff", border: "1px solid #374151", borderRadius: "6px" }}
    />
  );
};
export default SearchBar;