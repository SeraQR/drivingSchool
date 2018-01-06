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

function getPersonalInformation() {
    let results = st.getPersonalInformation(act)
    if (results) {
        const greeting = getGreeting();
        $("#name").text(greeting + results[0]);
        $("#userName").text(`昵称：${results[0]}`);
        $("#userType").text(`身份：${isCoach}` ? "教练" : "学员");
        $("#userDescription").text(`描述：${results[1]}`);
        $("#userAddress").text(`住址：${results[2]}`);
        userName = results[0];
    } else {
        alert("发生了点小意外~");
    }
}

function getAffiche() {
    const result = af.getAffiche();
    if (result) {
        $("#affiche").text(result);
    } else {
        alert("发生了点小意外~");
    }
}
$(() => {
    Promise.all([
        getPersonalInformation(),
        getAffiche(),
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