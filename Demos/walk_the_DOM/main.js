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
		var actual = node.nodeType === 1 && node.getAttribute(att);
		if (typeof actual === 'string' &&
				(actual === value || typeof value !== 'string')){
			results.push(node);
		}
	});
	return results;	
}

console.log(getElementByAttribute("id"));   //更改查询字符串来得到不同的值

 