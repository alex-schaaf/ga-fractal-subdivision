import p5 from 'p5'
import "./styles.scss";


interface IPoint {
  x: number
  y: number
  next: IPoint | null
}

const canvasX = 800
const canvasY = 600



const getDistanceXY = (a: IPoint, b: IPoint): {x: number, y: number} => {
  return {x: Math.abs(a.x - b.x), y: Math.abs(a.y - b.y)}
}


const subdivide = (start: IPoint, n: number): void => {
  if (!start.next) {
    return
  }
  
  for (let i = 0; i < n; i++) {
    let point = start
    while (point.next) {
      let nextPoint = point.next
      const distance = getDistanceXY(nextPoint, point)
  
      const newX = 0.5 * (point.x + nextPoint.x)
      const newY = 0.5 * (point.y + nextPoint.y)
  
      let newPoint = {x: newX, y: newY} as IPoint
      // squeeze in-between points
      newPoint.next = nextPoint
      point.next = newPoint
      
      point = nextPoint
    }
  }
}

const sketch = function (p: p5) {
  const end = {x: canvasX * 0.9, y: canvasY / 2} as IPoint
  const start = {x: canvasX * 0.1, y: canvasY / 2, next: end} as IPoint
  
  p.setup = () => {
    const canvas = p.createCanvas(canvasX, canvasY)
    canvas.parent('p5-canvas')
    p.stroke(255)

    subdivide(start, 2)

    draw(start)
    
  }

  const draw = (point: IPoint) => {
    while (point) {
      p.strokeWeight(5)
      p.point(point.x, point.y)
      if (point.next) {
        p.strokeWeight(1)
        p.line(point.x, point.y, point.next.x, point.next.y)
      }
      point = point.next
    }
  }
}

new p5(sketch)







