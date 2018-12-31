import * as convet from "color-convert";
import { Point3d } from "types/Point";
const RGBBaseColor: Point3d[] = [
  [0, 0, 0],       [255, 255, 255], [170, 170, 170], [85, 85, 85],
  [254, 211, 199], [255, 196, 206], [250, 172, 142], [255, 139, 131],
  [244, 67, 54],   [233, 30, 99],   [226, 102, 158], [156, 39, 176],
  [103, 58, 183],  [63, 81, 181],   [0, 70, 112],    [5, 113, 151],
  [33, 150, 243],  [0, 188, 212],   [59, 229, 219],  [151, 253, 220],
  [22, 115, 0],    [55, 169, 60],   [137, 230, 66],  [215, 255, 7],
  [255, 246, 209], [248, 203, 140], [255, 235, 59],  [255, 193, 7],
  [255, 152, 0],   [255, 87, 34],   [184, 63, 39],   [121, 85, 72],
];
const HSLBaseColor: Point3d[] =
    RGBBaseColor.map(([rr, gg, bb]) => convet.rgb.hsl(rr, gg, bb));

function getSquaredDistance([x1, y1, z1]: Point3d, [x2, y2, z2]: Point3d): number {
  return Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) + Math.pow(z1 - z2, 2);
}
function getMatchedColorIndex([r, g, b]: Point3d) {
  const p1: Point3d = convet.rgb.hsl(r, g, b);
  const minValue = HSLBaseColor.map((p) => getSquaredDistance(p, p1)).sort()[0];
  for (let i = 0; i < HSLBaseColor.length; ++i) {
    if (getSquaredDistance(p1, HSLBaseColor[i]) === minValue) {
      return i;
    }
  }
  return -1;
}

export default getMatchedColorIndex;
