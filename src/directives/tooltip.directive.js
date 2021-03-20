export default {
  bind(element, { value }) {
    window.M.Tooltip.init(element, { html: value });
  },
  unbind(element) {
    const tooltip = window.M.Tooltip.getInstance(element);
    if (tooltip && tooltip.destroy) tooltip.destroy();
  }
};
