export const account = $("#account");
export const password = $("#password");
export const question = $("#question");
export const answer = $("#answer");
export const jQname = $("#name");
export const address = $("#address");
export const description = $("#description");
export const passwordAgain = $("#passwordAgain");
export const coach = $("#coach");
export const message = $("#message");

export const tipAccount = $("#tipAccount");
export const tipPassword = $("#tipPassword");
export const tipQuestion = $("#tipQuestion");
export const tipAnswer = $("#tipAnswer");
export const tipName = $("#tipName");
export const tipAddress = $("#tipAddress");
export const tipDescription = $("#tipDescription");
export const tipPasswordAgain = $("#tipPasswordAgain");
export const tipMessage = $("#tipMessage");

export const act = sessionStorage.getItem("account");
export const isCoach = sessionStorage.getItem("isCoach") === "true";

export const newMessageNum = sessionStorage.getItem("newMessageNum");
export const newStudentNum = sessionStorage.getItem("newStudentNum");

export const regBox = {
    Email: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,
    Mobile: /^1\d{10}$/,
    Pwd: /^.{6,10}$/
};

export function getGreeting() {
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
