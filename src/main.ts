import p5 from "p5"
import "./styles.scss"
import { IPoint, LinkedPoints } from "./linkedPoints"

const canvasX = 800
const canvasY = 600

const createCirclePoints = (
  x: number,
  y: number,
  r: number,
  n: number
): IPoint => {
  let start = { x: x + r, y: y, next: null } as IPoint
  console.log("start", start)
  let current = start
  const thetaStep = (2 * Math.PI) / n
  for (let theta = thetaStep; theta < 2 * Math.PI; theta += thetaStep) {
    const Y = x + Math.sin(theta) * r - r
    const X = y + Math.cos(theta) * r + r
    let next = { x: X, y: Y, next: null } as IPoint
    current.next = next
    console.log(current, theta / Math.PI)
    current = next
  }
  current.next = { x: x + r, y: y, next: null } as IPoint
  return start
}

const sketch = function (p: p5) {
  // const end = { x: canvasX * 0.9, y: canvasY / 2 } as IPoint
  // const start = { x: canvasX * 0.1, y: canvasY / 2, next: end } as IPoint
  // let points = new LinkedPoints(start)

  let start = createCirclePoints(canvasX / 2, canvasY / 2, 100, 12)
  let points = new LinkedPoints(start)

  p.setup = () => {
    const canvas = p.createCanvas(canvasX, canvasY)
    canvas.parent("p5-canvas")
    p.frameRate(3)
    p.strokeWeight(5)
    p.stroke(255, 0, 0)
    p.point(canvasX / 2, canvasY / 2)
    p.stroke(255)
    // points.subdivide(2)
    points.drawPoints(p)
  }

  // p.draw = () => {
  //   p.clear()
  //   points.head.next = end

  //   const modY = () => p.random() * 20
  //   points.subdivide(3, () => 0, modY)
  //   p.stroke(200, 0, 50)
  //   p.strokeWeight(1)
  //   points.drawLines(p)
  //   p.stroke(255)
  //   p.strokeWeight(5)
  //   points.drawPoints(p)
  // }
  p.draw = () => {}
}

new p5(sketch)
