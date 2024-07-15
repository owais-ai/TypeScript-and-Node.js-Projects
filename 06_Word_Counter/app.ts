#! /usr/bin/env node 

import inquirer from "inquirer"

let text = await inquirer.prompt ([{
  name: "paragrapgh",
  message: "kindly enter the text",
  type: "input"
}]);



const words:string[] = text.paragrapgh.trim().split(" ");  //It will remove the whitespaces and create a new array that will contain words.

console.log(words);

console.log(`The number of words in your text is ${words.length}`);


text.paragrapgh = text.paragrapgh.trim(); // It will calculate the length of the string in text.paragraph

console.log(`The number of charaters in your text is ${text.paragrapgh.length}`);

