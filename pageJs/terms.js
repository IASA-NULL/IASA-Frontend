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
    mdcInstance.progress = new mdc.linearProgress.MDCLinearProgress.attachTo(document.querySelector('.mdc-linear-progress'));
    mdcInstance.progress.determinate = false;
    mdcInstance.list = mdc.list.MDCList.attachTo(document.querySelector('.mdc-list'));
    mdcInstance.list.wrapFocus = true;
    mdcInstance.drawer = mdc.drawer.MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
}

var elem;

window.addEventListener('DOMContentLoaded', function () {
    if (isLogin()) document.getElementById('loginMenu_login').remove();
    else {
        document.getElementById('loginMenu_logout').remove();
        document.getElementById('loginMenu_info').remove();
        document.getElementById('loginMenu_mypage').remove();
    }
    modalHandle();
    initMdc();
    elem = document.getElementById('main-content');
    menuEl = document.querySelector('aside').querySelectorAll('a');
    for (i = 0; i < menuEl.length; i++) {
        menuEl[i].addEventListener('click', function () {
            if (asideStat == 0) mdcInstance.drawer.open = false;
        })
    }
});

let asideStat = -1;

function modalHandle() {
    if (window.innerWidth <= 1024 && asideStat != 0) {
        addClass(document.querySelector('aside'), 'mdc-drawer--modal');
        removeClass(document.querySelector('aside'), 'mdc-drawer--dismissible');
        removeClass(document.getElementById('mdc-content'), 'mdc-drawer-app-content');
        removeClass(document.getElementById('mdc-content'), 'mdc-drawer-app-content-margin');
        if (mdcInstance.drawer) mdcInstance.drawer.destroy();
        document.getElementById('modalBack').className = 'mdc-drawer-scrim';
        mdcInstance.drawer = mdc.drawer.MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
        mdcInstance.topAppBar = mdc.topAppBar.MDCTopAppBar.attachTo(document.getElementById('app-bar'));
        mdcInstance.topAppBar.setScrollTarget(document.getElementById('main-content'));
        mdcInstance.drawer.open = false;
        asideStat = 0;
    }
    if (window.innerWidth > 1024 && asideStat != 1) {
        removeClass(document.querySelector('aside'), 'mdc-drawer--modal');
        addClass(document.querySelector('aside'), 'mdc-drawer--dismissible');
        addClass(document.getElementById('mdc-content'), 'mdc-drawer-app-content');
        addClass(document.getElementById('mdc-content'), 'mdc-drawer-app-content-margin');
        if (mdcInstance.drawer) mdcInstance.drawer.destroy();
        document.getElementById('modalBack').className = '';
        mdcInstance.drawer = mdc.drawer.MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
        mdcInstance.topAppBar = mdc.topAppBar.MDCTopAppBar.attachTo(document.getElementById('app-bar'));
        mdcInstance.topAppBar.setScrollTarget(document.getElementById('main-content'));
        mdcInstance.drawer.open = true;
        asideStat = 1;
    }
}

window.addEventListener('resize', modalHandle);

let laY = -1;

window.addEventListener('load', function () {
    document.getElementById("iProg").style.opacity = 0;
    setInterval(function () {
        lists = document.querySelector('aside').querySelectorAll('.mdc-list-item');
        headers = document.querySelectorAll('h2');
        for (i = headers.length - 1; i >= 0; i--) {
            viewY = elem["scrollTop"] + headers[i].getBoundingClientRect().top - document.getElementById('app-bar').offsetHeight - 7;
            if (elem["scrollTop"] >= viewY) {
                if (laY == i) return;
                laY = i;
                for (j = 0; j < lists.length; j++) removeClass(lists[j], "mdc-list-item--activated");
                addClass(lists[i + 1], "mdc-list-item--activated");
                return;
            }
        }
        if (laY == 0) return;
        laY = 0;
        for (i = 0; i < lists.length; i++) removeClass(lists[i], "mdc-list-item--activated");
        addClass(lists[0], "mdc-list-item--activated");
    }, 100)
});