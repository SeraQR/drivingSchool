import "formStyle/register";
import {
    account,
    password,
    question,
    answer,
    jQname,
    address,
    description,
    tipAccount,
    tipPassword,
    tipQuestion,
    tipAnswer,
    tipName,
    tipAddress,
    tipDescription,
    regBox
} from "js/common/variable";

import * as _ from "js/form/form";
import * as ac from "js/ajax/account";


const user = {
    act: "",
    pwd: "",
    question: "",
    answer: "",
    name: "",
    address: "",
    description: "",
    rgtAct: false,
    rgtName: false,
    rgtPwd: false
};
const tip = $("#tip");

function showTip(key, info) {
    if (tip.text().indexOf(key) !== -1 || $.trim(tip.text()) === "") {
        tip.text(info);
        info ? tip.fadeIn(500) : tip.fadeOut("slow");
    }
}
$(() => {
    _.Init("50px 100px 0px 100px");
});

$("input").keypress(e => {
    if (tip.text().indexOf("错误") !== -1) {
        tip.text(" ");
        tip.fadeOut("slow");
    }
    return e.keyCode !== 32;
});
account.blur(() => {
    user.act = $.trim(account.val());
    if (user.act !== "" && !user.rgtAct) {

        tipAccount.hide("slow");
        if (!regBox.Email.test(user.act) && !regBox.Mobile.test(user.act)) {
            showTip("账号", "您的账号格式错误！");
            user.rgtAct = false;
        } else if (ac.hasInfo("account", "student", "", user.act) || ac.hasInfo("account", "coach", "", user.act)) {
            user.rgtAct = false;
            showTip("账号", "账号已经存在！");
        } else {
            user.rgtAct = true;
            showTip("账号", "");
        }
    } else {
        user.rgtAct = false;
        showTip("账号", "");
        if (user.act === "") {
            tipAccount.show("slow");
        }
    }
});
password.blur(() => {
    user.pwd = $.trim(password.val());
    if (user.pwd !== "" && !user.rgtPwd) {

        tipPassword.hide("slow");
        if (!regBox.Pwd.test(user.pwd)) {
            user.rgtPwd = false;
            showTip("密码", "您的密码格式错误！");
        } else {
            user.rgtPwd = true;
            showTip("密码", "");
        }
    } else {
        user.rgtPwd = false;
        showTip("密码", "");
        if (user.pwd === "") {
            tipPassword.show("slow");
        }
    }
});
question.blur(() => {
    user.question = $.trim(question.val());
    if (user.question !== "") {
        tipQuestion.hide("slow");
    } else {
        tipQuestion.show("slow");
    }
});
answer.blur(() => {
    user.answer = $.trim(answer.val());
    if (user.answer !== "") {
        tipAnswer.hide("slow");
    } else {
        tipAnswer.show("slow");
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
jQname.blur(() => {
    user.name = $.trim(jQname.val());
    if (user.name !== "" && !user.rgtName) {
        tipName.hide("slow");
        if (ac.hasInfo("name", "student", user.name) || ac.hasInfo("name", "coach", user.name)) {
            user.rgtName = false;
            showTip("昵称", "昵称已经存在！");
        } else {
            user.rgtName = true;
            showTip("昵称", "");
        }
    } else {
        user.rgtName = false;
        showTip("昵称", "");
        if (user.name === "") {
            tipName.show("slow");
        }
    }
});


$(document).keydown(e => {
    if (e.keyCode === 13) {
        user.description = $.trim(description.val());
        register();
    }
});

$("#register").click(register);

function register() {
    if (!_.allHaveContent(user)) {
        showTip("错误", "发生错误，不能有空值！");
    } else if (!user.rgtAct) {
        showTip("错误", "账号内容有错误！");
    } else if (!user.rgtName) {
        showTip("错误", "发生错误，昵称已经存在！");
    } else if (!user.rgtPwd) {
        showTip("错误", "密码格式发生错误！");
    } else {
        if (ac.register(user)) {
            showTip("注册", "注册成功！");
            sessionStorage.setItem("account", user.act);
            sessionStorage.setItem("isCoach", "false");
            setTimeout(() => location.href = "../student/student.html", 800);
        } else {
            showTip("因不可抗因素注册失败~");
        }
    }

}