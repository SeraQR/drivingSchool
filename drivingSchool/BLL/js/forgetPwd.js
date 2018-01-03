const regBox = {
    Email: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,
    Mobile: /^1\d{10}$/,
    Pwd: /^.{6,10}$/
};

const tip = $("#tip");

const tipAccount = $("#tipAccount");

const account = $("#account");

const coach = $("#coach");

const user = {
    act: "",
    rgtAct: false,
    isCoach: false
};

$(() => {
    $("#forgetPwdWrap").animate({
        opacity: "1",
        padding: "50px 100px 0px 100px"
    }, 500);
    $("input").val("");
});

function showTip(info) {
    tip.text(info);
    info ? tip.fadeIn(500) : tip.fadeOut("slow");
}

function hasInfo(info, table) {
    let returnValue = false;
    $.ajax({
        url: "../../BLL/ajax/Account.ashx",
        async: false,
        type: "POST",
        data: {
            "key":"hasInfo",
            "table": table,
            "type": info,
            "account": user.act,
            "password": user.pwd,
            "name": user.name
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

$("input").keypress(e => {
    if (e.keyCode === 32) {
        return false;
    }
});

account.blur(() => {
    user.act = $.trim(account.val());
    if (user.act !== "" && !user.rgtAct) {

        tipAccount.hide("slow");
        if (!regBox.Email.test(user.act) && !regBox.Mobile.test(user.act)) {
            showTip("您的账号格式错误！");
            user.rgtAct = false;
        } else if (!hasInfo("account", user.isCoach ? "coach" : "student")) {
            user.rgtAct = false;
            showTip("该账号不存在！");
        } else {
            user.rgtAct = true;
            showTip("");
        }
    } else {
        user.rgtAct = false;
        showTip("");
        if (user.act === "") {
            tipAccount.show("slow");
        }
    }
});

coach.change(() => {
    user.isCoach = coach.prop("checked");

    user.rgtAct = false;

    if (user.act !== "") {
        if (!regBox.Email.test(user.act) && !regBox.Mobile.test(user.act)) {
            showTip("您的账号格式错误！");
            user.rgtAct = false;
        } else if (!hasInfo("account", user.isCoach ? "coach" : "student")) {
            user.rgtAct = false;
            showTip("该账号不存在！");
        } else {
            user.rgtAct = true;
            showTip("信息正确！可以登录！");
        }
    }

});

$("#forgetPwd").click(() => {

    if (user.rgtAct) {

        let question, answer;

        $.ajax({
            url: "../../BLL/ajax/Account.ashx",
            async: false,
            type: "POST",
            data: {
                "key":"getQuestionAnswer",
                "table": user.isCoach ? "coach" : "student",
                "account": user.act
            },
            success: result => {
                let results = result.split("=");
                question = results[0];
                answer = results[1];
            }
        });
        let replyAnswer = prompt(`密保问题：${ question}`, "请输入密码答案");
        if (replyAnswer === answer) {
            sessionStorage.setItem("account", user.act);
            sessionStorage.setItem("isCoach", user.isCoach);
            location.href = "changePwd.html";
        }else{
            showTip("答案错误，请重试！");
        }
    } else {
        showTip("请输入正确的账号！");
    }
});