#! usr/bin/evn node
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.redBright("\n\n\t\t WELCOME TO STUDENT MANAGMENT SYSTEM\n\n"));
class student {
    id;
    name;
    coursesEnrolled;
    feesAmount;
    constructor(id, name, coursesEnrolled, feesAmount) {
        this.id = id;
        this.name = name;
        this.coursesEnrolled = coursesEnrolled;
        this.feesAmount = feesAmount;
    }
}
let baseId = 11000;
let studentId = "";
let continueEnrollment = true;
let students = [];
console.log("STUDENTS ARRAY", students);
do {
    let action = await inquirer.prompt({
        type: "list",
        name: "answer",
        message: chalk.yellowBright("\n\t What you want to perform ?  \n\t please select an option"),
        choices: ["Enroll a Student", "Show Student status", "Exit"]
    });
    if (action.answer === "Enroll a Student") {
        let studentName = await inquirer.prompt({
            type: "input",
            name: "answer",
            message: chalk.bgBlueBright("Please Enter Student Name : ")
        });
        let trimedstudentname = (studentName.answer).trim().toUpperCase();
        let studentNameCheck = students.map(obj => obj.name);
        if (studentNameCheck.includes(trimedstudentname) === false) {
            if (trimedstudentname !== "") {
                baseId++;
                studentId = "STDID" + baseId;
                console.log("\n\t Your Account has been Created !\n");
                console.log(chalk.blueBright(`\t WELCOME "${trimedstudentname}"`));
                let course = await inquirer.prompt({
                    type: "list",
                    name: "answer",
                    message: "Please Select a Course",
                    choices: ["I.T", "WEB DEVELOPMENT", "GRAPHIC DESIGNING", "METAVERSE"]
                });
                let coursefees = 0;
                switch (course.answer) {
                    case "I.T":
                        coursefees = 7000;
                        break;
                    case "WEB DEVELOPMENT":
                        coursefees = 10000;
                        break;
                    case "GRAPHIC DESIGNING":
                        coursefees = 5000;
                        break;
                    case "METAVERSE":
                        coursefees = 12000;
                        break;
                }
                let courseconfirm = await inquirer.prompt({
                    type: "confirm",
                    name: "answer",
                    message: `Are you sure you want to enroll in this course "${course.answer}"?`
                });
                if (courseconfirm.answer === true) {
                    let Student = new student(studentId, trimedstudentname, [course.answer], coursefees);
                    students.push(Student);
                    console.log("You have enrolled in this course");
                }
            }
            else {
                console.log("Invalid name");
            }
        }
        else {
            console.log("This name is already exists");
        }
    }
    else if (action.answer === "Show Student status") {
        if (students.length !== 0) {
            let studentNameCheck = students.map(e => e.name);
            let selectStudent = await inquirer.prompt({
                type: "list",
                name: "answer",
                message: "Please select a name",
                choices: studentNameCheck
            });
            let foundStudent = students.find(student => student.name === selectStudent.answer);
            console.log(chalk.red("Student Information"));
            console.log("FOUND STUDENT==>", foundStudent);
            console.log("\n");
        }
        else {
            console.log("\n Record is Empty!");
        }
    }
    else if (action.answer === "Exit") {
        if (continueEnrollment = true) {
            console.log(chalk.bgBlueBright.bgMagentaBright("\n\n\t Thank you for using Student Management System! "));
        }
        let userconfirm = await inquirer.prompt({
            type: "confirm",
            name: "answer",
            message: "Are you sure you want to Exit?"
        });
        if (userconfirm.answer === true) {
            continueEnrollment = false;
        }
    }
} while (continueEnrollment);
