# From https://github.com/ubilabs/kd-tree-javascript/blob/master/examples/colors/index.html

module.exports = colorDistance = (a, b) ->
  "Computes the perceived distance between colors, based on this work http://www.compuphase.com/cmetric.htm"
  dr = a.red - b.red
  dg = a.green - b.green
  db = a.blue - b.blue
  redMean = (a.red + b.red) / 2
  (2 + redMean / 256) * dr * dr + 4 * dg * dg + (2 + (255 - redMean) / 256) * db * db
