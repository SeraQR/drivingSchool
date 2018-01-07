import "mainStyle/list";
import * as _ from "js/main/main";
import * as co from "js/ajax/coach";
import * as af from "js/ajax/affiche";
import * as st from "js/ajax/student";

import {
    act,
    newStudentNum
} from "js/common/variable";

$(() => {
    Promise.all([
        _.getPersonalInformation(act),
        _.getAffiche(),
        getStudentList()
    ]).then(_.Init).
    then(_.fixedTHeader);
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
        _.createTable(result);
    } else {
        alert("获取学员列表失败~");
    }
}