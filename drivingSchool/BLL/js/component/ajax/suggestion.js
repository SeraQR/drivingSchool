const suggestionAjax = "../../../BLL/ajax/Suggestion.ashx";

export function insertSuggestion(account, content) {
    let returnValue = false;
    $.ajax({
        url: suggestionAjax,
        type: "POST",
        async: false,
        data: {
            "account": account,
            "content": content
        },
        success: result => {
            returnValue = result.toLowerCase() === "true";
        }
    });
    return returnValue;
}