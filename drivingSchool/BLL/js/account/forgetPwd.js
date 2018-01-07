import "formStyle/forgetPwd";
import * as _ from "js/form/form";
import * as ac from "js/ajax/account";
import {
    regBox,
    tipAccount,
    account,
    coach
} from "js/common/variable";

$(() => {
    _.Init("50px 100px 0px 100px");
});


const user = {
    act: "",
    rgtAct: false,
    isCoach: false
};

account.blur(() => {
    user.act = $.trim(account.val());
    if (user.act !== "" && !user.rgtAct) {

        tipAccount.hide("slow");
        if (!regBox.Email.test(user.act) && !regBox.Mobile.test(user.act)) {
            _.showTip("您的账号格式错误！");
            user.rgtAct = false;
        } else if (!ac.hasInfo("account", user.isCoach ? "coach" : "student","",user.act)) {
            user.rgtAct = false;
            _.showTip("该账号不存在！");
        } else {
            user.rgtAct = true;
            _.showTip("");
        }
    } else {
        user.rgtAct = false;
        _.showTip("");
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
            _.showTip("您的账号格式错误！");
            user.rgtAct = false;
        } else if (!ac.hasInfo("account", user.isCoach ? "coach" : "student","",user.act)) {
            user.rgtAct = false;
            _.showTip("该账号不存在！");
        } else {
            user.rgtAct = true;
            _.showTip("信息正确,可以登录！");
        }
    }

});
$(document).keydown(e => {
    if (e.keyCode === 13) {
        getQuestionAnswer();
    }
});

$("#forget").click(getQuestionAnswer);

function getQuestionAnswer() {

    if (user.rgtAct) {

        let question, answer;

        let results = ac.getQuestionAnswer(user.isCoach ? "coach" : "student", user.act);
        if(results){
            question = results[0];
            answer = results[1];
            
            let replyAnswer = prompt(`密保问题：${ question}`, "请输入密码答案");
            if (replyAnswer === answer) {
                sessionStorage.setItem("account", user.act);
                sessionStorage.setItem("isCoach", user.isCoach);
                location.href = "changePwd.html";
            } else {
                _.showTip("答案错误，请重试！");
            }
        }else{
            _.showTip("获取密保问题失败~");
        }
       
    } else {
        _.showTip("请输入正确的账号！");
    }
}