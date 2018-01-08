import "mainStyle/student";

import { Main as _ } from "js/main/main";

import { Suggestion } from "js/ajax/suggestion";

import {
    act,
    isCoach,
    getGreeting
} from "js/common/variable";

$(() => {
    Promise.all([
        sessionStorage.setItem("userName", _.getPersonalInformation(act)[0]),
        _.getAffiche()
    ]).then(_.Init);
});

$("#exit").click(() => {
    sessionStorage.setItem("backLogin", true);
    location.href = "../account/login.html";
});
$("#suggestion").click(() => {
    const suggestion = prompt("非常感谢您的反馈！", "请输入您宝贵的意见");
    if (suggestion.trim() !== "") {
        if (Suggestion.insertSuggestion(act, suggestion)) {
            alert("我们将在 1-3 工作日对您进行答复！");
        } else {
            alert("提交建议失败~");
        }
    }
});