import "mainStyle/list";

import * as _ from "js/main/main";

import * as co from "js/ajax/coach";
import * as af from "js/ajax/affiche";
import * as st from "js/ajax/student";

import { act } from "js/common/variable"
$(() => {
    Promise.all([
        _.getPersonalInformation(act),
        _.getAffiche(),
        getCoachList()
    ]).then(() => {
        _.Init()
    }).then(() => {
        _.fixedTHeader();
    });
});

function getCoachList() {
    const result = co.getAllInformation("all");
    if (result) {
        const domStudents = document.getElementById("coaches");
        let sBody = domStudents.createTBody();

        result.forEach((element, index, array) => {
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
