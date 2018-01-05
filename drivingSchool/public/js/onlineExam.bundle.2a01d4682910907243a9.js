webpackJsonp([5],{11:function(module,exports,__webpack_require__){eval('/* WEBPACK VAR INJECTION */(function($) {\ufeff/* eslint-disable */\r\nconst header = document.getElementById("header"),\r\n    steps = 7;\r\n\r\nfunction threedee(e) {\r\n    const x = Math.round(steps / (window.innerWidth / 2) * (window.innerWidth / 2 - e.clientX)),\r\n        y = Math.round(steps / (window.innerHeight / 2) * (window.innerHeight / 2 - e.clientY));\r\n\r\n    let shadow = "",\r\n        color = 190,\r\n        i, tx, ty;\r\n    for (i = 0; i < steps; i++) {\r\n        tx = Math.round(x / steps * i);\r\n        ty = Math.round(y / steps * i);\r\n        if (tx || ty) {\r\n            color -= 3 * i;\r\n            shadow += `${tx}px ${ty}px 0 rgb(${color}, ${color}, ${color}), `;\r\n        }\r\n    }\r\n    shadow += `${x}px ${y}px 1px rgba(0,0,0,.2), ${x * 2}px ${y * 2}px 6px rgba(0,0,0,.3)`;\r\n    header.style.textShadow = shadow;\r\n    header.style.webkitTransform = `translateZ(0) rotateX(${y * 1.5}deg) rotateY(${-x * 1.5}deg)`;\r\n    header.style.MozTransform = `translateZ(0) rotateX(${y * 1.5}deg) rotateY(${-x * 1.5}deg)`;\r\n}\r\n$(".content-header").on("mousemove", threedee);\r\nconst tip = $("#tip");\r\nconst question = $(".question");\r\nconst optionA = $(".optionA");\r\nconst optionB = $(".optionB");\r\nconst optionC = $(".optionC");\r\nconst optionD = $(".optionD");\r\n\r\nlet answer = "";\r\nlet nowTure = 0;\r\n\r\nlet index = 0;\r\nlet oldTure;\r\n$(() => {\r\n    Promise.all([getOldTure(), loadQuestion()]).then(() => {\r\n        setTimeout("$(\\"#loading\\").fadeOut()", 800);\r\n    });\r\n});\r\n\r\nfunction loadQuestion() {\r\n    question.text(problem[index].question);\r\n    optionA.text(problem[index].optionA);\r\n    optionB.text(problem[index].optionB);\r\n    optionC.text(problem[index].optionC);\r\n    optionD.text(problem[index].optionD);\r\n}\r\n\r\nfunction getOldTure() {\r\n    oldTure = localStorage.getItem("oldTure");\r\n    if (!oldTure) {\r\n        oldTure = 0;\r\n        localStorage.setItem("oldTure", oldTure);\r\n    }\r\n    $("#oldTureNum").text(oldTure);\r\n}\r\n$("input[type=\'radio\']").click(addSelection);\r\n\r\nfunction addSelection() {\r\n    if (!problem[index].submitted) {\r\n        showTip("");\r\n        $("input[type=\'radio\']").removeClass("checked");\r\n        const data = this.getAttribute("data-value");\r\n        const I = $(`.option_${ data.toLowerCase()}`);\r\n        I.addClass("checked");\r\n\r\n        if (I.prop("checked")) {\r\n            answer = data;\r\n        }\r\n    }\r\n    return false;\r\n}\r\n\r\nfunction showTip(info) {\r\n    tip.text(info);\r\n    info ? tip.fadeIn(500) : tip.fadeOut("slow");\r\n}\r\n$("#sure").click(() => {\r\n    if (problem[index].submitted) {\r\n        showTip("您已提交过了");\r\n    } else if (answer === "") {\r\n        showTip("请选择一个选项！");\r\n    } else {\r\n        problem[index].submitted = true;\r\n        if (answer !== problem[index].answer) {\r\n            showTip(problem[index].tip);\r\n        } else {\r\n            problem[index].isTure = true;\r\n            showTip("恭喜您，答对了！");\r\n            nowTure++;\r\n            if (nowTure > oldTure) {\r\n                oldTure = nowTure;\r\n                $("#oldTureNum").text(oldTure);\r\n                localStorage.setItem("oldTure", oldTure);\r\n            }\r\n            $("#nowTureNum").text(nowTure);\r\n        }\r\n        $(`.option${ problem[index].answer}`).css("color", "green");\r\n    }\r\n});\r\n\r\nfunction Init() {\r\n    showTip("");\r\n    answer = "";\r\n    $("input[type=\'radio\']").removeClass("checked");\r\n    $(".option").attr("style", "");\r\n    if (problem[index].submitted) {\r\n        $(`.option${ problem[index].answer}`).css("color", "green");\r\n        $(`.option_${ problem[index].answer.toLowerCase()}`).addClass("checked");\r\n        if (problem[index].isTure) {\r\n            showTip("恭喜您，答对了！");\r\n        } else {\r\n            showTip(problem[index].tip);\r\n        }\r\n    }\r\n}\r\n$(".prev").click(() => {\r\n    index--;\r\n    if (index < 0) {\r\n        index = 0;\r\n        return;\r\n    }\r\n    Init();\r\n    loadQuestion();\r\n});\r\n\r\n$(".next").click(() => {\r\n    index++;\r\n    if (index > problem.length - 1) {\r\n        index = problem.length - 1;\r\n        return;\r\n    }\r\n    Init();\r\n    loadQuestion();\r\n});\n/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9kcml2aW5nU2Nob29sL0JMTC9qcy9vbmxpbmVFeGFtLmpzPzY1ZTciXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLFdBQVc7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsR0FBRyxLQUFLLEdBQUcsV0FBVyxNQUFNLElBQUksTUFBTSxJQUFJLE1BQU07QUFDekU7QUFDQTtBQUNBLGlCQUFpQixFQUFFLEtBQUssRUFBRSx5QkFBeUIsTUFBTSxLQUFLLE1BQU07QUFDcEU7QUFDQSw0REFBNEQsUUFBUSxlQUFlLFNBQVM7QUFDNUYseURBQXlELFFBQVEsZUFBZSxTQUFTO0FBQ3pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0Isb0JBQW9CO0FBQ25EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsdUJBQXVCO0FBQzNDO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsdUJBQXVCO0FBQzNDLHFCQUFxQixxQ0FBcUM7QUFDMUQ7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEUiLCJmaWxlIjoiMTEuanMiLCJzb3VyY2VzQ29udGVudCI6WyLvu78vKiBlc2xpbnQtZGlzYWJsZSAqL1xyXG5jb25zdCBoZWFkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhlYWRlclwiKSxcclxuICAgIHN0ZXBzID0gNztcclxuXHJcbmZ1bmN0aW9uIHRocmVlZGVlKGUpIHtcclxuICAgIGNvbnN0IHggPSBNYXRoLnJvdW5kKHN0ZXBzIC8gKHdpbmRvdy5pbm5lcldpZHRoIC8gMikgKiAod2luZG93LmlubmVyV2lkdGggLyAyIC0gZS5jbGllbnRYKSksXHJcbiAgICAgICAgeSA9IE1hdGgucm91bmQoc3RlcHMgLyAod2luZG93LmlubmVySGVpZ2h0IC8gMikgKiAod2luZG93LmlubmVySGVpZ2h0IC8gMiAtIGUuY2xpZW50WSkpO1xyXG5cclxuICAgIGxldCBzaGFkb3cgPSBcIlwiLFxyXG4gICAgICAgIGNvbG9yID0gMTkwLFxyXG4gICAgICAgIGksIHR4LCB0eTtcclxuICAgIGZvciAoaSA9IDA7IGkgPCBzdGVwczsgaSsrKSB7XHJcbiAgICAgICAgdHggPSBNYXRoLnJvdW5kKHggLyBzdGVwcyAqIGkpO1xyXG4gICAgICAgIHR5ID0gTWF0aC5yb3VuZCh5IC8gc3RlcHMgKiBpKTtcclxuICAgICAgICBpZiAodHggfHwgdHkpIHtcclxuICAgICAgICAgICAgY29sb3IgLT0gMyAqIGk7XHJcbiAgICAgICAgICAgIHNoYWRvdyArPSBgJHt0eH1weCAke3R5fXB4IDAgcmdiKCR7Y29sb3J9LCAke2NvbG9yfSwgJHtjb2xvcn0pLCBgO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHNoYWRvdyArPSBgJHt4fXB4ICR7eX1weCAxcHggcmdiYSgwLDAsMCwuMiksICR7eCAqIDJ9cHggJHt5ICogMn1weCA2cHggcmdiYSgwLDAsMCwuMylgO1xyXG4gICAgaGVhZGVyLnN0eWxlLnRleHRTaGFkb3cgPSBzaGFkb3c7XHJcbiAgICBoZWFkZXIuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gYHRyYW5zbGF0ZVooMCkgcm90YXRlWCgke3kgKiAxLjV9ZGVnKSByb3RhdGVZKCR7LXggKiAxLjV9ZGVnKWA7XHJcbiAgICBoZWFkZXIuc3R5bGUuTW96VHJhbnNmb3JtID0gYHRyYW5zbGF0ZVooMCkgcm90YXRlWCgke3kgKiAxLjV9ZGVnKSByb3RhdGVZKCR7LXggKiAxLjV9ZGVnKWA7XHJcbn1cclxuJChcIi5jb250ZW50LWhlYWRlclwiKS5vbihcIm1vdXNlbW92ZVwiLCB0aHJlZWRlZSk7XHJcbmNvbnN0IHRpcCA9ICQoXCIjdGlwXCIpO1xyXG5jb25zdCBxdWVzdGlvbiA9ICQoXCIucXVlc3Rpb25cIik7XHJcbmNvbnN0IG9wdGlvbkEgPSAkKFwiLm9wdGlvbkFcIik7XHJcbmNvbnN0IG9wdGlvbkIgPSAkKFwiLm9wdGlvbkJcIik7XHJcbmNvbnN0IG9wdGlvbkMgPSAkKFwiLm9wdGlvbkNcIik7XHJcbmNvbnN0IG9wdGlvbkQgPSAkKFwiLm9wdGlvbkRcIik7XHJcblxyXG5sZXQgYW5zd2VyID0gXCJcIjtcclxubGV0IG5vd1R1cmUgPSAwO1xyXG5cclxubGV0IGluZGV4ID0gMDtcclxubGV0IG9sZFR1cmU7XHJcbiQoKCkgPT4ge1xyXG4gICAgUHJvbWlzZS5hbGwoW2dldE9sZFR1cmUoKSwgbG9hZFF1ZXN0aW9uKCldKS50aGVuKCgpID0+IHtcclxuICAgICAgICBzZXRUaW1lb3V0KFwiJChcXFwiI2xvYWRpbmdcXFwiKS5mYWRlT3V0KClcIiwgODAwKTtcclxuICAgIH0pO1xyXG59KTtcclxuXHJcbmZ1bmN0aW9uIGxvYWRRdWVzdGlvbigpIHtcclxuICAgIHF1ZXN0aW9uLnRleHQocHJvYmxlbVtpbmRleF0ucXVlc3Rpb24pO1xyXG4gICAgb3B0aW9uQS50ZXh0KHByb2JsZW1baW5kZXhdLm9wdGlvbkEpO1xyXG4gICAgb3B0aW9uQi50ZXh0KHByb2JsZW1baW5kZXhdLm9wdGlvbkIpO1xyXG4gICAgb3B0aW9uQy50ZXh0KHByb2JsZW1baW5kZXhdLm9wdGlvbkMpO1xyXG4gICAgb3B0aW9uRC50ZXh0KHByb2JsZW1baW5kZXhdLm9wdGlvbkQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRPbGRUdXJlKCkge1xyXG4gICAgb2xkVHVyZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwib2xkVHVyZVwiKTtcclxuICAgIGlmICghb2xkVHVyZSkge1xyXG4gICAgICAgIG9sZFR1cmUgPSAwO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwib2xkVHVyZVwiLCBvbGRUdXJlKTtcclxuICAgIH1cclxuICAgICQoXCIjb2xkVHVyZU51bVwiKS50ZXh0KG9sZFR1cmUpO1xyXG59XHJcbiQoXCJpbnB1dFt0eXBlPSdyYWRpbyddXCIpLmNsaWNrKGFkZFNlbGVjdGlvbik7XHJcblxyXG5mdW5jdGlvbiBhZGRTZWxlY3Rpb24oKSB7XHJcbiAgICBpZiAoIXByb2JsZW1baW5kZXhdLnN1Ym1pdHRlZCkge1xyXG4gICAgICAgIHNob3dUaXAoXCJcIik7XHJcbiAgICAgICAgJChcImlucHV0W3R5cGU9J3JhZGlvJ11cIikucmVtb3ZlQ2xhc3MoXCJjaGVja2VkXCIpO1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLmdldEF0dHJpYnV0ZShcImRhdGEtdmFsdWVcIik7XHJcbiAgICAgICAgY29uc3QgSSA9ICQoYC5vcHRpb25fJHsgZGF0YS50b0xvd2VyQ2FzZSgpfWApO1xyXG4gICAgICAgIEkuYWRkQ2xhc3MoXCJjaGVja2VkXCIpO1xyXG5cclxuICAgICAgICBpZiAoSS5wcm9wKFwiY2hlY2tlZFwiKSkge1xyXG4gICAgICAgICAgICBhbnN3ZXIgPSBkYXRhO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd1RpcChpbmZvKSB7XHJcbiAgICB0aXAudGV4dChpbmZvKTtcclxuICAgIGluZm8gPyB0aXAuZmFkZUluKDUwMCkgOiB0aXAuZmFkZU91dChcInNsb3dcIik7XHJcbn1cclxuJChcIiNzdXJlXCIpLmNsaWNrKCgpID0+IHtcclxuICAgIGlmIChwcm9ibGVtW2luZGV4XS5zdWJtaXR0ZWQpIHtcclxuICAgICAgICBzaG93VGlwKFwi5oKo5bey5o+Q5Lqk6L+H5LqGXCIpO1xyXG4gICAgfSBlbHNlIGlmIChhbnN3ZXIgPT09IFwiXCIpIHtcclxuICAgICAgICBzaG93VGlwKFwi6K+36YCJ5oup5LiA5Liq6YCJ6aG577yBXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBwcm9ibGVtW2luZGV4XS5zdWJtaXR0ZWQgPSB0cnVlO1xyXG4gICAgICAgIGlmIChhbnN3ZXIgIT09IHByb2JsZW1baW5kZXhdLmFuc3dlcikge1xyXG4gICAgICAgICAgICBzaG93VGlwKHByb2JsZW1baW5kZXhdLnRpcCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcHJvYmxlbVtpbmRleF0uaXNUdXJlID0gdHJ1ZTtcclxuICAgICAgICAgICAgc2hvd1RpcChcIuaBreWWnOaCqO+8jOetlOWvueS6hu+8gVwiKTtcclxuICAgICAgICAgICAgbm93VHVyZSsrO1xyXG4gICAgICAgICAgICBpZiAobm93VHVyZSA+IG9sZFR1cmUpIHtcclxuICAgICAgICAgICAgICAgIG9sZFR1cmUgPSBub3dUdXJlO1xyXG4gICAgICAgICAgICAgICAgJChcIiNvbGRUdXJlTnVtXCIpLnRleHQob2xkVHVyZSk7XHJcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIm9sZFR1cmVcIiwgb2xkVHVyZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJChcIiNub3dUdXJlTnVtXCIpLnRleHQobm93VHVyZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICQoYC5vcHRpb24keyBwcm9ibGVtW2luZGV4XS5hbnN3ZXJ9YCkuY3NzKFwiY29sb3JcIiwgXCJncmVlblwiKTtcclxuICAgIH1cclxufSk7XHJcblxyXG5mdW5jdGlvbiBJbml0KCkge1xyXG4gICAgc2hvd1RpcChcIlwiKTtcclxuICAgIGFuc3dlciA9IFwiXCI7XHJcbiAgICAkKFwiaW5wdXRbdHlwZT0ncmFkaW8nXVwiKS5yZW1vdmVDbGFzcyhcImNoZWNrZWRcIik7XHJcbiAgICAkKFwiLm9wdGlvblwiKS5hdHRyKFwic3R5bGVcIiwgXCJcIik7XHJcbiAgICBpZiAocHJvYmxlbVtpbmRleF0uc3VibWl0dGVkKSB7XHJcbiAgICAgICAgJChgLm9wdGlvbiR7IHByb2JsZW1baW5kZXhdLmFuc3dlcn1gKS5jc3MoXCJjb2xvclwiLCBcImdyZWVuXCIpO1xyXG4gICAgICAgICQoYC5vcHRpb25fJHsgcHJvYmxlbVtpbmRleF0uYW5zd2VyLnRvTG93ZXJDYXNlKCl9YCkuYWRkQ2xhc3MoXCJjaGVja2VkXCIpO1xyXG4gICAgICAgIGlmIChwcm9ibGVtW2luZGV4XS5pc1R1cmUpIHtcclxuICAgICAgICAgICAgc2hvd1RpcChcIuaBreWWnOaCqO+8jOetlOWvueS6hu+8gVwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzaG93VGlwKHByb2JsZW1baW5kZXhdLnRpcCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiQoXCIucHJldlwiKS5jbGljaygoKSA9PiB7XHJcbiAgICBpbmRleC0tO1xyXG4gICAgaWYgKGluZGV4IDwgMCkge1xyXG4gICAgICAgIGluZGV4ID0gMDtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBJbml0KCk7XHJcbiAgICBsb2FkUXVlc3Rpb24oKTtcclxufSk7XHJcblxyXG4kKFwiLm5leHRcIikuY2xpY2soKCkgPT4ge1xyXG4gICAgaW5kZXgrKztcclxuICAgIGlmIChpbmRleCA+IHByb2JsZW0ubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgIGluZGV4ID0gcHJvYmxlbS5sZW5ndGggLSAxO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIEluaXQoKTtcclxuICAgIGxvYWRRdWVzdGlvbigpO1xyXG59KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2RyaXZpbmdTY2hvb2wvQkxML2pzL29ubGluZUV4YW0uanNcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gNSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///11\n')}},[11]);