import "formStyle/sendMessage";
import * as _ from "js/form/form";
import * as me from "js/ajax/message";
import * as co from "js/ajax/coach";
import {
    message,
    tipMessage
} from "js/common/variable";

let content = "";
let val = "placeholder";
const userName = sessionStorage.getItem("sender");

$(() => {
    _.Init("50px 100px 0px 100px");
    getCoachName();
});

$(".drop .option").click(function () {
    val = $(this).attr("data-value");
    let
        $drop = $(".drop"),
        prevActive = $(".drop .option.active").attr("data-value"),
        options = $(".drop .option").length;
    $drop.find(".option.active").addClass("mini-hack");
    $drop.toggleClass("visible");
    $drop.removeClass("withBG");
    $(this).css("top");
    $drop.toggleClass("opacity");
    $(".mini-hack").removeClass("mini-hack");
    if ($drop.hasClass("visible")) {
        setTimeout(function () {
            $drop.addClass("withBG");
        }, 400 + options * 100);
    }
    if (val !== "placeholder" || prevActive === "placeholder") {
        if (tip.text().indexOf("教练") !== -1) {
            _.showTip("");
        }
        $(".drop .option").removeClass("active");
        $(this).addClass("active");
    }
});

function getCoachName() {
    const coaches = co.getAllInformation("onlyName");
    if (coaches) {
        const select = $(".drop");
        coaches.forEach((e, index, array) => {
            select.append(` <div class=option data-value=${e}>${e}</div>`);
        });
    } else {
        _.showTip("出了点故障~");
    }
}

message.blur(() => {
    content = $.trim(message.val());
    if (content !== "") {
        tipMessage.hide("slow");
    } else {
        tipMessage.show("slow");
    }
    if (tip.text().indexOf("消息") !== -1) {
        _.showTip("");
    }
});

$(document).keydown(e => {
    if (e.keyCode === 13) {
        send();
    }
});

$("#send").click(send);

function send() {
    if (val === "placeholder") {
        _.showTip("请选择一位教练！");
    } else if (content === "") {
        _.showTip("请输入消息内容！");
    } else {
        _.showTip("");
        if (me.insertMessage(userName, content, val)) {
            _.showTip("发送成功！");
        } else {
            _.showTip("因不可抗拒因素，发送失败！");
        }
    }
}
