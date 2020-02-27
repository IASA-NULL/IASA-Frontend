let mdcInstance = Object();

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
    __scroll_elem = document.getElementById('main-content');
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

function logOut() {
    eraseCookie('auth');
    location.replace('/login?next=' + btoa(window.location.href));
}

function isLogin() {
    return !!getCookie('auth');
}