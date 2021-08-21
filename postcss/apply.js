const mixins = {}; // Uglily scope hack for cross component mixins

function apply(opts = {}) {
  const unresolved = {};

  function resolve(parent, nodes) {
    for (const node of nodes) parent.prepend(node.clone());
  }

  return {
    postcssPlugin: "apply",
    AtRule: {
      mixin: atRule => {
        const name = atRule.params;
        mixins[name] = atRule.nodes;
        if (unresolved[name] !== undefined) {
          for (const parent of unresolved[name]) resolve(parent, atRule.nodes);
          unresolved[name] = undefined;
        }

        atRule.remove();
      },
      apply: atRule => {
        const names = atRule.params.split(",").map(s => s.trim());
        for (const name of names) {
          const nodes = mixins[name];
          if (nodes !== undefined) {
            resolve(atRule.parent, nodes);
          } else {
            if (unresolved[name] === undefined) unresolved[name] = [];
            unresolved[name].push(atRule.parent);
          }
        }

        atRule.remove();
      }
    }
  };
}
apply.postcss = true;

export default apply;
