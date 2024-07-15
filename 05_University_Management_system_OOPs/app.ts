class Person {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}

class Student extends Person {
    rollNumber: number;
    courses: any[] = []
    department: any[];

    constructor(name: string, age: number, rollNumber: number, department: any) {
        super(name, age)
        // this.name = name;
        // this.age = age;
        this.rollNumber = rollNumber;
        this.department = department;

    }
    addCourse(...course: any): void {
        this.courses.push(...course);
    }

}

class Teacher extends Person {
    Courses: any[] = []
    salary: number;
    department: any[] = []

    constructor(name: string, age: number, salary: number, department: any) {
        super(name, age)
        this.salary = salary,
            this.department.push(department);
    }

    addDepartment(...departs: any): void {
        this.department.push(...departs);
    }
    addCourse(...course: any): void {
        this.Courses.push(...course);
    }
}


let std1: Student = new Student("Owais", 30, 101, "Maths");
let std2: Student = new Student("Usama", 32, 102, "Physics")

let teacher1 = new Teacher("Sir Hassan", 35, 60000, "Maths")

let teacher2 = new Teacher("Sir Aslam", 42, 100000, "Physics")


teacher1.addDepartment("Physics", "Engineering", "Chemistry");

teacher1.addCourse("Calculus", "Algebra", "Quantum Physics");

teacher2.addCourse("Applied Physics");

std1.addCourse("Algebra", "Calculus");

std1.addCourse("Maths");

std2.addCourse("Applied Physics", "Quantum Physics");

console.log(teacher1);

console.log(teacher2);


console.log(std1);

console.log(std2);

console.log(std1.rollNumber)

console.log(std2.courses[1])
