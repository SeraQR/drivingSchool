import 'mainStyle/coach'
import { Affiche } from 'js/ajax/affiche'
import { Main as _ } from 'js/main/main'
import { act } from 'js/common/variable'

let newStudentNum = 0
let newMessageNum = 0
let results = []
let userName = ''

$(() => {
	Promise.all([(results = _.getPersonalInformation(act)), _.getAffiche()])
		.then(_.Init)
		.then(() => {
			$('#newStudentNum').text(results[3])
			$('#newMessageNum').text(results[4])
			newStudentNum = parseInt(results[3])
			newMessageNum = parseInt(results[4])
			userName = results[0]
			sessionStorage.setItem('userName', userName)
		})
})
$('#exit').click(() => {
	sessionStorage.setItem('backLogin', true)
	location.href = '../account/login.html'
})

$('#releaseNews').click(() => {
	const content = $.trim(prompt('请输入新的公告内容'))
	if (content !== '') {
		if (Affiche.setAffiche(act, content, userName)) {
			_.getAffiche()
		} else {
			alert('发布公告失败~')
		}
	}
})

$('#newStudent').click(() => {
	if (newStudentNum !== 0) {
		sessionStorage.setItem('newStudentNum', newStudentNum)
		location.href = 'studentList.html'
	} else {
		alert('暂无新增学员')
	}
})

$('#newMessage').click(() => {
	if (newMessageNum !== 0) {
		sessionStorage.setItem('newMessageNum', newMessageNum)
		location.href = 'messageList.html'
	} else {
		alert('暂无新增预约')
	}
})
