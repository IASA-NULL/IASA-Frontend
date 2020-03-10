function initMdc() {
    mdcInstance.topAppBar = mdc.topAppBar.MDCTopAppBar.attachTo(document.getElementById('app-bar'));
    mdcInstance.topAppBar.setScrollTarget(document.getElementById('main-content'));
    mdcInstance.accountmenu = new mdc.menu.MDCMenu(document.getElementById('accountMenu'));
    mdcInstance.accountmenu.setAnchorElement(document.getElementById('navLoginBtn'));
    mdcInstance.accountmenu.setFixedPosition(true);
}


window.addEventListener('DOMContentLoaded', function () {
    if (isLogin()) document.getElementById('loginMenu_login').remove();
    else {
        document.getElementById('loginMenu_logout').remove();
        document.getElementById('loginMenu_info').remove();
        document.getElementById('loginMenu_mypage').remove();
    }
    initMdc();
    elem = document.getElementById('main-content');
    nowHeaderStat = false
    fobjTop = document.getElementById('loginBtn').offsetTop + document.getElementById('loginBtn').offsetHeight + 70;
    setInterval(function () {
        if (elem["scrollTop"] < fobjTop && !nowHeaderStat) {
            addClass(document.getElementById('app-bar'), 'header-top');
            removeClass(document.getElementById('navLoginBtn'), 'mdc-button--outlined');
            addClass(document.getElementById('navLoginBtn'), 'loginBtn-top');
            document.getElementById('navLoginLabel').style.opacity = '0';
            document.getElementById('navLoginIcon').style.marginRight = '0';
            document.getElementById('navLoginIcon').style.marginLeft = '60px';
            document.getElementById('navLoginBtn').onclick = function () {
                mdcInstance.accountmenu.open = true;
            }
            mdc.ripple.MDCRipple.attachTo(document.getElementById('navLoginBtn'));
            nowHeaderStat = true;
        } else if (elem["scrollTop"] >= fobjTop && nowHeaderStat) {
            removeClass(document.getElementById('app-bar'), 'header-top');
            addClass(document.getElementById('navLoginBtn'), 'mdc-button--outlined');
            removeClass(document.getElementById('navLoginBtn'), 'loginBtn-top');
            document.getElementById('navLoginLabel').style.opacity = '1';
            document.getElementById('navLoginIcon').style.marginRight = '10px';
            document.getElementById('navLoginIcon').style.marginLeft = '5px';
            document.getElementById('navLoginBtn').onclick = logIn;
            mdc.ripple.MDCRipple.attachTo(document.getElementById('navLoginBtn'));
            nowHeaderStat = false;
        }
    });
});

window.addEventListener('load', function () {
    document.body.style.cursor = 'default';
    setTimeout(function () {
        document.getElementById("preloader").style.opacity = 0;
        setTimeout(function () {
            document.getElementById("preloader").style.display = "none";
        }, 400);
    }, Math.max(0, 700 - Date.now() + timerStart));
});