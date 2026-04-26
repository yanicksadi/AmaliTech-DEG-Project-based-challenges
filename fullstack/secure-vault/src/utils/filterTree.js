export const filterTree = (nodes, search) => {
  if (!search)  return nodes;

  return nodes.map((node) => {
    if (node.type === "file") {
      if (node.name.toLowerCase().includes(search.toLowerCase())){
        return node;
      }
      return null;
    }

    const filteredChildren = filterTree(node.children || [],search);

    if (node.name.toLowerCase().includes(search.toLowerCase()) || filteredChildren.length > 0){
      return {
        ...node, children: filteredChildren,
      };
    }

    return null;
  })
  .filter(Boolean);
};