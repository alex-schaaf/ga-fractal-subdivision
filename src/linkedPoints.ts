import p5 from "p5"

/** Point of a forward linked list */
export interface IPoint {
  x: number
  y: number
  next: IPoint | null
}

export const drawLines = (start: IPoint, p: p5): void => {
  let current = start
  while (current && current.next) {
    p.line(current.x, current.y, current.next.x, current.next.y)
    current = current.next
  }
}

export const drawPoints = (start: IPoint, p: p5): void => {
  let point = start
  while (point) {
    p.point(point.x, point.y)
    point = point.next
  }
}

export const subdividePoints = (start: IPoint, n: number): void => {
  for (let i = 0; i < n; i++) {
    let current = start

    while (current.next) {
      const newX = 0.5 * (current.x + current.next.x)
      const newY = 0.5 * (current.y + current.next.y)
      let midPoint = { x: newX, y: newY, next: current.next } as IPoint

      let next = current.next
      current.next = midPoint
      current = next
    }
  }
}

/** Create n points on a circle with given center x, y and and radius r
 *
 * @param x - X coordinate of the center of the circle
 * @param y - Y coordinate of the center of the circle
 * @param r - Radius of the circle
 * @param nStep - Number of steps to complete the circle
 *
 * @param seamless - If true the last point will be at the same location
 * as the first
 *
 * @returns starting point of a linked list of points making up the
 * circle
 */
export const createPointsOnCircle = (
  x: number,
  y: number,
  r: number,
  nStep: number,
  seamless: boolean = true
): IPoint => {
  let start = { x: x + r, y: y, next: null } as IPoint
  let current = start
  const thetaStep = (2 * Math.PI) / nStep

  for (let theta = thetaStep; theta < 2 * Math.PI; theta += thetaStep) {
    const X = y + Math.cos(theta) * r + r
    const Y = x + Math.sin(theta) * r - r
    let next = { x: X, y: Y, next: null } as IPoint
    current.next = next
    current = next
  }

  if (seamless) {
    /**
     * to make sure the circle ends in the same place as it started
     * add a point identical to the starting point to the end
     */
    current.next = { x: start.x, y: start.y, next: null } as IPoint
  }
  return start
}

export const randomizePoints = (
  start: IPoint,
  factor: number = 1,
  seamless: boolean = true
): void => {
  let current = start
  while (current.next) {
    current.x += (Math.random() - 0.5) * factor
    current.y += (Math.random() - 0.5) * factor

    current = current.next
  }

  if (seamless) {
    current.x = start.x
    current.y = start.y
  }
}

export const shiftPoints = (
  start: IPoint,
  dx: number,
  dy: number,
  seamless: boolean = true
): void => {
  let current = start
  while (current.next) {
    current.x += dx
    current.y += dy
    current = current.next
  }

  if (seamless) {
    current.x = start.x
    current.y = start.y
  }
}

export const drawPolygon = (start: IPoint, p: p5): void => {
  p.beginShape()
  let current = start
  while (current.next) {
    p.vertex(current.x, current.y)
    current = current.next
  }
  p.endShape(p.CLOSE)
}
