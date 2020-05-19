var nowLoadStat = 0, totalLoadStat = 2;
var isFrameLoaded = Object();
var isFirstFrame = true;

if (!isLogin()) {
    document.querySelector('body').style.display = 'none';
    location.replace('/about');
}

let activeSection = location.pathname.split('/')[1];
if (activeSection == "") activeSection = "alert";
if (activeSection == 'myeonbul') totalLoadStat++;

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
    mdcInstance.list = mdc.list.MDCList.attachTo(document.querySelector('.mdc-list'));
    mdcInstance.list.wrapFocus = true;
    mdcInstance.drawer = mdc.drawer.MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
    mdcInstance.noIE = new mdc.snackbar.MDCSnackbar(document.getElementById('noIE'));
    mdcInstance.progress = new mdc.linearProgress.MDCLinearProgress.attachTo(document.querySelector('.mdc-linear-progress'));
    mdcInstance.errinit = new mdc.dialog.MDCDialog(document.getElementById('errInit'));
    mdcInstance.accountmenu = new mdc.menu.MDCMenu(document.getElementById('accountMenu'));
    mdcInstance.accountmenu.setAnchorElement(document.getElementById('accountInfo'));
    mdcInstance.accountmenu.setFixedPosition(true);
    mdcInstance.accountButton = new mdc.ripple.MDCRipple(document.getElementById('accountInfo'));
    mdcInstance.accountButton.unbounded = true;
    mdcInstance.errinit.scrimClickAction = "";
    mdcInstance.errinit.escapeKeyAction = "";
}

function searchRes(str) {
    let cont = document.querySelectorAll('.subject');
    let laCont;
    for (let i = 0; i < cont.length; i++) {
        let tcr = cont[i].querySelectorAll('.teacher');
        let fl = 0;
        for (let j = 0; j < tcr.length; j++) {
            if (tcr[j].innerHTML.trim().includes(str) || !str) {
                tcr[j].style.display = "";
                fl = 1;
            } else tcr[j].style.display = "none";
        }
        if (fl) {
            cont[i].style.display = "";
            cont[i].querySelector('hr').style.display = "";
            laCont = cont[i];
        } else cont[i].style.display = "none";
    }
    if (laCont) {
        laCont.querySelector('hr').style.display = "none";
        document.getElementById('noResult').style.display = "none";
    } else {
        document.getElementById('noResult').style.display = "";
    }
}

var gSecName;

function selectSection(secName, laSection) {
    if (secName == activeSection && laSection === undefined) return;
    isFirstFrame = false;
    setProgressBar(0.1);
    fetch('//api.iasa.kr/frame?file=' + secName + '&id=' + getCookie('id') + '&token=' + getCookie('auth')).then(function (res) {
        return res.text().then(function (data) {
            return {
                status: res.status,
                body: data
            };
        });
    }).then(function (res) {
        if (res.status == 403 || res.status == 400) {
            alert('로그인 토큰이 만료되었습니다. 다시 로그인 해 주세요.');
            logOut();
        }
        const text = res.body;
        setProgressBar(0.6);
        if (document.getElementById('sec_' + secName) === null) {
            let newEl = document.createElement('div');
            newEl.id = "sec_" + secName;
            newEl.className = "section";
            document.getElementById('sec-wrapper').appendChild(newEl);
        }
        document.getElementById('sec_' + secName).innerHTML = "";
        document.getElementById('sec_' + secName).innerHTML = text;
        if (!isFrameLoaded[secName]) {
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = '/pageJs/frame/' + secName + '.js';
            document.body.appendChild(script);
        }
        isFrameLoaded[secName] = true;
        gSecName = secName;

        function tmpIntv() {
            try {
                window['initMdc_' + gSecName]();
                window['frameInit_' + gSecName]();
                setTimeout(function () {
                    setProgressBar(1);
                }, 100);
                clearInterval(scrIntv);
            } catch (e) {

            }
        }

        var scrIntv = setInterval(tmpIntv, 100);

        let sec = document.querySelectorAll('.section');
        for (var i = 0; i < sec.length; i++) {
            removeClass(sec[i], "section-visible");
            removeClass(sec[i], "section-visible-on-start");
            removeClass(sec[i], "section-hidden");
            addClass(sec[i], "section-disabled");
        }
        if (laSection === undefined) {
            laSection = activeSection;
            activeSection = secName;
            history.pushState(null, null, '/' + secName);
        }
        removeClass(document.getElementById('sec_' + laSection), "section-visible");
        removeClass(document.getElementById('sec_' + laSection), "section-disabled");
        addClass(document.getElementById('sec_' + laSection), "section-hidden");
        setTimeout(function () {
            removeClass(document.getElementById('sec_' + laSection), "section-hidden");
            removeClass(document.getElementById('sec_' + laSection), "section-visible");
            addClass(document.getElementById('sec_' + laSection), "section-disabled");
            removeClass(document.getElementById('sec_' + secName), "section-hidden");
            removeClass(document.getElementById('sec_' + secName), "section-disabled");
            addClass(document.getElementById('sec_' + secName), "section-visible");
        }, 210);
        let li = document.querySelectorAll('.mdc-list-item');
        for (var i = 0; i < li.length; i++) {
            removeClass(li[i], 'mdc-list-item--activated');
            removeClass(li[i], 'mdc-ripple-upgraded--background-focused');
        }

        addClass(document.getElementById('li_' + activeSection), 'mdc-list-item--activated');
    }).catch(function () {
        mdcInstance.errinit.open();
    });
}

addEventListener("popstate", function (e) {
    selectSection(location.pathname.split('/')[1], activeSection);
    activeSection = location.pathname.split('/')[1];
});

function closeSnackbar() {
    mdcInstance.loading.close();
    mdcInstance.fail.close();
    mdcInstance.reqsucc.close();
    mdcInstance.reqForm.close();
}

let res;

function init() {
    fetch('//api.iasa.kr/frame?file=_list&id=' + getCookie('id') + '&token=' + getCookie('auth')).then(function (res) {
        return res.text().then(function (data) {
            return {
                status: res.status,
                body: data
            };
        });
    }).then(function (res) {
        if (res.status !== 200) throw new Error;
        document.getElementById('menu-list').innerHTML = res.body;
        history.replaceState(null, null, '/' + activeSection);
        removeClass(document.getElementById('sec_' + activeSection), 'section-disabled');
        addClass(document.getElementById('li_' + activeSection), 'mdc-list-item--activated');
        initMdc();
        modalHandle();
        if (isIE()) mdcInstance.noIE.open();
        menuEl = document.querySelector('aside').querySelectorAll('a');
        for (i = 0; i < menuEl.length; i++) {
            menuEl[i].addEventListener('click', function () {
                if (asideStat == 0) mdcInstance.drawer.open = false;
            })
        }
        document.getElementById("iProg").style.opacity = 0;
        fetch('//api.iasa.kr/frame?file=' + activeSection + '&id=' + getCookie('id') + '&token=' + getCookie('auth')).then(function (res) {
            return res.text().then(function (data) {
                return {
                    status: res.status,
                    body: data
                };
            });
        }).then(function (res) {
            if (res.status == 403 || res.status == 400) {
                alert('로그인 토큰이 만료되었습니다. 다시 로그인 해 주세요.');
                logOut();
            }
            let newEl = document.createElement('div');
            newEl.id = "sec_" + activeSection;
            newEl.className = "section";
            document.getElementById('sec-wrapper').appendChild(newEl);
            const text = res.body;
            document.getElementById('sec_' + activeSection).innerHTML = text;
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = '/pageJs/frame/' + activeSection + '.js';
            document.body.appendChild(script);
            let scrIntv = setInterval(function () {
                try {
                    window['initMdc_' + activeSection]();
                    window['frameInit_' + activeSection]();
                    clearInterval(scrIntv)
                } catch (e) {

                }
            }, 100);
            loadFin();
            isFrameLoaded[activeSection] = true;
        }).catch(() => {
            mdcInstance.errinit = new mdc.dialog.MDCDialog(document.getElementById('errInit'));
            mdcInstance.errinit.scrimClickAction = "";
            mdcInstance.errinit.escapeKeyAction = "";
            mdcInstance.errinit.open();
        });
    }).catch(() => {
        mdcInstance.errinit.open();
    });
}

loadIntv = setInterval(function () {
    if (document.readyState == 'complete') {
        init();
        clearInterval(loadIntv);
    }
}, 100);

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

function loadFin() {
    ++nowLoadStat;
    if (nowLoadStat == totalLoadStat) {
        document.body.style.cursor = 'default';
        setTimeout(function () {
            document.getElementById("preloader").style.opacity = 0;
            addClass(document.getElementById('sec_' + activeSection), 'section-visible-on-start');
            setTimeout(function () {
                document.getElementById("preloader").style.display = "none";
            }, 400);
        }, Math.max(0, 700 - Date.now() + timerStart));
    }
}

window.addEventListener('resize', modalHandle);
window.addEventListener('load', function () {
    loadFin();
});