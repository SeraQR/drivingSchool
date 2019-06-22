import 'mainStyle/list'
import { Main as _ } from 'js/main/main'
import { Message } from 'js/ajax/message'

import { act, newMessageNum, userName } from 'js/common/variable'

$(() => {
	Promise.all([_.getPersonalInformation(act), _.getAffiche(), getMessageList()])
		.then(_.Init)
		.then(_.fixedTHeader)
})

function getMessageList() {
	let ajaxType
	if (newMessageNum) {
		ajaxType = 'onlyNew'
		sessionStorage.removeItem('newMessageNum')
	} else {
		ajaxType = 'all'
	}
	const result = Message.getMessageList(ajaxType, userName, newMessageNum)
	if (result) {
		_.createTable(result)
	} else {
		alert('获取预约列表失败~')
	}
}
