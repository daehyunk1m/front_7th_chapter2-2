import { addEvent } from "./eventManager";

export function createElement(vNode) {
  if (typeof vNode === "string") return document.createTextNode(vNode);
  if (typeof vNode === "number") return document.createTextNode(String(vNode));
  if (typeof vNode === "boolean") return document.createTextNode("");
  if (typeof vNode === "undefined") return document.createTextNode("");

  if (typeof vNode === "object") {
    if (vNode === null) return document.createTextNode("");

    if (Array.isArray(vNode)) {
      const fragment = document.createDocumentFragment();
      vNode.forEach((child) => {
        fragment.appendChild(createElement(child));
      });
      return fragment;
    }

    if (typeof vNode.type === "function")
      throw new Error("컴포넌트는 createElement로 처리할 수 없다.");

    const $el = document.createElement(vNode.type);

    updateAttributes($el, vNode.props);

    vNode.children.forEach((child) => {
      $el.appendChild(createElement(child));
    });

    return $el;
  }
}

function updateAttributes($el, props) {
  if (!props) return;
  Object.entries(props).forEach(([key, value]) => {
    if (key === "className") {
      $el.className = value.split(" ").join(" ");
    } else {
      $el.setAttribute(key, value);
    }
    if (key === "style") {
      $el.style.cssText = Object.entries(value)
        .map(([key, value]) => `${key}: ${value}`)
        .join(";");
    }
  });
}
