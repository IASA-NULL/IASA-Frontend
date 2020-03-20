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
        alert('회원가입이 완료되었습니다!');
        location.replace('/login');
    }
}).catch(function () {
    alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    location.replace('/about');
});