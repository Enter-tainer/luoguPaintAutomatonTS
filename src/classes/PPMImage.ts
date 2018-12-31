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
    for (let i = 0; i < this.y; ++i) {
      for (let j = 0; j < this.x; j += 3) {
        this.data[i][j][0] = Number(lines[i * this.y + j]);
        this.data[i][j][1] = Number(lines[i * this.y + j + 1]);
        this.data[i][j][2] = Number(lines[i * this.y + j + 2]);
      }
    }
  }
}

export default PPMImage;
