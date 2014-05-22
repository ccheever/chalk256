// From https://github.com/ubilabs/kd-tree-javascript/blob/master/examples/colors/index.html
module.exports = function colorDistance(a, b) {
  "Computes the perceived distance between colors, based on this work http://www.compuphase.com/cmetric.htm"
  var dr = a.red - b.red;
  var dg = a.green - b.green;
  var db = a.blue - b.blue;
  var redMean = (a.red + b.red) / 2;
  return (2 + redMean / 256)*dr*dr + 4 * dg * dg + (2 + (255 - redMean) / 256) * db * db;
};


