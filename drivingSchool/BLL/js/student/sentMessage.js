import "mainStyle/list";

import { Main as _ } from "js/main/main";
import { Message } from "js/ajax/message";

import { act,userName } from "js/common/variable";

function getMessageList() {
    let result = Message.getSentMessage(userName);
    if (result) {
        _.createTable(result);
    } else {
        alert("获取消息列表错误~");
    }
}
$(() => {
    Promise.all([
        _.getPersonalInformation(act),
        _.getAffiche(),
        getMessageList()
    ]).then(_.Init).then(_.fixedTHeader);
});