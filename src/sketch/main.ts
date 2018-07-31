import * as d3base from 'd3';
import { weightedVoronoi } from 'd3-weighted-voronoi';
import greinerHormann from 'greiner-hormann';
import { random, range } from 'lodash';
import pad from 'polygon-offset';
import { City, VPoint } from './classes';
import * as hf from './lib/helperFuncs';
type pt = [number, number];
const polyPoints = [
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
let theCity: City;
const cityarr = [];
let errorcount = 0;
let itercount = 0;
export function setup() {
    createCanvas( 860, 480 ).parent( '#canvas' );
    background( 55 );

    errorcount = 0;
}

export function draw() {
    errorcount = 0;
    itercount++;
    try {
        const c = new City( polyPoints );
        c.drawFullCity();
        cityarr.push( c );
    } finally {}

    console.log( 'nope' );
    console.log( `errors: ${errorcount}` );
    errorcount++;

    console.log( `iterations: ${itercount}` );
    if ( itercount > 100 ) noLoop();
}

export function mousePressed() {}
export function keyReleased() {}
