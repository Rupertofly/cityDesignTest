import * as d3base from 'd3';
import { weightedVoronoi } from 'd3-weighted-voronoi';
import greinerHormann from 'greiner-hormann';
import { random, range } from 'lodash';
import pad from 'polygon-offset';
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
let padding = 5;
export function setup() {
  createCanvas( 860, 480 ).parent( '#canvas' );
  background( 55 );
}

export function draw() {
  background( 55 );
  // clip
  noFill();
  strokeWeight( 3 );
  stroke( 255, 0, 0, 150 );
  beginShape();
  clip.map( p => vertex.apply( this, p ) );
  endShape( CLOSE );

  // og shape
  fill( 0, 255, 0, 50 );
  strokeWeight( 3 );
  stroke( 0, 255, 0, 150 );
  beginShape();
  polyPoints.map( p => vertex.apply( this, p ) );
  endShape( CLOSE );
  const z = greinerHormann;
  // clipped shape
  let clipped: any = greinerHormann.intersection(
    polyPoints,
    clip
  );
  clipped = clipped[0];
  fill( 0, 0, 255, 50 );
  strokeWeight( 3 );
  stroke( 0, 0, 255, 150 );
  beginShape();
  clipped.map( p => vertex.apply( this, p ) );
  endShape();
  // padded
  const padded = new pad()
    .data( clipped )
    .padding( padding );
  fill( 255, 255, 255, 50 );
  strokeWeight( 3 );
  stroke( 255, 255, 255, 150 );
  beginShape();
  padded[0].map( p => vertex.apply( this, p ) );
  endShape();
}

export function mousePressed() {}
export function keyReleased() {
  switch ( key ) {
    case 'A':
      padding -= padding > 1 ? 1 : 0;
      console.log( padding );
      break;
    case 'D':
      padding += padding < 15 ? 1 : 0;
      console.log( padding );
      
      break;
  }
}
