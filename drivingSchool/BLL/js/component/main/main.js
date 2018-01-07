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
import {monitor} from "js/common/variable";
export function Init() {
    Promise.all([
        $(".content-header").on("mousemove", threedee),
        setTimeout("$(\"#loading\").fadeOut()", 800)
    ]).then(() => {
        console.log("\n %c 项目开源地址 %c  https://github.com/Tomotoes/drivingSchool \n\n", "color:#FFFFFB;background:#1abc9c;padding:5px 0;border-radius:.5rem 0 0 .5rem;", "color:#FFFFFB;background:#080808;padding:5px 0;border-radius:0 .5rem .5rem 0;");
    }).then(monitor);
}
export function fixedTHeader() {
    $(".table").freezeHeader({
        "height": "400px"
    });
}

import * as co from "js/ajax/coach";
import * as st from "js/ajax/student";
import {
    getGreeting,
    isCoach
} from "js/common/variable";
export function getPersonalInformation(account) {
    let results = [];
    if (isCoach) {
        results = co.getPersonalInformation(account);
    } else {
        results = st.getPersonalInformation(account);
    }
    if (results) {
        const greeting = getGreeting();
        $("#name").text(greeting + results[0]);
        $("#userName").text(`昵称：${results[0]}`);
        $("#userType").text(`身份：${isCoach ? "教练" : "学员"}`);
        $("#userDescription").text(`描述：${results[1]}`);
        $("#userAddress").text(`住址：${results[2]}`);
    } else {
        alert("获取个人信息发生错误~");
    }
    return results;
}

import * as af from "js/ajax/affiche";
export function getAffiche() {
    const result = af.getAffiche();
    if (result) {
        $("#affiche").text(result);
    } else {
        alert("获取公告发生错误~");
    }
}

export function createTable(result){
    const domStudents = document.querySelector(".table");
    let sBody = domStudents.createTBody();
    result.forEach((element, index, array) => {
        let infos = element.split("=");
        let tr = sBody.insertRow(index);
        infos.forEach((e, i, a) => {
            tr.insertCell(i).appendChild(new Text(e));
        });
    });
}