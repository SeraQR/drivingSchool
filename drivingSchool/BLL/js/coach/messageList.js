import "mainStyle/messageList";
import * as _ from "js/main/main";
import * as co from "js/ajax/coach";
import * as af from "js/ajax/afiche";
import * as me from "js/ajax/message";

import {
    act,
    newMessageNum
} from "js/common/variable"

const userName="";

function getPersonalInformation() {
    let results = co.getPersonalInformation(act)
    if(results){
        $("#userName").text(`昵称：${results[0]}`);
        $("#userDescription").text(`描述：${results[1]}`);
        $("#userAddress").text(`住址：${results[2]}`);
        userName = results[0];
    }else{
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