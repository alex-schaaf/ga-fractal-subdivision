/** Standard normal variate using Box-Muller transformation
 * https://stackoverflow.com/a/36481059
 * @returns Random number
 */
export const randomNormal = (): number => {
  let u = 0
  let v = 0
  while (u === 0) u = Math.random()
  while (v === 0) v = Math.random()
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
}
