window.dom = {
  create(string) {
    const div = document.createElement("template");
    div.innerHTML = string.trim();
    return div.content.firstChild;
  }, //创建一个节点
  after(node, newNode) {
    node.parentNode.insertBefore(newNode, node.nextSibling);
  }, //在节点之前增加一个同级节点
  before(node, newNode) {
    node.parentNode.insertBefore(newNode, node);
  }, //在节点之后增加一个同级节点
  append(parent, child) {
    parent.appendChild(child);
  }, //在节点之前增加一个父级节点
  wrap(node, newParent) {
    node.before(node, newParent);
    node.append(newParent, node);
  },
  remove(node) {
    node.parentNode.removeChild(node);
    return node; //将node返回方便以后调用
  },
  empty(node) {
    const arr = [];
    let x = node.firstChild;
    while (x) {
      //不能使用for循环是因为for循环需要以子代长度为条件，但是循环时长度是实时改变的。
      arr.push(dom.remove(x));
      x = node.firstChild;
    }
    return arr;
  },
  attr(node, name, value) {
    //读、改、增某属性
    if (arguments.length === 3) {
      //改或增
      node.setAttribute(name, value);
    } else if (arguments.length === 2) {
      //读属性
      return node.getAttribute(name);
    }
  },
  text(node, string) {
    if (arguments.length === 2) {
      if ("innerText" in node) {
        node.innerText = string;
      } else {
        node.textContent = string;
      }
    } else if (arguments.length === 1) {
      if ("innerText" in node) {
        return node.innerText;
      } else {
        return node.textContent;
      }
    }
  },
  html(node, string) {
    if (arguments.length === 2) {
      node.innerHTML = string;
    } else if (arguments.length === 1) {
      return node.innerHTMl;
    }
  },
  style(node, name, value) {
    if (arguments.length === 3) {
      //如果dom.style(div,'color','red')
      node.style[name] = value;
    } else if (arguments.length === 2) {
      if (typeof name === "string") {
        //如果dom.style(div,'color')读某一属性
        return node.style[name];
      } else if (name instanceof Object) {
        //确定name是不是为字符串
        for (let key in name) {
          //正常是dom.style.border = '1px solid red'
          //因为现在不知道样式名，所以要先遍历name中的样式名
          //并将每个样式名赋值到标签上
          node.style[key] = name[key];
        }
      }
    }
  },
  class: {
    add(node, name) {
      node.classList.add(name);
    },
    remove(node, name) {
      node.classList.remove(name);
    },
    has(node, name) {
      node.classList.contains(name);
    },
  },
  on(node, event, fn) {
    node.addEventListener(event, fn);
    //在某个节点上添加事件，并接受事件函数
  },
  off(node, event, fn) {
    node.removeEventListener(event, fn);
    //注意第二个参数要将函数先声明在引用，直接将函数写在第二个参数内无效。
  },
  find(selector, scope) {
    //选择器名称，搜索范围
    return (scope || document).querySelectorAll(selector);
    //只有一个参数是则全局找，两个参数是划定范围找
    //返回所有选择器相同的标签
  },
  parent(node) {
    return node.parentNode;
  },
  children(node) {
    return node.children;
  },
  sibling(node) {
    return Array.from(node.parentNode.children).filter((n) => n != node);
  },
  next(node) {
    //不能直接返回node.nextSibling，因为返回的可能为文本节点
    let x = node.nextSibling;
    while (x && x.nodeType === 3) {
      //判断如果x存在且x类型为文本
      x = x.nextSibling;
      //条件成立就将循环判断再下一个类型并赋值。
    }
    return x;
    //得到节点并返回
  },
  previous(node) {
    //不能直接返回node.nextSibling，因为返回的可能为文本节点
    let x = node.previousSibling;
    while (x && x.nodeType === 3) {
      //判断如果x存在且x类型为文本
      x = x.previousSibling;
      //条件成立就将循环判断再下一个类型并赋值。
    }
    return x;
    //得到节点并返回
  },
  each(nodeList, fn) {
    //遍历所有相同的节点并调用一个函数操作这些节点
    for (let i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i]);
    }
  },
  index(node) {
    let list = dom.children(node.parentNode);
    let i; //因为要在for循环外返还i，所以不能再for循环条件内定义i。
    for (i = 0; i < list.length; i++) {
      if (list[i] === node) {
        //如果相同跳出循环
        break;
      }
    }
    return i;
  },
};
