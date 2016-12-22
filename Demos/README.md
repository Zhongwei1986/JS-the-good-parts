# Demos for 《Javascript:the Good Parts》

+ 本书DEMO均在书本关键代码基础上进行必要的补充，确保可以在浏览器中查看效果。DEMO按章节进行存放，请下载DEMOS文件夹至本地。

## 目录

- [Chapter4 Function](#chapter4-function)
	- [walk_the_DOM](#walk_the_dom)
	- [fade](#fade)
	- [add_the_handlers](#add_the_handlers)

## Chapeter4 Function
### walk_the_DOM
+ 在谷歌浏览器中打开wale_the_DOM.html，在后台查看输出。
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
+ 在浏览器中打开fade.html，观看动画效果。可以更改setTimeout()函数中第二个参数，如改成1000，则颜色变化速度会变慢。
```javascript
//定义一个函数，它设置一个DOM节点为黄色，然后把它渐变为白色。

var fade = function (node) {
	var level = 1;
	var step = function () {
		var hex = level.toString(16);	//转换成十六进制数
		node.style.backgroundColor = '#FFFF' + hex + hex;
		if(level < 15) {  // hex 不大于 F
			level += 1;
			setTimeout(step, 100);
		}
	};
	setTimeout(step, 100);    //在fade函数结束后约100ms调用step函数，此时，step函数的node参数指向document.body
}; 

fade(document.body)
```

### add_the_handlers
+ 打开add_the_handlers-1.html，点击按钮，查看弹框提示数字。

```javascript
//糟糕例子

//构造一个函数，用错误的方式给一个数组中的节点设置事件处理程序。
//当点击一个节点时，按照预期，应该弹出一个对话框显示节点的序号，
//但它总是会显示节点的数目

var add_the_handlers = function (nodes) {
	var i;
	for (i = 0; i < nodes.length; i++){
		nodes[i].onclick = function (e) {
			alert(i);
		};
	}
};
```
+ 打开add_the_handlers-2.html，点击按钮，查看弹框提示数字。

```javascript
//改良后的例子

//构造一个函数，用错误的方式给一个数组中的节点设置事件处理程序。
//当点击一个节点时，弹出一个对话框显示节点的序号

var add_the_handlers = function (nodes) {
	var helper = function (i) {
		return function (e) {
			alert(i);
		};
	};
	var i;
	for (i = 0; i < nodes.length; i++) {
		nodes[i].onclick = helper(i);
	}
};
```