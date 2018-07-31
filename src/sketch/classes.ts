import bs from 'b-spline';
import * as d3 from 'd3';
import * as d3v from 'd3-weighted-voronoi';
import * as d3p from 'd3plus-shape';
import * as pc from 'greiner-hormann';
import _ from 'lodash';
import Offset from 'polygon-offset';
import { relativeTimeThreshold } from '../../node_modules/moment/moment';
import {
    arrayClose,
    arrayOpen,
    getMinDist
} from './lib/helperFuncs';
import { getC } from './lib/pallete';

type pt = [number, number];
/**
 * Class containsing elements relating to being in a voronoi diagram
 *
 * @class VPoint
 */
export class VPoint {
    public x: number;
    public y: number;
    public pgon:
        | d3.VoronoiPolygon<VPoint>
        | d3v.WVpoly<VPoint>;
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
        pgon?:
            | d3.VoronoiPolygon<VPoint>
            | d3v.WVpoly<VPoint>
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

    public pgonToArray = (
        pgon?: d3.VoronoiPolygon<VPoint>
    ) => {
        if ( pgon ) {
            return this.pgonToArray.apply( {
                pgon
            } ) as pt[];
        }
        const arr: pt[] = [];
        this.pgon.map( p => arr.push( p ) );
        return arr as pt[];
    };
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
            throw new Error(
                'no polygon registered'
            );
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
    get range() {
        return getMinDist( this.pgon ) as number;
    }
    /**
     * returns the polygons extent
     * @returns extent of polygon
     *
     * @memberof VPoint
     */
    public extent = ( pgon?: pt[] ) => {
        if ( pgon ) {
            return this.extent.apply( {
                pgon
            } ) as [pt, pt];
        }
        if ( !this.pgon ) {
            throw new Error(
                'no polygon registered'
            );
        }
        return [
            // top left
            [
                // x
                Math.min.apply(
                    this,
                    this.pgon.map( p => p[0] )
                ),
                // y
                Math.min.apply(
                    this,
                    this.pgon.map( p => p[1] )
                )
            ],
            // top right
            [
                // x
                Math.max.apply(
                    this,
                    this.pgon.map( p => p[0] )
                ),
                // y
                Math.max.apply(
                    this,
                    this.pgon.map( p => p[1] )
                )
            ]
        ] as [pt, pt];
    };
    /**
     * returns the clipped polygon of this clipper
     * @param clippingPolygon polygon to clip by
     * @memberof VPoint
     */

    public clip = ( clippingPgon: pt[] ) => {
        const subject = arrayOpen(
            this.pgonToArray()
        );
        const clippy = arrayOpen(
            d3.polygonHull( clippingPgon )
        );
        let clipped: any = pc.intersection(
            subject,
            clippy
        );
        if ( !clipped ) return this.pgon;
        clipped = clipped[0];
        const clipPoly = arrayOpen( clipped );
        if ( this.isWVPoly( this.pgon ) ) {
            ( clipPoly as d3v.WVpoly<
                VPoint
            > ).site = this.pgon.site;
        } else {
            ( clipPoly as d3.VoronoiPolygon<
                VPoint
            > ).data = this.pgon.data;
        }

        return clipPoly as
            | d3.VoronoiPolygon<VPoint>
            | d3v.WVpoly<VPoint>;
    };
    public getCenteroid = () => {
        if ( !this.pgon ) {
            throw new Error(
                'no polygon registered'
            );
        }
        return d3.polygonCentroid( this.pgon );
    };
    /**
     * sets the polygon from a new polygon without data
     * @param array polygon to set from
     * @memberof VPoint
     */
    public polygonFromVirginArray = (
        array: pt[]
    ) => {
        const newPoly = array as d3.VoronoiPolygon<
            VPoint
        >;
        newPoly.data = this;
        this.pgon = newPoly;
    };
    /**
     * pad the polygon by an amount
     * @param amount distance to pad
     * @returns padded polygon
     * @memberof VPoint
     */
    public pad = ( amount: number ) => {
        const closedPoly = arrayClose( this.pgon );
        let padded = closedPoly;
        try {
            padded = new Offset()
                .data( closedPoly )
                .padding( amount )[0];
        } catch {
            padded = closedPoly;
        }
        return arrayOpen( padded );
    };
    public isWVPoly<T>(
        sub: d3.VoronoiPolygon<T> | d3v.WVpoly<T>
    ): sub is d3v.WVpoly<T> {
        return (
            ( sub as d3v.WVpoly<T> ).site !==
            undefined
        );
    }
}
export class City extends VPoint {
    public wards: Ward[];
    public vorDiag: Array<d3v.WVpoly<Ward>>;

    private vorFunc: d3v.WeightedVoronoi<Ward>;
    constructor( pgon: pt[] ) {
        super( 0, 0, pgon as d3v.WVpoly<Ward> );
        const cen = d3.polygonCentroid( pgon );
        const vPoly: d3.VoronoiPolygon<
            City
        > = pgon as d3.VoronoiPolygon<City>;
        vPoly.data = this;
        this.pgon = vPoly;
        this.wards = [];
        this.posFromArray( cen );
        this.vorFunc = d3v
            .weightedVoronoi<Ward>()
            .extent( this.extent() )
            .x( d => d.x )
            .y( d => d.y )
            .weight(
                d =>
                    d.weight * 4000 +
                    1 / ( d.x + _.random( 20 ) )
            );
        const wardNo = 6;
        _.range( wardNo ).map( i => {
            const thisAng =
                i * ( ( Math.PI * 2 ) / wardNo );
            const thisWard = this.newWard( thisAng, i );
            thisWard.culture = i;
            this.wards.push(
                thisWard
            );
        } );
        this.vorDiag = this.vorFunc( this.wards );
        this.vorDiag.map( poly => {
            poly.site.originalObject.pgon = poly;
            poly.site.originalObject.pgon = poly.site.originalObject.clip(
                this.pad( 10 )
            );
            if (
                d3.polygonArea(
                    d3.polygonHull(
                        poly.site.originalObject.pad(
                            10
                        )
                    ) || [
                        [ 0, 0 ],
                        [ 1, 0 ],
                        [ 1, 1 ],
                        [ 0, 1 ]
                    ]
                ) < 200
            ) {
                this.wards.splice(
                    this.wards.indexOf(
                        poly.site.originalObject
                    ),
                    1
                );
            }
            poly.site.originalObject.initialiseVor();
        } );
    }
    public draw = () => {
        const subdPoints = _.range( 200 ).map( i => {
            return bs(
                i/200,1,arrayClose( this.pgon )
            )
        } )
        const polyToDraw = _.range( 100 ).map( i => {
            return bs(
                i/100,3,[ ...subdPoints,subdPoints.slice( 0,5 ) ]
            )
        } )

        fill( getC( 2,6 ).hex );
        noStroke( );
        strokeWeight( 2 );
        beginShape();
        polyToDraw.map( point =>
            vertex.apply( this, point )
        );
        endShape( CLOSE );
    };
    public drawWards = () => {
        this.wards.map( w => {
            if ( !w.pgon ) return;
            if (
                d3.polygonContains(
                    this.pgon,
                    w.getCenteroid()
                )
            ) {
                w.draw();
            }
        } );
    };
    public drawBuildings = () => {
        this.wards.map( w => {
            if ( !w.pgon ) return;
            if (
                d3.polygonContains(
                    this.pgon,
                    d3.polygonCentroid( w.pgon )
                )
            ) {
                w.drawBuildings();
            }
        } );
    };
    public drawFullCity = () => {
        this.draw();
        // this.drawWards();
        this.drawBuildings();
    };
    /**
     * creates a new ward
     *
     * @private
     * @memberof City
     */
  
    public relaxAllWards = () => {
        this.wards.map( ward => ward.relax( 1 ) );
    }
    private newWard = ( ang: number, w: number ) => {
        const newPos = createVector(
            0,
            -1 * ( this.range / 2 )
        )
            .rotate( ang )
            .add( this.posToVec() );
        return new Ward( newPos.x, newPos.y, w );
    };
}

export class Ward extends VPoint {
    public buildings: Building[];
    public vorDiag: d3.VoronoiDiagram<Building>;
    public weight: number;
    public culture: number;
    private vorFunc: d3.VoronoiLayout<Building>;
    constructor(
        x: number,
        y: number,
        w: number,
        pgon?: d3.VoronoiPolygon<VPoint>
    ) {
        super( x, y );
        if ( pgon ) {
            this.pgon = pgon;
            this.initialiseVor();
        }
        this.weight = -3 + ( w*8 );
    }
    public initialiseVor = () => {
        if ( !this.pgon ) {
            throw new Error( 'no polygon dummy' );
        } else if (
            this.pgon[0] ===
            this.pgon[this.pgon.length - 1]
        ) {
            const tempArr: any = this.pgon.slice(
                0,
                this.pgon.length - 1
            );
            tempArr.data = ( this
                .pgon as d3.VoronoiPolygon<
                Ward
            > ).data;
            this.pgon = tempArr;
        }
        this.vorFunc = d3
            .voronoi<Building>()
            .extent( this.extent( this.pgon ) )
            .x( d => d.x )
            .y( d => d.y );
        const buildCount = Math.floor(
            d3.polygonArea( this.pgon ) / 3000
        );
        this.buildings = [];
        this.posFromArray(
            d3.polygonCentroid( this.pad( 2 ) )
        );
        _.range( buildCount ).map( () => {
            const ang = _.random(
                Math.PI * 2,
                true
            );
            const mag = _.random(
                Math.min( 20, this.range - 10 )
            );
            const newPos = createVector( 0, -1 )
                .rotate( ang )
                .setMag( mag )
                .add( this.posToVec() )
                .array();
            const thisB = new Building( newPos[0], newPos[1] );
            if ( this.culture != null ) { thisB.colour = this.culture };
            thisB.shade = _.random( 3, 5 );
            this.buildings.push(
                thisB
            );
        } );
        this.vorDiag = this.vorFunc(
            this.buildings
        );
        this.relax( 1 );
        
    };
    public relax = ( count: number ) => {
        for ( let i = 0; i < count; i++ ) {
            try {
                this.genVorDiag();
            } catch {
                console.log( 'failed' );
            }
        }
    };
    public draw = () => {
        if ( !this.pgon ) return;
        const polyToDraw = this.pad( 10 );
        if ( d3.polygonArea( polyToDraw ) < 200 ) {
            return;
        }
        fill( 255 );
        stroke( 0 );
        strokeWeight( 2 );
        beginShape();
        polyToDraw.map( point =>
            vertex.apply( this, point )
        );
        endShape( CLOSE );
    };
    public drawBuildings = () => {
        if ( !this.buildings ) return;
        this.buildings.map( b => {
            if ( !b.pgon ) return;
            if (
                d3.polygonContains(
                    this.pgon,
                    b.getCenteroid()
                )
            ) {
                b.draw();
            }
        } );
    };
    private genVorDiag = () => {
        this.vorDiag = this.vorFunc(
            this.buildings
        );
        this.vorDiag.polygons().map( polygon => {
            polygon.data.pgon = polygon;
            polygon.data.pgon = polygon.data.clip(
                this.pad( 10 )
            );
            if (
                d3.polygonContains(
                    polygon.data.pgon,
                    polygon.data.posToArray()
                )
            ) {
                polygon.data.posFromArray(
                    d3.polygonCentroid(
                        polygon.data.pgon
                    )
                );
            } else {
                this.buildings.splice(
                    this.buildings.indexOf(
                        polygon.data
                    ),
                    1
                );
            }
        } );
    };

}

export class Building extends VPoint {
    public colour: number
    public shade: number;
    constructor(
        x: number,
        y: number,
        pgon?: d3.VoronoiPolygon<VPoint>
    ) {
        super( x, y );
        if ( pgon ) this.pgon = pgon;
    }
    public draw = () => {
        if ( !this.pgon ) return;
        const polyToDraw = d3p.largestRect(
            this.pgon,
            {
                maxAspectRatio: 1.1,
                angle: d3.range( -90, 90, 45 ),
                nTries: 100
            }
        );
        this.colour == null || this.shade == null ? fill( 255 ) : fill( getC( 3 + this.colour * 2,this.shade ).hex );
        if ( polyToDraw.area < 400 ) return; 
        noStroke( );
        strokeWeight( 2 );
        push();
        translate( polyToDraw.cx, polyToDraw.cy );
        rotate( radians( polyToDraw.angle ) );
        rectMode( CENTER );
        rect( 0, 0, polyToDraw.width, polyToDraw.height, 5 );
        pop();
    };
}
