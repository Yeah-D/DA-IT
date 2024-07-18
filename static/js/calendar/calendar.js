// 회고록 클릭 시 다른 페이지로 이동하는 함수
function navigateToReflection() {
  // 실제로 이동할 파일 경로를 설정합니다.
  var reflectionPageURL = "/templates/login/log.html";

  // 페이지 이동
  window.location.href = reflectionPageURL;
}

// 회고록 클릭 이벤트 핸들러 등록
document.addEventListener("DOMContentLoaded", function () {
  var reflectionBar = document.querySelector(".bar2"); // '회고록'을 나타내는 요소 선택

  // 클릭 이벤트 등록
  reflectionBar.addEventListener("click", function () {
    navigateToReflection(); // 함수 호출
  });
});

// 이전 달로 이동
document.getElementById("prevMonth").addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  createCalendar(currentYear, currentMonth);
});

// 다음 달로 이동
document.getElementById("nextMonth").addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  createCalendar(currentYear, currentMonth);
});

// 일정 표시 함수
function showSchedule(year, month, day) {
  const selectedDateElement = document.getElementById("selectedDate");
  const scheduleContentElement = document.getElementById("scheduleContent");

  selectedDateElement.textContent = `${year}년 ${month + 1}월 ${day}일`;

  // 여기에서 해당 날짜에 대한 일정을 가져와서 표시하세요.
  const scheduleContent = "일정 내용을 여기에 추가하세요.";
  scheduleContentElement.textContent = scheduleContent;
}

// 달력 생성 함수 (업데이트된 부분)
function createCalendar(year, month) {
  const datesElement = document.getElementById("dates");
  const monthElement = document.getElementById("month");

  // 현재 달의 첫 날짜
  const firstDay = new Date(year, month, 1).getDay();

  // 이번 달의 마지막 날짜
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  datesElement.innerHTML = "";
  monthElement.textContent = `${year}년 ${month + 1}월`;

  // 이번 달의 날짜 추가
  for (let i = 1; i <= daysInMonth; i++) {
    const dateElement = document.createElement("div");
    dateElement.className = "date";
    dateElement.textContent = i;
    dateElement.addEventListener("click", () => {
      showSchedule(year, month, i);
    });
    datesElement.appendChild(dateElement);
  }

  // 나머지 공백을 화면에 표시
  const remainingDays = 42 - firstDay - daysInMonth;
  for (let i = 1; i <= remainingDays; i++) {
    const dateElement = document.createElement("div");
    dateElement.className = "date next-month";
    dateElement.textContent = "";
    datesElement.appendChild(dateElement);
  }

  // 이전 달의 날짜를 화면에서 숨김
  for (let i = 0; i < firstDay; i++) {
    const dateElement = document.createElement("div");
    dateElement.className = "date prev-month";
    dateElement.textContent = "";
    datesElement.insertBefore(dateElement, datesElement.firstChild);
  }
}

// 현재 날짜를 기준으로 달력 표시
const currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth();

createCalendar(currentYear, currentMonth);
