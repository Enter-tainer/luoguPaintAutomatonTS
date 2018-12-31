class Base32Image {
  public data!: string[];
  public x: number;
  public y: number;
  constructor(data: string[]) {
    this.data = data;
    this.x = data[0].length;
    this.y = data.length - 1;
  }
}

export default Base32Image;
