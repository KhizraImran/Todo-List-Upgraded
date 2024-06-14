#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.bold.rgb(204, 204, 204)("\n \t <<<=====================================>>>"));
console.log(chalk.bold.rgb(204, 204, 204)(`<<<=========>>>     ${chalk.bold.hex("D10363")("Welcome To Todo-List App")}       <<<===========>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(" \t <<<======================================>>>"));
let todoList = [];
let conditions = true;
let main = async () => {
    while (conditions) {
        let option = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select an option you want to do:",
                choices: [
                    "Add Task",
                    "Delete Task",
                    "Update Task",
                    "View Todo-List",
                    "Exit",
                ],
            },
        ]);
        if (option.choice === "Add Task") {
            await addTask();
        }
        else if (option.choice === "Delete Task") {
            await deleteTask();
        }
        else if (option.choice === "Update Task") {
            await updateTask();
        }
        else if (option.choice === "View Todo-List") {
            await viewTask();
        }
        else if (option.choice === "Exit") {
            conditions = false;
        }
    }
};
let addTask = async () => {
    let newTask = await inquirer.prompt([
        {
            name: "task",
            type: "input",
            message: "Enter your new task:",
            validate: function (input) {
                if (input.trim() === "") {
                    return "Please enter something.";
                }
                return true;
            },
        },
    ]);
    todoList.push(newTask.task);
    console.log(`\n ${newTask.task} Task added successfully in Todo-List`);
};
let viewTask = () => {
    if (todoList.length === 0) {
        console.log("Your Todo list is empty.\n");
    }
    else {
        console.log("\n Your Todo-List: \n");
        todoList.forEach((task, index) => {
            console.log(`${index + 1} : ${task} `);
        });
        console.log("\n");
    }
};
let deleteTask = async () => {
    if (todoList.length === 0) {
        console.log("Your Todo list is empty. Please write something before deleting a task \n");
        return;
    }
    await viewTask();
    let taskIndex = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: "Enter the 'index number' of the task you want to delete:",
        },
    ]);
    let deletedTask = todoList.splice(taskIndex.index - 1, 1);
    console.log(`\n ${deletedTask} This task has been deleted successfully from your Todo-List\n`);
};
let updateTask = async () => {
    if (todoList.length === 0) {
        console.log("Your Todo list is empty. Please write something  before updating a task! (Thank you)\n");
        return;
    }
    await viewTask();
    let update_task_index = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: "Enter the 'index number' of the task you want to update:",
        },
        {
            name: "new_task",
            type: "input",
            message: "Now Enter new task name:",
        },
    ]);
    todoList[update_task_index.index - 1] = update_task_index.new_task;
    console.log(`\n Task at index number. ${update_task_index.index - 1} updated successfully [for updated list Check option: "View Todo-List"]`);
};
main();
