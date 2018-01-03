const header = document.getElementById("header"),
    steps = 7;

function threedee(e) {
    const x = Math.round(steps / (window.innerWidth / 2) * (window.innerWidth / 2 - e.clientX)),
        y = Math.round(steps / (window.innerHeight / 2) * (window.innerHeight / 2 - e.clientY));

    let shadow = "",
        color = 190,
        i, tx, ty;
    for (i = 0; i < steps; i++) {
        tx = Math.round(x / steps * i);
        ty = Math.round(y / steps * i);
        if (tx || ty) {
            color -= 3 * i;
            shadow += `${tx}px ${ty}px 0 rgb(${color}, ${color}, ${color}), `;
        }
    }
    shadow += `${x}px ${y}px 1px rgba(0,0,0,.2), ${x * 2}px ${y * 2}px 6px rgba(0,0,0,.3)`;
    header.style.textShadow = shadow;
    header.style.webkitTransform = `translateZ(0) rotateX(${y * 1.5}deg) rotateY(${-x * 1.5}deg)`;
    header.style.MozTransform = `translateZ(0) rotateX(${y * 1.5}deg) rotateY(${-x * 1.5}deg)`;
}
$(".content-header").on("mousemove", threedee);

const account = sessionStorage.getItem("account");
const isCoach = sessionStorage.getItem("isCoach") === "true";

let newStudentNum = 0;
let newMessageNum = 0;
let userName = "";

function getPersonalInformation() {
    /* 获取昵称，个人描述 */
    $.ajax({
        url: "../../BLL/ajax/Coach.ashx",
        type: "POST",
        async: false,
        data: {
            "key":"getPersonalInformation",
            "account": account
        },
        success: result => {
            const greeting = getGreeting();
            let results = result.split("=");
            $("#name").text(greeting + results[0]);
            $("#userName").text(`昵称：${results[0]}`);
            $("#userDescription").text(`描述：${results[1]}`);
            $("#userAddress").text(`住址：${results[2]}`);
            $("#newStudentNum").text(results[3]);
            $("#newMessageNum").text(results[4]);
            newStudentNum = parseInt(results[3]);
            newMessageNum = parseInt(results[4]);
            userName = results[0];
        }
    });
}


$(() => {
    Promise.all([
        getPersonalInformation(),
        getAffiche()
    ]).then(() => {
        setTimeout("$(\"#loading\").fadeOut()", 800);
    });
});

$("#exit").click(() => {
    sessionStorage.setItem("backLogin", true);
    location.href = "../account/login.html";
});

$("#modifyPwd").click(() => {
    location.href = "../account/changePwd.html";
});

$("#modifyInfo").click(() => {
    location.href = "../account/changeInfo.html";
});

$("#releaseNews").click(() => {
    const content = $.trim(prompt("请输入新的公告内容"));
    if (content !== "") {
        $.ajax({
            url: "../../BLL/ajax/Affiche.ashx",
            type: "POST",
            async: false,
            data: {
                "type": "set",
                "account": account,
                "content": content,
                "name":userName
            },
            success: result => {
                if (result.toLowerCase() === "true") {
                    getAffiche();
                }
            }
        });
    }
});

function getAffiche() {
    $.ajax({
        url: "../../BLL/ajax/Affiche.ashx",
        type: "POST",
        async: false,
        data: {
            "type": "get",
            "account": account
        },
        success: result => {
            $("#affiche").text(result);
        }
    });
}

function getGreeting() {
    const now = (new Date()).getHours();
    let greeting = "你好！";
    if (now > 5 && now <= 7) {
        greeting = "早上好！";
    } else if (now > 7 && now <= 11) {
        greeting = "上午好！";
    } else if (now > 11 && now <= 14) {
        greeting = "中午好！";

    } else if (now > 14 && now <= 17) {
        greeting = "下午好！";
    } else if (now > 17 && now <= 18) {
        greeting = "傍晚好！";
    } else if (now > 18 && now <= 21) {
        greeting = "晚上好！";
    }
    return greeting;
}

$("#newStudent").click(() => {
    if (newStudentNum !== 0) {
        sessionStorage.setItem("newStudentNum", newStudentNum);
        location.href = "studentList.html";
    } else {
        alert("暂无新增学员");

    }
    return false;
});

$("#newMessage").click(() => {
    if (newMessageNum !== 0) {
        sessionStorage.setItem("newMessageNum", newMessageNum);
        location.href = "messageList.html";
    } else {
        alert("暂无新增预约");
    }
    return false;
});