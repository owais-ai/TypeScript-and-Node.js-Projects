#! /usr/bin/env node

import inquirer from "inquirer";

// 1) Generate a randomo number
// 2) Input a number from user
// 3) Compare both numbers and give the results

// const randomNumber = 13;


const randomNumber = Math.floor(Math.random() * 10);

const answer = await inquirer.prompt([
    {
        name: "guessedNumber",
        type: "number",
        message: "Please guess a number",      
    }
])

if (randomNumber == answer.guessedNumber){
    console.log("Congratulations! The guessed number is correct");
} else {
    console.log("The guessed number is wrong");
    console.log("The correct number is" +" "+ randomNumber);
}