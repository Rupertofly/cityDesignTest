import * as d3base from 'd3';
import { weightedVoronoi } from 'd3-weighted-voronoi';
import greinerHormann from 'greiner-hormann';
import { random, range } from 'lodash';
import pad from 'polygon-offset';
import { City, VPoint } from './classes';
import * as hf from './lib/helperFuncs';
type pt = [number, number];
const polyPoints = [
    [ 108.5, 41 ],
    [ 55.5, 375 ],
    [ 484.5, 427 ],
    [ 798.5, 408 ],
    [ 808.5, 166 ]
] as pt[];
const clip = [
    [ 108.5, 241 ],
    [ 65.5, 375 ],
    [ 484.5, 527 ],
    [ 698.5, 408 ],
    [ 808.5, 166 ],
    [ 654.5, 231 ]
] as pt[];

export function setup() {
    createCanvas( 860, 480 ).parent( '#canvas' );
    background( 55 );
    const theCity = new City( polyPoints );
    theCity.drawFullCity();
}

export function draw() {
    
}

export function mousePressed() {}
export function keyReleased() {
   
}
