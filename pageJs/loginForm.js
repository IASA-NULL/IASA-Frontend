function swapForm(form1, form2) {
    if (form1 == form2) return;
    obj1 = document.getElementById(form1 + "Form");
    obj2 = document.getElementById(form2 + "Form");
    var temp = document.createElement("div");
    obj1.parentNode.insertBefore(temp, obj1);
    obj2.parentNode.insertBefore(obj1, obj2);
    temp.parentNode.insertBefore(obj2, temp);
    temp.parentNode.removeChild(temp);
}

function swapElements(form1, form2) {
    el1 = document.getElementById(form1 + "Form");
    el2 = document.getElementById(form2 + "Form");
    var clonedElement1 = el1.cloneNode(true);
    var clonedElement2 = el2.cloneNode(true);

    el2.parentNode.replaceChild(clonedElement1, el2);
    el1.parentNode.replaceChild(clonedElement2, el1);
}

function setPrevForm(formId) {
    if (formId == "") document.getElementById("prevCont").style.display = 'none';
    else document.getElementById("prevCont").style.display = 'block';
    prevForm = formId;
}

function backToForm() {
    stopVideo();
    formId = prevForm;
    document.getElementById(nextForm + "Form").style.display = "none";
    document.getElementById(currentForm + "Form").style.display = "none";
    if (currentState == 0 && currentForm == formId) return;
    if (currentState == 1 && nextForm == formId) return;
    if (currentState == 0) {
        swapForm(currentForm, nextForm);
        document.getElementById(currentForm + "Form").style.display = "none";
        t = nextForm;
        nextForm = currentForm;
        currentForm = t;
    }
    currentState = 0;
    swapForm(currentForm, formId);
    currentForm = formId;
    document.getElementById("loginCont").style.transition = "none";
    document.getElementById("loginCont").style.left = "-" + document.getElementById('cont').offsetWidth + "px";
    document.getElementById(nextForm + "Form").style.display = "block";
    document.getElementById(currentForm + "Form").style.display = "block";
    setTimeout(function () {
        document.getElementById("loginCont").style.transition = "left .3s ease";
        document.getElementById("loginCont").style.left = "0";
    }, 100);
    setTimeout(function () {
        if (formId == "id") {
            document.getElementById("uid").disabled = false;
            document.getElementById("enterId").disabled = false;
            document.getElementById("forgotId").disabled = false;
            document.getElementById("signupButton").disabled = false;
            mdcInstance.idInput.focus();
            setPrevForm("");
            setHeader('로그인', 'IASA Portal(으)로 계속');
        }
        if (formId == "pass") {
            setPrevForm("id");
            setHeader('hi', '비밀번호를 입력해서 로그인');
        }
        document.getElementById(nextForm + "Form").style.display = "none";
    }, 400);
    setTimeout(function () {
        document.getElementById("iProg").style.opacity = 0;
    }, 400);
}

function moveToForm(formId) {
    if (currentState == 0 && currentForm == formId) return;
    if (currentState == 1 && nextForm == formId) return;
    stopVideo();
    document.getElementById(nextForm + "Form").style.display = "none";
    document.getElementById(currentForm + "Form").style.display = "none";
    if (currentState == 0) {
        swapForm(nextForm, formId);
        nextForm = formId;
    }
    if (currentState == 1) {
        swapForm(currentForm, nextForm);
        swapForm(currentForm, formId);
        currentForm = nextForm;
        nextForm = formId;
    }
    currentState = 1;
    document.getElementById("loginCont").style.transition = "none";
    document.getElementById("loginCont").style.left = "0";
    document.getElementById(formId + "Form").style.display = "block";
    document.getElementById(currentForm + "Form").style.display = "block";
    setTimeout(function () {
        document.getElementById("loginCont").style.transition = "left .3s ease";
        document.getElementById("loginCont").style.left = "-" + document.getElementById('cont').offsetWidth + "px";
    }, 100);
    setTimeout(function () {
        document.getElementById("loginCont").style.transition = "none";
        document.getElementById("loginCont").style.left = "-35px";
        document.getElementById(currentForm + "Form").style.display = "none";
    }, 400);
}