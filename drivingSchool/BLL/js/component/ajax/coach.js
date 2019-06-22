import { coachAjax } from 'js/common/variable'
export class Coach {
	static getAllInformation(type) {
		let returnValue = false
		$.ajax({
			url: coachAjax,
			type: 'POST',
			async: false,
			data: {
				key: 'getAllInformation',
				type: type
			},
			success: result =>
				(returnValue = result.substr(0, result.length - 1).split(';'))
		})
		return returnValue
	}

	static getPersonalInformation(account) {
		let returnValue = false
		$.ajax({
			url: coachAjax,
			type: 'POST',
			async: false,
			data: {
				key: 'getPersonalInformation',
				account: account
			},
			success: result => {
				returnValue = result.split('=')
			}
		})
		return returnValue
	}
}
