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
let userName = "";

function getPersonalInformation() {
    /* 获取昵称，个人描述 */
    $.ajax({
        url: "../../BLL/ajax/Student.ashx",
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
            userName = results[0];
            $("#userDescription").text(`描述：${results[1]}`);
            $("#userAddress").text(`住址：${results[2]}`);
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

$("#sendMessage").click(() => {
    sessionStorage.setItem("sender", userName);
    location.href = "sendMessage.html";
});
$("#onlineExam").click(() => {
    /* 实现很难哦~ */
});
$("#suggestion").click(() => {
    const suggestion = prompt("非常感谢您的反馈！", "请输入您宝贵的意见");
    if (suggestion.trim() !== "") {
        $.ajax({
            url: "../../BLL/ajax/Suggestion.ashx",
            type: "POST",
            data: {
                "account": account,
                "content": suggestion
            },
            success: result => {
                alert("我们将在 1-3 工作日对您进行答复！");
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