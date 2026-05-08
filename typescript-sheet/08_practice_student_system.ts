// ═══════════════════════════════════════════════════════════════
// 08_practice_student_system.ts — Student Management System
// ═══════════════════════════════════════════════════════════════

// Type Definitions
type StudentID = string | number;

interface Student {
	id: StudentID;
	name: string;
	age: number;
	grades: number[];
	isEnrolled: boolean;
	address?: {
		city: string;
		country: string;
	};
}

// Function to create student
function createStudent(id: StudentID, name: string, age: number): Student {
	return {
		id,
		name,
		age,
		grades: [],
		isEnrolled: true,
	};
}

// Function to add grade
function addGrade(student: Student, grade: number): void {
	if (grade < 0 || grade > 100) {
		console.log("❌ Invalid grade! Must be 0-100");
		return;
	}
	student.grades.push(grade);
	console.log(`✅ Grade ${grade} added for ${student.name}`);
}

// Function to calculate average
function getAverageGrade(student: Student): number {
	if (student.grades.length === 0) return 0;
	const sum = student.grades.reduce((a, b) => a + b, 0);
	return parseFloat((sum / student.grades.length).toFixed(2));
}

// Function to display student info
function displayStudent(student: Student): void {
	console.log("📋 Student Information");
	console.log("─────────────────────");
	console.log(`ID: ${student.id}`);
	console.log(`Name: ${student.name}`);
	console.log(`Age: ${student.age}`);
	console.log(`Enrolled: ${student.isEnrolled ? "Yes" : "No"}`);
	console.log(`Grades: ${student.grades.join(", ") || "None"}`);
	console.log(`Average: ${getAverageGrade(student)}`);
	if (student.address) {
		console.log(`Address: ${student.address.city}, ${student.address.country}`);
	}
}

// ═══════════════════════════════════════
// Usage
// ═══════════════════════════════════════

let student1 = createStudent(101, "Rahim", 20);
addGrade(student1, 85);
addGrade(student1, 90);
addGrade(student1, 78);
addGrade(student1, 150); // Invalid

displayStudent(student1);

let student2 = createStudent("S102", "Karim", 22);
addGrade(student2, 92);
addGrade(student2, 88);
addGrade(student2, 95);

student2.address = {
	city: "Dhaka",
	country: "Bangladesh",
};

displayStudent(student2);

export {};
