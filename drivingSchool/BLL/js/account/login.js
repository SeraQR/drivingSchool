import "formStyle/login";
import * as _ from "js/form/form";
import * as ac from "js/ajax/account";
import {
    account,
    password,
    tipAccount,
    tipPassword,
    coach,
    reBox
} from "js/common/variable";


let act = "",
    pwd = "";
let canLogin = false,
    userLogin = false,
    pwdLogin = false,
    isCoach = false;

const user = {
    act,
    pwd,
    userLogin,
    pwdLogin,
    isCoach
};

$(() => {
    let lAccount = localStorage.getItem("remAccount");
    let lIsCoach = localStorage.getItem("remIsCoach") === "true";
    if (lAccount && !sessionStorage.getItem("backLogin")) {
        sessionStorage.setItem("account", lAccount);
        sessionStorage.setItem("isCoach", lIsCoach);
        location.href = `../${user.isCoach ? "coach/coach" : "student/student"}.html`;
    } else {
        _.Init("50px 100px 0px 100px");
    }
});

function Login() {
    if (user.pwdLogin && user.userLogin) {
        _.showTip("登录成功！");

        if ($("#rememberPwd").prop("checked")) {
            localStorage.setItem("remAccount", user.act);
            localStorage.setItem("remIsCoach", user.isCoach);
        }
        sessionStorage.setItem("account", user.act);
        sessionStorage.setItem("isCoach", user.isCoach);

        setTimeout(() => location.href = `../${user.isCoach ? "coach/coach" : "student/student"}.html`, 800);
    } else {
        _.showTip("请输入正确的信息！");
    }

    return false;
}

account.blur(() => {
    user.act = $.trim(account.val());
    if (user.act !== "" && !user.userLogin) {

        tipAccount.hide("slow");
        if (!regBox.Email.test(user.act) && !regBox.Mobile.test(user.act)) {
            user.userLogin = false;
            _.showTip("您的账号格式错误！");
        } else if (user.pwdLogin) {
            if (ac.hasInfo("user",user.isCoach ? "coach" : "student",user.act,user.pwd)) {
                user.userLogin = true;
                _.showTip("信息正确！可以登录！");
            } else {
                user.userLogin = false;
                _.showTip("账号内容错误");
            }
        } else if (!ac.hasInfo("account",user.isCoach ? "coach" : "student",user.act,user.pwd)) {
            user.userLogin = false;
            _.showTip("账号不存在！");
        } else {
            user.userLogin = true;
            _.showTip("");
        }
    } else {
        user.userLogin = false;
        if (_.tip.text().indexOf("账号") !== -1) {
            _.showTip("");
        }
        if (user.act === "") {
            tipAccount.show("slow");
        }
    }
});
account.change(() => {
    user.userLogin = false;
});
password.blur(() => {
    user.pwd = $.trim(password.val());
    if (user.pwd !== "" && !user.pwdLogin) {
        tipPassword.hide("slow");
        if (!regBox.Pwd.test(user.pwd)) {
            user.pwdLogin = false;
            _.showTip("您的密码格式错误！");
        } else if (user.userLogin) {
            if (ac.hasInfo("user",user.isCoach ? "coach" : "student",user.act,user.pwd)) {
                user.pwdLogin = true;
                _.showTip("信息正确！可以登录！");
            } else {
                user.pwdLogin = false;
                _.showTip("密码与用户名不匹配！");
            }
        } else if (!ac.hasInfo("password",user.isCoach ? "coach" : "student",user.act,user.pwd)) {
            user.pwdLogin = false;
            _.showTip("密码内容错误！");
        } else {
            user.pwdLogin = true;
        }
    } else {
        user.pwdLogin = false;
        if (_.tip.text().indexOf("密码") !== -1) {
            _.showTip("");
        }
        if (user.pwd === "") {
            tipPassword.show("slow");
        }
    }
});
password.change(() => {
    user.pwdLogin = false;
});
coach.change(() => {
    user.isCoach = coach.prop("checked");

    user.pwdLogin = false;
    user.userLogin = false;

    if (user.pwd !== "" && ac.hasInfo("password",user.isCoach ? "coach" : "student",user.act,user.pwd)) {
        if (_.tip.text().indexOf("密码") !== -1) {
            _.showTip("");
        }
        user.pwdLogin = true;
    }
    if (user.act !== "" && ac.hasInfo("account",user.isCoach ? "coach" : "student",user.act,user.pwd)) {
        if (_.tip.text().indexOf("账号") !== -1) {
            _.showTip("");
        }
        user.userLogin = true;
    }
    if (user.pwdLogin && user.userLogin && ac.hasInfo("user",user.isCoach ? "coach" : "student",user.act,user.pwd)) {
        _.showTip("信息正确！可以登录！");
    } else if (user.pwdLogin && !user.userLogin && user.act !== "") {
        _.showTip("账号不存在！");
    } else if (user.userLogin && !user.pwdLogin && user.pwd !== "") {
        _.showTip("密码与用户名不匹配！");
    } else if (user.pwd !== "" && user.act !== "") {
        _.showTip("请输入正确的信息！");
    }

});

$(document).keydown(e => {
    if (e.keyCode === 13) {
        user.act = $.trim(account.val());
        user.pwd = $.trim(password.val());
        Login();
    }
});

$("#login").click(Login);

const jsAccount = account[0];
const jsPassword = password[0];
if ("oninput" in jsAccount) {
    jsAccount.oninput = () => {
        if (_.tip.text().indexOf("密码") === -1) {
            _.showTip("");
        }
    };
    jsPassword.oninput = () => {
        if (_.tip.text().indexOf("账号") === -1) {
            _.showTip("");
        }
    };
} else {
    jsAccount.onpropertychange = () => {
        if (_.tip.text().indexOf("密码") === -1) {
            _.showTip("");
        }
    };
    jsPassword.onpropertychange = () => {
        if (_.tip.text().indexOf("账号") === -1) {
            _.showTip("");
        }
    };
}