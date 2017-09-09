export default function clean(node) {
  delete node.ref;

  switch (node.type) {
    case 'element':
    case 'document':
      node.children = node.children.map(clean);
      break;
    default:
  }

  return node;
}
