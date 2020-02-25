function initMdc() {
    for (var i = 0; i < document.querySelectorAll('.mdc-ripple').length; i++)
        mdc.ripple.MDCRipple.attachTo(document.querySelectorAll('.mdc-ripple')[i]);
    mdcInstance.topAppBar = mdc.topAppBar.MDCTopAppBar.attachTo(document.getElementById('app-bar'));
    mdcInstance.topAppBar.setScrollTarget(document.getElementById('main-content'));
    mdcInstance.topAppBar.listen('MDCTopAppBar:nav', function () {
        mdcInstance.drawer.open = !mdcInstance.drawer.open;
    });
    mdcInstance.accountmenu = new mdc.menu.MDCMenu(document.getElementById('accountMenu'));
    mdcInstance.accountmenu.setAnchorElement(document.getElementById('accountInfo'));
    mdcInstance.accountButton = new mdc.ripple.MDCRipple(document.getElementById('accountInfo'));
    mdcInstance.accountButton.unbounded = true;
    mdcInstance.progress = new mdc.linearProgress.MDCLinearProgress.attachTo(document.querySelector('.mdc-linear-progress'));
    mdcInstance.progress.determinate = false;
    mdcInstance.list = mdc.list.MDCList.attachTo(document.querySelector('.mdc-list'));
    mdcInstance.list.wrapFocus = true;
    mdcInstance.drawer = mdc.drawer.MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
}

let orgY, toY, laY = -1;
let elem;

function animate() {
    dY = toY - orgY;
    if (Math.abs(dY) < 1) {
        elem["scrollTop"] = toY;
        return;
    }
    if (Math.abs(elem["scrollTop"] - orgY) > 1) return;
    orgY += dY / 20;
    elem["scrollTop"] = orgY;
    requestAnimationFrame(animate);
}

function scrollToCont(id = "") {
    orgY = elem["scrollTop"];
    toY = elem["scrollTop"] + document.getElementById("cont_" + id).getBoundingClientRect().top - document.getElementById('app-bar').offsetHeight - 5;
    height = document.getElementById('main-content').scrollHeight;
    toY = Math.min(toY, height - document.getElementById('main-content').offsetHeight);
    requestAnimationFrame(animate);
}


window.addEventListener('DOMContentLoaded', function () {
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
        if (mdcInstance.drawer) mdcInstance.drawer.destroy();
        document.getElementById('modalBack').className = 'mdc-drawer-scrim';
        mdcInstance.drawer = mdc.drawer.MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
        mdcInstance.topAppBar = mdc.topAppBar.MDCTopAppBar.attachTo(document.getElementById('app-bar'));
        mdcInstance.topAppBar.setScrollTarget(document.getElementById('main-content'));
        mdcInstance.topAppBar.listen('MDCTopAppBar:nav', function () {
            mdcInstance.drawer.open = !mdcInstance.drawer.open;
        });
        mdcInstance.drawer.open = false;
        asideStat = 0;
    }
    if (window.innerWidth > 1024 && asideStat != 1) {
        removeClass(document.querySelector('aside'), 'mdc-drawer--modal');
        addClass(document.querySelector('aside'), 'mdc-drawer--dismissible');
        addClass(document.getElementById('mdc-content'), 'mdc-drawer-app-content');
        if (mdcInstance.drawer) mdcInstance.drawer.destroy();
        document.getElementById('modalBack').className = '';
        mdcInstance.drawer = mdc.drawer.MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
        mdcInstance.topAppBar = mdc.topAppBar.MDCTopAppBar.attachTo(document.getElementById('app-bar'));
        mdcInstance.topAppBar.setScrollTarget(document.getElementById('main-content'));
        mdcInstance.topAppBar.listen('MDCTopAppBar:nav', function () {
            mdcInstance.drawer.open = !mdcInstance.drawer.open;
        });
        mdcInstance.drawer.open = true;
        asideStat = 1;
    }
}

window.addEventListener('resize', modalHandle);

window.addEventListener('load', function () {
    document.getElementById("iProg").style.opacity = 0;
    setInterval(function () {
        lists = document.querySelectorAll('.mdc-list-item');
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