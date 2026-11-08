// The pictures of the mosaic, one per interest. Each is painted on a 48 by 48 canvas and read back tile by tile.
export const UNIT = 48;

const C = {
  sky: "#f1ebdf",
  paleSun: "#f0d6a0",
  sun: "#e4b267",
  clay: "#d08a68",
  teal: "#7fb3a8",
  sage: "#a9c4ae",
  slate: "#a4bfd0",
  blue: "#6f93b1",
  deep: "#4f6d8c",
  pine: "#55806f",
  snow: "#fdfcf8",
  wood: "#b98d6a",
};

export const BACKGROUND = C.sky;

const shape = (c, points) => {
  c.beginPath();
  points.forEach(([x, y], i) => (i ? c.lineTo(x, y) : c.moveTo(x, y)));
};
const poly = (c, color, points) => {
  c.fillStyle = color;
  shape(c, points);
  c.closePath();
  c.fill();
};
const line = (c, color, width, points) => {
  c.strokeStyle = color;
  c.lineWidth = width;
  c.lineCap = "round";
  c.lineJoin = "round";
  shape(c, points);
  c.stroke();
};
const disc = (c, color, x, y, radius) => {
  c.fillStyle = color;
  c.beginPath();
  c.arc(x, y, radius, 0, 7);
  c.fill();
};
const ring = (c, color, width, x, y, radius) => {
  c.strokeStyle = color;
  c.lineWidth = width;
  c.beginPath();
  c.arc(x, y, radius, 0, 7);
  c.stroke();
};
const box = (c, color, x, y, width, height) => {
  c.fillStyle = color;
  c.fillRect(x, y, width, height);
};
const turned = (c, angle, draw) => {
  c.save();
  c.translate(24, 24);
  c.rotate(angle);
  c.translate(-24, -24);
  draw();
  c.restore();
};

const hiking = (c) => {
  disc(c, C.paleSun, 34, 13, 6.5);
  poly(c, C.slate, [[2, 34], [13, 17], [20, 26], [31, 16], [46, 34]]);
  poly(c, C.deep, [[8, 40], [24, 9], [40, 40]]);
  poly(c, C.snow, [[24, 9], [18.6, 19.6], [21.8, 17.6], [24, 21], [26.6, 17.6], [29.4, 19.6]]);
  poly(c, C.teal, [[0, 48], [0, 37], [12, 34], [25, 38], [37, 35], [48, 38], [48, 48]]);
  poly(c, C.pine, [[0, 48], [0, 42], [16, 40], [32, 43], [48, 41], [48, 48]]);
  // The trail stays on the fields and ends before the foot of the mountain.
  line(c, C.paleSun, 1.3, [[20, 47], [27, 44], [21, 41], [25, 39]]);
};

const bikepacking = (c) => {
  disc(c, C.paleSun, 25, 8, 5);
  box(c, C.sage, 0, 39, 48, 9);
  ring(c, C.deep, 1.9, 13, 31, 7.4);
  ring(c, C.deep, 1.9, 35, 31, 7.4);
  poly(c, C.sun, [[23, 30], [19.6, 20.5], [30.4, 20.5]]);
  line(c, C.clay, 1.4, [[13, 31], [23, 31], [19, 19.5], [13, 31]]);
  line(c, C.clay, 1.4, [[19, 19.5], [31, 19.5], [23, 31]]);
  line(c, C.clay, 1.4, [[30.3, 15], [35, 31]]);
  disc(c, C.deep, 23, 31, 1.9);
  line(c, C.deep, 1.3, [[19, 19.5], [18, 15.5]]);
  line(c, C.deep, 2, [[14.5, 15], [22, 15]]);
  poly(c, C.teal, [[17.5, 16.5], [17.5, 21.5], [12, 21.2], [6.5, 17.4], [7.2, 16.2]]);
  // Gravel drop bar from the side, with the roll bag held inside its hook.
  disc(c, C.slate, 35.6, 16.6, 3.1);
  c.strokeStyle = C.deep;
  c.lineWidth = 1.4;
  c.lineCap = "round";
  c.beginPath();
  c.moveTo(30.3, 14.2);
  c.lineTo(34.5, 13.2);
  c.bezierCurveTo(39.4, 12.2, 40.4, 19.2, 35.4, 20);
  c.lineTo(33.4, 19.6);
  c.stroke();
};

const camping = (c) => {
  disc(c, C.paleSun, 37, 9, 4);
  disc(c, C.sky, 39, 8, 3.4);
  for (const [x, top] of [[3, 20], [10, 15], [17, 21], [25, 13], [32, 19], [39, 15], [46, 21]]) {
    poly(c, C.teal, [[x - 5, 36], [x, top], [x + 5, 36]]);
  }
  for (const [x, top] of [[7, 22], [21, 25], [36, 23], [44, 26]]) {
    poly(c, C.pine, [[x - 4.5, 37], [x, top], [x + 4.5, 37]]);
  }
  box(c, C.sage, 0, 36, 48, 12);
  poly(c, C.clay, [[8, 42.5], [17, 28], [26, 42.5]]);
  poly(c, C.deep, [[14.2, 42.5], [17, 34.5], [19.8, 42.5]]);
  line(c, C.wood, 1.7, [[30, 43], [39, 40]]);
  line(c, C.wood, 1.7, [[30, 40], [39, 43]]);
  poly(c, C.clay, [[30.8, 41], [32, 35], [33.4, 37], [34.5, 29.5], [36.2, 36], [37.4, 34.5], [38.2, 41]]);
  poly(c, C.sun, [[32.4, 41], [34.5, 33.5], [36.6, 41]]);
  poly(c, C.paleSun, [[33.7, 41], [34.5, 37.5], [35.4, 41]]);
  disc(c, C.sun, 33, 26, 0.7);
  disc(c, C.sun, 36.5, 24, 0.6);
};

const photography = (c) => {
  box(c, C.deep, 17, 13, 12, 4);
  box(c, C.clay, 32, 14, 5.5, 2.5);
  box(c, C.deep, 8, 17, 32, 19);
  box(c, C.wood, 8, 21.5, 32, 2.5);
  disc(c, C.slate, 24, 26.5, 8.6);
  disc(c, C.deep, 24, 26.5, 6.8);
  disc(c, C.teal, 24, 26.5, 4.4);
  disc(c, C.paleSun, 22.4, 24.8, 1.5);
  box(c, C.sun, 11, 18.3, 3.6, 1.7);
};

const bass = (c) => {
  turned(c, Math.PI / 4, () => {
    c.translate(24, 24);
    c.scale(0.86, 0.86);
    c.translate(-24, -21.4);
    c.fillStyle = C.blue;
    c.beginPath();
    c.moveTo(22.6, 28.5);
    c.bezierCurveTo(20.5, 28, 19.2, 26, 18.6, 22.8);
    c.bezierCurveTo(15.8, 24.8, 15.2, 29, 16.4, 31.8);
    c.bezierCurveTo(17.4, 34.2, 14, 35.8, 14, 39.6);
    c.bezierCurveTo(14, 44.4, 20, 46, 24.6, 45.8);
    c.bezierCurveTo(30, 45.6, 34.2, 43.8, 33.8, 39.4);
    c.bezierCurveTo(33.6, 36, 31, 34.6, 31.6, 31.8);
    c.bezierCurveTo(32, 30, 31, 28.6, 29.8, 28.2);
    c.bezierCurveTo(28.6, 28.4, 27.4, 28.6, 26.2, 28.5);
    c.closePath();
    c.fill();
    poly(c, C.snow, [[20, 30], [28, 30], [29, 36], [25, 38.5], [19.5, 36]]);
    box(c, C.wood, 23, 2, 2.4, 31);
    box(c, C.deep, 20.5, 33, 7.5, 2);
    box(c, C.deep, 20.5, 41, 7.5, 1.6);
    poly(c, C.wood, [[22.6, 2.6], [25.8, 2.6], [27.2, -3.2], [21.4, -3.2]]);
    for (let i = 0; i < 4; i++) box(c, C.clay, 19.4, -3 + i * 1.5, 1.8, 1);
  });
};

const ukulele = (c) => {
  turned(c, -Math.PI / 5, () => {
    disc(c, C.sun, 24, 34.5, 7.8);
    disc(c, C.sun, 24, 24.5, 5.8);
    box(c, C.sun, 19.4, 24.5, 9.2, 10);
    disc(c, C.deep, 24, 27.5, 2.7);
    box(c, C.wood, 20.5, 37, 7, 1.6);
    box(c, C.wood, 22.8, 7, 2.4, 19);
    box(c, C.clay, 21.2, 2.5, 5.6, 5);
  });
};

// An easel with a small painted landscape on it.
const drawing = (c) => {
  line(c, C.wood, 1.7, [[24, 4], [13, 45]]);
  line(c, C.wood, 1.7, [[24, 4], [35, 45]]);
  line(c, C.wood, 1.5, [[24, 4], [24, 41]]);
  box(c, C.wood, 11, 9, 26, 22);
  box(c, C.slate, 12.5, 10.5, 23, 19);
  disc(c, C.sun, 29.5, 15.5, 3);
  poly(c, C.deep, [[12.5, 29.5], [20, 16.5], [27.5, 29.5]]);
  poly(c, C.teal, [[20, 29.5], [28, 20.5], [35.5, 29.5]]);
  box(c, C.clay, 9, 31, 30, 2.2);
};

const books = (c) => {
  disc(c, C.blue, 24, 13, 5.6);
  c.strokeStyle = C.sun;
  c.lineWidth = 1.3;
  c.beginPath();
  c.ellipse(24, 13, 11, 2.7, -0.35, 0, 7);
  c.stroke();
  disc(c, C.paleSun, 9.5, 10, 1.3);
  disc(c, C.paleSun, 38.5, 7, 1.3);
  disc(c, C.sun, 40, 18, 1);
  poly(c, C.clay, [[5, 26], [24, 29], [43, 26], [43, 43], [24, 46], [5, 43]]);
  poly(c, C.snow, [[7, 24], [24, 27], [24, 43], [7, 40]]);
  poly(c, C.snow, [[41, 24], [24, 27], [24, 43], [41, 40]]);
  box(c, C.deep, 23.4, 27, 1.2, 16);
  for (let i = 0; i < 3; i++) {
    line(c, C.slate, 1.2, [[10, 29 + i * 3.6], [20.5, 31 + i * 3.6]]);
    line(c, C.slate, 1.2, [[38, 29 + i * 3.6], [27.5, 31 + i * 3.6]]);
  }
};

export const FIGURES = [
  { name: "Hiking", draw: hiking },
  { name: "Bikepacking", draw: bikepacking },
  { name: "Camping", draw: camping },
  { name: "Photography", draw: photography },
  { name: "Bass", draw: bass },
  { name: "Ukulele", draw: ukulele },
  { name: "Drawing", draw: drawing },
  { name: "Fantasy & sci-fi", draw: books },
];
