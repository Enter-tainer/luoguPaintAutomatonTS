import * as fs from "fs";
import PPMImage from "../classes/PPMImage";

function readPPMImage(filePath: string): PPMImage {
  const data = fs.readFileSync(filePath, "utf-8");
  const res = new PPMImage(data);
  return res;
}

export default readPPMImage;
