declare module 'b-spline' {
  export default function(
    t: number,
    degree: number,
    points: any[],
    knots?: number,
    weights?: any[],
    resutl?: any[]
  ): [number, number];
}
