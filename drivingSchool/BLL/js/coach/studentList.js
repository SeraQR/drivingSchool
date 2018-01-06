import "mainStyle/list";
import * as _ from "js/main/main";
import * as co from "js/ajax/coach";
import * as af from "js/ajax/affiche";
import * as st from "js/ajax/student";

import {
    act,
    newStudentNum
} from "js/common/variable"

$(() => {
    Promise.all([
        _.getPersonalInformation(act),
        _.getAffiche(),
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