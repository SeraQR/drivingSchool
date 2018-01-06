import "mainStyle/sentMessage";

import "mainStyle/coachList";

import * as _ from "js/main/main";

import * as af from "js/ajax/affiche";
import * as st from "js/ajax/student";
import * as me from "js/ajax/message";

import {
    act
} from "js/common/variable"

let userName="";

function getPersonalInformation() {
    let results = st.getPersonalInformation(act)
    if (results) {
        $("#userName").text(`昵称：${results[0]}`);
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

function getMessageList() {
    let students = me.getSentMessage(userName);
    if (students) {
        const domStudents = document.getElementById("messages");
        let sBody = domStudents.createTBody();

        students.forEach((element, index, array) => {
            let infos = element.split("=");
            let tr = sBody.insertRow(index);
            infos.forEach((e, i, a) => {
                tr.insertCell(i).appendChild(new Text(e));
            });
        });
    } else {
        alert("发生了点小意外~");
    }
}
$(() => {
    Promise.all([
        getPersonalInformation(),
        getAffiche(),
        getMessageList()
    ]).then(() => {
        _.Init()
    }).then(() => {
        _.fixedTHeader();
    });
});