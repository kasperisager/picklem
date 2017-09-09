import style from './style';

function css(enabled, context = document) {
  const sheets = context.querySelectorAll('link[rel=stylesheet], style');

  for (const sheet of sheets) {
    sheet.disabled = !enabled;
  }
}

export default function dedupe(node) {
  css(false);

  const loop = node => {
    switch (node.type) {
      case 'element': {
        const initial = style(node.ref);

        node.style = node.style.filter((prop, index) =>
          initial[index].value !== prop.value
        );

        node.children = node.children.map(loop);
      } break;

      case 'document':
        node.children = node.children.map(loop);
        break;

      default:
    }

    return node;
  };

  const deduped = loop(node);

  css(true);

  return deduped;
}
