import { errorAjax } from 'js/common/variable'
export class Error {
	static uploadError(error) {
		let returnValue = false
		$.ajax({
			url: errorAjax,
			type: 'POST',
			data: {
				errorMessage: error.errorMessage,
				scriptURI: error.scriptURI,
				lineNumber: error.lineNumber,
				columnNumber: error.columnNumber,
				errorObj: error.errorObj,
				userAgent: error.userAgent
			},
			success: result => {
				returnValue = result.toLowerCase() === 'true'
			}
		})
		return returnValue
	}
}
