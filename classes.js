class NaturalNeeds {
	eat;
	water;

	constructor() {
		this.eat = 0;
		this.water = 0;
	}

	eat(food_energy) {
		this.eat -= food_energy;
		if (this.eat < 0) {
			this.eat = 0;
		}
	}

	drink(drink_energy) {
		this.water -= drink_energy;
		if (this.water < 0) {
			this.water = 0;
		}
	}

	change() {
		this.eat -= 1;
		this.water -= 2;
	}
}

class Animal {
	name;
	age;
	needs;

	constructor(name, age) {
		this.name = name;
		this.age = age;
		
		Object.defineProperty(this, 'name', { writable: false });

		this.needs = new NaturalNeeds();
	}

	say(message = "") {
		throw ('Edit say(message = "") method!!');
	}
}

class Dog extends Animal{
	breed; // порода
	owner;

	constructor(name, age, breed, owner = null) {
		super(name, age);
		this.breed = breed;
		Object.defineProperty(this, 'breed', { writable: false });
		this.owner = owner;

		if (this.owner != null) {
			this.owner.dog = this;
		}
	}

	say() {
		console.log(`${this.name}(dog): woof!`);
	}
}

class Person extends Animal{
	dog;
	money;
	constructor(name, age, dog = null) {
		super(name, age);
		this.dog = dog;
		this.money = 0;
	}

	say(message ='JS is not bad language!') {
		console.log(`${this.name}(person): ${message}`);
	}
}

class Pilot extends Person{
	can_fly;
	helicopter;

	constructor(name, age, helicopter) {
		super(name, age);
		this.can_fly = true;
		this.helicopter = helicopter;
	}

	say(message = 'I love fly!') {
		console.log(`${this.name}(pilot): ${message}`);
	}
}

class Doctor extends Person {
	can_heal;

	constructor(name, age) {
		super(name, age);
		this.can_heal = true;
	}

	say(message = "hi! I'm a doctor!") {
		console.log(`${this.name}(doctor): ${message}`);
	}

	heal(person) {
		console.log(`[${this.name}(doctor)]: heal [${person.name}]`);
	}
}

class Helicopter {
	pilot; // Pilot
	passengers; // Person []
	max_passengers;
	fuel; // 0 - 50
	started;

	constructor(max_passengers = 4) {
		this.fuel = 50;
		this.max_passengers = max_passengers;
		this.passengers = [];
		this.started = fasle;
	}

	pilot_set(pilot) {
		this.pilot = pilot; 
		this.pilot.helicopter = this;
		console.log(`[Helicopter]: ${pilot.name} set a new pilot`);
	}

	pilot_unset() {
		this.pilot.helicopter = null;
		this.pilot = null;
	}

	enter(person) {
		if (this.passengers.length < this.max_passengers) {
			person.helicopter_id = new Date().getTime();
			this.passengers.push(person);
			console.log(`[Helicopter]: ${person.name} sited in helicopter`);
		}else {
			console.log(`[Helicopter]: ${person.name} can't sit in helicopter`);
		}
	}

	leave(id) {
		let res = [];

		for (let i = 0; i < this.passengers.length; ++i) {
			if (this.passengers[i].helicopter_id != id) {
				res.push(this.passengers[i]);
			}else {
				delete this.passengers[i].helicopter_id;
				console.log(`[Helicopter]: ${this.passengers[i].name} leave helicopter`);
			}
		}
		
		this.passengers = res;
	}

	start() {
		if (this.fuel == 0) {
			console.log(`[Helicopter]: can't startig(no fuel)`);
		} else {
			if (this.started) {
				console.log(`[Helicopter]: helicopter is started`);
			}else {
				console.log(`[Helicopter]: starting`);
			}
		}
	}

	stop() {
		if (!this.started) {
			console.log(`[Helicopter]: helicopter is stopped`);
		}else {
			console.log(`[Helicopter]: stopping`);
		}
	}

	fill(fuel) {
		this.fuel = fuel;
	}

	flying() {
		--this.fuel;
		if (this.fuel == 0) {
			this.started = false;
			console.log(`[Helicopter]: empty fuel..`);
		} else
		if (this.fuel < 10) {
			this.started = false;
			console.log(`[Helicopter]: fuel small than 10`);
		}
	}
}

class Hospital {
	doctors; // Doctor []
	helicopter;
	pacients; // person []

	constructor(helicopter = null) {
		this.doctors = [];
		this.pacients = [];
		this.helicopter = helicopter;
	}

	add_doctor(doctor) {
		this.doctors.push(doctor);
	}

	add_pacient(pacient) {
		if (this.doctors.length == 0) {
			console.log(`[Hospital]: sorry. This hospital haven't any doctor`);
		}else {
			console.log(`[Hospital]: *dzn dznn!* we have a new pacient! ${pacient.name}`);
			this.pacients.push(pacient);
		}
	}

	set_helicopter(hel) {
		this.helicopter = hel;
	}
}