declare class CCapture {
  constructor( {} );
  public start();
}
declare const fBufffer: p5.Graphics;
declare const bBufffer: p5.Graphics;

declare module 'dat.gui' {
  interface Controller {
    onChange( func: ( value ) => void );
    onFinishChange( func: ( value ) => void );
    listen(): void;
    getValue(): any;
    setValue( value: any ): void;
    updateDisplay(): this;
    options( options: {} ): this;
    name( name:string ): this;
  }
  class GUI {
    constructor();
    public add( object: object, prop: string ): Controller;
    public add( object: object, prop: string, min: number, max: number ): Controller;
    public add( object: object, prop: string, min: number, max: number, step: number ): Controller;
    public add( object: object, prop: string, choices: any[] ): Controller;
    public add( object: object, prop: string, choices: object ): Controller;
  }
}

// tslint:disable
declare module 'ccapture.js' {
  export default class CCapture {
    constructor({});
    public start();
  }
}

declare const drawingContext: CanvasRenderingContext2D;
declare interface CanvasRenderingContext2D {
  filter: string;
}
declare module 'polygon-offset' {
  export default class Offset {
    constructor(vert?: any[], arc?: number);

    public data(sites: any[]): this;
    public padding(dist: number): any[][];
    public offsetLine(dist: number): any[][];
  }
}
declare interface Window extends p5 {
  qw: () => void;
}
declare namespace p5 {
  export interface Graphics extends p5.Renderer {}
}
declare module 'greiner-hormann' {
  var x: any;
  export = x;
}
