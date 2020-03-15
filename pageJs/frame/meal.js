var prevDate, nextDate;
var prevMT, nextMT;
var mySiema;
var originalWidth, laChangedElId, isFocused;
var curr;
var nowGetting = 0;

function initMdc_meal() {
    mdcInstance.fail = new mdc.snackbar.MDCSnackbar(document.getElementById('reqFailed'));
}

function frameInit_meal() {
    isFocused = false;
    laChangedElId = false;
    originalWidth = false;
    curr = false;
    window.dispatchEvent(new Event('resize'));
    typeStr = ['breakfast', 'lunch', 'dinner'];
    typeKStr = ['아침', '점심', '저녁'];

    date = new Date('2019-05-01T03:24:00');
    if ((date.getHours() >= 19 && date.getMinutes() > 20) || date.getHours() > 19) {
        date.setDate(date.getDate() + 1);
        mealType = 0;
    } else if ((date.getHours() >= 13 && date.getMinutes() > 20) || date.getHours() > 13) mealType = 2;
    else if ((date.getHours() >= 8 && date.getMinutes() > 20) || date.getHours() > 8) mealType = 1;
    else mealType = 0;

    prevDate = new Date(date);
    nextDate = new Date(date);
    prevMT = mealType;
    nextMT = mealType;
    mealView = document.getElementById('mealView');

    var dr;
    if (document.body.offsetWidth < 768) dr = true;
    else dr = false;

    mySiema = new Siema({
        perPage: {
            768: 3,
            1080: 5
        },
        draggable: dr,
        onChange: () => {
            if (!isFocused) {
                t = mySiema.currentSlide;
                for (var i = t; i < 6; i++) {
                    setTimeout(() => {
                        getPrevMeal();
                        mySiema.prepend(createElementMeal(prevDate, prevMT, -1));
                    }, 300);
                }
                t = mySiema.currentSlide;
                f = document.getElementById('mealView').childNodes[0].childNodes.length - 9;
                for (var i = f; i < t; i++) {
                    setTimeout(() => {
                        getNextMeal();
                        mySiema.append(createElementMeal(nextDate, nextMT));
                    }, 300);
                }
            }
        }
    });
    document.getElementById('mealView').style.display = 'none';
    mySiema.append(createElementMeal(nextDate, nextMT, 1));
    getNextMeal();
    mySiema.append(createElementMeal(nextDate, nextMT, 2));
    getNextMeal();
    mySiema.append(createElementMeal(nextDate, nextMT, 3));
    getNextMeal();
    mySiema.append(createElementMeal(nextDate, nextMT, 4));
    getNextMeal();
    mySiema.append(createElementMeal(nextDate, nextMT, 5));
    getNextMeal();
    mySiema.append(createElementMeal(nextDate, nextMT, 6));
    getNextMeal();
    mySiema.append(createElementMeal(nextDate, nextMT));
    getNextMeal();
    mySiema.append(createElementMeal(nextDate, nextMT));
    getNextMeal();
    mySiema.append(createElementMeal(nextDate, nextMT));
    getNextMeal();
    mySiema.append(createElementMeal(nextDate, nextMT));
    getPrevMeal();
    mySiema.prepend(createElementMeal(prevDate, prevMT, -1));
    getPrevMeal();
    mySiema.prepend(createElementMeal(prevDate, prevMT, -1));
    getPrevMeal();
    mySiema.prepend(createElementMeal(prevDate, prevMT, -1));
    setTimeout(function () {
        document.getElementById('mealView').style.display = 'block';
        window.dispatchEvent(new Event('resize'));
    }, 200);
    setTimeout(function () {
        removeClass(document.querySelector('.mealCardIntro1'), 'mealCardIntro1');
        removeClass(document.querySelector('.mealCardIntro2'), 'mealCardIntro2');
        removeClass(document.querySelector('.mealCardIntro3'), 'mealCardIntro3');
        removeClass(document.querySelector('.mealCardIntro4'), 'mealCardIntro4');
        removeClass(document.querySelector('.mealCardIntro5'), 'mealCardIntro5');
        removeClass(document.querySelector('.mealCardIntro6'), 'mealCardIntro6');
    }, 900);
}


function getPrevMeal() {
    if (prevMT > 0) --prevMT;
    else {
        prevMT = 2;
        prevDate.setDate(prevDate.getDate() - 1)
    }
}

function getNextMeal() {
    if (nextMT < 2) ++nextMT;
    else {
        nextMT = 0;
        nextDate.setDate(nextDate.getDate() + 1)
    }
}

function closeDetail() {
    var fl = 0;
    if (document.body.offsetWidth > 1080) fl = 1;
    if (laChangedElId) {
        document.getElementById(laChangedElId).parentElement.style.width = (originalWidth).toString() + '%';
        document.getElementById(laChangedElId).parentElement.style.marginLeft = '0';
        document.getElementById(laChangedElId).parentElement.style.marginRight = '0';
        document.getElementById(laChangedElId).style.minHeight = '300px';
        document.getElementById(laChangedElId).style.position = '';
        setTimeout(function () {
            document.getElementById('mealView').childNodes[0].style.display = 'block';
            isFocused = false;
            t = mySiema.currentSlide;
            for (var i = t; i < 6; i++) {
                setTimeout(() => {
                    getPrevMeal();
                    mySiema.prepend(createElementMeal(prevDate, prevMT, -1));
                }, 300);
            }
            t = mySiema.currentSlide;
            f = document.getElementById('mealView').childNodes[0].childNodes.length - 9;
            for (var i = f; i < t; i++) {
                setTimeout(() => {
                    getNextMeal();
                    mySiema.append(createElementMeal(nextDate, nextMT));
                }, 300);
            }
        }, 300);
        document.getElementById('hide-card').remove();
        mySiema.goTo(curr - fl);
    }
    document.getElementById(laChangedElId).onclick = clickCard;
    laChangedElId = "";
}

function clickCard() {
    isFocused = true;
    var li = document.getElementById('mealView').childNodes[0].childNodes;
    for (var i = 1; i < li.length; i++) {
        if (li[i].childNodes[0].id == this.id) break;
    }
    curr = i - 1;
    var fl = 0;
    if (document.body.offsetWidth > 1080) fl = 1;
    mySiema.goTo((curr + 0.5 - fl * 2));
    originalWidth = parseFloat(this.parentElement.style.width);
    if (laChangedElId) {
        document.getElementById(laChangedElId).parentElement.style.width = (originalWidth).toString() + '%';
        document.getElementById(laChangedElId).parentElement.style.marginLeft = '0';
        document.getElementById(laChangedElId).parentElement.style.marginRight = '0';
        document.getElementById(laChangedElId).style.position = '';
        document.getElementById('mealView').childNodes[0].style.display = 'block';
    }
    this.parentElement.style.transition = '.3s ease-out all';
    this.parentElement.style.width = (originalWidth * (2 + fl * 2)).toString() + '%';
    this.parentElement.style.marginLeft = '30px';
    this.parentElement.style.marginRight = '30px';
    this.style.position = 'relative';
    document.getElementById('mealView').childNodes[0].style.display = 'flex';
    this.parentElement.innerHTML = '<div id="hide-card" onclick="closeDetail();"></div>' + this.parentElement.innerHTML;
    laChangedElId = this.id;
}

function createElementMeal(date, type, op) {
    if (nowGetting == 0) {
        var timing;
        if (isFirstFrame) timing = 0;
        else if (document.getElementById('mealView').childNodes[0].childNodes.length == 0) timing = 1000;
        else timing = 0;
        setTimeout(function () {
            setProgressBar(0.8);
        }, timing);
    }
    nowGetting++;
    let tEl = document.createElement('div');
    tEl.id = 'mealObj_' + date.toString() + type.toString();
    tEl.classList = 'mdc-card mdc-elevation--z5 mealCard';
    if (op > 0) tEl.classList += ' mealCardIntro' + op.toString();
    else if (op == -1) tEl.classList += ' mealCardLeft';
    else tEl.classList += ' mealCardRight';
    tEl.style.margin = '10px';
    tEl.style.minHeight = '300px';
    tEl.style.borderRadius = '10px';
    tEl.style.transition = '.5s ease-out all';
    var todayStr = date.toString() + type.toString();
    tEl.innerHTML = '<div style="padding:10px;"><h2>' + (date.getMonth() + 1) + '월 ' + date.getDate() + '일 ' + typeKStr[type] + '</h2><div id="mealInfo_' + todayStr + '">로딩중...</div></div>';
    fetch('https://api.iasa.kr/meal?date=' + (date.getFullYear()).toString() + (('0' + (date.getMonth() + 1).toString()).slice(-2)) + (('0' + date.getDate().toString()).slice(-2)) + '&type=' + type).then(function (response) {
        return response.json().then(function (data) {
            return {
                status: response.status,
                body: data
            };
        });
    }).then(function (res) {
        if (res.status == 200) {
            document.getElementById('mealInfo_' + todayStr).innerHTML = '';
            for (var i = 0; i < res.body.length; i++) {
                document.getElementById('mealInfo_' + todayStr).innerHTML += '<p>' + res.body[i].name + '</p>';
            }
        } else {
            document.getElementById('mealInfo_' + todayStr).innerHTML = res.body.message;
        }
        nowGetting--;
        if (nowGetting == 0) {
            document.querySelector('.mdc-linear-progress__primary-bar').style.transition = '';
            setProgressBar(1);
        }
    }).catch(function (err) {
        mdcInstance.fail.open();
    });
    if (document.body.offsetWidth >= 768) tEl.onclick = clickCard;
    return tEl;
}
