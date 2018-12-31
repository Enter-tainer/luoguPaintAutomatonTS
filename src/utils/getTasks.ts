import Base32Image from "classes/Base32Image";
import ITask from "interfaces/Tasks";
import * as request from "request-promise-native";
import { Point2d } from "types/Point";
async function getBoard(): Promise<string[]> {
  const res = await request.get("https://www.luogu.org/paintBoard/board");
  return res.split("\n");
}

async function getTasks(image: Base32Image, [x, y]: Point2d): Promise<ITask[]> { // (x, y): Start Point
  const board: string[] = await getBoard();
  const resArray: ITask[] = [];
  for (let i = 0; i < image.y; ++i) { // 横坐标 i \in [0, image.y)
    for (let j = 0; j < image.x; ++j) { // 纵坐标 j \in [0, image.x]
      if (board[j + x][i + y] !== image.data[i][j]) {
        resArray.push({
          color: image.data[i][j],
          point: [j + x, i + y],
        });
      }
    }
  }
  return resArray;
}

export default getTasks;
