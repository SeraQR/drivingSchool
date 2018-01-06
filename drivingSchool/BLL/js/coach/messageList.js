import "mainStyle/list";
import * as _ from "js/main/main";
import * as co from "js/ajax/coach";
import * as af from "js/ajax/affiche";
import * as me from "js/ajax/message";

import {
    act,
    newMessageNum
} from "js/common/variable"

let userName="";

$(() => {
    Promise.all([
        userName = results = _.getPersonalInformation(act)[0],
        _.getAffiche(),
        getMessageList()
    ]).then(() => {
        _.Init()
    }).then(()=>{
        _.fixedTHeader();
    });
});

function getMessageList() {
    let ajaxType;
    if (newMessageNum) {
        ajaxType = "onlyNew";
        sessionStorage.removeItem("newMessageNum");
    } else {
        ajaxType = "all";
    }
    const result = me.getMessageList(ajaxType,userName,newMessageNum);
    if(result){
        const domStudents = document.getElementById("messages");
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