// 제한 시간 설정 (초 단위)
const totalTime = 300; // 5분 = 300초
let remainingTime = totalTime;

// 시간 표시 업데이트 함수
function updateClock() {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  const timeString = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  document.getElementById("clock").textContent = timeString;

  if (remainingTime <= 0) {
    // 시간이 초과되면 버튼 비활성화
    document.getElementById("submit-btn").disabled = true;
    clearInterval(interval);
  }

  remainingTime--;
}

// 시간 업데이트 간격 설정 (1초마다 업데이트)
const interval = setInterval(updateClock, 1000);

// 입력 필드에 입력이 있을 때 버튼 활성화
const verificationCodeInput = document.getElementById("verification-code");
verificationCodeInput.addEventListener("input", function () {
  const submitBtn = document.getElementById("submit-btn");
  if (this.value.length > 0) {
    submitBtn.disabled = false;
    submitBtn.style.backgroundColor = "#ff833e";
  } else {
    submitBtn.disabled = true;
    submitBtn.style.backgroundColor = "";
  }
});

// 폼 제출 시 시간 업데이트 중지
const verificationForm = document.getElementById("verification-form");
verificationForm.addEventListener("submit", function (e) {
  e.preventDefault();
  clearInterval(interval);
});
