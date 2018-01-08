import "formStyle/forgetPwd";
import {
    Form as _
} from "js/form/form";
import {
    Account
} from "js/ajax/account";
import {
    regBox,
    tipPassword,
    password,
    passwordAgain,
    tipPasswordAgain,
    act,
    isCoach
} from "js/common/variable";

$(() => {
    _.Init("50px 100px 0px 100px");
});

const user = {
    pwd: "",
    pwdAgain: "",
    isOK: false
};

password.blur(() => {
    user.pwd = $.trim(password.val());
    if (user.pwd !== "" && !user.isOk) {

        tipPassword.hide("slow");
        if (!regBox.Pwd.test(user.pwd)) {
            _.showTip("您的密码格式错误！");
            user.isOK = false;
        } else {
            _.showTip("");
        }
    } else {
        user.isOK = false;
        _.showTip("");
        if (user.pwd === "") {
            tipPassword.show("slow");
        }
    }
});

passwordAgain.blur(() => {
    user.pwdAgain = $.trim(passwordAgain.val());
    if (user.pwdAgain !== "") {
        tipPasswordAgain.hide("slow");
        if (!regBox.Pwd.test(user.pwdAgain)) {
            user.isOK = false;
            _.showTip("您的密码格式错误！");
        } else if (user.pwdAgain !== user.pwd) {
            user.isOK = false;
            _.showTip("您的两次密码内容不一致！");
        } else {
            user.isOK = true;
            _.showTip("");
        }
    } else {
        user.isOK = false;
        _.showTip("");
        if (user.pwdAgain === "") {
            tipPasswordAgain.show("slow");
        }
    }
});
$(document).keydown(e => {
    if (e.keyCode === 13) {
        user.pwd = $.trim(password.val());
        user.pwdAgain = $.trim(passwordAgain.val());
        if (user.pwd === user.pwdAgain) {
            if (user.pwd !== "" && regBox.Pwd.test(user.pwd)) {
                changePwd();
            } else {
                _.showTip("请确保密码输入正确！");
            }
        } else {
            _.showTip("您的两次密码内容不一致！");
        }
    }
});

$("#changePwd").click(changePwd);

function changePwd() {
    if (user.isOK) {
        if (Account.changePwd(isCoach ? "coach" : "student", act, user.pwd)) {
            _.showTip("密码修改成功！");
            setTimeout(() => location.href = `../${isCoach ? "coach/coach" : "student/student"}.html`, 800);
        } else {
            _.showTip("因不可抗元素，修改失败！");
        }

    } else {
        _.showTip("请确保密码输入正确！");
    }
}