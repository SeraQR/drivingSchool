import "mainStyle/list";

import * as _ from "js/main/main";

import * as co from "js/ajax/coach";
import * as af from "js/ajax/affiche";
import * as st from "js/ajax/student";

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
    const result = co.getAllInformation("all");
    if (result) {
        _.createTable(result);
    } else {
        alert("获取教练列表失败~");
    }
}
