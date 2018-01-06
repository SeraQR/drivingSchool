import "mainStyle/list";

import * as _ from "js/main/main";

import * as af from "js/ajax/affiche";
import * as st from "js/ajax/student";
import * as me from "js/ajax/message";

import { act } from "js/common/variable"

let userName="";
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
        userName = _.getPersonalInformation(act)[0],
        _.getAffiche(),
        getMessageList()
    ]).then(() => {
        _.Init()
    }).then(() => {
        _.fixedTHeader();
    });
});