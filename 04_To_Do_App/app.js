#! /use/bin/env node
import inquirer from "inquirer";
let todo = [];
let condition = true;
while (condition) {
    let tasks = await inquirer.prompt([
        {
            name: "task1",
            type: "input",
            message: "What would you like to add in Todo list",
            validate: function (input) {
                if (input.trim() === "") {
                    return "Task cannot be empty. Please provide a valid task.";
                }
                return true;
            }
        },
        {
            name: "addMore",
            type: "confirm",
            message: "would you like to add more Todo",
            Default: "True"
        }
    ]);
    todo.push(tasks.task1);
    console.log(todo);
    condition = tasks.addMore;
}
