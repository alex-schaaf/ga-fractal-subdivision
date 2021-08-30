import p5 from "p5"

/** Point of a forward linked list */
export interface Point {
  x: number
  y: number
  next: Point | null
}

export const drawLines = (start: Point, p: p5): void => {
  let current = start
  while (current && current.next) {
    p.line(current.x, current.y, current.next.x, current.next.y)
    current = current.next
  }
}

export const drawPoints = (start: Point, p: p5): void => {
  let point = start
  while (point) {
    p.point(point.x, point.y)
    point = point.next
  }
}

/** Subdivides given linked list of points at
 *
 * @param start - Starting point of the linked list of points
 * @param n - Number of subdivisions
 */
export const subdividePoints = (start: Point, n: number): void => {
  for (let i = 0; i < n; i++) {
    let current = start

    while (current.next) {
      const newX = 0.5 * (current.x + current.next.x)
      const newY = 0.5 * (current.y + current.next.y)
      let midPoint = { x: newX, y: newY, next: current.next } as Point

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
): Point => {
  let start = { x: x + r, y: y, next: null } as Point
  let current = start
  const thetaStep = (2 * Math.PI) / nStep

  for (let theta = thetaStep; theta < 2 * Math.PI; theta += thetaStep) {
    const X = y + Math.cos(theta) * r + r
    const Y = x + Math.sin(theta) * r - r
    let next = { x: X, y: Y, next: null } as Point
    current.next = next
    current = next
  }

  if (seamless) {
    /**
     * to make sure the circle ends in the same place as it started
     * add a point identical to the starting point to the end
     */
    current.next = { x: start.x, y: start.y, next: null } as Point
  }
  return start
}

/** Perturb points of linked list of points by random value with a scaling factor
 *
 * @param start - Starting point of the linked list of points
 * @param factor - Perturbation factor to scale the default perturbation of [-0.5, 0.5]
 * @param seamless - Makes sure the last point of the linked list has the same coordinates
 * of the first point after perturbation (e.g. for circles)
 */
export const randomizePoints = (
  start: Point,
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

/** Move all points of linked list of points by given delta x, y
 *
 * @param start - Starting point of the linked list of points
 * @param dx - delta x
 * @param dy - delta y
 * @param seamless - Makes sure to shift first and last point of linked list by same amount
 */
export const shiftPoints = (
  start: Point,
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

/** Draw a polygon of a linked list of points
 *
 * @param start - Starting point of the linked list of points
 * @param p - p5js instance
 */
export const drawPolygon = (start: Point, p: p5): void => {
  p.beginShape()
  let current = start
  while (current.next) {
    p.vertex(current.x, current.y)
    current = current.next
  }
  p.endShape(p.CLOSE)
}
