token = getQueryString('token');
fetch('https://api.iasa.kr/account/signup?token=' + token, {
    method: 'POST'
}).then(function (res) {
    return res.text().then(function (data) {
        return {
            status: res.status,
            body: data
        };
    });
}).then(function (res) {
    if (res.status == 200) {
        mdcInstance.succ = new mdc.dialog.MDCDialog(document.getElementById('succ'));
        mdcInstance.succ.scrimClickAction = "";
        mdcInstance.succ.escapeKeyAction = "";
        mdcInstance.succ.open();
    } else throw new Error();
}).catch(function () {
    mdcInstance.err = new mdc.dialog.MDCDialog(document.getElementById('err'));
    mdcInstance.err.scrimClickAction = "";
    mdcInstance.err.escapeKeyAction = "";
    mdcInstance.err.open();
});