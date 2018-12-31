// by TraceBack
#include <iostream>
#include <cstdio>
#include <cmath>
#include <fstream>

const char ref[] = "0123456789abcdefghijklmnopqrstuv";
int width, height, type;

class Pixel {
public:
  int r, g, b;
  Pixel() {}
  Pixel(int _r, int _g, int _b)
  : r(_r), g(_g), b(_b) {}
};

const Pixel form[] = {
  { 0, 0, 0 },
  { 255, 255, 255 },
  { 170, 170, 170 },
  { 85, 85, 85 },
  { 254, 211, 199 },
  { 255, 196, 206 },
  { 250, 172, 142 },
  { 255, 139, 131 },
  { 244, 67, 54 },
  { 233, 30, 99 },
  { 226, 102, 158 },
  { 156, 39, 176 },
  { 103, 58, 183 },
  { 63, 81, 181 },
  { 0, 70, 112 },
  { 5, 113, 151 },
  { 33, 150, 243 },
  { 0, 188, 212 },
  { 59, 229, 219 },
  { 151, 253, 220 },
  { 22, 115, 0 },
  { 55, 169, 60 },
  { 137, 230, 66 },
  { 215, 255, 7 },
  { 255, 246, 209 },
  { 248, 203, 140 },
  { 255, 235, 59 },
  { 255, 193, 7 },
  { 255, 152, 0 },
  { 255, 87, 34 },
  { 184, 63, 39 },
  { 121, 85, 72 }
};

inline double getDis(Pixel a, Pixel b) {
  return std::sqrt((a.r - b.r) * (a.r - b.r) +
  (a.g - b.g) * (a.g - b.g) +
  (a.b - b.b) * (a.b - b.b));
}

int main(int argc, char* argv[]) {
  if (argc != 3) {
    std::cerr << "Argument Error" << std::endl;
    return 1;
  }
  std::ifstream fin(argv[1]);
  std::ofstream fout(argv[2]);
  char c, s[15];
  fin.getline(s, 15);
  type = s[1] - '0';
  while (!isdigit(s[0])) fin.getline(s, 15);
  std::sscanf(s, "%d%d", &width, &height);
  int temp;
  fin >> temp;
  for (int i = 0; i < height; ++i) {
    for (int j = 0; j < width; ++j) {
      int r, g, b, pos = 0;
      fin >> r >> g >> b;
      Pixel p = Pixel(r, g, b);
      double min_dis = getDis(p, form[0]), temp;

      for (int k = 1; k < 32; ++k)
        if ((temp = getDis(p, form[k])) < min_dis) {
          min_dis = temp,
          pos = k;
        }
       fout << ref[pos];
    }
    fout << std::endl;
  }
  return 0;
}
