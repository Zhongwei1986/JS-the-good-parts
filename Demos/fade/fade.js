//定义一个函数，它设置一个DOM节点为黄色，然后把它渐变为白色。

var fade = function(node) {
    var level = 1;
    var step = function() {
        var hex = level.toString(16); //转换成十六进制数
        // console.log(hex);
        node.style.backgroudColor = '#FFFF' + hex + hex;
        // console.log(node.style);
        if (level < 15) { // hex 不大于 F
            level += 1;
            // console.log(level);
            // console.log(node.style.backgroudColor);
            setTimeout(step, 1000);
        }
    };    
    setTimeout(step, 100); //在fade函数结束后约100ms调用step函数，此时，step函数的node参数指向document.body
};

var test = document.getElementsByClassName('test')[0];
console.log(test);
// test.style.backgroundColor = '#39b54a';
fade(test);
