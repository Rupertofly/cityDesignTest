type point = [number,number]
interface VPoint {
  x: number,
  y: number,
  pgon: d3.VoronoiPolygon<VPoint>
}
class City { }

class Ward implements VPoint { }

class Building implements VPoint {

}