const componentProps = {};
let id = 0;

const updateDOM = (val, elem) => {
  val.parentNode.replaceChild(elem, val);
};

const mutationObserver = (parentComponent, key) => {
  let val = parentComponent[key];

  Object.defineProperty(parentComponent, key, {
    get() {
      return val;
    },
    set(newVal) {
      if (newVal instanceof Node) {
        const elem = newVal;
        updateDOM(val, elem);
        componentProps[parentComponent.name][key] = elem;
        val = elem;
      } else {
        const elem = document.createTextNode(newVal);
        updateDOM(val, elem);
        componentProps[parentComponent.name][key] = elem;
        val = elem;
      }
    }
  });
};
const propMutationObserver = (parentProp, key) => {
  let val = parentProp[key];

  Object.defineProperty(parentProp, key, {
    get() {
      return val;
    },
    set(newVal) {
      parentProp.childComponents.forEach(child => {
        child[key] = newVal;
        if (typeof child.useProp === "object") {
          child.useProp[key](newVal);
        }
      });
      val = newVal;
    }
  });
};

const getMutableChildType = child => {
  if (child instanceof Node) {
    return child;
  } else {
    return document.createTextNode(child);
  }
};

const getChildType = (child, parentComponent) => {
  switch (typeof child) {
    case "object":
      if (child instanceof Node) {
        return child;
      } else {
        const key = Object.keys(child)[0];
        const mutableChild = getMutableChildType(child[key]);
        componentProps[parentComponent.name] = {
          ...componentProps[parentComponent.name],
          [key]: mutableChild
        };
        parentComponent[key] = mutableChild;
        mutationObserver(parentComponent, key);
        return mutableChild;
      }

    default:
      return child;
  }
};

export const useStyle = {};
const styleMutationObserver = (obj, key, el, elem, children, component) => {
  let val = obj[key];

  Object.defineProperty(obj, key, {
    get() {
      return val;
    },
    set(newVal) {
      if (typeof newVal === "string") {
        if (val[1]) {
          const newElement = val[1];
          newElement.setAttribute("class", newVal);
          newElement.removeAttribute("style");
        } else {
          el.setAttribute("class", newVal);
          el.removeAttribute("style");
        }
      } else {
        const newElement = document.createElement(elem);
        const styles = newVal;

        for (const styleKey in styles) {
          newElement.style[styleKey] = styles[styleKey];
        }

        children.forEach(child => {
          let newChild;

          if (typeof child === "object" && !(child instanceof Node)) {
            newChild = componentProps[component.name][Object.keys(child)[0]];
          } else {
            newChild = child;
          }
          newElement.append(newChild);
        });

        val[1].parentNode.replaceChild(newElement, val[1]);

        val = [newVal, newElement, elem];
        return;
      }
    }
  });
};

class CloneComponent {
  constructor(props) {
    this.name = id;
    if (props) {
      props.childComponents.push(this);
    }
    this.useProp = obj => {
      this.useProp = { ...obj };
    };
    id++;
  }

  create(elem, attributes, ...children) {
    const el = document.createElement(elem);

    Object.keys(attributes).forEach(attr => {
      if (attr.charAt(0) === "_") {
        const style = attributes[attr];
        useStyle[attr] = [style, el, elem];
        if (typeof style === "string") {
          el.className = style;
        } else {
          for (const styleKey in style) {
            el.style[styleKey] = style[styleKey];
          }
        }
        styleMutationObserver(useStyle, attr, el, elem, children, this);
      } else {
        el.setAttribute(attr, attributes[attr]);
      }
    });

    children.forEach(child => {
      el.append(getChildType(child, this));
    });

    return el;
  }

  markup(callback) {
    this.main = callback(this);
    return this;
  }

  mounted(callback) {
    callback && callback(this);
    return this.main;
  }
}
export const useProp = obj => {
  obj.childComponents = [];
  for (const key in obj) {
    propMutationObserver(obj, key);
  }
  return obj;
};
export default CloneComponent;
