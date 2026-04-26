export const filterTree = (nodes, search) => {
  if (!search)  return nodes;

  const lowerSearch = search.toLowerCase();

  return nodes.map((node) => {
    if (node.type === "file") {
      if (node.name.toLowerCase().includes(lowerSearch)){
        return node;
      }
      return null;
    }

      // on the folders
    const filteredChildren = filterTree(node.children || [],search);

    if (node.name.toLowerCase().includes(lowerSearch) || filteredChildren.length > 0){
      return {
        ...node, children: filteredChildren,
      };
    }

    return null;
  })
  .filter(Boolean);
};