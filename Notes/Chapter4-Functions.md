# 第4章 函数Functions
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
+ 每个函数对象在创建时也随配有一个prototype属性。它的值是一个拥有constuctor属性且值即为该函数的对象。具体细节将在[下一章](https://github.com/Zhongwei1986/JS-the-good-parts/blob/master/Notes/Chapter5-Inheritance.md)展示

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

## 返回Return

## 异常Exceptions

## 扩充类型的功能Augmenting Types

## 递归Recursion

## 作用域Scope

## 闭包Closure

## 回调Callbacks

## 模块Module

## 级联Cascade

## 柯里化Curry

## 记忆Memoization
