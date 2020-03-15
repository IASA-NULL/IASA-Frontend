function initMdc() {
    mdcInstance.topAppBar = mdc.topAppBar.MDCTopAppBar.attachTo(document.getElementById('app-bar'));
    mdcInstance.topAppBar.setScrollTarget(document.getElementById('main-content'));
    mdcInstance.topAppBar.listen('MDCTopAppBar:nav', function (e) {
        mdcInstance.drawer.open = !mdcInstance.drawer.open;
        if (asideStat == 1) {
            if (hasClass(document.getElementById('mdc-content'), 'mdc-drawer-app-content-margin')) {
                setTimeout(function () {
                    removeClass(document.getElementById('mdc-content'), 'mdc-drawer-app-content-margin');
                }, 200);
            } else {
                setTimeout(function () {
                    addClass(document.getElementById('mdc-content'), 'mdc-drawer-app-content-margin');
                }, 200);
            }
        }
        e.stopPropagation();
    });
    mdcInstance.accountmenu = new mdc.menu.MDCMenu(document.getElementById('accountMenu'));
    mdcInstance.accountmenu.setAnchorElement(document.getElementById('accountInfo'));
    mdcInstance.accountmenu.setFixedPosition(true);
    mdcInstance.accountButton = new mdc.ripple.MDCRipple(document.getElementById('accountInfo'));
    mdcInstance.accountButton.unbounded = true;
}

var elem;

window.addEventListener('DOMContentLoaded', function () {
    if (isLogin()) document.getElementById('loginMenu_login').remove();
    else {
        document.getElementById('loginMenu_logout').remove();
        document.getElementById('loginMenu_info').remove();
        document.getElementById('loginMenu_mypage').remove();
    }
    initMdc();
    elem = document.getElementById('main-content');
});

let laY = -1;

window.addEventListener('load', function () {
    document.getElementById("iProg").style.opacity = 0;
    document.body.style.cursor = 'default';
    setTimeout(function () {
        document.getElementById("preloader").style.opacity = 0;
        setTimeout(function () {
            document.getElementById("preloader").style.display = "none";
        }, 400);
    }, Math.max(0, 700 - Date.now() + timerStart));
});