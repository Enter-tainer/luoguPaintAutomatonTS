import * as fs from "fs";
import User from "../classes/User";
import ICookies from "../interfaces/Cookies";
// should be a json file
function readUsers(filePath: string): User[] {
  const res = JSON.parse(fs.readFileSync(filePath, "utf-8")).users.map(
    (v: ICookies) => new User(v));
  return res;
}

export default readUsers;
