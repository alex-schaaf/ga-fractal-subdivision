import p5 from 'p5'
import "./styles.scss";
import { IPoint, LinkedPoints } from './linkedPoints'

const canvasX = 800
const canvasY = 600

const sketch = function (p: p5) {
  const end = {x: canvasX * 0.9, y: canvasY / 2} as IPoint
  const start = {x: canvasX * 0.1, y: canvasY / 2, next: end} as IPoint

  let points = new LinkedPoints(start)
  
  p.setup = () => {
    const canvas = p.createCanvas(canvasX, canvasY)
    canvas.parent('p5-canvas')
    p.stroke(255)
    p.frameRate(10)
  }


  let nIter = 0
  p.draw = () => {
    points.head.next = end
    
    points.subdivide(3)
    p.strokeWeight(1)
    points.drawLines(p)
    p.strokeWeight(5)
    points.drawPoints(p)
    
    nIter++

    if (nIter > 20) {
      p. clear()
      nIter = 0
    }
  }
}

new p5(sketch)
