import p5 from "p5"
import "./styles.scss"
import {
  createPointsOnCircle,
  randomizePoints,
  shiftPoints,
  subdividePoints,
  drawPolygon,
} from "./linkedPoints"
import { randomNormal } from "./stats"

const canvasX = 800
const canvasY = 600

const sketch = function (p: p5) {
  let start = createPointsOnCircle(canvasX / 2, canvasY / 2, 100, 12)
  // subdividePoints(start, 3)

  p.setup = () => {
    const canvas = p.createCanvas(window.innerWidth, window.innerHeight)
    canvas.parent("p5-canvas")
    p.frameRate(60)
    p.stroke(255)
  }
  let nIter = 0

  p.draw = () => {
    if (nIter >= 720) {
      p.noLoop()
    }
    // p.clear()

    p.stroke(255, 155)
    p.strokeWeight(1)
    p.fill(0, 255)
    drawPolygon(start, p)
    randomizePoints(start)
    shiftPoints(start, randomNormal(), 0.25)
    nIter += 1
  }
}

new p5(sketch)
