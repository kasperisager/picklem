export default function render(node) {
  switch (node.type) {
    case 'element': {
      const children = node.children.map(render).join('');
      const attributes = [...node.attributes].map(attr => `${attr.name}="${attr.value}"`).join(' ');
      return `<${node.tag}${attributes.length ? ' ' + attributes : ''}>${children}</${node.tag}>`;
    }

    case 'text':
      return node.value;

    case 'comment':
      return node.value;

    case 'document':
      return node.children.map(render).join('');

    case 'type':
      return node.value;

    default:
      return '';
  }
}
