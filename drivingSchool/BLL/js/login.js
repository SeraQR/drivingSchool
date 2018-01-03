const account = $("#account");
const password = $("#password");
const tip = $("#tip");
const coach = $("#coach");

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

const regBox = {
    Email: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,
    Mobile: /^1\d{10}$/,
    Pwd: /^.{6,10}$/
};

$(() => {
    let lAccount = localStorage.getItem("remAccount");
    let lIsCoach = localStorage.getItem("remIsCoach") === "true";
    if (lAccount && !sessionStorage.getItem("backLogin")) {
        sessionStorage.setItem("account", lAccount);
        sessionStorage.setItem("isCoach", lIsCoach);
        location.href = `../${lIsCoach ? "coach" : "student"}/main.html`;
    } else {
        $("#loginWrap").animate({
            opacity: "1",
            padding: "50px 50px 10px 50px"
        }, 500);
    }
    $("input").val("");
});

function showTip(info) {
    tip.text(info);
    info ? tip.fadeIn(500) : tip.fadeOut("slow");
}

function Login() {
    if (user.pwdLogin && user.userLogin) {
        showTip("登录成功！");

        if ($("#rememberPwd").prop("checked")) {

            localStorage.setItem("remAccount", user.act);
            localStorage.setItem("remIsCoach", user.isCoach);

        }
        sessionStorage.setItem("account", user.act);
        sessionStorage.setItem("isCoach", user.isCoach);

        setTimeout(() => location.href = `../${user.isCoach ? "coach" : "student"}/main.html`, 800);
    } else {
        showTip("请输入正确的信息！");
    }

    return false;
}


function hasInfo(info) {
    let returnValue = false;
    $.ajax({
        url: "../../BLL/ajax/Account.ashx",
        async: false,
        type: "POST",
        data: {
            "key":"hasInfo",
            "table": user.isCoach ? "coach" : "student",
            "type": info,
            "account": user.act,
            "password": user.pwd
        },
        success: result => {
            returnValue = result.toLowerCase();
        },
        error: result => {
            returnValue = false;
        }
    });
    return returnValue === "true";
}

account.blur(() => {
    user.act = $.trim(account.val());
    if (user.act !== "" && !user.userLogin) {

        $("#tipAccount").hide("slow");
        if (!regBox.Email.test(user.act) && !regBox.Mobile.test(user.act)) {
            user.userLogin = false;
            showTip("您的账号格式错误！");
        } else if (user.pwdLogin) {
            if (hasInfo("user")) {
                user.userLogin = true;
                showTip("信息正确！可以登录！");
            } else {
                user.userLogin = false;
                showTip("账号内容错误");
            }
        } else if (!hasInfo("account")) {
            user.userLogin = false;
            showTip("账号不存在！");
        } else {
            user.userLogin = true;
            showTip("");
        }
    } else {
        user.userLogin = false;
        if (tip.text().indexOf("账号") !== -1) {
            showTip("");
        }
        if (user.act === "") {
            $("#tipAccount").show("slow");
        }
    }
});
account.change(() => {
    user.userLogin = false;
});
password.blur(() => {
    user.pwd = $.trim(password.val());
    if (user.pwd !== "" && !user.pwdLogin) {
        $("#tipPwd").hide("slow");
        if (!regBox.Pwd.test(user.pwd)) {
            user.pwdLogin = false;
            showTip("您的密码格式错误！");
        } else if (user.userLogin) {
            if (hasInfo("user")) {
                user.pwdLogin = true;
                showTip("信息正确！可以登录！");
            } else {
                user.pwdLogin = false;
                showTip("密码与用户名不匹配！");
            }
        } else if (!hasInfo("password")) {
            user.pwdLogin = false;
            showTip("密码内容错误！");
        } else {
            user.pwdLogin = true;
        }
    } else {
        user.pwdLogin = false;
        if (tip.text().indexOf("密码") !== -1) {
            showTip("");
        }
        if (user.pwd === "") {
            $("#tipPwd").show("slow");
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

    if (user.pwd !== "" && hasInfo("password")) {
        if (tip.text().indexOf("密码") !== -1) {
            showTip("");
        }
        user.pwdLogin = true;
    }
    if (user.act !== "" && hasInfo("account")) {
        if (tip.text().indexOf("账号") !== -1) {
            showTip("");
        }
        user.userLogin = true;
    }
    if (user.pwdLogin && user.userLogin && hasInfo("user")) {
        showTip("信息正确！可以登录！");
    } else if (user.pwdLogin && !user.userLogin && user.act !== "") {
        showTip("账号不存在！");
    } else if (user.userLogin && !user.pwdLogin && user.pwd !== "") {
        showTip("密码与用户名不匹配！");
    } else if (user.pwd !== "" && user.act !== "") {
        showTip("请输入正确的信息！");
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

$("input").keypress(e => {
    if (e.keyCode === 32) {
        return false;
    }
});

const jsAccount = account[0];
const jsPassword = password[0];
if ("oninput" in jsAccount) {
    jsAccount.oninput = () => {
        if (tip.text().indexOf("密码") === -1) {
            showTip("");
        }
    };
    jsPassword.oninput = () => {
        if (tip.text().indexOf("账号") === -1) {
            showTip("");
        }
    };
} else {
    jsAccount.onpropertychange = () => {
        if (tip.text().indexOf("密码") === -1) {
            showTip("");
        }
    };
    jsPassword.onpropertychange = () => {
        if (tip.text().indexOf("账号") === -1) {
            showTip("");
        }
    };
}