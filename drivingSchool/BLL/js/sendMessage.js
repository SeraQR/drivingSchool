const tip = $("#tip");
const tipMessage = $("#tipMessage");
const message = $("#message");
const userName = sessionStorage.getItem("sender");
let content = "";

$(() => {
    $("#sendMessageWrap").animate({
        opacity: "1",
        padding: "50px 100px 0px 100px"
    }, 500);
    $("input").val("");
    getCoachName();
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
                showTip("");
            }
            $(".drop .option").removeClass("active");
            $(this).addClass("active");
        }
    });

});
let val = "placeholder";

function getCoachName() {
    $.ajax({
        url: "../../BLL/ajax/Coach.ashx",
        type: "POST",
        data: {
            "key":"getAllInformation",
            "type": "onlyName"
        },
        async: false,
        success: result => {
            result = result.substr(0, result.length - 1);
            const coaches = result.split(";");
            const select = $(".drop");
            coaches.forEach((e, index, array) => {
                select.append(` <div class=option data-value=${e}>${e}</div>`);
            });
        }
    });

}

function showTip(info) {
    tip.text(info);
    info ? tip.fadeIn(500) : tip.fadeOut("slow");
}

$("input").keypress(e => {
    if (e.keyCode === 32) {
        return false;
    }
});

message.blur(() => {
    content = $.trim(message.val());
    if (content !== "") {
        tipMessage.hide("slow");
    } else {
        tipMessage.show("slow");
    }
    if (tip.text().indexOf("消息") !== -1) {
        showTip("");
    }
});

$("#send").click(() => {
    if (val === "placeholder") {
        showTip("请选择一位教练！");
    } else if (content === "") {
        showTip("请输入消息内容！");
    } else {
        showTip("");
        $.ajax({
            url: "../../BLL/ajax/Message.ashx",
            async: false,
            type: "POST",
            data: {
                "key":"insertMessage",
                "sender": userName,
                "content": content,
                "receiver": val
            },
            success: result => {
                if(result.toLowerCase() === "true"){
                    showTip("发送成功！");
                }else{
                    showTip("因不可抗拒因素，发送失败！");
                }
            }
        });
    }
});