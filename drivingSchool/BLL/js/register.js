const account = $("#account");
const password = $("#password");
const question = $("#question");
const answer = $("#answer");
const jQname = $("#name");
const address = $("#address");
const description = $("#description");

const tipAccount = $("#tipAccount");
const tipPassword = $("#tipPassword");
const tipQuestion = $("#tipQuestion");
const tipAnswer = $("#tipAnswer");
const tipName = $("#tipName");
const tipAddress = $("#tipAddress");
const tipDescription = $("#tipDescription");

const btnRegister = $("#register");
const tip = $("#tip");
const regBox = {
    Email: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,
    Mobile: /^1\d{10}$/,
    Pwd: /^.{6,10}$/
};

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

function showTip(key, info) {
    if (tip.text().indexOf(key) !== -1 || $.trim(tip.text()) === "") {
        tip.text(info);
        info ? tip.fadeIn(500) : tip.fadeOut("slow");
    }
}
$(() => {
    $("#registerWrap").animate({
        opacity: "1",
        padding: "50px 100px 0px 100px"
    }, 500);
    $("input").val("");
});

$("input").keypress(e => {
    if (e.keyCode === 32) {
        return false;
    }
    if (tip.text().indexOf("错误") !== -1) {
        tip.text(" ");
        tip.fadeOut("slow");
    }
});

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
account.blur(() => {
    user.act = $.trim(account.val());
    if (user.act !== "" && !user.rgtAct) {

        tipAccount.hide("slow");
        if (!regBox.Email.test(user.act) && !regBox.Mobile.test(user.act)) {
            showTip("账号", "您的账号格式错误！");
            user.rgtAct = false;
        } else if (hasInfo("account", "student") || hasInfo("account", "coach")) {
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
        if (user.question === "") {
            tipQuestion.show("slow");
        }
    }
});
answer.blur(() => {
    user.answer = $.trim(answer.val());
    if (user.answer !== "") {
        tipAnswer.hide("slow");
    } else {
        if (user.answer === "") {
            tipAnswer.show("slow");
        }
    }
});

jQname.blur(() => {
    user.name = $.trim(jQname.val());
    if (user.name !== "" && !user.rgtName) {
        tipName.hide("slow");
        if (hasInfo("name", "student") || hasInfo("name", "coach")) {
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
address.blur(() => {
    user.address = $.trim(address.val());
    if (user.address !== "") {
        tipAddress.hide("slow");
    } else {
        if (user.address === "") {
            tipAddress.show("slow");
        }
    }
});
description.blur(() => {
    user.description = $.trim(description.val());
    if (user.description !== "") {
        tipDescription.hide("slow");
    } else {
        if (user.description === "") {
            tipDescription.show("slow");
        }
    }
});

$(document).keydown(e => {
    if (e.keyCode === 13) {
        register();
    }
});

btnRegister.click(register);

function register() {
    if (!allHaveContent(user)) {
        showTip("错误", "发生错误，不能有空值！");
    } else if (!user.rgtAct) {
        showTip("错误", "账号内容有错误！");
    } else if (!user.rgtName) {
        showTip("错误", "发生错误，昵称已经存在！");
    } else if (!user.rgtPwd) {
        showTip("错误", "密码格式发生错误！");
    } else {
        $.ajax({
            url: "../../BLL/ajax/Account.ashx",
            async: false,
            type: "POST",
            data: {
                "key":"register",
                "table": "student",
                "account": user.act,
                "password": user.pwd,
                "question": user.question,
                "answer": user.answer,
                "name": user.name,
                "address": user.address,
                "description": user.description
            },
            success: result => {
                if (result.toLowerCase() === "true") {
                    showTip("注册", "注册成功！");
                    setTimeout(() => location.href = "../student/main.html", 800);
                } else {
                    showTip("因不可抗因素注册失败~");
                }

            },
            error: result => {
                // returnValue = false;
            }
        });
    }

}

function allHaveContent(object) {
    for (let variable in object) {
        if (object.hasOwnProperty(variable)) {
            if (object[variable] === "") {
                return false;
            }
        }
    }
    return true;
}