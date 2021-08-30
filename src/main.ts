import p5 from "p5"
import "./styles.scss"
import {
  IPoint,
  LinkedPoints,
  createPointsOnCircle,
  randomizePoints,
  shiftPoints,
} from "./linkedPoints"

const canvasX = 800
const canvasY = 600

const sketch = function (p: p5) {
  let start = createPointsOnCircle(canvasX / 2, canvasY / 2, 100, 12)
  let points = new LinkedPoints(start)

  p.setup = () => {
    const canvas = p.createCanvas(canvasX, canvasY)
    canvas.parent("p5-canvas")
    p.frameRate(60)
    p.stroke(255)
  }
  let nIter = 0

  p.draw = () => {
    if (nIter >= 90) {
      p.noLoop()
    }
    // p.clear()

    p.stroke(255, 125)
    // p.strokeWeight(8)
    // points.drawPoints(p)
    p.strokeWeight(1)
    points.drawLines(p)
    randomizePoints(start, 5)
    shiftPoints(start, 1, 1)
    nIter += 1
  }
}

new p5(sketch)
