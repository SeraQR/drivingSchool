import "mainStyle/studentList";
import * as _ from "js/main/main";
import * as co from "js/ajax/coach";
import * as af from "js/ajax/afiche";
import * as st from "js/ajax/student";

import {
    act,
    newStudentNum
} from "js/common/variable"

function getPersonalInformation() {
    let results = co.getPersonalInformation(act)
    if (results) {
        $("#userName").text(`昵称：${results[0]}`);
        $("#userDescription").text(`描述：${results[1]}`);
        $("#userAddress").text(`住址：${results[2]}`);
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
        getStudentList()
    ]).then(() => {
        _.Init()
    }).then(() => {
        _.fixedTHeader();
    });
});

function getStudentList() {
    let ajaxType;
    if (newStudentNum) {
        ajaxType = "onlyNew";
        sessionStorage.removeItem("newStudentNum");
    } else {
        ajaxType = "all";
    }
    const result = st.getStudentList(ajaxType, act, newStudentNum);
    if (result) {
        const domStudents = document.getElementById("students");
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