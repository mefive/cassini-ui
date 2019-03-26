export function getRealDom(el: any): HTMLElement {
  if (el instanceof HTMLElement) {
    return el;
  } if (el && (el.node instanceof HTMLElement)) {
    return el.node;
  } if (el && (el.container instanceof HTMLElement)) {
    return el.container;
  }
  return null;
}

export default getRealDom;
