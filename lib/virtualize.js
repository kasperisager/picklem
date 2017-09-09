import style from './style';

const serializer = new XMLSerializer();

function serialize(node) {
  return serializer.serializeToString(node);
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
