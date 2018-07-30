import * as d3 from 'd3';
import * as d3p from 'd3plus-shape'
import * as pc from 'greiner-hormann';
import _ from 'lodash';
import Offset from 'polygon-offset';
import { relativeTimeThreshold } from '../../node_modules/moment/moment';
import { arrayClose, arrayOpen, getMinDist } from './lib/helperFuncs';

type pt = [number, number];
/**
 * Class containsing elements relating to being in a voronoi diagram
 *
 * @class VPoint
 */
export class VPoint {
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
    constructor( x: number, y: number, pgon?: d3.VoronoiPolygon<VPoint> ) {
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
    public posToArray = () => [ this.x, this.y ] as pt;

    public pgonToArray = ( pgon?: d3.VoronoiPolygon<VPoint> ) => {
        if ( pgon ) return this.pgonToArray.apply( { pgon } ) as pt[];
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
    public posToVec = () => createVector( this.x, this.y );
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
            Math.max.apply( this, this.pgon.map( p => p[0] ) ) -
                Math.min.apply( this, this.pgon.map( p => p[0] ) ),
            // y
            Math.max.apply( this, this.pgon.map( p => p[1] ) ) -
                Math.min.apply( this, this.pgon.map( p => p[1] ) )
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
            throw new Error( 'no polygon registered' );
        }
        return [
            // top left
            [
                // x
                Math.min.apply( this, this.pgon.map( p => p[0] ) ),
                // y
                Math.min.apply( this, this.pgon.map( p => p[1] ) )
            ],
            // top right
            [
                // x
                Math.max.apply( this, this.pgon.map( p => p[0] ) ),
                // y
                Math.max.apply( this, this.pgon.map( p => p[1] ) )
            ]
        ] as [pt, pt];
    };
    /**
     * returns the clipped polygon of this clipper
     * @param clippingPolygon polygon to clip by
     * @memberof VPoint
     */
    public clip = ( clippingPgon: pt[] ) => {
        const subject = arrayOpen( this.pgonToArray() );
        const clippy = arrayOpen( d3.polygonHull( clippingPgon ) );
        let clipped: any = pc.intersection(
            subject,
            clippy
        );
        if ( !clipped ) return this.pgon;
        clipped = clipped[0];
        const clipPoly = arrayOpen( clipped ) as d3.VoronoiPolygon<VPoint>;
        clipPoly.data = this.pgon.data;
        return clipPoly;
    };
    public getCenteroid = () => {
        if ( !this.pgon ) {
            throw new Error( 'no polygon registered' );
        }
        return d3.polygonCentroid( this.pgon );
    };
    /**
     * sets the polygon from a new polygon without data
     * @param array polygon to set from
     * @memberof VPoint
     */
    public polygonFromVirginArray = ( array: pt[] ) => {
        const newPoly = array as d3.VoronoiPolygon<VPoint>;
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
        const closedPoly = arrayClose( this.pgon )
        const padded = new Offset().data( closedPoly ).padding( amount )[0];
        return arrayOpen( padded );
    };
}
export class City extends VPoint {
    public wards: Ward[];
    public vorDiag: d3.VoronoiDiagram<Ward>;

    private vorFunc: d3.VoronoiLayout<Ward>;
    constructor( pgon: pt[] ) {
        super( 0, 0, pgon as d3.VoronoiPolygon<City> );
        const cen = d3.polygonCentroid( pgon );
        const vPoly: d3.VoronoiPolygon<City> = pgon as d3.VoronoiPolygon<City>;
        vPoly.data = this;
        this.pgon = vPoly;
        this.wards = [];
        this.posFromArray( cen );
        this.vorFunc = d3
            .voronoi<Ward>()
            .extent( this.extent( this.pad( 10 ) ) )
            .x( d => d.x )
            .y( d => d.y );
        const wardNo = 6;
        _.range( wardNo ).map( i => {
            const thisAng = i * ( ( Math.PI * 2 ) / wardNo );
            this.wards.push( this.newWard( thisAng ) );
        } );
        this.vorDiag = this.vorFunc( this.wards );
        this.vorDiag.polygons().map( poly => {
            poly.data.pgon = poly;
            poly.data.pgon = poly.data.clip( this.pad( 10 ) );
            poly.data.initialiseVor();
        } );
    }
    public draw = () => {
        const polyToDraw = this.pgon;
        fill( 255 );
        stroke( 0 );
        strokeWeight( 2 );
        beginShape();
        polyToDraw.map( point => vertex.apply( this, point ) );
        endShape( CLOSE );
    };
    public drawWards = () => {
        this.wards.map( w => w.draw );
    };
    public drawBuildings = () => {
        this.wards.map( w => w.drawBuildings() );
    };
    public drawFullCity = () => {
        this.draw();
        this.drawWards();
        this.drawBuildings();
    };
    /**
     * creates a new ward
     *
     * @private
     * @memberof City
     */
    private newWard = ( ang: number ) => {
        const newPos = createVector( 0, -1 * this.range - 10 )
            .rotate( ang )
            .add( this.posToVec() );
        return new Ward( newPos.x, newPos.y );
    };
}

export class Ward extends VPoint {
    public buildings: Building[];
    public vorDiag: d3.VoronoiDiagram<Building>;

    private vorFunc: d3.VoronoiLayout<Building>;
    constructor( x: number, y: number, pgon?: d3.VoronoiPolygon<VPoint> ) {
        super( x, y );
        if ( pgon ) {
            this.pgon = pgon;
            this.initialiseVor();
        }
    }
    public initialiseVor = () => {
        if ( !this.pgon ) {
            throw new Error( 'no polygon dummy' );
        } else if ( this.pgon[0] === this.pgon[this.pgon.length - 1] ) {
            const tempArr: any = this.pgon.slice( 0, this.pgon.length - 1 );
            tempArr.data = this.pgon.data;
            this.pgon = tempArr;
        }
        this.vorFunc = d3
            .voronoi<Building>()
            .extent( this.extent( this.pad( 10 ) ) )
            .x( d => d.x )
            .y( d => d.y );
        const buildCount = Math.floor( d3.polygonArea( this.pgon ) / 3000 );
        this.buildings = [];
        _.range( buildCount ).map( () => {
            const ang = _.random( Math.PI * 2, true );
            const mag = _.random( Math.min( 20, this.range-10 ) );
            const newPos = createVector( 0, -1 )
                .rotate( ang )
                .setMag( mag )
                .add( this.posToVec() )
                .array();
            this.buildings.push( new Building( newPos[0], newPos[1] ) );
        } );
        this.vorDiag = this.vorFunc( this.buildings );
        this.relax( 32 );
    };
    public draw = () => {
        const polyToDraw = this.pad( 10 );
        fill( 255 );
        stroke( 0 );
        strokeWeight( 2 );
        beginShape();
        polyToDraw.map( point => vertex.apply( this, point ) );
        endShape( CLOSE );
    };
    public drawBuildings = () => {
        this.buildings.map( b => b.draw() );
    };
    private genVorDiag = () => {
        this.vorDiag = this.vorFunc( this.buildings );
        this.vorDiag.polygons().map( polygon => {
            polygon.data.pgon = polygon;
            polygon.data.pgon = polygon.data.clip( this.pad( 10 ) );
            polygon.data.posFromArray( d3.polygonCentroid( polygon.data.pgon ) );
        } );
    };
    private relax = ( count: number ) => {
        for ( let i = 0; i < count; i++ ) {
            this.genVorDiag();
        }
    };
}

export class Building extends VPoint {
    constructor( x: number, y: number, pgon?: d3.VoronoiPolygon<VPoint> ) {
        super( x, y );
        if ( pgon ) this.pgon = pgon;
    }
    public draw = () => {
        if ( !this.pgon ) return;
        const polyToDraw = d3p.largestRect( this.pad( 1 ) ).points
        const u = d3p;
        fill( 255 );
        stroke( 0 );
        strokeWeight( 2 );
        beginShape();
        polyToDraw.map( point => vertex.apply( this, point ) );
        endShape( CLOSE );
    };
}
