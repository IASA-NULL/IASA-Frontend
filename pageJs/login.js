function enterId() {
    document.getElementById("iProg").style.opacity = 1;
    document.getElementById("uid").disabled = true;
    document.getElementById("enterId").disabled = true;
    document.getElementById("forgotId").disabled = true;
    document.getElementById("errId").style.display = 'none';
    if (String(document.getElementById("uid").value).length == 0) {
        loginError(0, "아이디를 입력하세요.");
        return;
    }
    if (String(document.getElementById("uid").value) === "hi") {
        setTimeout(function () {
            setHeader('hi', '비밀번호를 입력해서 로그인');
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
}

function enterPass() {
    document.getElementById("iProg").style.opacity = 1;
    document.getElementById("upass").disabled = true;
    document.getElementById("enterPass").disabled = true;
    document.getElementById("forgotPass").disabled = true;
    document.getElementById("errPass").style.display = 'none';
    if (String(document.getElementById("upass").value).length == 0) {
        loginError(1, "비밀번호를 입력하세요.");
        return;
    }
    setTimeout(function () {
        if (String(document.getElementById("upass").value) === "hello") {
            setCookie('auth', 1, 365);
            setTimeout(function () {
                try {
                    if (getQueryString('next')) location.replace(atob(getQueryString('next')));
                    else location.replace('/');
                } catch (e) {
                    location.replace('/');
                }
            }, 800);
        } else {
            loginError(1, '잘못된 비밀번호입니다.');
        }
    }, 300);
}

function setHeader(primary, secondary) {
    document.getElementById("mainHeader").innerHTML = primary;
    document.getElementById("subHeader").innerHTML = secondary;
}

function clickFindId() {
    document.getElementById("iProg").style.opacity = 1;
    document.getElementById("fidName").disabled = true;
    document.getElementById("fidStuid").disabled = true;
    document.getElementById("fidContinue").disabled = true;
    document.getElementById("errFId").style.display = 'none';
    if (String(document.getElementById("fidName").value).length == 0) {
        loginError(2, "이름을 입력하세요.");
        return;
    }
    if (String(document.getElementById("fidStuid").value).length == 0) {
        loginError(2, "학번을 입력하세요.");
        return;
    }
    if (String(document.getElementById("fidName").value) != "홍길동" || String(document.getElementById("fidStuid").value) != "10101") {
        loginError(2, "정보가 올바르지 않습니다.");
        return;
    }
    moveToForm('idFound');
    setTimeout(function () {
        setHeader('아이디 찾기', '계속');
        document.getElementById("fidName").disabled = false;
        document.getElementById("fidStuid").disabled = false;
        document.getElementById("fidContinue").disabled = false;
        document.getElementById("fidContinue").focus();
        document.getElementById("iProg").style.opacity = 0;
    }, 300);
}

function reqFindId() {
    moveToForm('findId');
    setHeader('아이디 찾기', '이름과 학번을 입력하세요.');
    setPrevForm("id");
    setTimeout(function () {
        document.getElementById("fidName").focus();
    }, 500);
}

function reqFindPass() {
    moveToForm('findPass');
    setHeader('아이디 찾기', '이름과 학번을 입력하세요.');
    setPrevForm("pass");
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
    document.getElementById("uid").value = "hi";
    moveToForm('id');
    setHeader('로그인', 'IASA Portal(으)로 계속');
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
        mdcInstance.fidStuid.valid = false;
        document.getElementById("clickFindId").disabled = false;
        document.getElementById("fidName").disabled = false;
        document.getElementById("fidStuid").disabled = false;
        document.getElementById("fidName").focus();
        setTimeout(function () {
            document.getElementById("iProg").style.opacity = 0;
        }, 200);
    }
}