import p5 from "p5"
import "./styles.scss"
import { IPoint, LinkedPoints, createPointsOnCircle } from "./linkedPoints"

const canvasX = 800
const canvasY = 600

const sketch = function (p: p5) {
  // const end = { x: canvasX * 0.9, y: canvasY / 2 } as IPoint
  // const start = { x: canvasX * 0.1, y: canvasY / 2, next: end } as IPoint
  // let points = new LinkedPoints(start)

  let start = createPointsOnCircle(canvasX / 2, canvasY / 2, 100, 12)
  let points = new LinkedPoints(start)

  p.setup = () => {
    const canvas = p.createCanvas(canvasX, canvasY)
    canvas.parent("p5-canvas")
    p.frameRate(3)
    p.stroke(255)
  }

  const modX = () => (p.random() - 0.5) * 20
  const modY = () => (p.random() - 0.5) * 20

  p.draw = () => {
    p.clear()
    p.strokeWeight(4)
    p.stroke(255, 0, 0)
    p.point(canvasX / 2, canvasY / 2)
    let start = createPointsOnCircle(
      canvasX / 2,
      canvasY / 2,
      100,
      12,
      true,
      modX,
      modY
    )
    let points = new LinkedPoints(start)
    p.stroke(255)
    p.strokeWeight(8)
    points.drawPoints(p)
    p.strokeWeight(1)
    points.drawLines(p)
  }
}

new p5(sketch)
