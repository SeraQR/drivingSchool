import {messageAjax} from "js/common/variable";
export class Message{
    static insertMessage(sender, content, receiver) {
        let returnValue = false;
        $.ajax({
            url: messageAjax,
            async: false,
            type: "POST",
            data: {
                "key": "insertMessage",
                "sender": sender,
                "content": content,
                "receiver": receiver
            },
            success: result => {
                returnValue = result.toLowerCase() === "true";
            }
        });
        return returnValue;
    }
    static getMessageList(type, name, newMessageNum) {
        let returnValue = false;
        $.ajax({
            url: messageAjax,
            async: false,
            type: "POST",
            data: {
                "key": "getMessageList",
                "type": type,
                "name": name,
                "top": newMessageNum
            },
            success: result => {
                returnValue = result.substr(0, result.length - 1).split(";");
            }
        });
        return returnValue;
    }
    
    static getSentMessage(name){
        let returnValue = false;
        $.ajax({
            url: messageAjax,
            type: "POST",
            async: false,
            data: {
                "key": "getSentMessage",
                "name": name
            },
            success: result => {
                returnValue = result.substr(0, result.length - 1).split(";");
            }
        });
        return returnValue;
    }
}
