(function ($) {
    let TABLE_ID = 0;
    $.fn.freezeHeader = function (params) {

        let copiedHeader = false;

        function freezeHeader(elem) {
            let idObj = elem.attr("id") || `tbl-${++TABLE_ID}`;
            if (elem.length > 0 && elem[0].tagName.toLowerCase() === "table") {

                let obj = {
                    id: idObj,
                    grid: elem,
                    container: null,
                    header: null,
                    divScroll: null,
                    openDivScroll: null,
                    closeDivScroll: null,
                    scroller: null
                };

                if (params && params.height) {
                    obj.divScroll = `<div id="hdScroll${obj.id}" style="height: ${params.height}; overflow-y: scroll">`;
                    obj.closeDivScroll = "</div>";
                }

                obj.header = obj.grid.find("thead");

                if (params && params.height) {
                    if ($(`#hdScroll${obj.id}`).length === 0) {
                        obj.grid.wrapAll(obj.divScroll);
                    }
                }

                obj.scroller = params && params.height ?
                    $(`#hdScroll${obj.id}`) :
                    $(window);

                obj.scroller.on("scroll", function () {

                    if ($(`#hd${obj.id}`).length === 0) {
                        obj.grid.before(`<div id="hd${obj.id}"></div>`);
                    }

                    obj.container = $(`#hd${obj.id}`);

                    if (obj.header.offset() !== null) {
                        if (limiteAlcancado(obj, params)) {
                            if (!copiedHeader) {
                                cloneHeaderRow(obj);
                                copiedHeader = true;
                            }
                        } else {

                            if ($(document).scrollTop() > obj.header.offset().top) {
                                obj.container.css("position", "absolute");
                                obj.container.css("top", `${obj.grid.find("tr:last").offset().top - obj.header.height()}px`);
                            } else {
                                obj.container.css("visibility", "hidden");
                                obj.container.css("top", "0px");
                                obj.container.width(0);
                            }
                            copiedHeader = false;
                        }
                    }

                });
            }
        }

        function limiteAlcancado(obj, aparams) {
            if (aparams && aparams.height) {
                return obj.header.offset().top <= obj.scroller.offset().top;
            }

            return $(document).scrollTop() > obj.header.offset().top && $(document).scrollTop() < obj.grid.height() - obj.header.height() - obj.grid.find("tr:last").height() + obj.header.offset().top;

        }

        function cloneHeaderRow(obj) {
            obj.container.html("");
            obj.container.val("");
            let tabela = $("<table style=\"margin: 0 0;\"></table>");
            let atributos = obj.grid.prop("attributes");

            $.each(atributos, function () {
                if (this.name !== "id") {
                    tabela.attr(this.name, this.value);
                }
            });

            tabela.append(`<thead>${obj.header.html()}</thead>`);

            obj.container.append(tabela);
            obj.container.width(obj.header.width());
            obj.container.height(obj.header.height);
            obj.container.find("th").each(function (index) {
                let cellWidth = obj.grid.find("th").eq(index).width();
                $(this).css("width", cellWidth);
            });

            obj.container.css("visibility", "visible");

            if (params && params.height) {
                obj.container.css("top", `${obj.scroller.offset().top - 240}px`);
                obj.container.css("position", "absolute");
            } else {
                obj.container.css("top", "0px");
                obj.container.css("position", "fixed");
            }
        }

        return this.each(function (i, e) {
            freezeHeader($(e));
        });

    };
}(jQuery));
$("#students").freezeHeader({
    "height": "400px"
});
const header = document.getElementById("header"),
    steps = 7;

function threedee(e) {
    const x = Math.round(steps / (window.innerWidth / 2) * (window.innerWidth / 2 - e.clientX)),
        y = Math.round(steps / (window.innerHeight / 2) * (window.innerHeight / 2 - e.clientY));

    let shadow = "",
        color = 190,
        i, tx, ty;
    for (i = 0; i < steps; i++) {
        tx = Math.round(x / steps * i);
        ty = Math.round(y / steps * i);
        if (tx || ty) {
            color -= 3 * i;
            shadow += `${tx}px ${ty}px 0 rgb(${color}, ${color}, ${color}), `;
        }
    }
    shadow += `${x}px ${y}px 1px rgba(0,0,0,.2), ${x * 2}px ${y * 2}px 6px rgba(0,0,0,.3)`;
    header.style.textShadow = shadow;
    header.style.webkitTransform = `translateZ(0) rotateX(${y * 1.5}deg) rotateY(${-x * 1.5}deg)`;
    header.style.MozTransform = `translateZ(0) rotateX(${y * 1.5}deg) rotateY(${-x * 1.5}deg)`;
}
$(".content-header").on("mousemove", threedee);

const account = sessionStorage.getItem("account");
const newStudentNum = sessionStorage.getItem("newStudentNum");

function getPersonalInformation() {
    /* 获取昵称，个人描述 */
    $.ajax({
        url: "../../BLL/ajax/Coach.ashx",
        type: "POST",
        async: false,
        data: {
            "key":"getPersonalInformation",
            "account": account
        },
        success: result => {
            let results = result.split("=");
            $("#userName").text(`昵称：${results[0]}`);
            $("#userDescription").text(`描述：${results[1]}`);
            $("#userAddress").text(`住址：${results[2]}`);
        }
    });
}

function getAffiche() {
    $.ajax({
        url: "../../BLL/ajax/Affiche.ashx",
        type: "POST",
        async: false,
        data: {
            "type": "get",
            "account": account
        },
        success: result => {
            $("#affiche").text(result);
        }
    });
}


$(() => {
    Promise.all([
        getPersonalInformation(),
        getAffiche(),
        getStudentList()
    ]).then(() => {
        setTimeout("$(\"#loading\").fadeOut()", 800);
    });
    
});

function getStudentList() {
    let ajaxType;
    if (newStudentNum) {
        ajaxType = "onlyNew";
        sessionStorage.removeItem("newStudentNum");
    } else {
        ajaxType = "all";
    }
    $.ajax({
        url: "../../BLL/ajax/Student.ashx",
        type: "POST",
        async: false,
        data: {
            "key":"getStudentList",
            "type": ajaxType,
            "account": account,
            "top": newStudentNum
        },
        success: result => {
            result = result.substr(0, result.length - 1);
            const students = result.split(";");
            const domStudents = document.getElementById("students");
            let sBody = domStudents.createTBody();

            students.forEach((element, index, array) => {
                let infos = element.split("=");
                let tr = sBody.insertRow(index);
                infos.forEach((e, i, a) => {
                    tr.insertCell(i).appendChild(new Text(e));
                });
            });
        }
    });
}