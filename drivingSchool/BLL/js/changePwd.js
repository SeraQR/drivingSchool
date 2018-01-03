const regBox = {
    Pwd: /^.{6,10}$/
};

const tip = $("#tip");

const tipPassword = $("#tipPassword");

const password = $("#password");

const passwordAgain = $("#passwordAgain");

const tipPasswordAgain = $("#tipPasswordAgain");

const user = {
    pwd: "",
    pwdAgain: "",
    isOK: false
};

$(() => {
    $("#changePwdWrap").animate({
        opacity: "1",
        padding: "50px 100px 0px 100px"
    }, 500);
    $("input").val("");
});

function showTip(info) {
    tip.text(info);
    info ? tip.fadeIn(500) : tip.fadeOut("slow");
}

$("input").keypress(e => {
    if (e.keyCode === 32) {
        return false;
    }
});

password.blur(() => {
    user.pwd = $.trim(password.val());
    if (user.pwd !== "" && !user.isOk) {

        tipPassword.hide("slow");
        if (!regBox.Pwd.test(user.pwd)) {
            showTip("您的密码格式错误！");
            user.isOK = false;
        } else {
            showTip("");
        }
    } else {
        user.isOK = false;
        showTip("");
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
            showTip("您的密码格式错误！");
        } else if (user.pwdAgain !== user.pwd) {
            user.isOK = false;
            showTip("您的两次密码内容不一致！");
        } else {
            user.isOK = true;
            showTip("");
        }
    } else {
        user.isOK = false;
        showTip("");
        if (user.pwdAgain === "") {
            tipPasswordAgain.show("slow");
        }
    }
});

const account = sessionStorage.getItem("account");
const isCoach = sessionStorage.getItem("isCoach") === "true";

$("#changePwd").click(() => {
    if (user.isOK) {

        $.ajax({
            url: "../../BLL/ajax/Account.ashx",
            async: false,
            type: "POST",
            data: {
                "key":"changePwd",
                "table": isCoach ? "coach" : "student",
                "account": account,
                "password": user.pwd
            },
            success: result => {
                if (result.toLowerCase() === "true") {
                    showTip("密码修改成功！");
                    setTimeout(() => location.href = `../${isCoach ? "coach" : "student"}/main.html`, 800);
                } else {
                    showTip("因不可抗元素，修改失败！");
                }
            },
            error: () => {
                showTip("因不可抗元素，修改失败！");
            }
        });

    } else {
        showTip("请确保密码输入正确！");
    }

});