import * as fs from "fs";
import Base32Image from "../classes/Base32Image";

function readBase32Image(filePath: string): Base32Image {
  const data = fs.readFileSync(filePath, "utf-8");
  const lines: string[] = data.split("\r\n");
  const res = new Base32Image(lines);
  return res;
}

export default readBase32Image;
