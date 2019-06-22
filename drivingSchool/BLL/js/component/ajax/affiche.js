import { afficheAjax } from 'js/common/variable'
export class Affiche {
	static getAffiche() {
		let returnValue = false
		$.ajax({
			url: afficheAjax,
			type: 'POST',
			async: false,
			data: {
				type: 'get'
			},
			success: result => {
				returnValue = result
			}
		})
		return returnValue
	}

	static setAffiche(account, content, name) {
		let returnValue = false
		$.ajax({
			url: afficheAjax,
			type: 'POST',
			async: false,
			data: {
				type: 'set',
				account: account,
				content: content,
				name: name
			},
			success: result => {
				returnValue = result.toLowerCase() === 'true'
			}
		})
		return returnValue
	}
}
