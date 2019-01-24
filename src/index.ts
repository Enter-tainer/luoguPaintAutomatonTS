import * as path from "path";
import User from "./classes/User";
import ITask from "./interfaces/Tasks";
import readBase32Image from "./io/readBase32Image";
import readUsers from "./io/readUsers";
import getTasks from "./utils/getTasks";
import { getTime, sleep } from "./utils/timeUtils";

const users = readUsers(path.resolve(__dirname, "../", "data", "users.json"));
const image = readBase32Image(path.resolve(__dirname, "../", "data", "test.32"));
// const image = ppm2Base32(readPPMImage("../data/test.ppm"));

console.log("Users: ", users, "\n\n");
console.log("Image: ", image, "\n\n");

let tasks: ITask[] = [];

async function updateTasks() {
  return await getTasks(image, [402, 226]);
}

async function paint() {
  while (1) {
    if (tasks.length === 0) {
      await sleep(1000);
      tasks = await updateTasks();
      console.log("Tasks: ", tasks, "\n\n");
      console.log("Paint logs:");
      if (tasks.length === 0) {
        continue;
      }
    }
    if (getTime() - users[0].lastPaintTime <= 31 * 1000) {
      await sleep(31 * 1000 - (getTime() - users[0].lastPaintTime));
    }
    await users[0].paint(tasks[0]);
    users[0].lastPaintTime = getTime();
    users.push(users.shift() as User);
    tasks.shift();
  }
}

paint().then(
  (res) => {
    console.log("finish");
  },
  (err) => {
    console.error(err);
  },
);
