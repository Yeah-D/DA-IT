// 폼 요소와 JSON 데이터를 연결
const loginForm = document.getElementById("login-form");
const idInput = loginForm.querySelector(".id");
const resultElement = document.querySelector(".result"); // 결과 요소 선택
const resultText = resultElement.querySelector(".result-text"); // 결과 텍스트 요소 선택
const icon = resultElement.querySelector(".icon3"); // 아이콘 요소 선택

// 아이콘3를 초기에 숨김
icon.style.display = "none";

// 폼 제출 이벤트 리스너 추가
loginForm.addEventListener("submit", function (event) {
  event.preventDefault(); // 폼 제출 방지

  const enteredID = idInput.value;

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
        (user) => user.id === enteredID
      );

      if (user) {
        window.location.href = "/templates/login/password2.html";
      } else {
        resultText.textContent = "존재하지 않는 이메일입니다.";
        icon.style.display = "inline"; // 아이콘 요소를 인라인으로 표시
        resultText.style.display = "inline"; // 결과 텍스트 요소를 인라인으로 표시
        resultElement.style.display = "block"; // 결과 요소 보이기
      }
    })
    .catch((error) => console.error("데이터를 가져오는 중 오류 발생:", error));
});


// ID 입력 필드와 아이콘에 대한 JavaScript 코드
const idIcon = document.querySelector('.icon');
const submitButton = document.querySelector(".PWsubmit-btn"); // 제출 버튼 선택

idInput.addEventListener('input', function () {
  // 입력란의 값이 변경될 때마다 메시지 숨김
  resultElement.style.display = 'none';

 // 입력 필드 중 하나라도 값이 있다면 버튼 활성화
if (idInput.value.trim() !== "") {
  submitButton.disabled = false;
  submitButton.style.backgroundColor = "#ff833e"; // 주황색 배경색 적용
} else {
  submitButton.disabled = true;
  submitButton.style.backgroundColor = "#9F9F9F"; // 원래 색상으로 복원
}

});

idInput.addEventListener('focus', function() {
  idIcon.classList.add('icon-clicked');
});

idInput.addEventListener('blur', function() {
  if (idInput.value.trim() === '') {
    idIcon.classList.remove('icon-clicked');
  }
});
