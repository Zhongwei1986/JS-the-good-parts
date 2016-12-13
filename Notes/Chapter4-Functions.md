# 第4章 函数Functions
##目录  
+ [函数对象Function Object](#函数对象function-object)
+ [函数字面量Function Literal](#函数字面量function-literal)
+ [调用Invocation](#调用invocation)
	+ 方法调用模式The Method Invocation Pattern
	+ 函数调用模式The Function Invocation Pattern
	+ 构造器调用模式The Constructor Invocation Pattern
	+ Apply调用模式The Apply Invocation Pattern
+ [参数Arguments](#参数arguments)
+ [返回Return](#返回return)
+ [异常Exceptions](#异常exceptions)
+ [扩充类型的功能Augmenting Types](#扩充类型的功能augmenting-types)
+ [递归Recursion](#递归recursion)
+ [作用域Scope](#作用域scope)
+ [闭包Closure](#闭包closure)
+ [回调Callbacks](#回调callbacks)
+ [模块Module](#模块module)
+ [级联Cascade](#级联cascade)
+ [柯里化Curry](#柯里化curry)
+ [记忆Memoization](#记忆memoization)  

## 引言  
+ 函数包含一组语句，它们是JS的基础模块单元，用于代码复用、信息隐藏和组合调用。
+ **函数用于指定对象的行为。**
+ 编程(program)就是将一组需求分解成一组函数和数据结构的技能！

## 函数对象Function Object
+ JS中的函数就是对象。对象是名值对的集合并游泳一个连到原型对象的隐藏链接
	+ 对象字面量产生的对象连接到Object.prototype
	+ 函数对象连接到Function.prototype(该原型对象本身连接到Object.prototype)

![](http://ocbao1wc2.bkt.clouddn.com/20161205hanshuyuanxinglian.jpg)

+ 每个函数在创建时会附加两个隐藏属性：函数的上下文和实现函数行为的代码（JS创建一个函数对象时，会给该对象设置一个“调用”属性，档JS调用一个函数时，可理解为调用此函数的“调用”属性）。
+ 每个函数对象在创建时也随配有一个prototype属性。它的值是一个拥有constuctor属性且值即为该函数的对象。具体细节将在[下一章](./Chapter5-Inheritance.md)展示

![](http://ocbao1wc2.bkt.clouddn.com/20161205prototype.jpg)

+ 函数与众不同之处在于它们可以被调用。

## 函数字面量Function Literal
+ 函数对象通过函数字面量来创建：
```javascript
//创建一个名叫 add 的变量，并用来把两个数字相加的函数赋值给它；
	
var add = function (a, b) {
	return a + b;
}
```
+ 函数字面量包括4个部分：
	+ 保留字function
	+ 函数名，可以被省略。如果省略，函数叫做匿名函数(anonymous)
	+ 圆括号内的参数，多个参数之间用逗号分隔。这些参数的名称将被定义为函数中的变量。他们不像普通变量初始化为undefined，而是在该函数被调用时初始化为实际提供的参数的值（实参）。
	+ 包含在花括号内的一组语句。这些语句是函数的主体，它们在函数调用时执行。
+ 通过函数字面量创建的函数对象包含一个连到外部上下文的连接，这被称为闭包(closure)。

## 调用Invocation
[回到顶部](#目录)
+ 调用一个函数会暂停当前函数的执行，传递控制权和参数给新函数。除了声明时定义的形参，每个函数还接受两个附加的参数：this和arguments。
+ 参数this非常重要，它的值取决于调用的模式。
### 方法调用模式The Method Invocation Pattern
+ 方法： 函数保存为一个对象的属性
+ 当一个方法被调用时，this绑定到该对象
+ 如果调用表达式包含一个提取属性的动作(即包含一个.点表达式或[subscript]下标表达式)，那么它就是当做一个方法被调用
```javascript
var myObject = {
	value: 0,
	increment: function (inc) {
		this.value += typeof inc === ''number ? inc : 1;  //inc是数字则加给value，否在value加1
	}
}；
myObject.increment();
document.wirteln(myObject.value);	// 1
	
myObject.increment(2);
document.wirteln(myObject.value);  // 3
```
+ 方法可以使用this调用自己所属的对象，所以它能从对象中取值或对对象进行修改
+ **this到对象的绑定发生在调用的时候。这个“超级”延迟绑定使得函数可以对this高度复用。**
+ 通过this可取得它们所属对象的上下文的方法称为公共方法(pubilc method)
### 函数调用模式The Function Invocation Pattern
+ 当一个函数并非一个对象的属性时，那么它就是被当做一个函数来调用：
```javascript
var sum = add(3,4)  //sun的值为7
```
+ 此模式调用时，this被绑定至全局对象。这是语言设计上的一个错误。
+ 倘若语言设计正确，那么当内部函数被调用时，this应该仍然绑定到外部函数的this变量。
+ 这个设计错误的后果是方法不能利用内部函数来帮助它工作，因为内部函数的this被绑定至错误的值，所以不能共享该方法对对象的访问权。
+ 有一种解决方案：如果该方法定义一个变量并给它赋值为this，那么内部函数就可以通过这个变量访问到外部函数的this，即方法所属对象。按照约定，此变量命名为that。
```javascript
//给myObject 增加一个double方法
myObject.double = function () {
	var that = this;
		
	var helper = function () {
	that.value = add(that.value, that.vale);
	}

	helper();		//以函数的形式调用helper
}

//以方法的形式调用double

myObject.double();
document.writeln(myObject.value);		// 6
```
### 构造器调用模式The Constructor Invocation Pattern
+ JS是一门基于原型继承的语言，意味着对象可以直接从其它对象继承属性，该语言是无类型的。
+ 这偏离了当今编程语言的主流风格，当今大多数语言都是基于类的语言。尽管原型继承极富表现力，但它并未被广泛立即。
+ JavaScript本身对它原型的本质也缺乏信心，所以它提供了一套和基于类的语言类似的对象构建语法。
+ 如果在一个函数前面带上 new 来调用，那么背地里将会创建一个连接到该函数的prototype成员(**并非Function.prototype**)的新对象，同时this会绑定到那个新对象上。
+ new前缀也会改变 return 语句的行为
```javascript
//创建一个名为 Quo 的构造器函数。它构造一个带有 status 属性的对象。
var Quo = function (string) {
	this.status = string;
};
	
//给 Quo 的所有实例提供一个名叫 get_status 的公共方法。
Quo.prototype.get_status = function () {
	return this.status;
}

//构造一个 Quo 实例。
var myQuo = new Quo("confused");
	
document.writeln(myQuo.get_status());	//打印"confused"
```

![](http://ocbao1wc2.bkt.clouddn.com/20161212myquo.jpg)

+ 一个函数，如果创建的目的就是希望结合 new 的前缀来调用，那它就称为构造器函数，按照约定，它们保存在以大写格式命名的变量里。

### Apply调用模式The Apply Invocation Pattern
+ 因为JS是一门函数式的面向对象编程语言，所以函数可以拥有方法
+ apply方法让我们构建一个参数数组传递给调用函数，它也允许我们选择this的值。apply方法接受两个参数，第一个是要绑定给this的值，第二个就是参数数组.

```javascript
//构造一个包含两个数字的数组，并将它们相加。
	
var array = [3, 4];
var sum = add.apply(null, array);     // sum 值为7
	
//构造一个包含 status 成员的对象。
	
var statusObject = {
	status: 'A-OK',
};

//statusObject 并没有继承自 Quo.prototype,但我们可以在 statusObject 上调用
//get_status 方法，尽管其没有一个名为 get_status 的方法
var status = Quo.prototype.get_status.apply(statusObject);	// status 值为'A-OK'
```
## 参数Arguments 
[回到顶部](#目录)
+ 当函数被调用时，被得到一个参数： aguments 数组。函数可以通过此参数访问它被调用时传递给它的参数列表，包括那些没有被分配给函数形参的多余参数。
+ 这使得编写一个无须指定参数个数的函数成为可能：
```javascript 
// 构造一个大量相加的函数，
// 注意该函数内部定义的变量 sum 不会与函数外部定义的 sum 产生冲突，
// 该函数只会看到内部的那个变量。

var sum = function () {
	var i, sum = 0;
	for (i = 0; i <agument.length; i += 1){
		sum += argument[i];
	}
	return sum;
};

document.writeln(sum(4, 8, 15, 16, 23, 42));	// 108
```

+ 因为语言的一个设计错误， argument 并不是一个真正的数组。它只是一个类似数组(array-like)的对象，但它没有任何数组的方法。

## 返回Return 
[回到顶部](#目录)
+ 当一个函数被调用时，它从第一个语句开始执行，并在遇到关闭函数体的）时结束，然后函数把控制权交给调用该函数的程序。
+ return 语句可用来使函数提前返回。当 return 语句被执行时，函数立即返回而不再执行余下的语句。
+ 一个函数总是会返回一个值，如果没有指定返回值，则返回 undefined 。
+ 如果函数调用时在前面加一个 new 前缀，且返回值不是一个对象，则返回this（该新对象）。

## 异常Exceptions
+ try() catch()

## 扩充类型的功能Augmenting Types 
[回到顶部](#目录)
+ 从第3章中可以看到，通过给Object.prototype 添加方法，可以让该方法对所有对象可用。这样的方式对函数、数组、字符串、数字、正则表达式同样适用。

+ 举例来说，可以通过给Function.prototype 增加方法来使得该方法对所有函数可用：
```javascript
// 通过增加一个method方法，下次给对象原型增加方法时，可以不必键入prototype
Function.prototype.method = function (name, func){
	this.prototype[name] = func;
	return this;
};
```
> JS原生取整函数比较丑陋，可以给Number.prototype增加一个integer方法来改善：

```javascript
// 根据数字的正负来判断使用Math.ceil()还是Math.floor()
Number.method('integer', function () {
	return Math[this < 0 ? 'ceil' : 'floor'](this)
})；

document.writeln((-10/3).integer());		// -3
```
+ JS缺少一个移除字符串首尾空白的方法：

```javascript
String.method('trim', function () {
	return this.replace(/^\s+|\s+$/g, ''); //正则表达式用处是匹配字符串开始或结尾的空白符
});

document.wirteln('"' + "  neat  ".trim() + '"');
```
+ 基本类型的原型是公用结构，在类库混用时务必小心，一个保险的做法是只在确定没有该方法时才添加它:

```javascript
// 符合条件时才添加方法

Function.prototype.method = function (name, func) {
	if(!this.prototype[name]) {
		this.prototype[name] = func;
	}
	return this;
};
```
## 递归Recursion 
[回到顶部](#目录)
+ 递归函数就是会直接或间接调用自身的一种函数。
+ 递归是一种强大的编程技术，它把一个问题分解成一组相似的子问题，每一个都用一般的方法去解决。一般来说，递归函数调用自身去解决它的子问题。
+ 递归函数可以非常高效地操作树形结构，比如浏览器的DOM。每次递归调用处理指定的树的一小段。
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
	var result = [];
	
	walk_the_DOM(document.body, function (node) {
		var actual = node.nodetype === 1 && node.getAttribute(att);  //&&短路操作，保证只有元素节点才会进行查找
		if (typeof actual === 'string' &&
				(actual === value || typeof value !== 'string')){
			results.push(node);
		}
	});
	return results;
}
```
[Demo](/Demos/README.md#walk_the_dom)

## 作用域Scope 
[回到顶部](#目录)

## 闭包Closure 
[回到顶部](#目录)

## 回调Callbacks 
[回到顶部](#目录)

## 模块Module	
[回到顶部](#目录)

## 级联Cascade	
[回到顶部](#目录)

## 柯里化Curry	
[回到顶部](#目录)

## 记忆Memoization
[回到顶部](#目录)
