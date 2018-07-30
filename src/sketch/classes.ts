import * as d3 from 'd3';
import { intersection } from 'greiner-hormann';
import Offset from 'polygon-offset';

type pt = [number, number];
/**
 * Class containsing elements relating to being in a voronoi diagram
 *
 * @class VPoint
 */
class VPoint {
  public x: number;
  public y: number;
  public pgon: d3.VoronoiPolygon<VPoint>;
  /**
   * Creates an instance of VPoint.
   * @param x
   * @param y
   * @param [pgon] optional create polygon
   * @memberof VPoint
   */
  constructor(
    x: number,
    y: number,
    pgon?: d3.VoronoiPolygon<VPoint>
  ) {
    this.x = x;
    this.y = y;
    this.pgon = pgon ? pgon : null;
  }
  /**
   * Sets the position of this from the array
   * @param array array to set from
   * @memberof VPoint
   */
  public posFromArray = ( array: pt ) => {
    [ this.x, this.y ] = array;
  };
  /**
   * returns point in the form of an array
   * @returns position
   * @memberof VPoint
   */
  public posToArray = () =>
    [ this.x, this.y ] as pt;
  /**
   * returns point in the form of a p5 vector
   * @returns position
   *
   * @memberof VPoint
   */
  public posToVec = () =>
    createVector( this.x, this.y );
  /**
   * sets the position of this point from a vector
   * @param vec vector to set pos from
   *
   * @memberof VPoint
   */
  public posFromVec = ( vec: p5.Vector ) => {
    [ this.x, this.y ] = vec.array();
  };
  /**
   * returns the size pf the polygon as an array
   * @returns size of polygon
   *
   * @memberof VPoint
   */
  public size = () => {
    if ( !this.pgon ) {
      throw new Error( 'no polygon registered' );
    }
    return [
      // x
      Math.max.apply(
        this,
        this.pgon.map( p => p[0] )
      ) -
        Math.min.apply(
          this,
          this.pgon.map( p => p[0] )
        ),
      // y
      Math.max.apply(
        this,
        this.pgon.map( p => p[1] )
      ) -
        Math.min.apply(
          this,
          this.pgon.map( p => p[1] )
        )
    ] as pt;
  };
  /**
   * returns the polygons extent
   * @returns extent of polygon
   *
   * @memberof VPoint
   */
  public extent = () => {};
  /**
   * returns the clipped polygon of this clipper
   * @param clippingPolygon polygon to clip by
   * @memberof VPoint
   */
  public clip = ( clippingPgon: pt[] ) => {
    const clipped: d3.VoronoiPolygon<
      VPoint
    > = intersection(
      this.pgon,
      clippingPgon
    )[0].slice(
      0,
      clippingPgon.length - 1
    ) as d3.VoronoiPolygon<VPoint>;
    clipped.data = this.pgon.data;
    return clipped;
  };
  /**
   * pad the polygon by an amount
   * @param amount distance to pad
   * @returns padded polygon
   * @memberof VPoint
   */
  public pad = ( amount: number ) => {
    const closedPoly = [
      ...this.pgon,
      this.pgon[0]
    ];
    const padded = new Offset()
      .data( closedPoly )
      .padding( amount )[0];
    return padded.slice(
      0,
      padded.length - 2
    ) as pt[];
  };
}
class City {
  public wards: Ward[];
  public vorDiag: d3.VoronoiDiagram<Ward>;
  private vorFunc: d3.VoronoiLayout<Ward>;

}

class Ward extends VPoint {
  public buildings: Building[];
  private vorFunc: d3.VoronoiLayout<Building>;
  constructor(
    x: number,
    y: number,
    pgon?: d3.VoronoiPolygon<VPoint>
  ) {
    pgon ? super( x, y, pgon ) : super( x, y );
  }
}

class Building extends VPoint {
  constructor(
    x: number,
    y: number,
    pgon?: d3.VoronoiPolygon<VPoint>
  ) {
    pgon ? super( x, y, pgon ) : super( x, y );
  }
}
