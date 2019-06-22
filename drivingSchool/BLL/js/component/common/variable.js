export const account = $('#account')
export const password = $('#password')
export const question = $('#question')
export const answer = $('#answer')
export const jQname = $('#name')
export const address = $('#address')
export const description = $('#description')
export const passwordAgain = $('#passwordAgain')
export const coach = $('#coach')
export const message = $('#message')
export const tip = $('#tip')

export const tipAccount = $('#tipAccount')
export const tipPassword = $('#tipPassword')
export const tipQuestion = $('#tipQuestion')
export const tipAnswer = $('#tipAnswer')
export const tipName = $('#tipName')
export const tipAddress = $('#tipAddress')
export const tipDescription = $('#tipDescription')
export const tipPasswordAgain = $('#tipPasswordAgain')
export const tipMessage = $('#tipMessage')
export const OldTureNum = $('#oldTureNum')
export const NowTureNum = $('#NowTureNum')

export const DQuestion = $('.question')
export const optionA = $('.optionA')
export const optionB = $('.optionB')
export const optionC = $('.optionC')
export const optionD = $('.optionD')
export const radio = $('input[type=\'radio\']')

export const act = sessionStorage.getItem('account')
export const userName = sessionStorage.getItem('userName')
export const isCoach = sessionStorage.getItem('isCoach') === 'true'

export const newMessageNum = sessionStorage.getItem('newMessageNum')
export const newStudentNum = sessionStorage.getItem('newStudentNum')

export const accountAjax = '../../../BLL/ajax/Account.ashx'
export const afficheAjax = '../../../BLL/ajax/Affiche.ashx'
export const coachAjax = '../../../BLL/ajax/Coach.ashx'
export const errorAjax = '../../../BLL/ajax/Monitor.ashx'
export const messageAjax = '../../../BLL/ajax/Message.ashx'
export const studentAjax = '../../../BLL/ajax/Student.ashx'
export const suggestionAjax = '../../../BLL/ajax/Suggestion.ashx'

export const regBox = {
	Email: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,
	Mobile: /^1\d{10}$/,
	Pwd: /^.{6,10}$/
}

export function getGreeting() {
	const now = new Date().getHours()
	let greeting = '你好！'
	if (now > 5 && now <= 7) {
		greeting = '早上好！'
	} else if (now > 7 && now <= 11) {
		greeting = '上午好！'
	} else if (now > 11 && now <= 14) {
		greeting = '中午好！'
	} else if (now > 14 && now <= 17) {
		greeting = '下午好！'
	} else if (now > 17 && now <= 18) {
		greeting = '傍晚好！'
	} else if (now > 18 && now <= 21) {
		greeting = '晚上好！'
	}
	return greeting
}

class cError {
	constructor(errorMessage, scriptURI, lineNumber, columnNumber, errorObj) {
		this.errorMessage = errorMessage
		this.scriptURI = scriptURI
		this.lineNumber = lineNumber
		this.columnNumber = columnNumber
		this.errorObj = errorObj
		this.userAgent = navigator.userAgent
	}
	toString() {
		return `错误信息：${this.errorMessage} \n 
                出错文件：${this.scriptURI} \n
                出错行号：${this.lineNumber} \n
                出错列号：${this.columnNumber} \n
                错误详情：${this.errorObj} \n
                浏览器信息：${this.userAgent}`
	}
}
import { Error } from 'js/ajax/error'
export function monitor() {
	window.onerror = (
		errorMessage,
		scriptURI,
		lineNumber,
		columnNumber,
		errorObj
	) => {
		const newError = new cError(
			errorMessage,
			scriptURI,
			lineNumber,
			columnNumber,
			errorObj
		)
		Error.uploadError(newError)
	}
}
