import "mainStyle/list";

import { Main as _ } from "js/main/main";

import { Coach } from "js/ajax/coach";

import { act } from "js/common/variable";
$(() => {
    Promise.all([
        _.getPersonalInformation(act),
        _.getAffiche(),
        getCoachList()
    ]).then(_.Init).
    then(_.fixedTHeader);
});

function getCoachList() {
    const result = Coach.getAllInformation("all");
    if (result) {
        _.createTable(result);
    } else {
        alert("获取教练列表失败~");
    }
}
