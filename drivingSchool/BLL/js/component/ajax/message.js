const messageAjax = "../../../BLL/ajax/Message.ashx";
export function insertMessage(sender, content, receiver) {
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
export function getMessageList(type, name, newMessageNum) {
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

export function getSentMessage(name){
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