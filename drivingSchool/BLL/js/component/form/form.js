export const tip = $("#tip");

export function showTip(info) {
	tip.text(info);
	info ? tip.fadeIn(500) : tip.fadeOut("slow");
}
import {monitor} from "js/common/variable";

export function Init(pos) {
	Promise.all([
		$("input").keypress(e => { return e.keyCode !== 32; }),
		$("input").val("")
	]).then(() => {
		$(".wrap").animate({ opacity: "1", padding: pos }, 500);
	}).then(()=>{
		console.log("\n %c 项目开源地址 %c  https://github.com/Tomotoes/drivingSchool \n\n", "color:#FFFFFB;background:#1abc9c;padding:5px 0;border-radius:.5rem 0 0 .5rem;", "color:#FFFFFB;background:#080808;padding:5px 0;border-radius:0 .5rem .5rem 0;");
	}).then(monitor);
}

export function allHaveContent(object) {
	for (let variable in object) {
		if (object.hasOwnProperty(variable)) {
			if (object[variable] === "") {
				return false;
			}
		}
	}
	return true;
}
