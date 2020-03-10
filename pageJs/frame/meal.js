var prevDate, nextDate;
var prevMT, nextMT;
var mySiema;

function initMdc_meal() {

}

function frameInit_meal() {
    window.dispatchEvent(new Event('resize'));
    typeStr = ['breakfast', 'lunch', 'dinner'];
    typeKStr = ['아침', '점심', '저녁'];

    date = new Date();
    if ((date.getHours() >= 19 && date.getMinutes() > 20) || date.getHours() > 19) {
        date.setDate(date.getDate() + 1);
        mealType = 0;
    } else if ((date.getHours() >= 13 && date.getMinutes() > 20) || date.getHours() > 13) mealType = 2;
    else if ((date.getHours() >= 8 && date.getMinutes() > 20) || date.getHours() > 13) mealType = 1;
    else mealType = 0;

    prevDate = new Date(date);
    nextDate = new Date(date);
    prevMT = mealType;
    nextMT = mealType;
    mealView = document.getElementById('mealView');

    mySiema = new Siema({
        perPage: {
            768: 2,
            1024: 3
        },
        draggable: false,
        onChange: () => {
            if (mySiema.currentSlide <= 1) {
                setTimeout(() => {
                    getPrevMeal();
                    mySiema.prepend(createElementMeal(prevDate, prevMT, -1));
                }, 300);
            }
            if (mySiema.currentSlide >= document.getElementById('mealView').childNodes[0].childNodes.length - 7) {
                setTimeout(() => {
                    getNextMeal();
                    mySiema.append(createElementMeal(nextDate, nextMT));
                }, 300);
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
    }, 700);
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

function createElementMeal(date, type, op) {
    let tEl = document.createElement('div');
    tEl.id = 'mealObj_' + date.toString() + type.toString();
    tEl.classList = 'mdc-card mdc-elevation--z5 mealCard';
    if (op > 0) tEl.classList += ' mealCardIntro' + op.toString();
    else if (op == -1) tEl.classList += ' mealCardLeft';
    else tEl.classList += ' mealCardRight';
    tEl.style.margin = '10px';
    tEl.style.height = '300px';
    tEl.style.borderRadius = '10px';
    tEl.innerHTML = '<h2>' + (date.getMonth() + 1) + '월 ' + date.getDate() + '일 ' + typeKStr[type] + '</h2>';
    return tEl;
}
