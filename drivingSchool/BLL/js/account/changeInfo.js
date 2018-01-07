import "formStyle/changeInfo";
import * as _ from "js/form/form";
import * as ac from "js/ajax/account";
import {
    jQname,
    address,
    description,
    tipName,
    tipAddress,
    tipDescription,
    act,
    isCoach
} from "js/common/variable";

const user = {
    act,
    isCoach,
    name: "",
    address: "",
    description: "",
    singleName: false
};


$(() => {
    _.Init("50px 100px 0px 100px");
});

jQname.blur(() => {
    user.name = $.trim(jQname.val());
    if (user.name !== "" && !user.singleName) {
        tipName.hide("slow");
        if (ac.hasInfo("name", "student",user.name) || ac.hasInfo("name", "coach",user.name)) {
            user.singleName = false;
            _.showTip("昵称已经存在！");
        } else {
            user.singleName = true;
            _.showTip("");
        }
    } else {
        user.singleName = false;
        _.showTip("");
        if (user.name === "") {
            tipName.show("slow");
        }
    }
});
address.blur(() => {
    user.address = $.trim(address.val());
    if (user.address !== "") {
        tipAddress.hide("slow");
    } else {
        tipAddress.show("slow");
    }
});
description.blur(() => {
    user.description = $.trim(description.val());
    if (user.description !== "") {
        tipDescription.hide("slow");
    } else {
        tipDescription.show("slow");
    }
});
$(document).keydown(e => {
    if (e.keyCode === 13) {
        changeInfo();
    }
});

$("#changeInfo").click(changeInfo);

function changeInfo() {
    if (!_.allHaveContent(user)) {
        _.showTip("不能有空值！");
    } else if (!user.singleName) {
        _.showTip("昵称已经存在！");
    } else {
        if (ac.changeInfo(isCoach ? "coach" : "student", user)) {
            _.showTip("修改成功！");
            setTimeout(() => location.href = `../${user.isCoach ? "coach/coach" : "student/student"}.html`, 800);
        } else {
            _.showTip("因不可抗因素注册失败~");
        }
    }
}