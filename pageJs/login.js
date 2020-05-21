let uName;

function enterId() {
    document.getElementById("iProg").style.opacity = 1;
    document.getElementById("uid").disabled = true;
    document.getElementById("enterId").disabled = true;
    document.getElementById("forgotId").disabled = true;
    document.getElementById("signupButton").disabled = true;
    document.getElementById("errId").style.display = 'none';
    if (String(document.getElementById("uid").value).length === 0) {
        loginError(0, "아이디를 입력하세요.");
        return;
    }
    fetch('https://api.iasa.kr/account/getname?id=' + document.getElementById("uid").value, {
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
            setTimeout(function () {
                uName = JSON.parse(res.body)['name'];
                setHeader(uName + '님, 안녕하세요.', '비밀번호를 입력해서 로그인');
                setPrevForm("id");
                document.getElementById("iProg").style.opacity = 0;
                moveToForm("pass");
                setTimeout(function () {
                    mdcInstance.passInput.focus();
                }, 500);
            }, 500);
        } else {
            setTimeout(function () {
                loginError(0, "아이디가 존재하지 않습니다.");
            }, 500);
        }
    });
}

function enterPass() {
    document.getElementById("iProg").style.opacity = 1;
    document.getElementById("upass").disabled = true;
    document.getElementById("enterPass").disabled = true;
    document.getElementById("forgotPass").disabled = true;
    document.getElementById("errPass").style.display = 'none';
    if (String(document.getElementById("upass").value).length === 0) {
        loginError(1, "비밀번호를 입력하세요.");
        return;
    }
    fetch('https://api.iasa.kr/account/signin?id=' + document.getElementById("uid").value + '&password=' + document.getElementById("upass").value, {
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
            setCookie('auth', res.body, 365);
            setCookie('name', uName, 365);
            setTimeout(function () {
                window.removeEventListener('popstate', popStateHandler);
                history.back();
                try {
                    if (getQueryString('next')) {
                        location.replace(atob(getQueryString('next')) + '#login');
                    } else {
                        location.replace('/#login');
                    }
                } catch (e) {
                    location.replace('/#login');
                }
            }, 800);
        } else loginError(1, '잘못된 비밀번호입니다.');
    });
}

function setHeader(primary, secondary) {
    document.getElementById("mainHeader").innerHTML = primary;
    document.getElementById("subHeader").innerHTML = secondary;
}

function clickFindId() {
    document.getElementById("iProg").style.opacity = 1;
    document.getElementById("fidName").disabled = true;
    document.getElementById("fidEmail").disabled = true;
    document.getElementById("fidContinue").disabled = true;
    document.getElementById("errFId").style.display = 'none';
    if (String(document.getElementById("fidName").value).length == 0) {
        loginError(2, "이름을 입력하세요.");
        return;
    }
    if (String(document.getElementById("fidEmail").value).length == 0) {
        loginError(2, "이메일을 입력하세요.");
        return;
    }

    fetch('https://api.iasa.kr/account/findid?name=' + document.getElementById("fidName").value + '&email=' + document.getElementById("fidEmail").value, {
        method: 'POST'
    }).then(function (res) {
        return res.text().then(function (data) {
            return {
                status: res.status,
                body: data
            };
        });
    }).then(function (res) {
        if (res.status != 200) {
            loginError(2, "정보가 올바르지 않습니다.");
            return;
        }
        document.getElementById("uid").value = JSON.parse(res.body)['id'];
        document.getElementById('foundID').innerText = JSON.parse(res.body)['id'];
        moveToForm('idFound');
        setHeader('아이디 찾기', '아이디를 찾았습니다.');
        history.back();
        setTimeout(function () {
            history.pushState(null, null, '#');
            history.back();
            currentLevel = 0;
        }, 500);
        setTimeout(function () {
            document.getElementById("fidName").disabled = false;
            document.getElementById("fidEmail").disabled = false;
            document.getElementById("fidContinue").disabled = false;
            document.getElementById("fidContinue").focus();
            document.getElementById("iProg").style.opacity = 0;
        }, 300);
    })

}

function reqFindId(noupdateURL) {
    moveToForm('findId', noupdateURL);
    setHeader('아이디 찾기', '이름과 이메일을 입력하세요.');
    setPrevForm("id");
    setTimeout(function () {
        document.getElementById("fidName").focus();
    }, 500);
}

function reqFindPass(noupdateURL) {
    moveToForm('findPass', noupdateURL);
    setHeader('비밀번호 찾기', '이름과 이메일을 입력하세요.');
    setPrevForm("pass");
    setTimeout(function () {
        document.getElementById("fpassName").focus();
    }, 500);
}

function togglePassword(id) {
    let x = document.getElementById(id);
    if (x.type === "password") {
        x.type = "text";
        document.getElementById("passToggle").style.color = "#5351db";
    } else {
        x.type = "password";
        document.getElementById("passToggle").style.color = "#bbbbbb";
    }
}


function loginWithFoundId() {
    document.getElementById("iProg").style.opacity = 1;
    moveToForm('id');
    setHeader('로그인', 'IASA Portal로 계속');
    setPrevForm('');
    setTimeout(function () {
        mdcInstance.idInput.focus();
        document.getElementById("iProg").style.opacity = 0;
    }, 500);
}

function loginError(type, msg) {
    if (type == 0) {
        document.getElementById('errIdMsg').innerHTML = msg;
        document.getElementById("errId").style.display = 'inherit';
        mdcInstance.idInput.valid = false;
        document.getElementById("uid").disabled = false;
        document.getElementById("enterId").disabled = false;
        document.getElementById("forgotId").disabled = false;
        document.getElementById("signupButton").disabled = false;
        mdcInstance.idInput.focus();
        setTimeout(function () {
            document.getElementById("iProg").style.opacity = 0;
        }, 200);
    }
    if (type == 1) {
        document.getElementById('errPassMsg').innerHTML = msg;
        document.getElementById("errPass").style.display = 'inherit';
        mdcInstance.passInput.valid = false;
        document.getElementById("upass").disabled = false;
        document.getElementById("enterPass").disabled = false;
        document.getElementById("forgotPass").disabled = false;
        mdcInstance.passInput.focus();
        setTimeout(function () {
            document.getElementById("iProg").style.opacity = 0;
        }, 200);
    }
    if (type == 2) {
        document.getElementById('errFIdMsg').innerHTML = msg;
        document.getElementById("errFId").style.display = 'inherit';
        mdcInstance.fidName.valid = false;
        mdcInstance.fidEmail.valid = false;
        document.getElementById("clickFindId").disabled = false;
        document.getElementById("fidName").disabled = false;
        document.getElementById("fidEmail").disabled = false;
        document.getElementById("fidName").focus();
        setTimeout(function () {
            document.getElementById("iProg").style.opacity = 0;
        }, 200);
    }
    if (type == 3) {
        document.getElementById('errCodeMsg').innerHTML = msg;
        document.getElementById("errCode").style.display = 'inherit';
        mdcInstance.signupCode.valid = false;
        document.getElementById("signupCode").disabled = false;
        document.getElementById("signupCode").focus();
        setTimeout(function () {
            document.getElementById("iProg").style.opacity = 0;
        }, 200);
    }
    if (type == 4) {
        document.getElementById('errSignupMsg').innerHTML = msg;
        document.getElementById("errSignup").style.display = 'inherit';
        mdcInstance.signupId.disabled = false;
        mdcInstance.signupEmail.disabled = false;
        mdcInstance.signupPass.disabled = false;
        mdcInstance.signupPassConf.disabled = false;
        document.getElementById("signupId").focus();
        setTimeout(function () {
            document.getElementById("iProg").style.opacity = 0;
        }, 200);
    }
}