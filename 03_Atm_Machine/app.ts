#! /usr/bin/env node

import inquirer from "inquirer";
import Choices from "inquirer/lib/objects/choices.js";

let myBalance = 10000;
let myPin = 2445;

let answer = await inquirer.prompt([
  {
    name: "pin",
    message: "Enter your pin",
    type: "number",
  },
]);
if (answer.pin == myPin) {
  console.log("You entered correct pin");

  let operationAns = await inquirer.prompt({
    name: "operations",
    message: "Please select opotions to perform",
    type: "list",
    choices: ["Check Balance", "Withdraw"],
  });

  if (operationAns.operations === "Check Balance") {
    console.log(myBalance);

  } else {
    let amountAns = await inquirer.prompt([
      {
        name: "Amount",
        message: "Enter amount to withdraw",
        type: "number",
      },
    ]);

    if (amountAns.Amount > myBalance) {
      console.log("Insufficient balance");

    } else {
      console.log(amountAns.Amount + " " + "withdrawn successfully");
      myBalance = myBalance - amountAns.Amount;
      console.log("Your new balance is" + " " + myBalance);
    }
  }

} else {
  console.log("Your entered pin is incorrect");
}
