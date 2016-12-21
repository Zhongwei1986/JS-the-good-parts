# Demos for 《Javascript:the Good Parts》
## 目录

- [Chapter4 Function](#chapter4-function)
	- [walk_the_DOM](#walk_the_dom)
	- [fade](#fade)

## Chapeter4 Function
### walk_the_DOM
```javascript
//定义 walk_the_DOM 函数，它从某个指定的节点开始，按HTML源码中的顺序访问该树的某个节点。
//它会调用一个函数，并依次传递每个节点给它。walk_the_DOM 调用自身去处理每个节点

var walk_the_DOM = function walk(node, func) {
	func(node);
	node = node.firstChild;
	while (node) {
		walk(node, func);
		node = node.nextSibling;
	}
};

// 定义 getElementByAttribute 函数。它以一个属性名称字符串和一个可选的匹配值作为参数。
// 它调用 walk_the_DOM，传递一个用来查找节点属性名的函数作为参数.匹配的节点会累加到一个结果数组中。

var getElementByAttribute = function (att, value) {
	var results = [];
	
	walk_the_DOM(document.body, function (node) {
		var actual = node.nodeType === 1 && node.getAttribute(att);  //&&短路操作，保证只有元素节点才会进行查找
		if (typeof actual === 'string' &&
				(actual === value || typeof value !== 'string')){
			results.push(node);
		}
	});
	return results;
}
```
### fade
```javascript
//定义一个函数，它设置一个DOM节点为黄色，然后把它渐变为白色。

var fade = function (node) {
	var level = 1;
	var step = function () {
		var hex = level.toString(16);	//转换成十六进制数
		node.style.backgroudColor = '#FFFF' + hex + hex;
		if(level < 15) {  // hex 不大于 F
			level += 1;
			setTimeout(step, 100);
		}
	};
	setTimeout(step, 100);    //在fade函数结束后约100ms调用step函数，此时，step函数的node参数指向document.body
}; 

fade(document.body)
```
