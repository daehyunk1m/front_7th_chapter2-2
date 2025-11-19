import { addEvent, removeEvent } from "./eventManager";
import { createElement } from "./createElement.js";

function updateAttributes(target, originNewProps, originOldProps) {
  Object.entries(originNewProps).forEach(([key, value]) => {
    if (key.startsWith("on") && typeof value === "function") {
      addEvent(target, key.slice(2).toLowerCase(), value);
    } else if (key === "className") {
      target.className = value;
    } else if (key === "style") {
      target.style.cssText = Object.entries(value)
        .map(([key, value]) => `${key}: ${value}`)
        .join(";");
    } else {
      target.setAttribute(key, value);
    }
  });
}

export function updateElement(parentElement, newNode, oldNode, index = 0) {
  console.log("updateElement", parentElement, newNode, oldNode, index);
  if (oldNode == null) {
    return parentElement.appendChild(createElement(newNode));
  }

  if (newNode == null) {
    return parentElement.removeChild(oldNode);
  }

  if (typeof newNode === "string" || typeof newNode === "number") {
    if (typeof oldNode === "string" || typeof oldNode === "number") {
      if (newNode !== oldNode) {
        oldNode.textContent = newNode;
      }
    }
  }

  if (typeof newNode === "object" && typeof oldNode === "object") {
    if (newNode.type === oldNode.type) {
      updateAttributes(oldNode, newNode.props, oldNode.props);
    }
  }
}
