/**
 * Created by Administrator on 2017/4/20 0020.
 */

// 获取元素
function getElem(selector) {
    return document.querySelector(selector);
}

// 获取元素数组
function getAllElem(selector) {
    return document.querySelectorAll(selector);
}

// 获取元素的样式
function getClass(elem) {
    return elem.getAttribute('class');
}

// 设置元素的样式
function  setClass(elem,clas) {
    return elem.setAttribute('class',clas)
}

//为元素添加样式
function addClass(elem,clas) {
    var baseClass = getClass(elem);
    if (baseClass.indexOf(clas) === -1) {
        setClass(elem,baseClass + ' ' + clas);
    }
    return;
}

// 移除元素的样式
function removeClass(elem,clas) {
    var baseClass = getClass(elem);
    if (baseClass.indexOf(clas) > -1) {
       setClass(elem,baseClass.split(clas).join(' ').replace(/\s+/g,' '));
    }
    return;
}

// 数据
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

// 第一步 初始化
function setAnimateInit(obj) {
    var screenElements = screenAnimateElement[obj];
    for (var i=0; i<screenElements.length; i++) {
        var elements = document.querySelector(screenElements[i]);
        // 得到了每一个子元素的class
        var baseClass = elements.getAttribute('class');
        elements.setAttribute('class',baseClass + " " + screenElements[i].substr(1) + "_animate_init");
    }
};
for (var k in screenAnimateElement) {
    if (k == '.screen-1') {
        continue;
    };
    setAnimateInit(k);
}

// 第二步，设置初始动画
function setAnimateDone(obj) {
    var screenElements = screenAnimateElement[obj];
    for (var i=0; i<screenElements.length; i++) {
        var elements = document.querySelector(screenElements[i]);
        // 得到了每一个子元素的class
        var baseClass = elements.getAttribute('class');
        elements.setAttribute('class',baseClass.replace("_animate_init","_animate_done"));
    };
};
// 0.1秒后第一屏自动进行动画
setTimeout(function () {
    setAnimateDone('.screen-1');
},100);

// 第三步 设置导航区域样式的变化
/*
1.导航栏下拉固定且样式发生改变
2.点击导航栏的每一项，每一项的样式发生改变
*/
var navItems = getAllElem('.header__nav-item');
var outlineItems = getAllElem('.outline__item');

function swicthActive(index) {
    for (var i=0; i<outlineItems.length; i++) {
        removeClass(navItems[i],'header__nav-item_status_active');
        removeClass(outlineItems[i],'outline__item_status_active');
    }
    addClass(navItems[index],'header__nav-item_status_active');
    addClass(outlineItems[index],'outline__item_status_active')
};

// 获取导航栏和导航栏的高度
var header = getElem('.header');
var headerH = header.offsetHeight;

// 得到每个屏的高度，屏和导航栏高度的差值
var screenH = getElem('.screen-1').offsetHeight;
var scrollH = screenH - headerH;

// 得到侧边的导航栏
var outline = getElem('.outline');

// 获取ScrollTop兼容
function getScrollTop() {
    return document.documentElement.scrollTop || window.pageYOffset || document.body;
}

window.onscroll = function () {
    var top = getScrollTop();

    // 第四步，固定导航栏并且样式改变
    // 侧边栏划出。
    if (top > headerH) {
        addClass(header,'header_status_fixed');
        removeClass(outline,'outline_animate_init');
    }else {
        removeClass(header,'header_status_fixed');
        addClass(outline,'outline_animate_init');
    };

    for (var i=0; i<navItems.length-1; i++){
        if (top > headerH) {
            addClass(navItems[i],'header__nav-item_status_fixed');
        }else {
            removeClass(navItems[i],'header__nav-item_status_fixed');
        }
    };

    // 第五步 滚动进行动画
    /*滚动到哪个区域，该区域进行动画并且导航栏相应的样式改变*/
    if (top < scrollH){
        swicthActive(0)
    }
    if (top >= scrollH) {
        setAnimateDone('.screen-2')
        swicthActive(1)
    }
    if (top >= scrollH*2) {
        setAnimateDone('.screen-3')
        swicthActive(2)
    }
    if (top >= scrollH*3) {
        setAnimateDone('.screen-4')
        swicthActive(3)
    }
    if (top >= scrollH*4) {
        setAnimateDone('.screen-5')
        swicthActive(4)
    }
}

// 第六步 点击导航栏跳转相应区块

// 设置ScrollTop兼容
function setScrollTop(scroll_top) {
    document.documentElement.scrollTop = scroll_top;
    window.pageYOffset = scroll_top;
    document.body.scrollTop = scroll_top;
}

function clickScroll() {
    for(var i=0; i<outlineItems.length; i++){
        // 得到索引
        navItems[i].index = i;
        outlineItems[i].index = i;

        navItems[i].onclick = function () {
            swicthActive(this.index); // 点击导航栏样式发生改变
            setScrollTop(scrollH*this.index); // 跳转相应区块
        };

        outlineItems[i].addEventListener('click',function () {

            swicthActive(this.index); // 点击导航栏样式发生改变
            setScrollTop(scrollH*this.index); // 跳转相应区块
        });
    };
};
clickScroll();

// 第七步 滑动门特效
var navTip = getElem('.header__nav-tip');
var navTipW = navTip.offsetWidth;
function navTipChange() {
    var currentIndex = 0;

    for (var i=0; i<navItems.length-1; i++) {
        navItems[i].index = i;

        navItems[i].onmouseover = function () {
            navTip.style.left = this.index*(navTipW + 38) + 'px';
        };

        navItems[i].onmouseout = function () {
            for (var j=0; j<navItems.length-1; j++)
                if( getClass(this).indexOf('header__nav-item_status_active') > -1  ){
                    currentIndex = this.index;
                    break
                }
            navTip.style.left = currentIndex*(navTipW + 38) + 'px';
        };
    }
}
navTipChange();



