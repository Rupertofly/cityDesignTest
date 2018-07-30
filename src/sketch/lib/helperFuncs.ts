/* eslint no-unused-vars: 0 */
// @ts-ignore
import * as CCapture from 'ccapture.js';
import { polygonCentroid, range } from 'd3';
import _ from 'lodash';

if ( !Object.entries ) {
  /* tslint:ignore */
  Object.entries = obj => {
    const ownProps = Object.keys( obj );
    let i = ownProps.length;
    const resArray = new Array( i ); // preallocate the Array
    while ( i-- ) {
      resArray[i] = [ ownProps[i], obj[ownProps[i]] ];
    }
    return resArray;
  };
}
export function hash( s ) {
  /* Simple hash function. */
  let a = 1;
  let c = 0;
  let h;
  let o;
  if ( s ) {
    a = 0;
    /* tslint:disable no-bitwise */
    for ( h = s.length - 1; h >= 0; h-- ) {
      o = s.charCodeAt( h );
      a = ( ( a << 6 ) & 268435455 ) + o + ( o << 14 );
      c = a & 266338304;
      a = c !== 0 ? a ^ ( c >> 21 ) : a;
    }
  }
  return a.toString( 16 ).toUpperCase();
}
/**
 * Checks to See if Object contains
 *
 * @param {...any} obj object to see
 * @returns {Boolean} isNested
 */
export function checkNested( obj /*, level1, level2, ... levelN */ ) {
  const args = Array.prototype.slice.call( arguments, 1 );
  for ( const i of args ) {
    if ( !obj || !obj.hasOwnProperty( i ) ) {
      return false;
    }
    obj = obj[args[i]];
  }
  return true;
}
export let recorder;
export let canvasObject;
export let lastFrame = 180;

// For Recording

/**
 * Adds A frame to the recording and saves if at end
 *
 */
export function recordFrame() {
  if ( frameCount <= lastFrame ) {
    recorder.capture( canvasObject );
    if ( frameCount === lastFrame ) {
      recorder.stop();
      recorder.save();
    }
  }
}
/**
 * Set's up Recording
 *
 */
// export function recordSetup() {
//   // @ts-ignore
//   recorder = new CCapture( {
//     format: 'webm',
//     framerate: 30,
//     verbose: true
//   } );
//   console.log( 'beginning record' );

//   canvasObject = document.getElementById( 'defaultCanvas0' );
//   recorder.start();
// }
type pt = [number, number];
function sqr( x: number ) {
  return x * x;
}
function dist2( v: pt, w: pt ) {
  return sqr( v[0] - w[0] ) + sqr( v[1] - w[1] );
}
function distToSegmentSquared( p: pt, v: pt, w: pt ) {
  const l2 = dist2( v, w );
  if ( l2 === 0 ) return dist2( p, v );
  let t = ( ( p[0] - v[0] ) * ( w[0] - v[0] ) + ( p[1] - v[1] ) * ( w[1] - v[1] ) ) / l2;
  t = Math.max( 0, Math.min( 1, t ) );
  return dist2( p, [ v[0] + t * ( w[0] - v[0] ), v[1] + t * ( w[1] - v[1] ) ] );
}
export function distToSegment( p: pt, v: pt, w: pt ) {
  return Math.sqrt( distToSegmentSquared( p, v, w ) );
}
/**
 *
 *
 * @param {[Number, Number][]} poly
 * @returns Number
 */
export function getMinDist( poly: Array<[number, number]> ) {
  const c = polygonCentroid( poly );
  const r = _.range( poly.length ).map( i => {
    const thisP = poly[i];
    const nextP = poly[( i + 1 ) % poly.length];
    return distToSegment( c, thisP, nextP );
  } );
  return Math.min.apply( this, r );
}
/**
 *
 *
 * @param {Number} min
 * @param {Number} max
 * @returns number
 */
export function getRandomInt( min: number, max: number ) {
  min = Math.ceil( min );
  max = Math.floor( max );
  return Math.floor( Math.random() * ( max - min ) ) + min; // The maximum is exclusive and the minimum is inclusive
}

export const interp = (
  value: number,
  inLow: number,
  inHigh: number,
  outLow: number,
  outHigh: number
) => {
  return ( ( value - inLow ) / ( inHigh - inLow ) ) * ( outHigh - outLow ) + outLow;
};
/**
 * @returns {number} random number yall
 */
export function randomGaussian() {
  const x1 = Math.random() * 2 - 1;
  const x2 = Math.random() * 2 - 1;
  let w = x1 * x1 + x2 * x2;
  while ( w >= 1 ) {}
  w = Math.sqrt( ( -2 * Math.log( w ) ) / w );
  return x1 * w;
}
export function polygonExtent( polygon: Array<[number, number]> ) {
  const xVals = polygon.map( vx => vx[0] );
  const yVals = polygon.map( vx => vx[1] );
  return [
    [ Math.min.apply( this, xVals ), Math.min.apply( this, yVals ) ],
    [ Math.max.apply( this, xVals ), Math.max.apply( this, yVals ) ]
  ] as [[number, number], [number, number]];
}
