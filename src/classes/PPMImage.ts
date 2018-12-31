import { Point3d } from "../types/Point";
class PPMImage {
  public x!: number;
  public y!: number;
  public data!: Point3d[][];
  constructor(data: string) {
    const lines = data.split("\n");
    lines.shift();
    if (lines[0][0] === "#") {
      lines.shift(); // remove comments
    }
    [this.x, this.y] = lines[0].split(" ").map((v) => Number(v));
    lines.shift();
    lines.shift();
    this.data = new Array(this.y);
    const tmpLine: Point3d[] = (new Array(this.x)).fill([0, 0, 0]);
    this.data.fill(tmpLine);
    let lineCnt = 0;
    for (let i = 0; i < this.y; ++i) {
      for (let j = 0; j < this.x; ++j) {
        for (let k = 0; k < 3; ++k) {
          this.data[i][j][k] = Number(lines[lineCnt]);
          console.log(this.data[i][j][k], Number(lines[lineCnt]));
          ++lineCnt;
        }
        console.log();
      }
      console.log(this.data[i]);
    }
  }
}

export default PPMImage;
