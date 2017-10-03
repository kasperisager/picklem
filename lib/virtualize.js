import style from './style';

function serialize(node) {
  switch (node.nodeType) {
    // https://w3c.github.io/DOM-Parsing/#dfn-xml-serializing-a-text-node
    case node.TEXT_NODE:
      return node.data
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    // https://w3c.github.io/DOM-Parsing/#xml-serializing-a-comment-node
    case node.COMMENT_NODE:
      return `<!--${node.data}-->`;
    // https://w3c.github.io/DOM-Parsing/#xml-serializing-a-documenttype-node
    case node.DOCUMENT_TYPE_NODE:
      return `<!DOCTYPE ${node.name}` +
        (node.publicId ? ` PUBLIC "${node.publicId}"` : node.systemId ? ' SYSTEM' : '') +
        (node.systemId ? ` "${node.systemId}"` : '') +
        '>';
    default:
      return node.outerHTML;
  }
}

function attributes(element) {
  return [...element.attributes].map(attr => ({
    name: attr.name,
    value: attr.value
  }));
}

export default function virtualize(node) {
  switch (node.nodeType) {
    case node.ELEMENT_NODE:
      return {
        type: 'element',
        ref: node,
        tag: node.tagName.toLowerCase(),
        attributes: attributes(node),
        style: style(node),
        children: [...node.childNodes].map(virtualize)
      };

    case node.TEXT_NODE:
      return {
        type: 'text',
        ref: node,
        value: serialize(node)
      };

    case node.COMMENT_NODE:
      return {
        type: 'comment',
        ref: node,
        value: serialize(node)
      };

    case node.DOCUMENT_NODE:
      return {
        type: 'document',
        ref: node,
        children: [...node.childNodes].map(virtualize)
      };

    case node.DOCUMENT_TYPE_NODE:
      return {
        type: 'type',
        ref: node,
        value: serialize(node)
      };

    default:
      throw new Error('Unknown node');
  }
}
