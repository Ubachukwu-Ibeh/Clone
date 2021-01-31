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

const getMutableChildType = child =>
  child instanceof Node ? child : document.createTextNode(child);

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

class CloneComponent {
  constructor() {
    this.name = id;
    componentProps[this.name] = this;
    id++;
  }

  create(elem, attributes, ...children) {
    const el = document.createElement(elem);

    Object.keys(attributes).forEach(attr => {
      el.setAttribute(attr, attributes[attr]);
    });

    children.forEach(child => {
      el.append(getChildType(child, this));
    });

    return el;
  }

  markUp(callback) {
    this.JSX = callback(this);
    return this;
  }

  mounted(callback) {
    callback && callback(this);
    return this.JSX;
  }
}
export default CloneComponent;
