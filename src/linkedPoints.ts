import p5 from 'p5'

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

  subdivide(n: number, modX: () => number = () => 0, modY: () => number = () => 0): void {
    if (!this.head || !this.head.next) return

    for (let i = 0; i < n; i++) {
      let point = this.head

      while (point.next) {
        // TODO add optional arg of type func that returns a (random) value to x, y
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