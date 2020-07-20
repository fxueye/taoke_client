class utils {
	static format(str, ...args) {
		for (var i = 0; i < args.length; i++)
			str = str.replace(new RegExp("\\{" + i + "\\}", "g"), args[i]);
		return str;
	}
	static dateFormat(fmt, date) {
		let ret;
		const opt = {
			"Y+": date.getFullYear().toString(), // 年
			"m+": (date.getMonth() + 1).toString(), // 月
			"d+": date.getDate().toString(), // 日
			"H+": date.getHours().toString(), // 时
			"M+": date.getMinutes().toString(), // 分
			"S+": date.getSeconds().toString() // 秒
			// 有其他格式化字符需求可以继续添加，必须转化成字符串
		};
		for (let k in opt) {
			ret = new RegExp("(" + k + ")").exec(fmt);
			if (ret) {
				fmt = fmt.replace(
					ret[1],
					ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
				);
			}
		}
		return fmt;
	}

	static paseNum(num, fixed = 2) {
		var str;
		if (num > 99999999) {
			var b = Math.floor(num / 100000000);
			var t = (num - b * 100000000) / 10000;
			str = utils.format("{0}亿{1}万", b.toFixed(fixed), t.toFixed(fixed));
		} else if (num >= 10000) {
			var v = num / 10000;
			str = utils.format("{0}万", v.toFixed(fixed));
		} else {
			str = num;
		}
		return str;
	}

	static string2Date(dateString) {
		dateString.replace(/-/g, "/");
		return new Date(Date.parse(dateString));
	}

	static timestamp2Date(timestamp) {
		return new Date(timestamp * 1000);
	}

	static timestampFormat(fmt,timestamp) {
		let date = utils.timestamp2Date(timestamp);
		return utils.dateFormat(fmt, date);
	}

	//计算页数
	static getPageNum(total, row) {
		let num = Number(total) / Number(row);
		//是否为整数
		if (num % 1 !== 0) {
			let b = num.toString(); //转字符串
			let a = parseInt(b.substring(0, b.indexOf('.'))); //取小数点前
			let s = b.replace(/\d+\.(\d*)/, '$1'); //取小数点后
			if (s > 0) {
				num = a + 1;
			}
		}
		return num;
	}
}

export default utils;
