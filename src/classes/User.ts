import { Cookie } from "request";
import * as request from "request-promise-native";
import ICookies from "../interfaces/Cookies";
import ITask from "../interfaces/Tasks";
const UA =
  `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36`;
class User {
  public lastPaintTime: number;
  private cookie!: ICookies;
  constructor(cookie: ICookies) {
    this.cookie = cookie;
    this.lastPaintTime = (new Date()).valueOf() - 29 * 1000;
  }
  public async paint({ point, color }: ITask) {
    const [x, y] = point;
    const cookie = request.cookie(
      `__client_id=${this.cookie.clientID}; _uid=${this.cookie.UID}`,
    );
    const url = "https://www.luogu.org/paintBoard/paint";
    const res = JSON.parse(await request.post({
      form: {
        color: parseInt(color, 32),
        x,
        y,
      },
      headers: {
        "Cookie": cookie,
        "User-agent": UA,
      },
      url,
    }));
    if (res.status !== 200) {
      console.error(this.cookie.UID, res);
    } else {
      console.info(this.cookie.UID, point, color, "success");
    }
  }
}

export default User;
