import Base32Image from "../classes/Base32Image";
import PPMImage from "../classes/PPMImage";
import getMatchedColor from "../utils/getMatchedColor";

function ppm2Base32(image: PPMImage): Base32Image {
  const res: string[][] = new Array(image.y);
  const tmpLine: string[] = (new Array(image.x)).fill("");
  res.fill(tmpLine);
  for (let i = 0; i < image.y; ++i) {
    for (let j = 0; j < image.x; ++j) {
      res[i][j] = getMatchedColor(image.data[i][j]);
    }
  }
  return new Base32Image(res.map((v) => v.join("")));
}

export default ppm2Base32;
