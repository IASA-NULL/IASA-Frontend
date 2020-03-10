<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>로그인 - IASA Portal</title>
    <link href="/res/mdc-3.2.0.min.css" rel="stylesheet">
    <script src="/res/mdc-3.2.0.min.js"></script>
    <script src="/res/quagga.min.js" async></script>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="/res/common/common.css">
    <style>

        :root {
            --mdc-theme-primary: #5351db !important;
            --mdc-theme-secondary: #8cc4de !important;
            --mdc-theme-on-primary: #fff !important;
            --mdc-theme-on-secondary: #fff !important;
        }

        .mdc-text-field {
            transform: translate(0.5px, 0.5px);
        }


        #cont {
            max-width: 90vw;
            width: 500px;
            height: auto;
            overflow: hidden;
        }

        #fullCont {
            position: absolute;
            top: 50vh;
            left: 50vw;
            transform: translate(calc(-50% - 0.5px), calc(-50% - 0.5px));
        }

        @media screen and (-ms-high-contrast: active), screen and (-ms-high-contrast: none) {
            #fullCont {
                position: absolute;
                top: 50vh;
                left: 50vw;
                transform: translate(-50%, -50%) !important;
            }
        }

        #cardCont {
            border-style: solid;
            border-width: 1px;
            border-color: #bbbbbb !important;
            margin-bottom: 20px;
        }

        a {
            text-decoration: none !important;
            color: inherit !important;
        }

        .loginBox {
            margin: 0;
            text-align: center;
            display: flex;
            max-width: 77.4vw;
            width: 430px;
            min-height: 496px;
            align-items: center;
            justify-content: center;
            float: left;
            padding: 35px 35px 15px;
        }

        @media (min-height: 581px) {
            #cont {
                min-height: 560px;
            }
        }

        @media (max-height: 580px) {
            .loginBox {
                height: calc(72.1vh - 80px) !important;
                padding: 15px 20px 15px 20px;
            }

            #cont {
                overflow-x: hidden;
                overflow-y: scroll;
                height: calc(70vh - 10px) !important;
            }

            #cont::-webkit-scrollbar {
                display: none;
            }
        }


        .loginBox > * {
            margin: 15px;
        }

        .fade {
            transition: opacity .5s ease;
        }

        @font-face {
            font-family: 'nanum';
            font-display: auto;
            src: local('Pacifico Regular'), local('Pacifico-Regular'), local('나눔스퀘어'), url("/res/NSR.woff");
            font-display: swap;
        }

        * {
            font-family: 'nanum';
        }

        #loginCont {
            height: 100%;
            display: flex;
            position: relative;
            transition: left .3s ease;
            left: 0;
        }

        .innerCont {
            max-width: 77.4vw;
            width: 430px;
            margin: 35px;
            display: none;
        }

        .innerCont:first-child {
            margin-left: 0;
        }

        #findIdForm > * {
            margin: 5px;
        }

        .material-icons {
            transition: all .3s ease;
        }

        video {
            max-width: 73.8vw !important;
            width: 410px !important;
        }

        #qrContainer {
            max-width: 73.8vw !important;
            width: 410px !important;
        }

        #qrContainer > video {
            max-width: 73.8vw !important;
            width: 410px !important;
        }

        #qrContainer > canvas {
            display: none !important;
        }

        #signupMenu {
            z-index: 1000;
        }
    </style>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>

<body>
<script src="/res/common/common.js"></script>
<script src="/pageJs/login.js"></script>
<script src="/pageJs/loginForm.js"></script>
<script src="/pageJs/signup.js"></script>
<script>
    if (isLogin()) {
        try {
            if (getQueryString('next')) location.replace(atob(getQueryString('next')));
            else location.replace('/');
        } catch (e) {
            location.replace('/');
        }
    }
    document.body.style.cursor = 'wait';
    let currentForm = "id", nextForm = "next", currentState = 0, prevForm = "id";

    function initMdc() {
        mdcInstance.idInput = new mdc.textField.MDCTextField(document.getElementById("uidCont"));
        mdcInstance.passInput = new mdc.textField.MDCTextField(document.getElementById("upassCont"));
        mdcInstance.fidName = new mdc.textField.MDCTextField(document.getElementById("fidNameForm"));
        mdcInstance.fidStuid = new mdc.textField.MDCTextField(document.getElementById("fidStuidForm"));
        mdcInstance.progress = new mdc.linearProgress.MDCLinearProgress.attachTo(document.querySelector('.mdc-linear-progress'));
        mdcInstance.menu = new mdc.menu.MDCMenu(document.getElementById('langMenu'));
        mdcInstance.menu.setAnchorElement(document.getElementById('menu-button'));
        mdcInstance.signmenu = new mdc.menu.MDCMenu(document.getElementById('signupMenu'));
        mdcInstance.signmenu.setAnchorElement(document.getElementById('signupButton'));
        mdcInstance.prevButton = new mdc.ripple.MDCRipple(document.querySelector('#prevCont>div>span>button'));
        mdcInstance.langNotify = new mdc.snackbar.MDCSnackbar(document.getElementById('langErr'));
        mdcInstance.noIE = new mdc.snackbar.MDCSnackbar(document.getElementById('noIE'))
        mdcInstance.prevButton.unbounded = true;
        mdcInstance.progress.determinate = false;
        mdcInstance.userrightMenu = new mdc.menu.MDCMenu(document.getElementById('userrightMenu'));
        mdcInstance.userrightMenu.setAnchorElement(document.getElementById('userRight'));

        mdcInstance.signupCode = new mdc.textField.MDCTextField(document.getElementById("signupCodeForm"));
    }

    function initEvent() {
        let uid = document.getElementById("uid");
        uid.addEventListener("keyup", function (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                enterId();
            }
        });
        let upass = document.getElementById("upass");
        upass.addEventListener("keyup", function (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                enterPass();
            }
        });
        let fidName = document.getElementById("fidName");
        fidName.addEventListener("keyup", function (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                document.getElementById("fidStuid").focus();
            }
        });
        let fidStuid = document.getElementById("fidStuid");
        fidStuid.addEventListener("keyup", function (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                clickFindId();
            }
        });
    }

    function stopVideo() {
        try {
            Quagga.stop();
            document.getElementById("qrContainer").style.display = 'none';
        } catch (e) {

        }
    }

    let stuId;

    window.addEventListener('load', function () {
        setTimeout(function () {
            document.getElementById("iProg").style.opacity = 0;
        }, 300);
    })

    window.addEventListener('DOMContentLoaded', function () {
        initMdc();
        initEvent();
        setHeader('로그인', 'IASA Portal(으)로 계속');
        document.getElementById("idForm").style.display = "block";
        setPrevForm("");
        document.getElementById("errId").style.display = 'none';
        document.getElementById("errPass").style.display = 'none';
        document.getElementById("errFId").style.display = 'none';
        document.getElementById("loginCont").style.width = document.getElementById('loginCont').children.length * 500 + 'px';
        document.getElementById("passToggle").style.color = "#bbbbbb";
        document.getElementById("upass").type = 'password';
        for (var i = 0; i < document.querySelectorAll('.mdc-ripple').length; i++)
            mdc.ripple.MDCRipple.attachTo(document.querySelectorAll('.mdc-ripple')[i]);
        setTimeout(function () {
            mdcInstance.idInput.focus();
            if (isIE()) mdcInstance.noIE.open();
            document.body.style.cursor = 'default';
        }, 300);
        document.getElementById("iProg").style.opacity = 1;
    });
</script>
<div id="fullCont">
    <div id="cont">
        <div class="mdc-card demo-card demo-ui-control mdc-elevation--z0" id="cardCont">
            <a onclick="backToForm('id');" style="padding:10px;position:absolute;cursor: pointer;" id="prevCont">
                <div><span class="mdc-fab__icon material-icons" style="font-size: 200%;"><button
                        class="mdc-icon-button material-icons">arrow_back</button></span></div>
            </a>
            <div role="progressbar" class="mdc-linear-progress fade" style="width:500px;z-index:1000;" id="iProg">
                <div class="mdc-linear-progress__buffering-dots"></div>
                <div class="mdc-linear-progress__buffer"></div>
                <div class="mdc-linear-progress__bar mdc-linear-progress__primary-bar">
                    <span class="mdc-linear-progress__bar-inner"></span>
                </div>
                <div class="mdc-linear-progress__bar mdc-linear-progress__secondary-bar">
                    <span class="mdc-linear-progress__bar-inner"></span>
                </div>
            </div>
            <div class="loginBox" id="login">
                <div style="width:100%;">
                    <img src="/res/logo.jpg" style="display: block;width:80px;margin: 0 auto;">
                    <p id="mainHeader" style="font-size: 200%;"></p>
                    <p id="subHeader"></p>
                    <div id="loginCont">
                        <div class="innerCont" id="idForm">
                            <div class="mdc-text-field mdc-text-field--outlined" id="uidCont" style="width:90%;">
                                <input class="mdc-text-field__input" id="uid">
                                <div class="mdc-notched-outline">
                                    <div class="mdc-notched-outline__leading"></div>
                                    <div class="mdc-notched-outline__notch">
                                        <label for="uid" class="mdc-floating-label">아이디</label>
                                    </div>
                                    <div class="mdc-notched-outline__trailing"></div>
                                </div>
                            </div>
                            <div style="width:100%;height:5px;display: flex;"></div>
                            <span id="errId" style="color:#e36346;margin-top:2px;"><i class="material-icons"
                                                                                      style="font-size: 100%;margin-top:5px;display: inline-block;">error_outline</i>
                            <p id="errIdMsg" style="color:#e36346;display: inline-block;"></p>
                        </span>
                            <div style="width:100%;height:15px;display: flex;"></div>
                            <div style="width:100%;display: flex;">
                                <button class="mdc-button mdc-ripple" style="width:175px;float:left;"
                                        onclick="reqFindId();"
                                        id="forgotId">아이디를 잊으셨나요?
                                </button>
                            </div>
                            <div style="width:100%;height:15px;display: flex;"></div>
                            <div style="width:100%;display: flex;">
                                <div style="width:100%;">
                                    <button class="mdc-button mdc-ripple" style="width:100px;float:left;"
                                            onclick="mdcInstance.signmenu.open=true;"
                                            id="signupButton">계정 만들기
                                    </button>
                                    <div class="mdc-menu-surface--anchor">
                                        <div class="mdc-menu mdc-menu-surface" id="signupMenu">
                                            <ul class="mdc-list" role="menu" aria-hidden="true"
                                                aria-orientation="vertical" tabindex="-1">
                                                <li class="mdc-list-item mdc-ripple" role="menuitem"
                                                    onclick="reqSignup();">
                                                    <span class="mdc-list-item__text">학생</span>
                                                </li>
                                                <li class="mdc-list-item mdc-ripple" role="menuitem"
                                                    onclick="reqSignup3();">
                                                    <span class="mdc-list-item__text">선생님</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <button class="mdc-button mdc-button--raised mdc-ripple"
                                            style="width:100px;float:right;margin-right:25px;" onclick="enterId();"
                                            id="enterId">다음
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="innerCont" id="nextForm"></div>
                        <div class="innerCont" id="passForm">
                            <div class="mdc-text-field mdc-text-field--outlined mdc-text-field--with-trailing-icon"
                                 id="upassCont" style="width:90%;">
                                <i class="material-icons mdc-text-field__icon" tabindex="0" role="button"
                                   onclick="togglePassword('upass');" id="passToggle">visibility</i>
                                <input class="mdc-text-field__input" id="upass" type="text">
                                <div class="mdc-notched-outline">
                                    <div class="mdc-notched-outline__leading"></div>
                                    <div class="mdc-notched-outline__notch">
                                        <label for="upass" class="mdc-floating-label">비밀번호</label>
                                    </div>
                                    <div class="mdc-notched-outline__trailing"></div>
                                </div>
                            </div>
                            <div style="width:100%;height:5px;display: flex;"></div>
                            <span id="errPass" style="color:#e36346;margin-top:2px;"><i class="material-icons"
                                                                                        style="font-size: 100%;margin-top:5px;display: inline-block;">error_outline</i>
                            <p id="errPassMsg" style="color:#e36346;display: inline-block;"></p>
                        </span>
                            <div style="width:100%;height:15px;display: flex;"></div>
                            <div style="width:100%;display: flex;">
                                <div style="width:100%;">
                                    <button class="mdc-button mdc-ripple" style="width:200px;float:left;"
                                            onclick="reqFindPass();" id="forgotPass">비밀번호를
                                        잊으셨나요?
                                    </button>
                                    <button class="mdc-button mdc-button--raised mdc-ripple"
                                            style="width:100px;float:right;margin-right:25px;" onclick="enterPass();"
                                            id="enterPass">로그인
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="innerCont" id="idFoundForm">
                            <p style="font-size: 150%;">사용자의 ID는 <b style="font-size: 130%;">hi</b>입니다.</p>
                            <div style="width:100%;height:15px;display: flex;"></div>
                            <div style="width:100%;display: flex;">
                                <div style="width:100%;">
                                    <button class="mdc-button mdc-button--raised mdc-ripple"
                                            style="width:100px;float:right;margin-right:25px;"
                                            onclick="loginWithFoundId();"
                                            id="fidContinue">로그인
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="innerCont" id="findIdForm">
                            <div class="mdc-text-field mdc-text-field--outlined" id="fidNameForm" style="width:90%;">
                                <input class="mdc-text-field__input" id="fidName">
                                <div class="mdc-notched-outline">
                                    <div class="mdc-notched-outline__leading"></div>
                                    <div class="mdc-notched-outline__notch">
                                        <label for="fidName" class="mdc-floating-label">이름</label>
                                    </div>
                                    <div class="mdc-notched-outline__trailing"></div>
                                </div>
                            </div>
                            <div class="mdc-text-field mdc-text-field--outlined" id="fidStuidForm" style="width:90%;">
                                <input class="mdc-text-field__input" id="fidStuid">
                                <div class="mdc-notched-outline">
                                    <div class="mdc-notched-outline__leading"></div>
                                    <div class="mdc-notched-outline__notch">
                                        <label for="fidStuid" class="mdc-floating-label">학번</label>
                                    </div>
                                    <div class="mdc-notched-outline__trailing"></div>
                                </div>
                            </div>
                            <div style="width:100%;height:5px;display: flex;"></div>
                            <span id="errFId" style="color:#e36346;margin-top:2px;"><i class="material-icons"
                                                                                       style="font-size: 100%;margin-top:5px;display: inline-block;">error_outline</i>
                            <p id="errFIdMsg" style="color:#e36346;display: inline-block;"></p>
                        </span>
                            <button class="mdc-button mdc-button--raised mdc-ripple"
                                    style="width:100px;float:right;margin-right:25px;" onclick="clickFindId();"
                                    id="clickFindId">다음
                            </button>
                        </div>
                        <div class="innerCont" id="findPassForm" style="background-color: #5351db;"></div>
                        <div class="innerCont" id="signup1Form">
                            <video autoplay loop muted playsinline src="/res/vid/card.mp4"
                                   style="width:430px;transform:translate(-0.5px, 0);"
                                   id="cardAnim"></video>
                            <button class="mdc-button mdc-button--raised mdc-ripple"
                                    style="width:100px;float:right;margin-right:25px;" onclick="reqSignup2();">다음
                            </button>
                        </div>
                        <div class="innerCont" id="signup2Form">
                            <div id="qrContainer"></div>
                            <video autoplay loop muted playsinline src="/res/vid/camLoad.mp4"
                                   style="width:200px;transform:translate(-0.5px, 0);"
                                   id="camAnim"></video>
                            <div style="width:100%;height:15px;display: flex;"></div>
                            <button class="mdc-button mdc-ripple" style="width:150px;float:left;"
                                    onclick="reqSignup3();">
                                학생증이 없음
                            </button>
                        </div>
                        <div class="innerCont" id="signup3Form">

                            <div class="mdc-text-field mdc-text-field--outlined" style="width:90%;"
                                 id="signupCodeForm">
                                <input class="mdc-text-field__input" id="signupCode">
                                <div class="mdc-notched-outline">
                                    <div class="mdc-notched-outline__leading"></div>
                                    <div class="mdc-notched-outline__notch">
                                        <label for="signupCode" class="mdc-floating-label">본인인증용 코드</label>
                                    </div>
                                    <div class="mdc-notched-outline__trailing"></div>
                                </div>
                            </div>
                            <div style="width:100%;height:15px;display: flex;"></div>
                            <button class="mdc-button mdc-button--raised mdc-ripple"
                                    style="width:100px;float:right;margin-right:25px;" onclick="reqSignup2();">다음
                            </button>
                        </div>
                        <div class="innerCont" id="signupData1Form">
                            <div class="mdc-text-field mdc-text-field--outlined" style="width:90%;"
                                 id="signupEmailForm">
                                <input class="mdc-text-field__input" id="signupEmail">
                                <div class="mdc-notched-outline">
                                    <div class="mdc-notched-outline__leading"></div>
                                    <div class="mdc-notched-outline__notch">
                                        <label for="signupEmail" class="mdc-floating-label">이메일</label>
                                    </div>
                                    <div class="mdc-notched-outline__trailing"></div>
                                </div>
                            </div>
                            <div style="width:100%;height:15px;display: flex;"></div>
                            <div class="mdc-text-field mdc-text-field--outlined" style="width:90%;"
                                 id="signupPassForm">
                                <input class="mdc-text-field__input" id="signupPass">
                                <div class="mdc-notched-outline">
                                    <div class="mdc-notched-outline__leading"></div>
                                    <div class="mdc-notched-outline__notch">
                                        <label for="signupPass" class="mdc-floating-label">비밀번호</label>
                                    </div>
                                    <div class="mdc-notched-outline__trailing"></div>
                                </div>
                            </div>
                            <div style="width:100%;height:15px;display: flex;"></div>
                            <div class="mdc-text-field mdc-text-field--outlined" style="width:90%;"
                                 id="signupPassConfForm">
                                <input class="mdc-text-field__input" id="signupPassConf">
                                <div class="mdc-notched-outline">
                                    <div class="mdc-notched-outline__leading"></div>
                                    <div class="mdc-notched-outline__notch">
                                        <label for="signupPassConf" class="mdc-floating-label">비밀번호 재입력</label>
                                    </div>
                                    <div class="mdc-notched-outline__trailing"></div>
                                </div>
                            </div>
                            <div style="width:100%;height:15px;display: flex;"></div>
                            <button class="mdc-button mdc-button--raised mdc-ripple"
                                    style="width:100px;float:right;margin-right:25px;"
                                    onclick="">
                                다음
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div style="width:100%;height:5px;display: flex;"></div>
    </div>
    <div style="width:100%;display: flex;">
        <div style="width:100%;">

            <div id="demo-menu" class="mdc-menu-surface--anchor" style="float:left;">
                <button id="menu-button" class="mdc-button mdc-ripple"
                        onclick="mdcInstance.menu.open=true;">한국어<i class="material-icons"
                                                                    onclick="mdcInstance.menu.open=true;">keyboard_arrow_down</i>
                </button>
                <div class="mdc-menu mdc-menu-surface" id="langMenu">
                    <ul class="mdc-list" role="menu" aria-hidden="true" aria-orientation="vertical" tabindex="-1">
                        <li class="mdc-list-item mdc-ripple" role="menuitem">
                            <span class="mdc-list-item__text">한국어</span>
                        </li>
                        <li class="mdc-list-item mdc-ripple" role="menuitem" onclick="mdcInstance.langNotify.open();">
                            <span class="mdc-list-item__text">English</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="mdc-menu-surface--anchor" style="float:right;">
                <button id="userRight" class="mdc-button mdc-ripple"
                        onclick="mdcInstance.userrightMenu.open=true;">약관<i class="material-icons"
                                                                            onclick="mdcInstance.userrightMenu.open=true;">keyboard_arrow_down</i>
                </button>
                <div class="mdc-menu mdc-menu-surface" id="userrightMenu">
                    <ul class="mdc-list" role="menu" aria-hidden="true"
                        aria-orientation="vertical" tabindex="-1">
                        <a href="/terms">
                            <li class="mdc-list-item mdc-ripple" role="menuitem">
                                <span class="mdc-list-item__text">사용자 약관</span>
                            </li>
                        </a>
                        <a href="/userdata">
                            <li class="mdc-list-item mdc-ripple" role="menuitem">
                                <span class="mdc-list-item__text">개인정보처리방침</span>
                            </li>
                        </a>
                        <a href="/opensource">
                            <li class="mdc-list-item mdc-ripple" role="menuitem">
                                <span class="mdc-list-item__text">오픈소스 사용고지</span>
                            </li>
                        </a>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="mdc-snackbar" id="langErr">
    <div class="mdc-snackbar__surface">
        <div class="mdc-snackbar__label"
             role="status"
             aria-live="polite">
            아직 지원하지 않는 언어입니다.
        </div>
        <div class="mdc-snackbar__actions">
            <button type="button" class="mdc-button mdc-snackbar__action mdc-ripple">닫기</button>
        </div>
    </div>
</div>
<div class="mdc-snackbar" id="noIE">
    <div class="mdc-snackbar__surface">
        <div class="mdc-snackbar__label"
             role="status"
             aria-live="polite">
            인터넷 익스플로러에서는 정상적인 작동을 보증하지 않습니다. 크롬 등 타 브라우저를 사용해주세요.
        </div>
        <div class="mdc-snackbar__actions">
            <button type="button" class="mdc-button mdc-snackbar__action mdc-ripple"
                    onclick="win = window.open('https://chrome.com', '_blank');win.focus();">크롬 다운로드
            </button>
            <button type="button" class="mdc-button mdc-snackbar__action mdc-ripple">닫기</button>
        </div>
    </div>
</div>
</body>

</html>