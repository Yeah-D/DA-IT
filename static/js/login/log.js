$(document).ready(function () {
  //$('#username').focus();

  $("#submit").click(function () {
    event.preventDefault(); // prevent PageReLoad

    var ValidEmail = $("#username").val() === "invitado"; // User validate
    var ValidPassword = $("#password").val() === "hgm2015"; // Password validate

    if (ValidEmail === true && ValidPassword === true) {
      // if ValidEmail & ValidPassword
      $(".valid").css("display", "block");
      window.location = "http://arkev.com"; // go to home.html
    } else {
      $(".error").css("display", "block"); // show error msg
    }
  });
});

//////////////////////////////추가된 부분

// 폼 요소와 JSON 데이터를 연결
const loginForm = document.getElementById("login-form");
const idInput = loginForm.querySelector(".id");
const pwInput = loginForm.querySelector(".pw");

// 폼 제출 이벤트 리스너 추가
loginForm.addEventListener("submit", function (event) {
  event.preventDefault(); // 폼 제출 방지

  const enteredID = idInput.value;
  const enteredPW = pwInput.value;

  // JSON 데이터를 가져오기 위해 fetch 함수 사용
  fetch("/static/json/login/log.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("데이터를 가져오는 중 오류 발생");
      }
      return response.json();
    })
    .then((userData) => {
      console.log("받은 JSON 데이터:", userData);

      // JSON 데이터에서 사용자 정보 검색
      const user = userData.find(
        (user) => user.id === enteredID && user.pw === enteredPW
      );

      if (user) {
        // 인증 성공
        alert("로그인 성공!");
        // 여기에서 원하는 작업을 수행하세요.
      } else {
        // 인증 실패
        alert("로그인 실패. 아이디 또는 비밀번호가 올바르지 않습니다.");
      }
    })
    .catch((error) => console.error("데이터를 가져오는 중 오류 발생:", error));
});

/////////////////////////추가된부분

// ID 입력 필드와 아이콘에 대한 JavaScript 코드

const idIcon = document.querySelector(".icon");

idInput.addEventListener("focus", function () {
  idIcon.classList.add("icon-clicked");
});

idInput.addEventListener("blur", function () {
  if (idInput.value.trim() === "") {
    idIcon.classList.remove("icon-clicked");
  }
});

// pw 입력 필드와 아이콘에 대한 JavaScript 코드

const pwIcon = document.querySelector(".icon2");

pwInput.addEventListener("focus", function () {
  pwIcon.classList.add("icon-clicked");
});

pwInput.addEventListener("blur", function () {
  if (pwInput.value.trim() === "") {
    pwIcon.classList.remove("icon-clicked");
  }
});

// 로그인 버튼 클릭 시 이벤트 핸들러
const loginButton = document.querySelector(".submit-btn");

loginButton.addEventListener("click", function (event) {
  const idInput = document.querySelector(".id");
  const pwInput = document.querySelector(".pw");

  // 입력된 아이디와 비밀번호 값 가져오기
  const idValue = idInput.value.trim();
  const pwValue = pwInput.value.trim();

  // 팝업 메시지를 초기화합니다.
  let popupMessage = "";

  // 입력된 아이디와 비밀번호가 모두 없을 경우
  if (idValue === "" && pwValue === "") {
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
