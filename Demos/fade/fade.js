//定义一个函数，它设置一个DOM节点为黄色，然后把它渐变为白色。

var fade = function(node) {
    var level = 1;
    var step = function() {
        var hex = level.toString(16); //转换成十六进制数
        // console.log(hex);
        node.style.backgroudColor = '#EEEE' + hex + hex;
        console.log(node.style.backgroudColor);
        if (level < 15) { // hex 不大于 F
            level += 1;
            console.log(level);
            console.log(node.style.backgroudColor);
            setTimeout(step, 100);
        }
    };
    setTimeout(step, 100); //在fade函数结束后约100ms调用step函数，此时，step函数的node参数指向document.body
};

fade(document.body)
