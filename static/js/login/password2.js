// 폼 요소와 JSON 데이터를 연결
const loginForm = document.getElementById("login-form");
const cdInput = loginForm.querySelector(".cd");
const resultElement = document.querySelector(".result"); // 결과 요소 선택
const resultText = resultElement.querySelector(".result-text"); // 결과 텍스트 요소 선택
const icon = resultElement.querySelector(".icon3"); // 아이콘 요소 선택

// 아이콘3를 초기에 숨김
icon.style.display = "none";


$(document).ready(function () {
    // 시간 초기화 함수
    function resetTime() {
        remainingTime = totalTime;
        document.querySelector(".PWsubmit-btn").disabled = false;
        document.getElementById("clock").classList.remove("red");
        const inputFields = document.querySelectorAll(".cd");
        inputFields.forEach(inputField => {
            inputField.classList.remove("red");
        });
    }

    // "재전송하기" 링크 클릭 시 시간 초기화
    $(".links a").click(function (event) {
        event.preventDefault(); // 링크 기본 동작 방지
        resetTime(); // 시간 초기화
    });
    
    var codeInput = $(".cd");
    var submitButton = $(".PWsubmit-btn");

    codeInput.on("input", function () {
        var inputText = codeInput.val().trim();

        // 입력된 인증코드가 6글자 이상일 때 6글자까지로 제한
        if (inputText.length > 6) {
            codeInput.val(inputText.slice(0, 6));
        }

        if (inputText.length >= 6) {
            // 입력된 인증코드가 6글자일 때 버튼 활성화 및 색상 변경
            submitButton.prop("disabled", false);
            submitButton.addClass("orange-button");
        } else {
            // 입력된 인증코드가 6글자가 아닐 때 버튼 비활성화 및 색상 초기화
            submitButton.prop("disabled", true);
            submitButton.removeClass("orange-button");
        }
    });

    // 입력된 인증코드가 6글자일 때 폼 제출
    $("form").submit(function (event) {
        var inputText = codeInput.val().trim();
        if (inputText.length !== 6) {
            // 6글자가 아닌 경우 폼 제출을 막음
            event.preventDefault();
        }
    });
});

// 폼 제출 이벤트 리스너 추가
loginForm.addEventListener("submit", function (event) {
    event.preventDefault(); // 폼 제출 방지
  
    const enteredCD = cdInput.value;

    cdInput.addEventListener('input', function () {
      // 이메일 입력란의 값이 변경될 때마다 결과 메시지를 숨김
      resultElement.style.display = 'none';
    });    
  
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
          (user) => user.cd === enteredCD
        );
  
        if (user) {
          window.location.href = "/templates/login/password3.html";
        } else {
          resultText.textContent = "인증코드가 일치하지 않습니다.";
          icon.style.display = "inline"; // 아이콘 요소를 인라인으로 표시
          resultText.style.display = "inline"; // 결과 텍스트 요소를 인라인으로 표시
          resultElement.style.display = "block"; // 결과 요소 보이기
        }
      })
      .catch((error) => console.error("데이터를 가져오는 중 오류 발생:", error));
  });

 // 제한 시간 설정 (초 단위)
 const totalTime = 300; // 5초 (테스트를 위해 시간을 줄임)
 let remainingTime = totalTime;

 // 시간 표시 업데이트 함수
 function updateClock() {
   const minutes = Math.floor(remainingTime / 60);
   const seconds = remainingTime % 60;
   const timeString = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
   const clockElement = document.getElementById("clock");

   clockElement.textContent = timeString;

   if (remainingTime <= 0) {
     // 시간이 초과되면 버튼 비활성화
     document.querySelector(".PWsubmit-btn").disabled = true;
     clearInterval(interval);

     // 시간이 초과되었을 때 시간 표시와 입력 필드 테두리를 빨간색으로 변경
     clockElement.classList.add("red");
     const inputFields = document.querySelectorAll(".id"); // 클래스가 "id"인 모든 입력 필드 가져오기
     inputFields.forEach(inputField => {
       inputField.classList.add("red"); // 각 입력 필드의 테두리 변경
     });
   }

   remainingTime--;

   if (remainingTime < 0) {
     remainingTime = 0; // 음수 방지를 위해 0으로 설정
   }
 }

 // 시간 업데이트 간격 설정 (1초마다 업데이트)
 const interval = setInterval(updateClock, 1000);