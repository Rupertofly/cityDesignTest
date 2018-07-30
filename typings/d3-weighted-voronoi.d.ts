/* tslint:disable max-classes-per-file */
declare module 'd3-weighted-voronoi' {
  export interface WVpoly<T> extends Array<[number, number]> {
    site: Vertex<T>;
  }
  export interface Vertex<T> {
    x: number;
    y: number;
    weight: number;
    index: number;
    conflicts: {};
    neighbours: Array<Vertex<T>>;
    polygon: WVpoly<T>;
    originalObject: T;
  }
  export interface WeightedVoronoi<T> {
    ( sites: T[] ): Array<WVpoly<T>>;
    x(): ( d: T ) => number;
    x( x: ( d: T ) => number ): this;
    y(): ( d: T ) => number;
    y( y: ( d: T ) => number ): this;
    size(): [number, number] | null;
    size( size: [number, number] ): this;
    weight(): ( d: T ) => number;
    weight( weights: ( d: T ) => number ): this;
  }
  export function weightedVoronoi<T>(): WeightedVoronoi<T>;
}
