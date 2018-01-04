/* eslint-disable */
const header = document.getElementById("header"),
    steps = 7;

function threedee(e) {
    const x = Math.round(steps / (window.innerWidth / 2) * (window.innerWidth / 2 - e.clientX)),
        y = Math.round(steps / (window.innerHeight / 2) * (window.innerHeight / 2 - e.clientY));

    let shadow = "",
        color = 190,
        i, tx, ty;
    for (i = 0; i < steps; i++) {
        tx = Math.round(x / steps * i);
        ty = Math.round(y / steps * i);
        if (tx || ty) {
            color -= 3 * i;
            shadow += `${tx}px ${ty}px 0 rgb(${color}, ${color}, ${color}), `;
        }
    }
    shadow += `${x}px ${y}px 1px rgba(0,0,0,.2), ${x * 2}px ${y * 2}px 6px rgba(0,0,0,.3)`;
    header.style.textShadow = shadow;
    header.style.webkitTransform = `translateZ(0) rotateX(${y * 1.5}deg) rotateY(${-x * 1.5}deg)`;
    header.style.MozTransform = `translateZ(0) rotateX(${y * 1.5}deg) rotateY(${-x * 1.5}deg)`;
}
$(".content-header").on("mousemove", threedee);
const tip = $("#tip");
const question = $(".question");
const optionA = $(".optionA");
const optionB = $(".optionB");
const optionC = $(".optionC");
const optionD = $(".optionD");

let answer = "";
let nowTure = 0;

let index = 0;
let oldTure;
$(() => {
    Promise.all([getOldTure(), loadQuestion()]).then(() => {
        setTimeout("$(\"#loading\").fadeOut()", 800);
    });
});

function loadQuestion() {
    question.text(problem[index].question);
    optionA.text(problem[index].optionA);
    optionB.text(problem[index].optionB);
    optionC.text(problem[index].optionC);
    optionD.text(problem[index].optionD);
}

function getOldTure() {
    oldTure = localStorage.getItem("oldTure");
    if (!oldTure) {
        oldTure = 0;
        localStorage.setItem("oldTure", oldTure);
    }
    $("#oldTureNum").text(oldTure);
}

$(".option_a").change(() => {
    if (!problem[index].submitted) {
        showTip("");
        $("input[type='radio']").removeClass("checked");
        $(".option_a").addClass("checked");
        if ($(".option_a").prop("checked")) {
            answer = "A";
        }
    }
});
$(".option_b").change(() => {
    if (!problem[index].submitted) {
        showTip("");
        $("input[type='radio']").removeClass("checked");
        $(".option_b").addClass("checked");
        if ($(".option_b").prop("checked")) {
            answer = "B";
        }
    }
});
$(".option_c").change(() => {
    if (!problem[index].submitted) {
        showTip("");
        $("input[type='radio']").removeClass("checked");
        $(".option_c").addClass("checked");
        if ($(".option_c").prop("checked")) {
            answer = "C";
        }
    }
});
$(".option_d").change(() => {
    if (!problem[index].submitted) {
        showTip("");
        $("input[type='radio']").removeClass("checked");
        $(".option_d").addClass("checked");
        if ($(".option_d").prop("checked")) {
            answer = "D";
        }
    }
});

function showTip(info) {
    tip.text(info);
    info ? tip.fadeIn(500) : tip.fadeOut("slow");
}
$("#sure").click(() => {
    if (problem[index].submitted) {
        showTip("您已提交过了");
    } else if (answer === "") {
        showTip("请选择一个选项！");
    } else {
        problem[index].submitted = true;
        if (answer !== problem[index].answer) {
            showTip(problem[index].tip);
        } else {
            problem[index].isTure = true;
            showTip("恭喜您，答对了！");
            nowTure++;
            if (nowTure > oldTure) {
                oldTure = nowTure;
                $("#oldTureNum").text(oldTure);
                localStorage.setItem("oldTure", oldTure);
            }
            $("#nowTureNum").text(nowTure);
        }
        $(".option" + problem[index].answer).css("color", "green");
    }
});
$(".prev").click(() => {
    showTip("");
    answer="";
    index--;
    if (index < 0) {
        index = 0;
    } else {
        $("input[type='radio']").removeClass("checked");
        $(".option").attr("style", "");
        if (problem[index].submitted) {
            $(".option" + problem[index].answer).css("color", "green");
            $(".option_" + problem[index].answer.toLowerCase()).addClass("checked");
            if (problem[index].isTure) {
                showTip("恭喜您，答对了！");
            } else {
                showTip(problem[index].tip);
            }
        }
        loadQuestion();
    }
})
$(".next").click(() => {
    showTip("");
    answer="";
    index++;
    if (index > problem.length - 1) {
        index = problem.length - 1;
    } else {
        $("input[type='radio']").removeClass("checked");
        $(".option").attr("style", "");
        if (problem[index].submitted) {
            $(".option" + problem[index].answer).css("color", "green");
            $(".option_" + problem[index].answer.toLowerCase()).addClass("checked");
            if (problem[index].isTure) {
                showTip("恭喜您，答对了！");
            } else {
                showTip(problem[index].tip);
            }
        }
        loadQuestion();
    }
})