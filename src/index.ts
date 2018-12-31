import User from "./classes/User";
import ITask from "./interfaces/Tasks";
import readBase32Image from "./io/readBase32Image";
import readPPMImage from "./io/readPPMImage";
import readUsers from "./io/readUsers";
import getTasks from "./utils/getTasks";
import ppm2Base32 from "./utils/ppm2Base32";
import { getTime, sleep } from "./utils/timeUtils";

const users = readUsers("../data/users.json");
// const image = readBase32Image("../data/test.32");
const image = ppm2Base32(readPPMImage("../data/test.ppm"));

console.log("Users: ", users, "\n\n");
console.log("Image: ", image, "\n\n");

let tasks: ITask[] = [];

async function updateTasks() {
  return await getTasks(image, [688, 194]);
}

async function paint() {
  while (1) {
    if (tasks.length === 0) {
      await sleep(1000);
      tasks = await updateTasks();
      console.log("Tasks: ", tasks, "\n\n");
      console.log("Paint logs:");
    }
    if (getTime() - users[0].lastPaintTime <= 30 * 1000) {
      await sleep(30 * 1000 - (getTime() - users[0].lastPaintTime));
    }
    users[0].lastPaintTime = getTime();
    users[0].paint(tasks[0]);
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
