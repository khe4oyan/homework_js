class BigN{
	#number;
	
	constructor(num_str) {
		if (BigN.isBigN(num_str)) {
			this.#number = num_str;
			return;
		}

		this.#number = [];
		num_str = Number(num_str);
		
		let small_than_0 = false;
		if (num_str < 0) {
			small_than_0 = true;
		}

		num_str = Math.abs(num_str);
		if(typeof num_str != 'number' && !Number.isNaN(num_str)) { this.#number.push(0); return; }

		// num_str is number in this line

		num_str = String(num_str);
		let num = ''; // max 3 length

		for (let i = num_str.length - 1; i > -1 ; --i) {
			num = num_str[i] + num;
			if (num.length == 3 || i == 0) {
				this.#number.push((small_than_0) ? Number(num) * -1 : Number(num) );
				num = '';
			}
		}
	}

	static isBigN(num) {
		if (!Array.isArray(num.num)) { return false; }

		for (let i = 0; i < num.length; ++i) {
			if (num[i].length != 1 || typeof num[i] != 'number') {
				return false;
			}
		}

		return true;
	}

	get num() { return Array.from(this.#number); }
	
	sum(num) {
		this.ALF(num, (num) => {
			const num_value = num.num; // array

			let big_length = this.#number.length;
			if (num_value.length > big_length) { big_length = num_value.length;}

			let carry = false;
			
			for (let i = 0; i < big_length; ++i) {
				let left_operand = this.#number[i] ?? 0;
				let right_operand = num_value[i] ?? 0;

				let sum = left_operand + right_operand + carry;
				carry = false;
				
				if (sum >= 1000) {
					carry = true;
					sum -= 1000;
				}

				this.#number[i] = sum;
			}
		});
	}
	
	// sub(num) {
	// 	this.ALF(num, (num) => {
	// 		const num_value = num.num; // array

	// 		let big_length = this.#number.length;
	// 		if (num_value.length > big_length) { big_length = num_value.length;}
			
	// 		for (let i = 0; i < big_length; ++i) {
	// 			let left_operand = this.#number[i] ?? 0;
	// 			let right_operand = num_value[i] ?? 0;

				

	// 		}
	// 	});
	// }

	ALF(num, func) { // Arithmetic Logic Function
		if (!BigN.isBigN(num)) {
			num = new BigN(num);
		}

		func(num);
	}
};

let b_num = new BigN(22222);
console.log(b_num.num);

let b_num_2 = new BigN(11111);
console.log(b_num_2.num);

b_num.sum(b_num_2);
console.log(b_num.num, 'res');