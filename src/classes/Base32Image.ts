class Base32Image {
  public data!: string[];
  public x: number;
  public y: number;
  constructor(data: string[]) {
    const lastLine: string = data.pop() as string;
    if (lastLine !== "") {
      data.push(lastLine);
    }
    this.data = data;
    this.x = data[0].length;
    this.y = data.length;
  }
}

export default Base32Image;
