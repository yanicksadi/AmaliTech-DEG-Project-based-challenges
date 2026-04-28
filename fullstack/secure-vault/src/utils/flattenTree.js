export const flattenTree = (nodes, expandedNodes, level = 0) => {
  let result = [];

  nodes.forEach((node) => {
    result.push({...node, level });

    if (node.type === "folder" && expandedNodes[node.id]){
      result = result.concat(flattenTree(node.children || [], expandedNodes, level + 1));
    }
  });

  return result;
};