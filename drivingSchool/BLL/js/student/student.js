import "mainStyle/student";

import * as _ from "js/main/main";

import * as af from "js/ajax/affiche";
import * as st from "js/ajax/student";
import * as su from "js/ajax/suggestion";

import {
    act,
    isCoach,
    getGreeting
} from "js/common/variable"

let userName = "";

$(() => {
    Promise.all([
        userName = _.getPersonalInformation(act)[0],
        _.getAffiche(),
    ]).then(() => {
        _.Init()
    });
});

$("#exit").click(() => {
    sessionStorage.setItem("backLogin", true);
    location.href = "../account/login.html";
});

$("#sendMessage").click(() => {
    sessionStorage.setItem("sender", userName);
    location.href = "sendMessage.html";
});
$("#suggestion").click(() => {
    const suggestion = prompt("非常感谢您的反馈！", "请输入您宝贵的意见");
    if (suggestion.trim() !== "") {
        if (su.insertSuggestion(act, suggestion)) {

            alert("我们将在 1-3 工作日对您进行答复！");
        } else {
            alert("发生了点小意外~");
        }
    }
});