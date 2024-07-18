$(document).ready(function () {
  //$('#username').focus();

  $("#submit").click(function () {
    event.preventDefault(); // prevent PageReLoad

    var ValidEmail = $("#username").val() === "invitado"; // User validate
    var ValidPassword = $("#password").val() === "hgm2015"; // Password validate
    var ValidPasswordOk = $("#passwordOk").val() === "hgm2015ok";
    var ValidNick = $("#username").val() === "nickname";

    if (
      ValidEmail === true &&
      ValidPassword === true &&
      ValidPasswordOk === true &&
      ValidNick === true
    ) {
      // if ValidEmail & ValidPassword
      $(".valid").css("display", "block");
      window.location = "http://arkev.com"; // go to home.html
    } else {
      $(".error").css("display", "block"); // show error msg
    }
  });
});

// ID 입력 필드와 아이콘에 대한 JavaScript 코드
const idInput = document.querySelector(".id");
const idIcon = document.querySelector(".icon1");

idInput.addEventListener("focus", function () {
  idIcon.classList.add("icon-clicked");
});

idInput.addEventListener("blur", function () {
  if (idInput.value.trim() === "") {
    idIcon.classList.remove("icon-clicked");
  }
});

// pw 입력 필드와 아이콘에 대한 JavaScript 코드
const pwInput = document.querySelector(".pw");
const pwIcon = document.querySelector(".icon2");

pwInput.addEventListener("focus", function () {
  pwIcon.classList.add("icon-clicked");
});

pwInput.addEventListener("blur", function () {
  if (pwInput.value.trim() === "") {
    pwIcon.classList.remove("icon-clicked");
  }
});

// pw-firm 입력 필드와 아이콘에 대한 JavaScript 코드
const pwOkInput = document.querySelector(".pw-confirm"); // 변수 이름을 pwOkInput으로 변경
const pwOkIcon = document.querySelector(".icon3");

pwOkInput.addEventListener("focus", function () {
  pwOkIcon.classList.add("icon-clicked"); // pwOkIcon으로 수정
});

pwOkInput.addEventListener("blur", function () {
  if (pwOkInput.value.trim() === "") {
    pwOkIcon.classList.remove("icon-clicked"); // pwOkIcon으로 수정
  }
});

// nick 입력 필드와 아이콘에 대한 JavaScript 코드
const nickInput = document.querySelector(".nick");
const nickIcon = document.querySelector(".icon4");

nickInput.addEventListener("focus", function () {
  nickIcon.classList.add("icon-clicked");
});

nickInput.addEventListener("blur", function () {
  if (nickInput.value.trim() === "") {
    nickIcon.classList.remove("icon-clicked");
  }
});

// 로그인 버튼 클릭 시 이벤트 핸들러 미완성
const loginButton = document.querySelector(".submit-btn");

loginButton.addEventListener("click", function (event) {
  const idInput = document.querySelector(".id");
  const pwInput = document.querySelector(".pw");
  const pwOkInput = document.querySelector(".pw-confirm");
  const nickInput = document.querySelector(".nick");

  // 입력된 아이디와 비밀번호 값 가져오기
  const idValue = idInput.value.trim();
  const pwValue = pwInput.value.trim();
  const pwOkValue = pwOkInput.value.trim();
  const nickValue = nickInput.value.trim();

  // 팝업 메시지를 초기화합니다.
  let popupMessage = "";

  // 판단 로직

  // 입력된 아이디와 비밀번호가 모두 없을 경우
  if (
    idValue === "" &&
    pwValue === "" &&
    pwOkValue === "" &&
    nickValue === ""
  ) {
    popupMessage = "이메일 아이디와 비밀번호를 입력해주세요!";
  }
  // 입력된 아이디가 없을 경우
  else if (idValue === "") {
    popupMessage = "이메일 아이디를 입력해주세요!";
  }
  // 입력된 비밀번호가 없을 경우
  else if (pwValue === "") {
    popupMessage = "비밀번호를 입력해주세요!";
  }

  // 팝업 메시지가 비어있지 않다면, 팝업을 표시합니다.
  if (popupMessage !== "") {
    alert(popupMessage);
    event.preventDefault(); // 로그인 폼 제출을 중지합니다.
  }
});
