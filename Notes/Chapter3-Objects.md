# 第3章 对象Object
## 0. 引言 
+ JavaScript的对象是可变的键控集合(keyed collection)
+ 对象是属性的**容器**。每个属性都拥有名字和值
	+  名字是包括空字符串在内的任意字符串
	+  值是除undefined以外的任何值
+ JavaScript的对象是无类型的(class-free)
+ JS包含一种原型链的特性，正确使用它可以减少对象初始化时消耗的时间和内存
## 1. 对象字面量 Object Literals
+ 对象字面量就是包围在花括号中的零或多个“名/值”对。可以出现在任意允许[表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Expressions_and_Operators)出现的地方。
	+ 属性名若是一个合法的标识符(又称[变量](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Expressions_and_Operators))且不是[保留字](https://msdn.microsoft.com/zh-cn/library/0779sbks(v=vs.94).aspx)则不强制要求使用引号。如"first-name"的引号是必须的，而"first_name"的引号则可以去掉
## 2. 检索 Retrieval
+ 检索对象包含的值，有两种方法：
	+ Object[string]，[ ] 括住一个字符串表达式。
	+ Object.objname，objname是合法标识符且非保留字。优先选择此方法。
+ 检索不存在的成员属性的值，将返回undefined，可以用 `||` 运算符来填充默认值：
```javascript
var status = fight.status || "unknown";
```
+ 充实从undefined的成员属性中取值会导致TypeError异常。可以用 `&&`运算符来避免错误([逻辑运算符短路求值](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Expressions_and_Operators#逻辑运算符(Logical_operators)))：
```javascript 
fight.equipment						//undefined
fight.equipment.model				//throw "TypeError" 
fight.equipment && fight.equipment.model		//undefined		
```
## 3. 更新 Update
+ 通过赋值语句来
## 4. 引用 Reference
+ 对象通过引用来传递，它们永远不会被复制。
## 5. 原型
## 6. 反射
## 7. 枚举
## 8. 删除
## 9. 减少全局变量污染
