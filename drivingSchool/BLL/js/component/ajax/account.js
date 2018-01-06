const accountAjax = "../../../BLL/ajax/Account.ashx";
export function hasInfo(type, table,name = "",account = "",password = "") {
    let returnValue = false;
    $.ajax({
        url: accountAjax,
        async: false,
        type: "POST",
        data: {
            "key": "hasInfo",
            "table": table,
            "type": type,
            "name":name,
            "account":account,
            "password":password
        },
        success: result => {
            returnValue = result.toLowerCase() === "true";
        }
    });
    return returnValue;
}

export function changeInfo(table, user) {
    let returnValue = false;
    $.ajax({
        url: accountAjax,
        async: false,
        type: "POST",
        data: {
            "key": "changeInfo",
            "table": table,
            "account": user.act,
            "name": user.name,
            "address": user.address,
            "description": user.description
        },
        success: result => {
            returnValue = result.toLowerCase() === "true";
        }
    });
    return returnValue;
}

export function changePwd(table, account,password) {
    let returnValue = false;
    $.ajax({
        url: accountAjax,
        async: false,
        type: "POST",
        data: {
            "key": "changePwd",
            "table": table,
            "account": account,
            "password": password
        },
        success: result => {
            returnValue = result.toLowerCase() === "true";
        }
    });
    return returnValue;
}

export function getQuestionAnswer(table,account){
    let returnValue = false;
    $.ajax({
        url: accountAjax,
        async: false,
        type: "POST",
        data: {
            "key":"getQuestionAnswer",
            "table": table,
            "account": account
        },
        success: result => returnValue = result.split("=")
    });
    return returnValue;
}

export function register(user){
    let returnValue = false;
    $.ajax({
        url: accountAjax,
        async: false,
        type: "POST",
        data: {
            "key": "register",
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
            returnValue = result.toLowerCase() === "true";
        }
    });
    return returnValue;
}