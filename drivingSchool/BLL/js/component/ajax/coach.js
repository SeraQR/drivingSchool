const coachAjax = "../../../BLL/ajax/Coach.ashx";

export function getAllInformation(type) {
    let returnValue = false;
    $.ajax({
        url: coachAjax,
        async: false,
        type: "POST",
        data: {
            "key": "getAllInformation",
            "type": type
        },
        success: result => returnValue = result.substr(0, result.length - 1).split(";")
    });
    return returnValue;
}

export function getPersonalInformation(account){
    let returnValue = false;
    $.ajax({
        url: coachAjax,
        type: "POST",
        async: false,
        data: {
            "key":"getPersonalInformation",
            "account": account
        },
        success: result => {
            returnValue = result.split("=");
        }
    });
    return returnValue;
}