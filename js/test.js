/**
 * Created by Administrator on 2017/4/20 0020.
 */
var screenAnimateElement = {
    ".screen-1" : [
        ".header",
        ".screen-1__title",
        ".screen-1__desc"
    ],

    ".screen-2" : [
        ".screen-2__title",
        ".screen-2__desc",
        ".screen-2__mark",
        ".screen-2__img-people",
        ".screen-2__img-rocket"
    ],

    ".screen-3" : [
        ".screen-3__content__title",
        ".screen-3__content__mark",
        ".screen-3__content__desc",
        ".screen-3__content__icon",
        ".screen-3__img"
    ],

    ".screen-4" : [
        ".screen-4__title",
        ".screen-4__mark",
        ".screen-4__desc",
        ".screen-4__example-1",
        ".screen-4__example-2",
        ".screen-4__example-3",
        ".screen-4__example-4"
    ],

    ".screen-5" : [
        ".screen-5__img",
        ".screen-5__title",
        ".screen-5__mark",
        ".screen-5__desc"
    ]
};

function animate(obj) {
    // 获取每一个屏
    var screen = document.querySelector(obj);
    // 获取每一个屏里面需要做动画的元素数组
    var screenElements = screenAnimateElement[obj];
    // 是否初始化了子元素开始做动画时的样式
    var isSetAnimateClass = false;
    // 动画是否已经完成
    var isAnimateDone = false;

    // 初始化
    screen.addEventListener('click',function () {
        if(isSetAnimateClass === false) {
            for (var i=0; i<screenElements.length; i++) {
                var elements = document.querySelector(screenElements[i]);
                // 得到了每一个子元素的class
                var baseClass = elements.getAttribute('class');
                elements.setAttribute('class',baseClass + " " + screenElements[i].substr(1) + "_animate_init");
            }
            isSetAnimateClass = true;
            return
        }

        // 开始动画
        if(isAnimateDone === false) {
            toggleAnimate("_animate_init","_animate_done",true);
            return;
        }

        // 还原初始化
        console.log(isSetAnimateClass)
        console.log(isAnimateDone)

        if(isAnimateDone === true) {
            toggleAnimate("_animate_done","_animate_init",false);
            return;
        }

    });

    // 动画切换
    function toggleAnimate(from,to,judge) {
        for (var i=0; i<screenElements.length; i++) {
            var elements = document.querySelector(screenElements[i]);
            // 得到了每一个子元素的class
            var baseClass = elements.getAttribute('class');
            elements.setAttribute('class',baseClass.replace(from,to));
        }
        isAnimateDone = judge;
    }

}

for (var k in screenAnimateElement) {
    animate(k)
}