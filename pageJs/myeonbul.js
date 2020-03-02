function getMyeonbul() {
    document.body.style.cursor = 'wait';
    document.getElementById('myeonbulList').innerHTML = '<tr class="mdc-data-table__row"><td class="mdc-data-table__cell" colspan="5">불러오는 중...</td></tr>';
    fetch('https://api.iasa.kr/myeonbul?student=2018001', {
        method: 'GET',
        headers: {'content-type': 'application/json'}
    }).then(function (response) {
        return response.text();
    }).then(function (text) {
        let fl = true;
        res = JSON.parse(text.replaceAll('True', 'true').replaceAll('False', 'false').replaceAll("Decimal('", '').replaceAll("')", '').replaceAll('"', '').replaceAll("'", '"'));
        document.getElementById('myeonbulList').innerHTML = "";
        document.getElementById('myeonbulToday').innerHTML = "";
        for (let i = 0; i < res.length; i++) {
            document.getElementById('myeonbulList').innerHTML = '<tr class="mdc-data-table__row">' +
                '<td class="mdc-data-table__cell">' + getTeacherName2019(res[i].teacherID) + '</td>' +
                '<td class="mdc-data-table__cell">' + res[i].place + '</td>' +
                '<td class="mdc-data-table__cell">' + (String(res[i].start_time).substr(0, 2) + ':' + String(res[i].start_time).substr(2, 2) + " - " + String(res[i].end_time).substr(0, 2) + ':' + String(res[i].end_time).substr(2, 2)) + '</td>' +
                '<td class="mdc-data-table__cell">' + (String(res[i].date).substr(0, 4) + '/' + String(res[i].date).substr(4, 2) + '/' + String(res[i].date).substr(6, 2)) + '</td>' +
                '<td class="mdc-data-table__cell">' + (res[i].verified ? '승인됨' : '승인 대기중') + '</td>' +
                '</tr>' + document.getElementById('myeonbulList').innerHTML;
            if (String(res[i].date) == getDate()) {
                fl = false;
                document.getElementById('myeonbulToday').innerHTML +=
                    '<div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-4-desktop mdc-layout-grid__cell--span-8-tablet mdc-layout-grid__cell--span-4-phone">' +
                    '<div class="mdc-card myb-card mdc-elevation--z5">' +
                    '<div class="mdc-card__primary-action mdc-ripple" tabindex="0">' +
                    '<h1>' + res[i].title + '</h1>' +
                    '<h3 style="margin:5px;">' + (String(res[i].start_time).substr(0, 2) + ':' + String(res[i].start_time).substr(2, 2) + " - " + String(res[i].end_time).substr(0, 2) + ':' + String(res[i].end_time).substr(2, 2)) + '</h3>' +
                    '<h3 style="margin:5px;">' + getTeacherName2019(res[i].teacherID) + ' 선생님</h3>' +
                    '<h3 style="margin:5px;">' + res[i].place + '</h3>' +
                    '<h3 style="margin:5px;">' + (res[i].verified ? '승인됨' : '승인 대기중') + '</h3>' +
                    '<div class="mdc-layout-grid__inner">' +
                    '<div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-6-desktop mdc-layout-grid__cell--span-4-tablet mdc-layout-grid__cell--span-4-phone">' +
                    '<button class="mdc-button mdc-button--outlined mdc-ripple myb-button"' +
                    'onclick="" id="mybEdit1Submit" style="width:calc(100% - 20px);">' +
                    '<div class="mdc-button__ripple"></div>' +
                    '<i class="material-icons mdc-button__icon" aria-hidden="true">edit</i>' +
                    '<span class="mdc-button__label">수정</span>' +
                    '</button>' +
                    '</div>' +
                    '<div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-6-desktop mdc-layout-grid__cell--span-4-tablet mdc-layout-grid__cell--span-4-phone">' +
                    '<button class="mdc-button mdc-button--outlined mdc-ripple myb-button" onclick="cancelMyeonbulReq(' + "'" + String(res[i].date) + '_' + String(res[i].id) + "'" + ');" id="mybCancel1Submit" style="width:calc(100% - 20px);">' +
                    '<div class="mdc-button__ripple"></div>' +
                    '<i class="material-icons mdc-button__icon" aria-hidden="true">clear</i>' +
                    '<span class="mdc-button__label">취소</span>' +
                    '</button>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
            }
        }
        if (res.length == 0) document.getElementById('myeonbulList').innerHTML = '<tr class="mdc-data-table__row"><td class="mdc-data-table__cell" colspan="5">면불 기록이 없어요!</td></tr>';
        if (fl) document.getElementById('myeonbulToday').innerHTML = '<div class="mdc-layout-grid__cell"><h3 style="font-weight: lighter;">오늘 신청된 면불이 없어요!</h3></div>';
        for (var i = 0; i < document.querySelectorAll('.mdc-ripple').length; i++)
            mdc.ripple.MDCRipple.attachTo(document.querySelectorAll('.mdc-ripple')[i]);
        document.body.style.cursor = 'default';
    }).catch(function (err) {
        mdcInstance.errinit.open();
        document.body.style.cursor = 'default';
    });
}

let mybId;

function cancelMyeonbulReq(myeonbulId) {
    mybId = myeonbulId;
    mdcInstance.cancelDialog.open();
}

function cancelMyeonbulConfirm() {
    closeSnackbar();
    document.getElementById("iProg").style.opacity = 1;
    mdcInstance.loading.open();
    fetch('https://api.iasa.kr/myeonbul?id=' + mybId, {
        method: 'DELETE'
    }).then(function (response) {
        document.getElementById("iProg").style.opacity = 0;
        if (response.status != 200) {
            document.getElementById('reTry').onclick = cancelMyeonbulConfirm();
            closeSnackbar();
            mdcInstance.fail.open();
            return;
        }
        closeSnackbar();
        mdcInstance.reqsucc.open();
        getMyeonbul();
        return;
    }).catch(function (err) {
        document.getElementById("iProg").style.opacity = 0;
        document.getElementById('reTry').onclick = cancelMyeonbulConfirm();
        closeSnackbar();
        mdcInstance.fail.open();
        return;
    })
}

function requestMyeonbul() {
    closeSnackbar();
    if (!mdcInstance.mybTeacher.value || !mdcInstance.mybReason.value || (!document.getElementById('mybTime1').checked && !document.getElementById('mybTime2').checked)) {
        closeSnackbar();
        mdcInstance.reqForm.open();
        return;
    }
    document.getElementById("iProg").style.opacity = 1;
    mdcInstance.loading.open();
    document.getElementById('myeonbulSubmit').disabled = true;
    let stTime, fiTime;
    if (document.getElementById('mybTime1').checked && !document.getElementById('mybTime2').checked) {
        stTime = 1920;
        fiTime = 2100;
    }
    if (!document.getElementById('mybTime1').checked && document.getElementById('mybTime2').checked) {
        stTime = 2130;
        fiTime = 2330;
    }
    if (document.getElementById('mybTime1').checked && document.getElementById('mybTime2').checked) {
        stTime = 1920;
        fiTime = 2330;
    }
    fetch('https://api.iasa.kr/myeonbul', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({
            title: mdcInstance.mybReason.value,
            students: [2018001],
            teacher: mdcInstance.mybTeacher.value,
            place: mdcInstance.mybPlace.value ? mdcInstance.mybPlace.value : "선생님이 지정",
            date: parseInt(getDate()),
            start_time: stTime,
            end_time: fiTime
        })
    }).then(function (response) {
        if (response.status != 201) {
            document.getElementById('reTry').onclick = requestMyeonbul;
            closeSnackbar();
            mdcInstance.fail.open();
            return;
        }
        mdcInstance.mybTeacher.value = "";
        mdcInstance.mybPlace.value = "";
        mdcInstance.mybReason.value = "";
        document.getElementById('mybTime1').checked = false;
        document.getElementById('mybTime2').checked = false;
        closeSnackbar();
        mdcInstance.reqsucc.open();
        getMyeonbul();
    }).catch(function (err) {
        document.getElementById('reTry').onclick = requestMyeonbul;
        closeSnackbar();
        mdcInstance.fail.open();
    })
    document.getElementById('myeonbulSubmit').disabled = false;
    document.getElementById("iProg").style.opacity = 0;
}