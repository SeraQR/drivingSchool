import "mainStyle/list";
import * as _ from "js/main/main";
import * as co from "js/ajax/coach";
import * as af from "js/ajax/affiche";
import * as me from "js/ajax/message";

import {
    act,
    newMessageNum
} from "js/common/variable";

let userName = "";

$(() => {
    Promise.all([
        userName = _.getPersonalInformation(act)[0],
        _.getAffiche(),
        getMessageList()
    ]).then(_.Init)
    .then(_.fixedTHeader);
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
        _.createTable(result);
    } else {
        alert("获取预约列表失败~");
    }
}