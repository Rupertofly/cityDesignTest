import * as d3 from 'd3';
import { weightedVoronoi } from 'd3-weighted-voronoi';
import greinerHormann from 'greiner-hormann';
import _ from 'lodash';
import pad from 'polygon-offset';
import { City, VPoint } from './classes';
import * as hf from './lib/helperFuncs';
type pt = [number, number];
let polyPoints = [
    [ 5, 5 ],
    [ 855, 5 ],
    [ 855, 475 ],
    [ 5, 475 ]
] as pt[];
const clip = [
    [ 108.5, 241 ],
    [ 65.5, 375 ],
    [ 484.5, 527 ],
    [ 698.5, 408 ],
    [ 808.5, 166 ],
    [ 654.5, 231 ]
] as pt[];
const cityarr = [];
let errorcount = 0;
let itercount = 0;
let theCity: City;
export function setup() {
    createCanvas( 860, 480 ).parent( '#canvas' );
    background( 55 );
    try {
        theCity = new City( polyPoints );
    } finally {}
    errorcount = 0;
    hf.recordSetup();
}

export function draw() {
    background( 55, 55 );
    theCity.drawFullCity();
    theCity.relaxAllWards();
    hf.recordFrame();
    if ( frameCount % 61 === 60 ) bloop();
}

export function bloop() {
    const nSides = _.random( 3, 12, false );
    polyPoints = d3.polygonHull( _.range( nSides ).map( i =>
        createVector( 0,-1 ).rotate( ( TWO_PI/nSides )*i ).setMag( _.random( 100,240-5,false ) ).add( 430,240 ).array() as [number,number]
    ) )
    errorcount = 0;
    itercount++;
    try {
        theCity = new City( polyPoints );
    } finally {}
}
export function keyReleased() {}
