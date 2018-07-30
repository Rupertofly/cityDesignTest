import * as d3base from 'd3';
import { weightedVoronoi } from 'd3-weighted-voronoi';
import { random, range } from 'lodash';
import * as hf from './lib/helperFuncs'
const polyPoints: point[] = [];
export function setup() {
  createCanvas( 860, 480 ).parent( '#canvas' );
  background( 55 );
}

export function draw() {

}

export function mousePressed() {}
