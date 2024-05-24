#! /usr/bin/env node
import { differenceInSeconds } from "date-fns";
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.redBright.bold("\n\t\t          Welcome to CountDown Timer App \n"));
console.log(chalk.bold.rgb(204, 204, 204)(`\t\t<<< ========================================== >>> `));
const respons = await inquirer.prompt([
    {
        type: "number",
        name: "userInput",
        message: chalk.blue.bold("Please enter the amount of seconds:"),
        validate: (input) => {
            if (isNaN(input)) {
                return chalk.greenBright.bold("please enter valid number");
            }
            else if (input > 60) {
                return chalk.yellowBright.bold("second must be in 60");
            }
            else {
                return true;
            }
        }
    }
]);
let input = respons.userInput;
function startTime(val) {
    const inTime = new Date().setSeconds(new Date().getSeconds() + val);
    const intervalTime = new Date(inTime);
    setInterval((() => {
        const currentTime = new Date();
        const timeDiff = differenceInSeconds(intervalTime, currentTime);
        if (timeDiff <= 0) {
            console.log(chalk.red.bold("Timer has expired"));
            process.exit();
        }
        const minute = Math.floor((timeDiff % (3600 * 24)) / 3600);
        const seconds = Math.floor(timeDiff % 60);
        console.log(`${minute.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`);
    }), 1000);
}
startTime(input);
