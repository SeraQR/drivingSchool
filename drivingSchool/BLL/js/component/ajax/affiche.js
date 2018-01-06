const afficheAjax = "../../../BLL/ajax/Affiche.ashx";

export function getAffiche() {
    let returnValue = false;
    $.ajax({
        url: afficheAjax,
        type: "POST",
        async: false,
        data: {
            "type": "get"
        },
        success: result => {
            returnValue = result;
        }
    });
    return returnValue;
}

export function setAffiche(account,content,name) {
    let returnValue = false;
    $.ajax({
        url: afficheAjax,
        type: "POST",
        async: false,
        data: {
            "type": "set",
            "account": account,
            "content": content,
            "name":name
        },
        success: result => {
            returnValue = result.toLowerCase() === "true";
        }
    });
    return returnValue;
}