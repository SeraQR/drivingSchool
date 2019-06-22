import 'formStyle/changeInfo'
import {
  Form as _
} from 'js/form/form'
import {
  Account
} from 'js/ajax/account'
import {
  address,
  description,
  tipAddress,
  tipDescription,
  act,
  isCoach
} from 'js/common/variable'

const user = {
  act,
  isCoach,
  address: '',
  description: ''
}

$(() => {
  _.Init('50px 100px 0px 100px')
})

address.blur(() => {
  user.address = $.trim(address.val())
  if (user.address !== '') { 
    tipAddress.hide('slow')
  } else {
    tipAddress.show('slow')
  }
})
description.blur(() => {
  user.description = $.trim(description.val())
  if (user.description !== '') {
    tipDescription.hide('slow')
  } else {
    tipDescription.show('slow')
  }
})
$(document).keydown(e => {
  if (e.keyCode === 13) {
    user.description = $.trim(description.val())
    user.address = $.trim(address.val())
    changeInfo()
  }
})

$('#changeInfo').click(changeInfo)

function changeInfo() {
  if (!_.allHaveContent(user)) {
    _.showTip('不能有空值！')
  } else {
    if (Account.changeInfo(isCoach ? 'coach' : 'student', user)) {
      _.showTip('修改成功！')
      setTimeout(
        () =>
        location.href = `../${
            user.isCoach ? 'coach/coach' : 'student/student'
          }.html`,
        800
      )
    } else {
      _.showTip('因不可抗因素注册失败~')
    }
  }
}
