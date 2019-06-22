module.exports = {
    HTMLDirs: [
        'account/login',
        'account/register',
        'account/forgetPwd',
        'account/changePwd',
        'account/changeInfo',
        'student/sendMessage',


        'coach/coach',
        'coach/messageList',
        'coach/studentList',

        'student/student',
        'student/coachList',
        'student/onlineExam',
        'student/sentMessage',

        'information/about'
    ],
    formChunks: ['login', 'register', 'forgetPwd', 'changePwd', 'changeInfo', 'sendMessage'],
    mainChuks:['coach','messageList','studentList','student','coachList','onlineExam','sentMessage','about'],
    cssPublicPath: '../',
    imgOutputPath: '/img/',
    cssOutputPath: 'css/style.css',
    devServerOutputPath: '../public',
    templatePath: '../drivingSchool/UI/',
    jsEntryPath: '../drivingSchool/BLL/js/',
    imgEntryPath: '../drivingSchool/Data/img/favicon.ico',
    outputPath: '../drivingSchool/public'
}
