import p5 from "p5"

export interface IPoint {
  x: number
  y: number
  next: IPoint | null
}

export class LinkedPoints {
  head: IPoint | null

  constructor(head: IPoint | null = null) {
    this.head = head
  }

  subdivide(
    n: number,
    modX: () => number = () => 0,
    modY: () => number = () => 0
  ): void {
    if (!this.head || !this.head.next) return

    for (let i = 0; i < n; i++) {
      let point = this.head

      while (point.next) {
        const newX = 0.5 * (point.x + point.next.x) + modX()
        const newY = 0.5 * (point.y + point.next.y) + modY()
        let midPoint = { x: newX, y: newY, next: point.next } as IPoint

        let nextPoint = point.next
        point.next = midPoint
        point = nextPoint
      }
    }
  }

  drawLines(p: p5): void {
    let point = this.head
    while (point && point.next) {
      p.line(point.x, point.y, point.next.x, point.next.y)
      point = point.next
    }
  }

  drawPoints(p: p5): void {
    let point = this.head
    while (point) {
      p.point(point.x, point.y)
      point = point.next
    }
  }
}

/** Create n points on a circle with given center x, y and and radius r
 *
 * @param x - X coordinate of the center of the circle
 * @param y - Y coordinate of the center of the circle
 * @param r - Radius of the circle
 * @param nStep - Number of steps to complete the circle
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
    const Y = x + Math.sin(theta) * r - r
    const X = y + Math.cos(theta) * r + r
    let next = { x: X, y: Y, next: null } as IPoint
    current.next = next
    current = next
  }

  if (seamless) {
    /**
     * to make sure the circle ends in the same place as it started
     * add a point identical to the starting point to the end
     */
    current.next = { x: x + r, y: y, next: null } as IPoint
  }
  return start
}
