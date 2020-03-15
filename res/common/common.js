if (location.protocol != 'https:') {
    document.querySelector('body').style.display = 'none';
    location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
}

let mdcInstance = Object();

let nowProgressProc = 0;

function setProgressBar(proc) {
    document.getElementById('iProg').style.opacity = '1';
    if (proc == 1) document.querySelector('.mdc-linear-progress__primary-bar').style.transition = '';
    else if (nowProgressProc < proc) document.querySelector('.mdc-linear-progress__primary-bar').style.transition = 'transform 10s 0ms cubic-bezier(.23,.9,.39,1.01)';
    else {
        document.querySelector('.mdc-linear-progress__primary-bar').style.transition = 'none';
        mdcInstance.progress.progress = 0;
        setTimeout(function () {
            document.querySelector('.mdc-linear-progress__primary-bar').style.transition = 'transform 10s 0ms cubic-bezier(.23,.9,.39,1.01)';
        }, 50);
    }
    nowProgressProc = proc;
    setTimeout(function () {
        mdcInstance.progress.progress = proc;
    }, 100);
    setTimeout(function () {
        if (nowProgressProc == 1) document.getElementById('iProg').style.opacity = '0';
    }, 500);
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}

function hasClass(ele, cls) {
    if (!ele) return false;
    return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

function addClass(ele, cls) {
    if (!ele) return;
    if (!hasClass(ele, cls)) ele.className += " " + cls;
}

function removeClass(ele, cls) {
    if (!ele) return;
    if (hasClass(ele, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        ele.className = ele.className.replace(reg, ' ');
    }
}

function isIE() {
    ua = navigator.userAgent;
    var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
    return is_ie;
}


let __scroll_orgY, __scroll_toY;
let __scroll_elem;


window.addEventListener('DOMContentLoaded', function () {
    for (var i = 0; i < document.querySelectorAll('.mdc-ripple').length; i++)
        mdc.ripple.MDCRipple.attachTo(document.querySelectorAll('.mdc-ripple')[i]);
    __scroll_elem = document.getElementById('main-content');
    if (!String.prototype.includes) {
        String.prototype.includes = function (search, start) {
            if (typeof start !== 'number') {
                start = 0;
            }

            if (start + search.length > this.length) {
                return false;
            } else {
                return this.indexOf(search, start) !== -1;
            }
        };
    }
    if (!String.prototype.padStart) {
        String.prototype.padStart = function padStart(targetLength, padString) {
            targetLength = targetLength >> 0; //truncate if number or convert non-number to 0;
            padString = String((typeof padString !== 'undefined' ? padString : ' '));
            if (this.length > targetLength) {
                return String(this);
            } else {
                targetLength = targetLength - this.length;
                if (targetLength > padString.length) {
                    padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
                }
                return padString.slice(0, targetLength) + String(this);
            }
        };
    }
    if (!String.prototype.replaceAll) {
        String.prototype.replaceAll = function (find, replace) {
            var str = this;
            return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
        };
    }
    (function (arr) {
        arr.forEach(function (item) {
            if (item.hasOwnProperty('remove')) {
                return;
            }
            Object.defineProperty(item, 'remove', {
                configurable: true,
                enumerable: true,
                writable: true,
                value: function remove() {
                    if (this.parentNode === null) {
                        return;
                    }
                    this.parentNode.removeChild(this);
                }
            });
        });
    })([Element.prototype, CharacterData.prototype, DocumentType.prototype]);
});

function __scroll_animate() {
    dY = __scroll_toY - __scroll_orgY;
    if (Math.abs(dY) < 1) {
        __scroll_elem["scrollTop"] = __scroll_toY;
        return;
    }
    if (Math.abs(__scroll_elem["scrollTop"] - __scroll_orgY) > 1) return;
    __scroll_orgY += dY / 20;
    __scroll_elem["scrollTop"] = __scroll_orgY;
    requestAnimationFrame(__scroll_animate);
}

function scrollToCont(id) {
    __scroll_orgY = __scroll_elem["scrollTop"];
    __scroll_toY = __scroll_elem["scrollTop"] + document.getElementById("cont_" + id).getBoundingClientRect().top - document.getElementById('app-bar').offsetHeight - 5;
    height = document.getElementById('main-content').scrollHeight;
    __scroll_toY = Math.min(__scroll_toY, height - document.getElementById('main-content').offsetHeight);
    requestAnimationFrame(__scroll_animate);
}

function getQueryString() {
    var key = false, res = {}, itm = null;
    var qs = location.search.substring(1);
    if (arguments.length > 0 && arguments[0].length > 1)
        key = arguments[0];
    var pattern = /([^&=]+)=([^&]*)/g;
    while (itm = pattern.exec(qs)) {
        if (key !== false && decodeURIComponent(itm[1]) === key)
            return decodeURIComponent(itm[2]);
        else if (key === false)
            res[decodeURIComponent(itm[1])] = decodeURIComponent(itm[2]);
    }

    return key === false ? res : null;
}

function getDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    return (yyyy + mm + dd);
}

function logOut() {
    eraseCookie('auth');
    location.replace('/login?next=' + btoa(location.pathname + location.search));
}

function logIn() {
    if (location.pathname == '/about') location.href = '/login';
    else location.replace('/login?next=' + btoa(location.pathname + location.search));
}

function isLogin() {
    return !!getCookie('auth');
}