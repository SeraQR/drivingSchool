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

$(() => {
    setTimeout("$(\"#loading\").fadeOut()", 800);
});

$("#exit").click(() => {
    sessionStorage.setItem("backLogin", true);
    location.href = "../account/login.html";
});

$("#suggestion").click(() => {
    const suggestion = prompt("非常感谢您的反馈！", "请输入您宝贵的意见");
    if (suggestion.trim() !== "") {
        $.ajax({
            url: "../../BLL/ajax/Suggestion.ashx",
            type: "POST",
            data: {
                "account": "游客",
                "content": suggestion
            },
            success: result => {
                alert("我们将在 1-3 工作日对您进行答复！");
            }
        });
    }
});