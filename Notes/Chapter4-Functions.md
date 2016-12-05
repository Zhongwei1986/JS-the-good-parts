# 第4章 函数Functions
##引言
+ 函数包含一组语句，它们是JS的基础模块单元，用于代码复用、信息隐藏和组合调用。
+ **函数用于指定对象的行为。**
+ 编程(program)就是将一组需求分解成一组函数和数据结构的技能！
##函数对象Function Object
+ JS中的函数就是对象。对象是名值对的集合并游泳一个连到原型对象的隐藏链接
	+ 对象字面量产生的对象连接到Object.prototype
	+ 函数对象连接到Function.prototype(该原型对象本身连接到Object.prototype)

![](http://ocbao1wc2.bkt.clouddn.com/20161205hanshuyuanxinglian.jpg)

+ 每个函数在创建时会附加两个隐藏属性：函数的上下文和实现函数行为的代码（JS创建一个函数对象时，会给该对象设置一个“调用”属性，档JS调用一个函数时，可理解为调用此函数的“调用”属性）。
+ 每个函数对象在创建时也随配有一个prototype属性。它的值是一个拥有constuctor属性且值即为该函数的对象。具体细节将在[下一章](https://github.com/Zhongwei1986/JS-the-good-parts/blob/master/Notes/Chapter5-Inheritance.md)展示

![](http://ocbao1wc2.bkt.clouddn.com/20161205prototype.jpg)

+ 函数与众不同之处在于它们可以被调用。

##函数字面量Function Literal

##调用Invocation

###方法调用模式The Method Invocation Pattern

###函数调用模式The Function Invocation Pattern

###构造器调用模式The Constructor Invocation Pattern

###Apply调用模式The Apply Invocation Pattern

##参数Arguments

##返回Return

##异常Exceptions

##扩充类型的功能Augmenting Types

##递归Recursion

##作用域Scope

##闭包Closure

##回调Callbacks

##模块Module

##级联Cascade

##柯里化Curry

##记忆Memoization
