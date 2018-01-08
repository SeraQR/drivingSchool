import {accountAjax} from "js/common/variable";
export class Account{
    static hasInfo(type, table,name = "",account = "",password = "") {
        let returnValue = false;
        $.ajax({
            url: accountAjax,
            type: "POST",
            async: false,
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
    
    static changeInfo(table, user) {
        let returnValue = false;
        $.ajax({
            url: accountAjax,
            type: "POST",
            async: false,
            data: {
                "key": "changeInfo",
                "table": table,
                "account": user.act,
                "address": user.address,
                "description": user.description
            },
            success: result => {
                returnValue = result.toLowerCase() === "true";
            }
        });
        return returnValue;
    }
    
    static changePwd(table, account,password) {
        let returnValue = false;
        $.ajax({
            url: accountAjax,
            type: "POST",
            async: false,
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
    
    static getQuestionAnswer(table,account){
        let returnValue = false;
        $.ajax({
            url: accountAjax,
            type: "POST",
            async: false,
            data: {
                "key":"getQuestionAnswer",
                "table": table,
                "account": account
            },
            success: result => returnValue = result.split("=")
        });
        return returnValue;
    }
    
    static register(user){
        let returnValue = false;
        $.ajax({
            url: accountAjax,
            type: "POST",
            async: false,
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
}
