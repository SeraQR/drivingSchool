import 'mainStyle/onlineExam'
import { Main as _ } from 'js/main/main'
import { Form } from 'js/form/form'
import { problem } from 'js/main/exam'
import {
	OldTureNum,
	NowTureNum,
	DQuestion,
	optionA,
	optionB,
	optionC,
	optionD,
	radio
} from 'js/common/variable'

let answer = '',
	nowTure = 0,
	oldTure = 0,
	index = 0,
	toBeNo1 = false

$(() => {
	Promise.all([getOldTure(), loadQuestion()]).then(_.Init)
})
radio.click(SelectionRadio)
function SelectionRadio() {
	if (!problem[index].submitted) {
		Form.showTip('')
		radio.removeClass('checked')
		const data = $(this).attr('value')
		const I = $(`.option_${data.toLowerCase()}`)
		I.addClass('checked')
		if (I.prop('checked')) {
			answer = data
		}
	}
}
function getOldTure() {
	oldTure = localStorage.getItem('oldTure')
	if (!oldTure) {
		oldTure = 0
		localStorage.setItem('oldTure', oldTure)
	}
	OldTureNum.text(oldTure)
}

function loadQuestion() {
	DQuestion.text(problem[index].question)
	optionA.text(problem[index].optionA)
	optionB.text(problem[index].optionB)
	optionC.text(problem[index].optionC)
	optionD.text(problem[index].optionD)
}

$('#sure').click(() => {
	if (problem[index].submitted) {
		Form.showTip('您已提交过了')
	} else if (answer === '') {
		Form.showTip('请选择一个选项！')
	} else {
		problem[index].submitted = true
		if (answer !== problem[index].answer) {
			Form.showTip(problem[index].tip)
		} else {
			problem[index].isTure = true
			Form.showTip('恭喜您，答对了！')
			nowTure++
			if (nowTure > oldTure) {
				if (!toBeNo1) {
					toBeNo1 = true
					Form.showTip('恭喜您，成为了答题史的第一人！')
				}
				oldTure = nowTure
				OldTureNum.text(oldTure)
				localStorage.setItem('oldTure', oldTure)
			}

			NowTureNum.text(nowTure)
		}
		$(`.option${problem[index].answer}`).css('color', 'green')
	}
})

function Init() {
	Form.showTip('')
	answer = ''
	radio.removeClass('checked')
	$('.option').attr('style', '')
	if (problem[index].submitted) {
		$(`.option${problem[index].answer}`).css('color', 'green')
		$(`.option_${problem[index].answer.toLowerCase()}`).addClass('checked')
		if (problem[index].isTure) {
			Form.showTip('恭喜您，答对了！')
		} else {
			Form.showTip(problem[index].tip)
		}
	}
}
$('.prev').click(() => {
	index--
	if (index < 0) {
		index = 0
		return
	}
	Init()
	loadQuestion()
})

$('.next').click(() => {
	index++
	if (index > problem.length - 1) {
		index = problem.length - 1
		return
	}
	Init()
	loadQuestion()
})
