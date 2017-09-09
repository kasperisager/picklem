export default function style(element, context = window) {
  const computed = context.getComputedStyle(element);
  const {length} = computed;
  const properties = new Array(length);

  for (let i = 0, n = length; i < n; i++) {
    const name = computed[i];

    properties[i] = {
      name,
      value: computed[name]
    };
  }

  return properties;
}
