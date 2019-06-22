import { studentAjax } from 'js/common/variable'
export class Student {
	static getStudentList(type, account, newStudentNum) {
		let returnValue = false
		$.ajax({
			url: studentAjax,
			type: 'POST',
			async: false,
			data: {
				key: 'getStudentList',
				type: type,
				account: account,
				top: newStudentNum
			},
			success: result => {
				returnValue = result.substr(0, result.length - 1).split(';')
			}
		})
		return returnValue
	}

	static getPersonalInformation(account) {
		let returnValue = false
		$.ajax({
			url: studentAjax,
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
