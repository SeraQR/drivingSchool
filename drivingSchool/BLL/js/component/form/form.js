export const tip = $("#tip");

export function showTip(info) {
	tip.text(info);
	info ? tip.fadeIn(500) : tip.fadeOut("slow");
}

export function Init(pos) {
	Promise.all([
		$("input").keypress(e => { return e.keyCode !== 32; }),
		$("input").val("")
	]).then(() => {
		$(".wrap").animate({ opacity: "1", padding: pos }, 500);
	});
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
