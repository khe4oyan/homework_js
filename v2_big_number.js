class BigN{
	#sign; // '+' or '-'
	#number;

	constructor(num_str) {
		this.#sign = '+';
		if (BigN.isBigN(num_str)) {
			this.#number = num_str.num;
			return;
		}
		
		this.#number = [];
		
		// num_str is number in this line

		num_str = String(num_str);

		for (let i = 0; i < num_str.length; ++i) {
			if (num_str[i] == '-' && i == 0) { this.#sign = '-'; continue; }

			if (num_str.charCodeAt(i) > 47 && num_str.charCodeAt(i) < 58) { continue; }
			new Error(`strings every symbol can be only number: ${num_str[i]}`);
		}

		let num = ''; // max 3 length

		for (let i = num_str.length - 1; i > -1 ; --i) {
			if (num_str[i] == '-') { continue; }
			num = num_str[i] + num;
			if (num.length == 3 || i == 0) {
				this.#number.push(Number(num));
				num = '';
			}
		}
	}

	static isBigN(num) {
		// PRECONDITION: Input data
		// POSTCONDITION: Return true if data is BigN and false if not
		if (!Array.isArray(num.num)) { return false; }

		for (let i = 0; i < num.length; ++i) {
			if (num[i].length != 1 || typeof num[i] != 'number') {
				return false;
			}
		}

		return true;
	}

	get num() { return Array.from(this.#number); }
	get sign() { return this.#sign; }

	sum(input_right_operand) {
		this.#ALF(input_right_operand, (right_operand) => {
			const reserve = right_operand; // for get sign in while
			right_operand = right_operand.num;

			while(right_operand[0] != 0 || right_operand.length != 1) {
				this.#decrement(right_operand);
				
				const sign_left = this.sign;
				const sign_right = reserve.sign;

				if (this.#number[0] == 0 && this.#number.length == 1) {
					this.#sign = (this.#sign == '+') ? '-' : '+';
				}

				if (sign_left == '+') {
					if (sign_right == '+') {
						this.#increment();
					}else {
						this.#decrement(this.#number);
					}
				}else {
					if (sign_right == '+') {
						this.#decrement(this.#number);
					}else {
						this.#increment();
					}
				}
			}
		});
	}

	sub(input_right_operand) {
		this.#ALF(input_right_operand, (right_operand) => {
			const reserve = right_operand; // for get sign in while
			right_operand = right_operand.num;

			while(right_operand[0] != 0 || right_operand.length != 1) {
				this.#decrement(right_operand);
				
				const sign_left = this.sign;
				const sign_right = reserve.sign;

				if (this.#number[0] == 0 && this.#number.length == 1) {
					this.#sign = (this.#sign == '+') ? '-' : '+';
				}

				if (sign_left == '+') {
					if (sign_right == '+') {
						this.#decrement(this.#number);
					}else {
						this.#increment();
					}
				}else {
					if (sign_right == '+') {
						this.#increment();
					}else {
						this.#decrement(this.#number);
					}
				}
			}
		});
	}

	mul(input_right_operand) {
		this.#ALF(input_right_operand, (right_operand) => {
			right_operand = right_operand.num;
			let mul_num = Array.from(this.#number);

			while(right_operand[0] != 0 || right_operand.length != 1) {
				this.#decrement(right_operand);
				this.sum(mul_num);
			}
		});
	}

	#increment() {
			// increment this.#number
		++this.#number[0];
		
		if (this.#number[0] < 1000) {
			return;
		}
		
		this.#number[0] = 0;
		// have carry
		let carry = true;
		let i = 1;

		while(carry) {
			if (this.#number[i] == undefined) {
				this.#number.push(1);
				carry = false;
			} else {
				++this.#number[i];
				if (this.#number[i] < 1000) {
					carry = false;
				}
				++i;
			}
		}
	}

	#decrement(operand) {
		// POSTCONDITION: right_operand always >= 0
		if (operand.length == 1) {
			if (operand[0] != 0 && operand[0] > 0) {
				--operand[0]; 
			}
			return;
		}

		let carry = false;

		for (let i = 0; i < operand.length - 1; ++i) {
			if (carry) {
				--operand[i];
				carry = false;
			}else {
				--operand[i];
			}

			if (operand[i] - carry < 0) {
				// have carry
				operand[i] = 999;
				carry = true;
				continue;
			}
			
			return;
		}
		
		// length == 1 || carry
		const last_index = operand.length - 1;
		
		if (carry) {
			--operand[last_index];
			if (operand[last_index] == 0 && operand.length > 1) {
				operand.pop();
			}
		}
	}

	#ALF(right_operand, operation) { // Arithmetic Logic Function
		if (!BigN.isBigN(right_operand)) {
			right_operand = new BigN(right_operand);
		}

		operation(right_operand);
	}

	toString() {
		let str = (this.#sign == '+') ? '' : '-';

		for (let i = this.#number.length - 1; i > -1; --i) {
			str += this.#number[i];
		}

		return str;
	}
};


// =======================================
// =============- TEST ZONE -=============
// =================- 1 -=================

console.clear();
for (let i = 0; i < 20; ++i) {
	console.log();
}

sum_test(4567, 123, 'a + b');
sub_test(4567, 123, 'a - b');
mul_test(100, 2, 'a * b');

toString_test(43211);

function toString_test(num) {
	let b_num = new BigN(num);
	console.log(b_num.toString());
}

function mul_test(num_1, num_2, str) {
	console.log('-----------------------');
	let b_num = new BigN(num_1);
	console.log(b_num.num, '\t// a');
	
	let b_num_2 = new BigN(num_2);
	console.log(b_num_2.num, '\t// b');
	
	b_num.mul(b_num_2);
	console.log(b_num.num, `\t// ${str}`);
	console.log(num_1 * num_2);
}

function sum_test(num_1, num_2, str) {
	console.log('-----------------------');
	let b_num = new BigN(num_1);
	console.log(b_num.num, '\t// a');
	
	let b_num_2 = new BigN(num_2);
	console.log(b_num_2.num, '\t// b');
	
	b_num.sum(b_num_2);
	console.log(b_num.num, `\t// ${str}`);
	console.log(num_1 + num_2);
}

function sub_test(num_1, num_2, str) {
	console.log('-----------------------');
	let b_num = new BigN(num_1);
	console.log(b_num.num, '\t// a');
	
	let b_num_2 = new BigN(num_2);
	console.log(b_num_2.num, '\t// b');
	
	b_num.sub(b_num_2);
	console.log(b_num.num, `\t// ${str}`);
	console.log(num_1 - num_2);
}

// =======================================
// =============- TEST ZONE -=============
// =================- 2 -=================


// let arr = [1, 2];
// let arr2 = [1, 2, 3]

// while(arr[0] != 0 || arr.length != 1) {
// 	// increment left operand
// 	decrement(arr);
// 	increment(arr2);
// }

// console.log('Result');
// console.log(arr2);

function increment(operand) {
	
	++operand[0];
	
	if (operand[0] < 10) {
		return;
	}
	
	operand[0] = 0;
	// have carry
	let carry = true;
	let i = 1;

	while(carry) {
		if (operand[i] == undefined) {
			operand.push(1);
			carry = false;
		} else {
			++operand[i];
			if (operand[i] < 10) {
				carry = false;
			}
			++i;
		}
	}
}

function decrement(operand) {
	// POSTCONDITION: operand always >= 0
	if (operand.length == 1) {
		if (operand[0] != 0 && operand[0] > 0) {
			--operand[0]; 
		}
		return;
	}

	let carry = false;

	for (let i = 0; i < operand.length - 1; ++i) {
		if (carry) {
			--operand[i];
			carry = false;
		}else {
			--operand[i];
		}

		if (operand[i] - carry < 0) {
			// have carry
			operand[i] = 9;
			carry = true;
			continue;
		}
		
		return;
	}
	
	// length == 1 || carry
	const last_index = operand.length - 1;
	
	if (carry) {
		--operand[last_index];
		if (operand[last_index] == 0 && operand.length > 1) {
			operand.pop();
		}
	}
}