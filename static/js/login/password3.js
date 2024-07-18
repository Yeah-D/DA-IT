$(document).ready(function () {
    $(".icon3").css("display", "none");
    var resultElement = $(".result"); // 결과를 표시할 요소 선택
    var resultText = resultElement.find(".result-text"); // 결과 텍스트 요소 선택
    var icon = resultElement.find(".icon3"); // 아이콘 요소 선택

    // 비밀번호 입력란 값이 변경될 때마다 메시지 숨김
    $(".newPw, .newPw2").on("input", function () {
        resultElement.css("display", "none");
    });

    $("form").submit(function (event) {
        event.preventDefault(); // 폼 기본 동작 방지

        var newPw = $(".newPw").val(); // 첫 번째 비밀번호 입력란의 값
        var newPw2 = $(".newPw2").val(); // 두 번째 비밀번호 확인 입력란의 값

        if (newPw === newPw2) {
            // 비밀번호가 일치하는 경우
            if (newPw.length >= 8 && /[0-9]/.test(newPw) && /[a-zA-Z]/.test(newPw)) {
                alert("비밀번호가 변경되었습니다.");
                // 확인 버튼을 클릭하면 log.html로 이동
                window.location.href = "/templates/login/log.html";
            } else {
                // 조건을 만족하지 않는 경우 메시지 표시
                resultText.text("비밀번호는 영문과 숫자를 포함하여 8글자 이상이어야 합니다.");
                icon.css("display", "inline");
                resultText.css("display", "inline");
                resultElement.css("display", "block");
            }
        } else {
            // 비밀번호가 일치하지 않는 경우
            resultText.text("비밀번호가 일치하지 않습니다.");
            icon.css("display", "inline"); // 아이콘 요소를 인라인으로 표시
            resultText.css("display", "inline"); // 결과 텍스트 요소를 인라인으로 표시
            resultElement.css("display", "block"); // 결과 요소 보이기
        }
    });

    // 입력 필드 중 하나라도 값이 있다면 버튼 활성화
    $(".newPw, .newPw2").on("input", function () {
        var newPw = $(".newPw").val().trim();
        var newPw2 = $(".newPw2").val().trim();

        if (newPw !== "" && newPw2 !== "") {
            $(".PWsubmit-btn").prop("disabled", false);
            $(".PWsubmit-btn").css("background-color", "#ff833e"); // 주황색 배경색 적용
        } else {
            $(".PWsubmit-btn").prop("disabled", true);
            $(".PWsubmit-btn").css("background-color", "#9F9F9F"); // 원래 색상으로 복원
        }
    });
});