const act = sessionStorage.getItem("account");
const isCoach = sessionStorage.getItem("isCoach") === "true";

const jQName = $("#name");
const tipName = $("#tipName");

const address = $("#address");
const description = $("#description");

const tipAddress = $("#tipAddress");
const tipDescription = $("#tipDescription");

const btnChangeInfo = $("#changeInfo");

const tip = $("#tip");

const user = {
    act,
    isCoach,
    name: "",
    address: "",
    description: "",
    singleName: false
};

function showTip(info) {
    tip.text(info);
    info ? tip.fadeIn(500) : tip.fadeOut("slow");
}
$(() => {
    $("#changeInfoWrap").animate({
        opacity: "1",
        padding: "50px 100px 0px 100px"
    }, 500);
    $("input").val("");
});

$("input").keypress(e => {
    if (e.keyCode === 32) {
        return false;
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

jQName.blur(() => {
    user.name = $.trim(jQName.val());
    if (user.name !== "" && !user.singleName) {
        tipName.hide("slow");
        if (hasInfo("name", "student") || hasInfo("name", "coach")) {
            user.singleName = false;
            showTip("昵称已经存在！");
        } else {
            user.singleName = true;
            showTip("");
        }
    } else {
        user.singleName = false;
        showTip("");
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
        changeInfo();
    }
});

btnChangeInfo.click(changeInfo);

function changeInfo() {
    if (!allHaveContent(user)) {
        showTip("不能有空值！");
    } else if (!user.singleName) {
        showTip("昵称已经存在！");
    } else {
        $.ajax({
            url: "../../BLL/ajax/Account.ashx",
            async: false,
            type: "POST",
            data: {
                "key":"changeInfo",
                "table": isCoach ? "coach" : "student",
                "account": user.act,
                "name": user.name,
                "address": user.address,
                "description": user.description
            },
            success: result => {
                if (result.toLowerCase() === "true") {
                    showTip("修改成功！");
                    setTimeout(() => location.href = `../${user.isCoach ? "coach" : "student"}/main.html`, 800);
                } else {
                    showTip("因不可抗因素注册失败~");
                }

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