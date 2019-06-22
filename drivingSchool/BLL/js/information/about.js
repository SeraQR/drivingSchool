import 'mainStyle/student'
import { Main as _ } from 'js/main/main'

$(() => {
	$('#affiche').text('本校目前报名费只要998哦！')
	$('#name').text('你好，朋友！')
	const userText = ['个人信息', '昵称', '游客', '地址']
	const userDiv = [
		...document.getElementById('user').getElementsByTagName('div')
	]
	userDiv.forEach((e, i, a) => {
		e.textContent = userText[i]
		$(e).after('<br/>')
	})
	_.Init()
})
