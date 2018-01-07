import "mainStyle/onlineExam";
import * as _ from "js/main/main";
import * as f from "js/form/form";
import { problem } from "js/main/exam";

const question = $(".question");
const optionA = $(".optionA");
const optionB = $(".optionB");
const optionC = $(".optionC");
const optionD = $(".optionD");

let answer = "";
let nowTure = 0;
let oldTure;
let index = 0;

$(() => {
    Promise.all([getOldTure(), loadQuestion()]).then(_.Init);
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

$("input[type='radio']").click(addSelection);

function addSelection() {
    if (!problem[index].submitted) {
        f.showTip("");
        $("input[type='radio']").removeClass("checked");
        const data = this.getAttribute("data-value");
        const I = $(`.option_${ data.toLowerCase()}`);
        I.addClass("checked");

        if (I.prop("checked")) {
            answer = data;
        }
    }
    return false;
}

$("#sure").click(() => {
    if (problem[index].submitted) {
        f.showTip("您已提交过了");
    } else if (answer === "") {
        f.showTip("请选择一个选项！");
    } else {
        problem[index].submitted = true;
        if (answer !== problem[index].answer) {
            f.showTip(problem[index].tip);
        } else {
            problem[index].isTure = true;
            f.showTip("恭喜您，答对了！");
            nowTure++;
            if (nowTure > oldTure) {
                oldTure = nowTure;
                $("#oldTureNum").text(oldTure);
                localStorage.setItem("oldTure", oldTure);
            }
            $("#nowTureNum").text(nowTure);
        }
        $(`.option${ problem[index].answer}`).css("color", "green");
    }
});

function Init() {
    f.showTip("");
    answer = "";
    $("input[type='radio']").removeClass("checked");
    $(".option").attr("style", "");
    if (problem[index].submitted) {
        $(`.option${ problem[index].answer}`).css("color", "green");
        $(`.option_${ problem[index].answer.toLowerCase()}`).addClass("checked");
        if (problem[index].isTure) {
            f.showTip("恭喜您，答对了！");
        } else {
            f.showTip(problem[index].tip);
        }
    }
}
$(".prev").click(() => {
    index--;
    if (index < 0) {
        index = 0;
        return;
    }
    Init();
    loadQuestion();
});

$(".next").click(() => {
    index++;
    if (index > problem.length - 1) {
        index = problem.length - 1;
        return;
    }
    Init();
    loadQuestion();
});