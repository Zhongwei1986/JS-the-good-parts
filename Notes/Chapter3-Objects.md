# 第3章 对象Object
## 目录
+ [引言](#引言)
+ [对象字面量 Object Literals](#对象字面量-Object-Literals)
+ [检索 Retrieval](#检索-Retrieval)
+ [更新 Update](#更新-Update])
+ [引用 Reference](#引用-Reference)
+ [原型 Prototype](#原型-Prototype)
+ [反射 Reflection](#反射-Reflection)
+ [枚举 Enumeration](#枚举-Enumeration)
+ [删除 Delete](#删除-Delete)
+ [减少全局变量污染 Global Abatement](#减少全局变量污染-Global-Abatement)
## 引言 
+ JS数据类型有两种：简单数据类型和对象

![JS数据类型](http://ocbao1wc2.bkt.clouddn.com/20161130JSshuju.jpg) 

+ JS对象是可变的键控集合(keyed collection)
+ 对象是属性的**容器**。每个属性都拥有名字和值:
	+  名字是包括空字符串在内的任意字符串
	+  值是除undefined以外的任何值
+ JS对象是无类型的(class-free)
+ JS包含一种原型链的特性，正确使用它可以减少对象初始化时消耗的时间和内存

## 对象字面量 Object Literals
+ 对象字面量就是包围在花括号中的零或多个“名/值”对。可以出现在任意允许[表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Expressions_and_Operators)出现的地方。
	+ 属性名若是一个合法的标识符(又称[变量](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Expressions_and_Operators))且不是[保留字](https://msdn.microsoft.com/zh-cn/library/0779sbks(v=vs.94).aspx)则不强制要求使用引号。如"first-name"的引号是必须的，而"first_name"的引号则可以去掉

## 检索 Retrieval
+ 检索对象包含的值，有两种方法：
	+ Object[string]，[ ] 括住一个字符串表达式。
	+ Object.objname，objname是合法标识符且非保留字。优先选择此方法。
+ 检索不存在的成员属性的值，将返回undefined，可以用 `||` 运算符来填充默认值：
```javascript
var status = fight.status || "unknown";
```
+ 尝试从undefined的成员属性中取值会导致TypeError异常。可以用 `&&`运算符来避免错误([逻辑运算符短路求值](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Expressions_and_Operators#逻辑运算符(Logical_operators)))：
```javascript 
fight.equipment						//undefined
fight.equipment.model				//throw "TypeError" 
fight.equipment && fight.equipment.model		//undefined		
```
## 更新 Update
+ 通过赋值语句来更新，若存在，则被替换，若不存在，则新增。

## 引用 Reference
+ 对象通过引用来传递，它们永远不会被复制。

## 原型 Prototype
+ 每个对象都连接到一个原型对象，可以从中继承属性
+ 所有字面量创建的对象都连接到Object.prototype
+ 创建一个新对象时，可以选择某个对象作为它的原型。详见下一章[函数](https://github.com/Zhongwei1986/JS-the-good-parts/blob/master/Notes/Chapter4-Functions.md).
+ 原型连接只有在检索值的时候才会被用到。根据原型链层次向上查询属性值的过程叫**委托**。原型链的更多内容见第6章。

## 反射 Reflection
+ 检查对象属性：`typeof`
+ 有两种办法处理掉不需要的属性(如原型链中的属性)：
	+ 做检查并丢弃值为函数的属性 `typeof obj  // 'function'`
	+ hasOwnProperty方法

## 枚举 Enumeration
+ for in 语句遍历所有属性名，包含原型链中的属性，可以使用typeof或hasOwnProperty()来过滤。for in语句遍历的属性名出现的顺序是不固定的。
+ 若需要属性名按照特定顺序进行排列，则需要使用for语句。

## 删除 Delete
+ 删除对象的属性**可能**会让来自原型链中的属性暴露出来。

## 减少全局变量污染 Global Abatement
+ 全局变量削弱的程序的灵活性，应该避免使用。
+ 最小化使用全局变量的方法之一是只创建一个唯一的命名空间。
+ 或者使用闭包，详见[下一章](https://github.com/Zhongwei1986/JS-the-good-parts/blob/master/Notes/Chapter4-Functions.md)。
