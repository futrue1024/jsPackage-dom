const div = dom.create("<div><strong>2222</strong></div>");
const span = dom.create("<span>1234</span>");
console.log(div);
const div1 = dom.append(text, span);
console.log(div1);

dom.attr(text, "title", "xxxx");
console.log(dom.text(chen));
dom.style(text, { color: "red", border: "1px solid red" });

const fn = (n) => {
  dom.style(empty, "color", "red");
};
dom.on(empty, "click", fn);
dom.off(empty, "click", fn); //注意第二个参数要将函数先声明在引用
const textDiv = dom.find("#x")[0];
console.log(textDiv);
console.log(dom.parent(x));

const t = dom.find("#travel")[0];
dom.each(dom.children(t), (n) => {
  dom.style(n, "color", "red");
});

console.log(dom.index(t2));
