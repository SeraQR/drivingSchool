import "mainStyle/list";

import * as _ from "js/main/main";

import * as af from "js/ajax/affiche";
import * as st from "js/ajax/student";
import * as me from "js/ajax/message";

import { act } from "js/common/variable";

let userName = "";
function getMessageList() {
    let result = me.getSentMessage(userName);
    if (result) {
        _.createTable(result);
    } else {
        alert("获取消息列表错误~");
    }
}
$(() => {
    Promise.all([
        userName = _.getPersonalInformation(act)[0],
        _.getAffiche(),
        getMessageList()
    ]).then(_.Init).then(_.fixedTHeader);
});