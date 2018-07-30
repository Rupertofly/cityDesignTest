/* tslint:disable:max-classes-per-file member-ordering */


 declare class p5play {
  constructor(): void
  /**
   * The sprite's position of the sprite as a vector (x,y).
   * @property position
   * @type {p5.Vector}
   * @undefined
   */
  public position: p5.Vector;

  /**
   * The sprite's position at the beginning of the last update as a vector (x,y).
   * @property previousPosition
   * @type {p5.Vector}
   * @undefined
   */
  public previousPosition: p5.Vector;

  /**
   * The sprite's velocity as a vector (x,y)
   * Velocity is speed broken down to its vertical and horizontal components.
   * @property velocity
   * @type {p5.Vector}
   * @undefined
   */
  public velocity: p5.Vector;

  /**
   * Set a limit to the sprite's scalar speed regardless of the direction.
   * The value can only be positive. If set to -1, there's no limit.
   * @property maxSpeed
   * @type {number}
   * @undefined
   */
  public maxSpeed: number;

  /**
   * Friction factor, reduces the sprite's velocity.
   * The friction should be close to 0 (eg. 0.01)
   * 0: no friction
   * 1: full friction
   * @property friction
   * @type {number}
   * @undefined
   */
  public friction: number;

  /**
   * The sprite's current collider.
   * It can either be an Axis Aligned Bounding Box (a non-rotated rectangle)
   * or a circular collider.
   * If the sprite is checked for collision, bounce, overlapping or mouse events the
   * collider is automatically created from the width and height
   * of the sprite or from the image dimension in case of animate sprites
   *
   * You can set a custom collider with Sprite.setCollider
   * @property collider
   * @type {object}
   * @undefined
   */
  public collider: object;

  /**
   * object containing information about the most recent collision/overlapping
   * To be typically used in combination with Sprite.overlap or Sprite.collide
   * functions.
   * The properties are touching.left, touching.right, touching.top,
   * touching.bottom and are either true or false depending on the side of the
   * collider.
   * @property touching
   * @type {object}
   * @undefined
   */
  public touching: object;

  /**
   * The mass determines the velocity transfer when sprites bounce
   * against each other. See Sprite.bounce
   * The higher the mass the least the sprite will be affected by collisions.
   * @property mass
   * @type {number}
   * @undefined
   */
  public mass: number;

  /**
   * If set to true the sprite won't bounce or be displaced by collisions
   * Simulates an infinite mass or an anchored object.
   * @property immovable
   * @type {Boolean}
   * @undefined
   */
  public immovable: boolean;

  /**
   * Coefficient of restitution. The velocity lost after bouncing.
   * 1: perfectly elastic, no energy is lost
   * 0: perfectly inelastic, no bouncing
   * less than 1: inelastic, this is the most common in nature
   * greater than 1: hyper elastic, energy is increased like in a pinball bumper
   * @property restitution
   * @type {number}
   * @undefined
   */
  public restitution: number;

  /**
   * Rotation in degrees of the visual element (image or animation)
   * Note: this is not the movement's direction, see getDirection.
   * @property rotation
   * @type {number}
   * @undefined
   */
  public rotation: number;

  /**
   * Internal rotation variable (expressed in degrees).
   * Note: external callers access this through the rotation property above.
   * @property _rotation
   * @type {number}
   * @private
   */
  private _rotation: number;

  /**
   * Rotation change in degrees per frame of thevisual element (image or animation)
   * Note: this is not the movement's direction, see getDirection.
   * @property rotationSpeed
   * @type {number}
   * @undefined
   */
  public rotationSpeed: number;

  /**
   * Automatically lock the rotation property of the visual element
   * (image or animation) to the sprite's movement direction and vice versa.
   * @property rotateToDirection
   * @type {Boolean}
   * @undefined
   */
  public rotateToDirection: boolean;

  /**
   * Determines the rendering order within a group: a sprite with
   * lower depth will appear below the ones with higher depth.
   *
   * Note: drawing a group before another with drawSprites will make
   * its members appear below the second one, like in normal p5 canvas
   * drawing.
   * @property depth
   * @type {number}
   * @undefined
   */
  public depth: number;

  /**
   * Determines the sprite's scale.
   * Example: 2 will be twice the native size of the visuals,
   * 0.5 will be half. Scaling up may make images blurry.
   * @property scale
   * @type {number}
   * @undefined
   */
  public scale: number;

  /**
   * The sprite's visibility.
   * @property visible
   * @type {Boolean}
   * @undefined
   */
  public visible: boolean;

  /**
   * If set to true sprite will track its mouse state.
   * the properties mouseIsPressed and mouseIsOver will be updated.
   * Note: automatically set to true if the functions
   * onMouseReleased or onMousePressed are set.
   * @property mouseActive
   * @type {Boolean}
   * @undefined
   */
  public mouseActive: boolean;

  /**
   * True if mouse is on the sprite's collider.
   * Read only.
   * @property mouseIsOver
   * @type {Boolean}
   * @undefined
   */
  public mouseIsOver: boolean;

  /**
   * True if mouse is pressed on the sprite's collider.
   * Read only.
   * @property mouseIsPressed
   * @type {Boolean}
   * @undefined
   */
  public mouseIsPressed: boolean;

  /**
   * Width of the sprite's current image.
   * If no images or animations are set it's the width of the
   * placeholder rectangle.
   * @property width
   * @type {number}
   * @undefined
   */
  public width: number;

  /**
   * Height of the sprite's current image.
   * If no images or animations are set it's the height of the
   * placeholder rectangle.
   * @property height
   * @type {number}
   * @undefined
   */
  public height: number;

  /**
   * Unscaled width of the sprite
   * If no images or animations are set it's the width of the
   * placeholder rectangle.
   * @property originalWidth
   * @type {number}
   * @undefined
   */
  public originalWidth: number;

  /**
   * Unscaled height of the sprite
   * If no images or animations are set it's the height of the
   * placeholder rectangle.
   * @property originalHeight
   * @type {number}
   * @undefined
   */
  public originalHeight: number;

  /**
   * True if the sprite has been removed.
   * @property removed
   * @type {Boolean}
   * @undefined
   */
  public removed: boolean;

  /**
   * Cycles before self removal.
   * Set it to initiate a countdown, every draw cycle the property is
   * reduced by 1 unit. At 0 it will call a sprite.remove()
   * Disabled if set to -1.
   * @property life
   * @type {number}
   * @undefined
   */
  public life: number;

  /**
   * If set to true, draws an outline of the collider, the depth, and center.
   * @property debug
   * @type {Boolean}
   * @undefined
   */
  public debug: boolean;

  /**
   * If no image or animations are set this is color of the
   * placeholder rectangle
   * @property shapeColor
   * @type {color}
   * @undefined
   */
  public shapeColor: color;

  /**
   * Groups the sprite belongs to, including allSprites
   * @property groups
   * @type {Array}
   * @undefined
   */
  public groups: object;

  /**
   * Reference to the current animation.
   * @property animation
   * @type {Animation}
   * @undefined
   */
  public animation: Animation;

  /**
   * Updates the sprite.
   * Called automatically at the beginning of the draw cycle.
   * @property update
   * @type
   * @undefined
   */
  public update: any;

  /**
   * Creates a default collider matching the size of the
   * placeholder rectangle or the bounding box of the image.
   * @property setDefaultCollider
   * @type
   * @undefined
   */
  public setDefaultCollider: any;

  /**
   * Updates the sprite mouse states and triggers the mouse events:
   * onMouseOver, onMouseOut, onMousePressed, onMouseReleased
   * @property mouseUpdate
   * @type
   * @undefined
   */
  public mouseUpdate: any;

  /**
   * Sets a collider for the sprite.
   *
   * In p5.play a Collider is an invisible circle or rectangle
   * that can have any size or position relative to the sprite and which
   * will be used to detect collisions and overlapping with other sprites,
   * or the mouse cursor.
   *
   * If the sprite is checked for collision, bounce, overlapping or mouse events
   * a collider is automatically created from the width and height parameter
   * passed at the creation of the sprite or the from the image dimension in case
   * of animated sprites.
   *
   * Often the image bounding box is not appropriate as the active area for
   * collision detection so you can set a circular or rectangular sprite with
   * different dimensions and offset from the sprite's center.
   *
   * There are four ways to call this method:
   *
   * 1. setCollider("rectangle")
   * 2. setCollider("rectangle", offsetX, offsetY, width, height)
   * 3. setCollider("circle")
   * 4. setCollider("circle", offsetX, offsetY, radius)
   * @property setCollider
   * @type
   * @undefined
   */
  public setCollider: any;

  /**
   * Returns a the bounding box of the current image
   * @property getBoundingBox
   * @type
   * @undefined
   */
  public getBoundingBox: any;

  /**
   * Sets the sprite's horizontal mirroring.
   * If 1 the images displayed normally
   * If -1 the images are flipped horizontally
   * If no argument returns the current x mirroring
   * @property mirrorX
   * @type
   * @undefined
   */
  public mirrorX: any;

  /**
   * Sets the sprite's vertical mirroring.
   * If 1 the images displayed normally
   * If -1 the images are flipped vertically
   * If no argument returns the current y mirroring
   * @property mirrorY
   * @type
   * @undefined
   */
  public mirrorY: any;

  /**
   * Manages the positioning, scale and rotation of the sprite
   * Called automatically, it should not be overridden
   * @property display
   * @type
   * @private
   */
  private display: any;

  /**
   * Manages the visuals of the sprite.
   * It can be overridden with a custom drawing function.
   * The 0,0 point will be the center of the sprite.
   * Example:
   * sprite.draw = function() { ellipse(0,0,10,10) }
   * Will display the sprite as circle.
   * @property draw
   * @type
   * @undefined
   */
  public draw: any;

  /**
   * Removes the Sprite from the sketch.
   * The removed Sprite won't be drawn or updated anymore.
   * @property remove
   * @type
   * @undefined
   */
  public remove: any;

  /**
   * Sets the velocity vector.
   * @property setVelocity
   * @type
   * @undefined
   */
  public setVelocity: any;

  /**
   * Calculates the scalar speed.
   * @property getSpeed
   * @type
   * @undefined
   */
  public getSpeed: any;

  /**
   * Calculates the movement's direction in degrees.
   * @property getDirection
   * @type
   * @undefined
   */
  public getDirection: any;

  /**
   * Adds the sprite to an existing group
   * @property addToGroup
   * @type
   * @undefined
   */
  public addToGroup: any;

  /**
   * Limits the scalar speed.
   * @property limitSpeed
   * @type
   * @undefined
   */
  public limitSpeed: any;

  /**
   * Set the speed and direction of the sprite.
   * The action overwrites the current velocity.
   * If direction is not supplied, the current direction is maintained.
   * If direction is not supplied and there is no current velocity, the current
   * rotation angle used for the direction.
   * @property setSpeed
   * @type
   * @undefined
   */
  public setSpeed: any;

  /**
   * Pushes the sprite in a direction defined by an angle.
   * The force is added to the current velocity.
   * @property addSpeed
   * @type
   * @undefined
   */
  public addSpeed: any;

  /**
   * Pushes the sprite toward a point.
   * The force is added to the current velocity.
   * @property attractionPoint
   * @type
   * @undefined
   */
  public attractionPoint: any;

  /**
   * Adds an image to the sprite.
   * An image will be considered a one-frame animation.
   * The image should be preloaded in the preload() function using p5 loadImage.
   * Animations require a identifying label (string) to change them.
   * The image is stored in the sprite but not necessarily displayed
   * until Sprite.changeAnimation(label) is called
   *
   * Usages:
   * - sprite.addImage(label, image);
   * - sprite.addImage(image);
   *
   * If only an image is passed no label is specified
   * @property addImage
   * @type
   * @undefined
   */
  public addImage: any;

  /**
   * Adds an animation to the sprite.
   * The animation should be preloaded in the preload() function
   * using loadAnimation.
   * Animations require a identifying label (string) to change them.
   * Animations are stored in the sprite but not necessarily displayed
   * until Sprite.changeAnimation(label) is called.
   *
   * Usage:
   * - sprite.addAnimation(label, animation);
   *
   * Alternative usages. See Animation for more information on file sequences:
   * - sprite.addAnimation(label, firstFrame, lastFrame);
   * - sprite.addAnimation(label, frame1, frame2, frame3...);
   * @property addAnimation
   * @type
   * @undefined
   */
  public addAnimation: any;

  /**
   * Changes the displayed image/animation.
   * Equivalent to changeAnimation
   * @property changeImage
   * @type
   * @undefined
   */
  public changeImage: any;

  /**
   * Returns the label of the current animation
   * @property getAnimationLabel
   * @type
   * @undefined
   */
  public getAnimationLabel: any;

  /**
   * Changes the displayed animation.
   * See Animation for more control over the sequence.
   * @property changeAnimation
   * @type
   * @undefined
   */
  public changeAnimation: any;

  /**
   * Checks if the given point corresponds to a transparent pixel
   * in the sprite's current image. It can be used to check a point collision
   * against only the visible part of the sprite.
   * @property overlapPixel
   * @type
   * @undefined
   */
  public overlapPixel: any;

  /**
   * Checks if the given point is inside the sprite's collider.
   * @property overlapPoint
   * @type
   * @undefined
   */
  public overlapPoint: any;

  /**
   * Checks if the the sprite is overlapping another sprite or a group.
   * The check is performed using the colliders. If colliders are not set
   * they will be created automatically from the image/animation bounding box.
   *
   * A callback function can be specified to perform additional operations
   * when the overlap occours.
   * If the target is a group the function will be called for each single
   * sprite overlapping. The parameter of the function are respectively the
   * current sprite and the colliding sprite.
   * @property overlap
   * @type
   * @undefined
   */
  public overlap: any;

  /**
   * Checks if the the sprite is overlapping another sprite or a group.
   * If the overlap is positive the current sprite will be displace by
   * the colliding one in the closest non-overlapping position.
   *
   * The check is performed using the colliders. If colliders are not set
   * they will be created automatically from the image/animation bounding box.
   *
   * A callback function can be specified to perform additional operations
   * when the collision occours.
   * If the target is a group the function will be called for each single
   * sprite colliding. The parameter of the function are respectively the
   * current sprite and the colliding sprite.
   * @property collide
   * @type
   * @undefined
   */
  public collide: any;

  /**
   * Checks if the the sprite is overlapping another sprite or a group.
   * If the overlap is positive the current sprite will displace
   * the colliding one to the closest non-overlapping position.
   *
   * The check is performed using the colliders. If colliders are not set
   * they will be created automatically from the image/animation bounding box.
   *
   * A callback function can be specified to perform additional operations
   * when the collision occours.
   * If the target is a group the function will be called for each single
   * sprite colliding. The parameter of the function are respectively the
   * current sprite and the colliding sprite.
   * @property displace
   * @type
   * @undefined
   */
  public displace: any;

  /**
   * Checks if the the sprite is overlapping another sprite or a group.
   * If the overlap is positive the sprites will bounce affecting each
   * other's trajectories depending on their .velocity, .mass and .restitution
   *
   * The check is performed using the colliders. If colliders are not set
   * they will be created automatically from the image/animation bounding box.
   *
   * A callback function can be specified to perform additional operations
   * when the collision occours.
   * If the target is a group the function will be called for each single
   * sprite colliding. The parameter of the function are respectively the
   * current sprite and the colliding sprite.
   * @property bounce
   * @type
   * @undefined
   */
  public bounce: any;

}


  /**
   * A Sprite is the main building block of p5.play:
   * an element able to store images or animations with a set of
   * properties such as position and visibility.
   * A Sprite can have a collider that defines the active area to detect
   * collisions or overlappings with other sprites and mouse interactions.
   *
   * To create a Sprite, use
   * {{#crossLink "p5.play/createSprite:method"}}{{/crossLink}}.
   *
   * @class Sprite
   * @namespace
   */
 declare class Sprite {
  /**
   * The sprite's position of the sprite as a vector (x,y).
   * @property position
     * @type {p5.Vector}
     * @undefined
     */
  constructor(p5: any, x: number, y: number, width: number, height: number)
  public position: p5.Vector;

  /**
   * The sprite's position at the beginning of the last update as a vector (x,y).
   * @property previousPosition
   * @type {p5.Vector}
   * @undefined
   */
  public previousPosition: p5.Vector;

  /**
   * The sprite's velocity as a vector (x,y)
   * Velocity is speed broken down to its vertical and horizontal components.
   * @property velocity
   * @type {p5.Vector}
   * @undefined
   */
  public velocity: p5.Vector;

  /**
   * Set a limit to the sprite's scalar speed regardless of the direction.
   * The value can only be positive. If set to -1, there's no limit.
   * @property maxSpeed
   * @type {number}
   * @undefined
   */
  public maxSpeed: number;

  /**
   * Friction factor, reduces the sprite's velocity.
   * The friction should be close to 0 (eg. 0.01)
   * 0: no friction
   * 1: full friction
   * @property friction
   * @type {number}
   * @undefined
   */
  public friction: number;

  /**
   * The sprite's current collider.
   * It can either be an Axis Aligned Bounding Box (a non-rotated rectangle)
   * or a circular collider.
   * If the sprite is checked for collision, bounce, overlapping or mouse events the
   * collider is automatically created from the width and height
   * of the sprite or from the image dimension in case of animate sprites
   *
   * You can set a custom collider with Sprite.setCollider
   * @property collider
   * @type {object}
   * @undefined
   */
  public collider: object;

  /**
   * object containing information about the most recent collision/overlapping
   * To be typically used in combination with Sprite.overlap or Sprite.collide
   * functions.
   * The properties are touching.left, touching.right, touching.top,
   * touching.bottom and are either true or false depending on the side of the
   * collider.
   * @property touching
   * @type {object}
   * @undefined
   */
  public touching: object;

  /**
   * The mass determines the velocity transfer when sprites bounce
   * against each other. See Sprite.bounce
   * The higher the mass the least the sprite will be affected by collisions.
   * @property mass
   * @type {number}
   * @undefined
   */
  public mass: number;

  /**
   * If set to true the sprite won't bounce or be displaced by collisions
   * Simulates an infinite mass or an anchored object.
   * @property immovable
   * @type {Boolean}
   * @undefined
   */
  public immovable: boolean;

  /**
   * Coefficient of restitution. The velocity lost after bouncing.
   * 1: perfectly elastic, no energy is lost
   * 0: perfectly inelastic, no bouncing
   * less than 1: inelastic, this is the most common in nature
   * greater than 1: hyper elastic, energy is increased like in a pinball bumper
   * @property restitution
   * @type {number}
   * @undefined
   */
  public restitution: number;

  /**
   * Rotation in degrees of the visual element (image or animation)
   * Note: this is not the movement's direction, see getDirection.
   * @property rotation
   * @type {number}
   * @undefined
   */
  public rotation: number;

  /**
   * Internal rotation variable (expressed in degrees).
   * Note: external callers access this through the rotation property above.
   * @property _rotation
   * @type {number}
   * @private
   */
  private _rotation: number;

  /**
   * Rotation change in degrees per frame of thevisual element (image or animation)
   * Note: this is not the movement's direction, see getDirection.
   * @property rotationSpeed
   * @type {number}
   * @undefined
   */
  public rotationSpeed: number;

  /**
   * Automatically lock the rotation property of the visual element
   * (image or animation) to the sprite's movement direction and vice versa.
   * @property rotateToDirection
   * @type {Boolean}
   * @undefined
   */
  public rotateToDirection: boolean;

  /**
   * Determines the rendering order within a group: a sprite with
   * lower depth will appear below the ones with higher depth.
   *
   * Note: drawing a group before another with drawSprites will make
   * its members appear below the second one, like in normal p5 canvas
   * drawing.
   * @property depth
   * @type {number}
   * @undefined
   */
  public depth: number;

  /**
   * Determines the sprite's scale.
   * Example: 2 will be twice the native size of the visuals,
   * 0.5 will be half. Scaling up may make images blurry.
   * @property scale
   * @type {number}
   * @undefined
   */
  public scale: number;

  /**
   * The sprite's visibility.
   * @property visible
   * @type {Boolean}
   * @undefined
   */
  public visible: boolean;

  /**
   * If set to true sprite will track its mouse state.
   * the properties mouseIsPressed and mouseIsOver will be updated.
   * Note: automatically set to true if the functions
   * onMouseReleased or onMousePressed are set.
   * @property mouseActive
   * @type {Boolean}
   * @undefined
   */
  public mouseActive: boolean;

  /**
   * True if mouse is on the sprite's collider.
   * Read only.
   * @property mouseIsOver
   * @type {Boolean}
   * @undefined
   */
  public mouseIsOver: boolean;

  /**
   * True if mouse is pressed on the sprite's collider.
   * Read only.
   * @property mouseIsPressed
   * @type {Boolean}
   * @undefined
   */
  public mouseIsPressed: boolean;

  /**
   * Width of the sprite's current image.
   * If no images or animations are set it's the width of the
   * placeholder rectangle.
   * @property width
   * @type {number}
   * @undefined
   */
  public width: number;

  /**
   * Height of the sprite's current image.
   * If no images or animations are set it's the height of the
   * placeholder rectangle.
   * @property height
   * @type {number}
   * @undefined
   */
  public height: number;

  /**
   * Unscaled width of the sprite
   * If no images or animations are set it's the width of the
   * placeholder rectangle.
   * @property originalWidth
   * @type {number}
   * @undefined
   */
  public originalWidth: number;

  /**
   * Unscaled height of the sprite
   * If no images or animations are set it's the height of the
   * placeholder rectangle.
   * @property originalHeight
   * @type {number}
   * @undefined
   */
  public originalHeight: number;

  /**
   * True if the sprite has been removed.
   * @property removed
   * @type {Boolean}
   * @undefined
   */
  public removed: boolean;

  /**
   * Cycles before self removal.
   * Set it to initiate a countdown, every draw cycle the property is
   * reduced by 1 unit. At 0 it will call a sprite.remove()
   * Disabled if set to -1.
   * @property life
   * @type {number}
   * @undefined
   */
  public life: number;

  /**
   * If set to true, draws an outline of the collider, the depth, and center.
   * @property debug
   * @type {Boolean}
   * @undefined
   */
  public debug: boolean;

  /**
   * If no image or animations are set this is color of the
   * placeholder rectangle
   * @property shapeColor
   * @type {color}
   * @undefined
   */
  public shapeColor: color;

  /**
   * Groups the sprite belongs to, including allSprites
   * @property groups
   * @type {Array}
   * @undefined
   */
  public groups: object;

  /**
   * Reference to the current animation.
   * @property animation
   * @type {Animation}
   * @undefined
   */
  public animation: Animation;

  /**
   * Updates the sprite.
   * Called automatically at the beginning of the draw cycle.
   * @method update
   * @undefined
   */
  public update(): void;

  /**
   * Creates a default collider matching the size of the
   * placeholder rectangle or the bounding box of the image.
   * @method setDefaultCollider
   * @undefined
   */
  public setDefaultCollider(): void;

  /**
   * Updates the sprite mouse states and triggers the mouse events:
   * onMouseOver, onMouseOut, onMousePressed, onMouseReleased
   * @method mouseUpdate
   * @undefined
   */
  public mouseUpdate(): void;

  /**
   * Sets a collider for the sprite.
   *
   * In p5.play a Collider is an invisible circle or rectangle
   * that can have any size or position relative to the sprite and which
   * will be used to detect collisions and overlapping with other sprites,
   * or the mouse cursor.
   *
   * If the sprite is checked for collision, bounce, overlapping or mouse events
   * a collider is automatically created from the width and height parameter
   * passed at the creation of the sprite or the from the image dimension in case
   * of animated sprites.
   *
   * Often the image bounding box is not appropriate as the active area for
   * collision detection so you can set a circular or rectangular sprite with
   * different dimensions and offset from the sprite's center.
   *
   * There are four ways to call this method:
   *
   * 1. setCollider("rectangle")
   * 2. setCollider("rectangle", offsetX, offsetY, width, height)
   * 3. setCollider("circle")
   * 4. setCollider("circle", offsetX, offsetY, radius)
   * @method setCollider
   * @param type {string} Either "rectangle" or "circle"
   * @param offsetX {number} Collider x position from the center of the sprite
   * @param offsetY {number} Collider y position from the center of the sprite
   * @param width {number} Collider width or radius
   * @param height {number} Collider height
   * @undefined
   */
  public setCollider(type: string, offsetX: number, offsetY: number, width: number, height: number): void;

  /**
   * Returns a the bounding box of the current image
   * @method getBoundingBox
   * @undefined
   */
  public getBoundingBox(): void;

  /**
   * Sets the sprite's horizontal mirroring.
   * If 1 the images displayed normally
   * If -1 the images are flipped horizontally
   * If no argument returns the current x mirroring
   * @method mirrorX
   * @param dir {number} Either 1 or -1
   * @return {number} Current mirroring if no parameter is specified
   * @undefined
   */
  public mirrorX(dir: number): number;

  /**
   * Sets the sprite's vertical mirroring.
   * If 1 the images displayed normally
   * If -1 the images are flipped vertically
   * If no argument returns the current y mirroring
   * @method mirrorY
   * @param dir {number} Either 1 or -1
   * @return {number} Current mirroring if no parameter is specified
   * @undefined
   */
  public mirrorY(dir: number): number;

  /**
   * Manages the positioning, scale and rotation of the sprite
   * Called automatically, it should not be overridden
   * @method display
   * @private
   */
  private display(): void;

  /**
   * Manages the visuals of the sprite.
   * It can be overridden with a custom drawing function.
   * The 0,0 point will be the center of the sprite.
   * Example:
   * sprite.draw = function() { ellipse(0,0,10,10) }
   * Will display the sprite as circle.
   * @method draw
   * @undefined
   */
  public draw(): void;

  /**
   * Removes the Sprite from the sketch.
   * The removed Sprite won't be drawn or updated anymore.
   * @method remove
   * @undefined
   */
  public remove(): void;

  /**
   * Sets the velocity vector.
   * @method setVelocity
   * @param x {number} X component
   * @param y {number} Y component
   * @undefined
   */
  public setVelocity(x: number, y: number): void;

  /**
   * Calculates the scalar speed.
   * @method getSpeed
   * @return {number} Scalar speed
   * @undefined
   */
  public getSpeed(): number;

  /**
   * Calculates the movement's direction in degrees.
   * @method getDirection
   * @return {number} Angle in degrees
   * @undefined
   */
  public getDirection(): number;

  /**
   * Adds the sprite to an existing group
   * @method addToGroup
   * @param group {object}
   * @undefined
   */
  public addToGroup(group: object): void;

  /**
   * Limits the scalar speed.
   * @method limitSpeed
   * @param max {number} Max speed: positive number
   * @undefined
   */
  public limitSpeed(max: number): void;

  /**
   * Set the speed and direction of the sprite.
   * The action overwrites the current velocity.
   * If direction is not supplied, the current direction is maintained.
   * If direction is not supplied and there is no current velocity, the current
   * rotation angle used for the direction.
   * @method setSpeed
   * @param speed {number} Scalar speed
   * @param [angle] {number} Direction in degrees
   * @undefined
   */
  public setSpeed(speed: number, angle?: number): void;

  /**
   * Pushes the sprite in a direction defined by an angle.
   * The force is added to the current velocity.
   * @method addSpeed
   * @param speed {number} Scalar speed to add
   * @param angle {number} Direction in degrees
   * @undefined
   */
  public addSpeed(speed: number, angle: number): void;

  /**
   * Pushes the sprite toward a point.
   * The force is added to the current velocity.
   * @method attractionPoint
   * @param magnitude {number} Scalar speed to add
   * @param pointX {number} Direction x coordinate
   * @param pointY {number} Direction y coordinate
   */
  public attractionPoint(magnitude: number, pointX: number, pointY: number): void;

  /**
   * Adds an image to the sprite.
   * An image will be considered a one-frame animation.
   * The image should be preloaded in the preload() function using p5 loadImage.
   * Animations require a identifying label (string) to change them.
   * The image is stored in the sprite but not necessarily displayed
   * until Sprite.changeAnimation(label) is called
   *
   * Usages:
   * - sprite.addImage(label, image);
   * - sprite.addImage(image);
   *
   * If only an image is passed no label is specified
   * @method addImage
   * @param label {string|p5.Image} Label or image
   * @param [img] {p5.Image} Image
   * @undefined
   */
  public addImage(label: string | p5.Image, img?: p5.Image): void;

  /**
   * Adds an animation to the sprite.
   * The animation should be preloaded in the preload() function
   * using loadAnimation.
   * Animations require a identifying label (string) to change them.
   * Animations are stored in the sprite but not necessarily displayed
   * until Sprite.changeAnimation(label) is called.
   *
   * Usage:
   * - sprite.addAnimation(label, animation);
   *
   * Alternative usages. See Animation for more information on file sequences:
   * - sprite.addAnimation(label, firstFrame, lastFrame);
   * - sprite.addAnimation(label, frame1, frame2, frame3...);
   * @method addAnimation
   * @param label {string} Animation identifier
   * @param animation {Animation} The preloaded animation
   * @undefined
   */
  public addAnimation(label: string, animation: Animation): void;

  /**
   * Changes the displayed image/animation.
   * Equivalent to changeAnimation
   * @method changeImage
   * @param label {string} Image/Animation identifier
   * @undefined
   */
  public changeImage(label: string): void;

  /**
   * Returns the label of the current animation
   * @method getAnimationLabel
   * @return {string} label Image/Animation identifier
   * @undefined
   */
  public getAnimationLabel(): string;

  /**
   * Changes the displayed animation.
   * See Animation for more control over the sequence.
   * @method changeAnimation
   * @param label {string} Animation identifier
   * @undefined
   */
  public changeAnimation(label: string): void;

  /**
   * Checks if the given point corresponds to a transparent pixel
   * in the sprite's current image. It can be used to check a point collision
   * against only the visible part of the sprite.
   * @method overlapPixel
   * @param pointX {number} x coordinate of the point to check
   * @param pointY {number} y coordinate of the point to check
   * @return {Boolean} result True if non-transparent
   * @undefined
   */
  public overlapPixel(pointX: number, pointY: number): boolean;

  /**
   * Checks if the given point is inside the sprite's collider.
   * @method overlapPoint
   * @param pointX {number} x coordinate of the point to check
   * @param pointY {number} y coordinate of the point to check
   * @return {Boolean} result True if inside
   * @undefined
   */
  public overlapPoint(pointX: number, pointY: number): boolean;

  /**
   * Checks if the the sprite is overlapping another sprite or a group.
   * The check is performed using the colliders. If colliders are not set
   * they will be created automatically from the image/animation bounding box.
   *
   * A callback function can be specified to perform additional operations
   * when the overlap occours.
   * If the target is a group the function will be called for each single
   * sprite overlapping. The parameter of the function are respectively the
   * current sprite and the colliding sprite.
   * @method overlap
   * @param target {object} Sprite or group to check against the current one
   * @param [callback] {Function} The function to be called if overlap is positive
   * @return {Boolean} True if overlapping
   * @undefined
   */
  public overlap(target: object, callback?: (...args: any) => any): boolean;

  /**
   * Checks if the the sprite is overlapping another sprite or a group.
   * If the overlap is positive the current sprite will be displace by
   * the colliding one in the closest non-overlapping position.
   *
   * The check is performed using the colliders. If colliders are not set
   * they will be created automatically from the image/animation bounding box.
   *
   * A callback function can be specified to perform additional operations
   * when the collision occours.
   * If the target is a group the function will be called for each single
   * sprite colliding. The parameter of the function are respectively the
   * current sprite and the colliding sprite.
   * @method collide
   * @param target {object} Sprite or group to check against the current one
   * @param [callback] {Function} The function to be called if overlap is positive
   * @return {Boolean} True if overlapping
   * @undefined
   */
  public collide(target: object, callback?: (...args: any) => any): boolean;

  /**
   * Checks if the the sprite is overlapping another sprite or a group.
   * If the overlap is positive the current sprite will displace
   * the colliding one to the closest non-overlapping position.
   *
   * The check is performed using the colliders. If colliders are not set
   * they will be created automatically from the image/animation bounding box.
   *
   * A callback function can be specified to perform additional operations
   * when the collision occours.
   * If the target is a group the function will be called for each single
   * sprite colliding. The parameter of the function are respectively the
   * current sprite and the colliding sprite.
   * @method displace
   * @param target {object} Sprite or group to check against the current one
   * @param [callback] {Function} The function to be called if overlap is positive
   * @return {Boolean} True if overlapping
   * @undefined
   */
  public displace(target: object, callback?: (...args: any) => any): boolean;

  /**
   * Checks if the the sprite is overlapping another sprite or a group.
   * If the overlap is positive the sprites will bounce affecting each
   * other's trajectories depending on their .velocity, .mass and .restitution
   *
   * The check is performed using the colliders. If colliders are not set
   * they will be created automatically from the image/animation bounding box.
   *
   * A callback function can be specified to perform additional operations
   * when the collision occours.
   * If the target is a group the function will be called for each single
   * sprite colliding. The parameter of the function are respectively the
   * current sprite and the colliding sprite.
   * @method bounce
   * @param target {object} Sprite or group to check against the current one
   * @param [callback] {Function} The function to be called if overlap is positive
   * @return {Boolean} True if overlapping
   * @undefined
   */
  public bounce(target: object, callback?: (...args: any) => any): boolean;

}

/**
* @module
*/

  /**
   * A camera facilitates scrolling and zooming for scenes extending beyond
   * the canvas. A camera has a position, a zoom factor, and the mouse
   * coordinates relative to the view.
   * The camera is automatically created on the first draw cycle.
   *
   * In p5.js terms the camera wraps the whole drawing cycle in a
   * transformation matrix but it can be disable anytime during the draw
   * cycle for example to draw interface elements in an absolute position.
   *
   * @class Camera
   * @namespace
   * @constructor
   * @param x {number} Initial x coordinate
   * @param y {number} Initial y coordinate
   * @param zoom {number} magnification
   */
declare class Camera {
    constructor(x: number, y: number, zoom: number);

    /**
     * Camera position. Defines the global offset of the sketch.
     * @property position
     * @type {p5.Vector}
     * @undefined
     */
    public position: p5.Vector;

    /**
     * Camera zoom. Defines the global scale of the sketch.
     * A scale of 1 will be the normal size. Setting it to 2 will make everything
     * twice the size. .5 will make everything half size.
     * @property zoom
     * @type {number}
     * @undefined
     */
    public zoom: number;

    /**
     * MouseX translated to the camera view.
     * Offsetting and scaling the canvas will not change the sprites' position
     * nor the mouseX and mouseY variables. Use this property to read the mouse
     * position if the camera moved or zoomed.
     * @property mouseX
     * @type {number}
     * @undefined
     */
    public mouseX: number;

    /**
     * MouseY translated to the camera view.
     * Offsetting and scaling the canvas will not change the sprites' position
     * nor the mouseX and mouseY variables. Use this property to read the mouse
     * position if the camera moved or zoomed.
     * @property mouseY
     * @type {number}
     * @undefined
     */
    public mouseY: number;

    /**
     * True if the camera is active.
     * Read only property. Use the methods Camera.on() and Camera.off()
     * to enable or disable the camera.
     * @property active
     * @type {Boolean}
     * @undefined
     */
    public active: boolean;

    /**
     * Activates the camera.
     * The canvas will be drawn according to the camera position and scale until
     * Camera.off() is called
     * @method on
     * @undefined
     */
    public on(): void;

    /**
     * Deactivates the camera.
     * The canvas will be drawn normally, ignoring the camera's position
     * and scale until Camera.on() is called
     * @method off
     * @undefined
     */
    public off(): void;

  }

/**
* @module
*/

  /**
   * In p5.play groups are collections of sprites with similar behavior.
   * For example a group may contain all the sprites in the background
   * or all the sprites that "kill" the player.
   *
   * Groups are "extended" arrays and inherit all their properties
   * e.g. group.length
   *
   * Since groups contain only references, a sprite can be in multiple
   * groups and deleting a group doesn't affect the sprites themselves.
   *
   * Sprite.remove() will also remove the sprite from all the groups
   * it belongs to.
   *
   * @class Group
   * @namespace
   * @constructor
   */
declare class Group {
    constructor();

    /**
     * Gets the member at index i.
     * @method get
     * @param i {number} The index of the object to retrieve
     * @undefined
     */
    public get(i: number): void;

    /**
     * Checks if the group contains a sprite.
     * @method contains
     * @param sprite {Sprite} The sprite to search
     * @return {number} Index or -1 if not found
     * @undefined
     */
    public contains(sprite: Sprite): number;

    /**
     * Same as Group.contains
     * @method indexOf
     * @undefined
     */
    public indexOf(): void;

    /**
     * Adds a sprite to the group.
     * @method add
     * @param s {Sprite} The sprite to be added
     * @undefined
     */
    public add(s: Sprite): void;

    /**
     * Same as group.length
     * @method size
     * @undefined
     */
    public size(): void;

    /**
     * Removes all the sprites in the group
     * from the scene.
     * @method removeSprites
     * @undefined
     */
    public removeSprites(): void;

    /**
     * Removes all references to the group.
     * Does not remove the actual sprites.
     * @method clear
     * @undefined
     */
    public clear(): void;

    /**
     * Removes a sprite from the group.
     * Does not remove the actual sprite, only the affiliation (reference).
     * @method remove
     * @param item {Sprite} The sprite to be removed
     * @return {Boolean} True if sprite was found and removed
     * @undefined
     */
    public remove(item: Sprite): boolean;

    /**
     * Returns a copy of the group as standard array.
     * @method toArray
     * @undefined
     */
    public toArray(): void;

    /**
     * Returns the highest depth in a group
     * @method maxDepth
     * @return {number} The depth of the sprite drawn on the top
     * @undefined
     */
    public maxDepth(): number;

    /**
     * Returns the lowest depth in a group
     * @method minDepth
     * @return {number} The depth of the sprite drawn on the bottom
     * @undefined
     */
    public minDepth(): number;

    /**
     * Draws all the sprites in the group.
     * @method draw
     * @undefined
     */
    public draw(): void;

    /**
     * Collide each member of group against the target using the given collision
     * type.  Return true if any collision occurred.
     * Internal use
     * @method _groupCollide
     * @param type {!string} one of 'overlap', 'collide', 'displace', 'bounce'
     * @param target {object} Group or Sprite
     * @param [callback] {Function} on collision.
     * @return {Boolean} True if any collision/overlap occurred
     * @private
     */
    private _groupCollide(type: !string, target: object, callback?: (...args: any) => any): boolean;

    /**
     * Checks if the the group is overlapping another group or sprite.
     * The check is performed using the colliders. If colliders are not set
     * they will be created automatically from the image/animation bounding box.
     *
     * A callback function can be specified to perform additional operations
     * when the overlap occurs.
     * The function will be called for each single sprite overlapping.
     * The parameter of the function are respectively the
     * member of the current group and the other sprite passed as parameter.
     * @method overlap
     * @param target {object} Group or Sprite to check against the current one
     * @param [callback] {Function} The function to be called if overlap is positive
     * @return {Boolean} True if overlapping
     * @undefined
     */
    public overlap(target: object, callback?: (...args: any) => any): boolean;

    /**
     * Checks if the the group is overlapping another group or sprite.
     * If the overlap is positive the sprites in the group will be displaced
     * by the colliding one to the closest non-overlapping positions.
     *
     * The check is performed using the colliders. If colliders are not set
     * they will be created automatically from the image/animation bounding box.
     *
     * A callback function can be specified to perform additional operations
     * when the overlap occours.
     * The function will be called for each single sprite overlapping.
     * The parameter of the function are respectively the
     * member of the current group and the other sprite passed as parameter.
     * @method collide
     * @param target {object} Group or Sprite to check against the current one
     * @param [callback] {Function} The function to be called if overlap is positive
     * @return {Boolean} True if overlapping
     * @undefined
     */
    public collide(target: object, callback?: (...args: any) => any): boolean;

    /**
     * Checks if the the group is overlapping another group or sprite.
     * If the overlap is positive the sprites in the group will displace
     * the colliding ones to the closest non-overlapping positions.
     *
     * The check is performed using the colliders. If colliders are not set
     * they will be created automatically from the image/animation bounding box.
     *
     * A callback function can be specified to perform additional operations
     * when the overlap occurs.
     * The function will be called for each single sprite overlapping.
     * The parameter of the function are respectively the
     * member of the current group and the other sprite passed as parameter.
     * @method displace
     * @param target {object} Group or Sprite to check against the current one
     * @param [callback] {Function} The function to be called if overlap is positive
     * @return {Boolean} True if overlapping
     * @undefined
     */
    public displace(target: object, callback?: (...args: any) => any): boolean;

    /**
     * Checks if the the group is overlapping another group or sprite.
     * If the overlap is positive the sprites will bounce affecting each
     * other's trajectories depending on their .velocity, .mass and .restitution.
     *
     * The check is performed using the colliders. If colliders are not set
     * they will be created automatically from the image/animation bounding box.
     *
     * A callback function can be specified to perform additional operations
     * when the overlap occours.
     * The function will be called for each single sprite overlapping.
     * The parameter of the function are respectively the
     * member of the current group and the other sprite passed as parameter.
     * @method bounce
     * @param target {object} Group or Sprite to check against the current one
     * @param [callback] {Function} The function to be called if overlap is positive
     * @return {Boolean} True if overlapping
     * @undefined
     */
    public bounce(target: object, callback?: (...args: any) => any): boolean;

  }

/**
* @module
*/

  /**
   * An Animation object contains a series of images (p5.Image) that
   * can be displayed sequentially.
   *
   * All files must be png images. You must include the directory from the sketch root,
   * and the extension .png
   *
   * A sprite can have multiple labeled animations, see Sprite.addAnimation
   * and Sprite.changeAnimation, however an animation can be used independently.
   *
   * An animation can be created either by passing a series of file names,
   * no matter how many or by passing the first and the last file name
   * of a numbered sequence.
   * p5.play will try to detect the sequence pattern.
   *
   * For example if the given filenames are
   * "data/file0001.png" and "data/file0005.png" the images
   * "data/file0003.png" and "data/file0004.png" will be loaded as well.
   *
   * @class Animation
   * @namespace
   * @constructor
   * @param fileName1 {string} First file in a sequence OR first image file
   * @param fileName2 {string} Last file in a sequence OR second image file
   * @param [fileNameN] {string} Any number of image files after the first two
   */
declare class Animation {
    constructor(fileName1: string, fileName2: string, fileNameN?: string);

    /**
     * Array of frames (p5.Image)
     * @property images
     * @type {Array}
     * @undefined
     */
    public images: object;

    /**
     * Delay between frames in number of draw cycles.
     * If set to 4 the framerate of the animation would be the
     * sketch framerate divided by 4 (60fps = 15fps)
     * @property frameDelay
     * @type {number}
     * @undefined
     */
    public frameDelay: number;

    /**
     * True if the animation is currently playing.
     * @property playing
     * @type {Boolean}
     * @undefined
     */
    public playing: boolean;

    /**
     * Animation visibility.
     * @property visible
     * @type {Boolean}
     * @undefined
     */
    public visible: boolean;

    /**
     * If set to false the animation will stop after reaching the last frame
     * @property looping
     * @type {Boolean}
     * @undefined
     */
    public looping: boolean;

    /**
     * True if frame changed during the last draw cycle
     * @property frameChanged
     * @type {Boolean}
     * @undefined
     */
    public frameChanged: boolean;

    /**
     * objects are passed by reference so to have different sprites
     * using the same animation you need to clone it.
     * @method clone
     * @return {Animation} A clone of the current animation
     * @undefined
     */
    public clone(): Animation;

    /**
     * Draws the animation at coordinate x and y.
     * Updates the frames automatically.
     * @method draw
     * @param x {number} x coordinate
     * @param y {number} y coordinate
     * @param [r=0] {number} rotation
     * @undefined
     */
    public draw(x: number, y: number, r?: number): void;

    /**
     * Plays the animation.
     * @method play
     * @undefined
     */
    public play(): void;

    /**
     * Stops the animation.
     * @method stop
     * @undefined
     */
    public stop(): void;

    /**
     * Rewinds the animation to the first frame.
     * @method rewind
     * @undefined
     */
    public rewind(): void;

    /**
     * Changes the current frame.
     * @method changeFrame
     * @param frame {number} Frame number (starts from 0).
     * @undefined
     */
    public changeFrame(frame: number): void;

    /**
     * Goes to the next frame and stops.
     * @method nextFrame
     * @undefined
     */
    public nextFrame(): void;

    /**
     * Goes to the previous frame and stops.
     * @method previousFrame
     * @undefined
     */
    public previousFrame(): void;

    /**
     * Plays the animation forward or backward toward a target frame.
     * @method goToFrame
     * @param toFrame {number} Frame number destination (starts from 0)
     * @undefined
     */
    public goToFrame(toFrame: number): void;

    /**
     * Returns the current frame number.
     * @method getFrame
     * @return {number} Current frame (starts from 0)
     * @undefined
     */
    public getFrame(): number;

    /**
     * Returns the last frame number.
     * @method getLastFrame
     * @return {number} Last frame number (starts from 0)
     * @undefined
     */
    public getLastFrame(): number;

    /**
     * Returns the current frame image as p5.Image.
     * @method getFrameImage
     * @return {p5.Image} Current frame image
     * @undefined
     */
    public getFrameImage(): p5.Image;

    /**
     * Returns the frame image at the specified frame number.
     * @method getImageAt
     * @param frame {number} Frame number
     * @return {p5.Image} Frame image
     * @undefined
     */
    public getImageAt(frame: number): p5.Image;

    /**
     * Returns the current frame width in pixels.
     * If there is no image loaded, returns 1.
     * @method getWidth
     * @return {number} Frame width
     * @undefined
     */
    public getWidth(): number;

    /**
     * Returns the current frame height in pixels.
     * If there is no image loaded, returns 1.
     * @method getHeight
     * @return {number} Frame height
     * @undefined
     */
    public getHeight(): number;

  }

/**
* @module
*/

  /**
   * Represents a sprite sheet and all it's frames.  To be used with Animation,
   * or static drawing single frames.
   *
   *  There are two different ways to load a SpriteSheet
   *
   * 1. Given width, height that will be used for every frame and the
   *    number of frames to cycle through. The sprite sheet must have a
   *    uniform grid with consistent rows and columns.
   *
   * 2. Given an array of frame objects that define the position and
   *    dimensions of each frame.  This is Flexible because you can use
   *    sprite sheets that don't have uniform rows and columns.
   *
   * @class SpriteSheet
   * @namespace
   * @constructor
   * @param image {p5.Image|string} string image path or p5.Image object
   */
declare class SpriteSheet {
    constructor(image: p5.Image|string);

    /**
     * Generate the frames data for this sprite sheet baesd on user params
     * @method _generateSheetFrames
     * @private
     */
    private _generateSheetFrames(): void;

    /**
     * Draws a specific frame to the canvas.
     * @method drawFrame
     * @param frame_name {string|number} Can either be a string name, or a numeric index.
     * @param x {number} x position to draw the frame at
     * @param y {number} y position to draw the frame at
     * @param [width] {number} optional width to draw the frame
     * @param [height] {number} optional height to draw the frame
     * @undefined
     */
    public drawFrame(frame_name: string|number, x: number, y: number, width?: number, height?: number): void;

    /**
     * objects are passed by reference so to have different sprites
     * using the same animation you need to clone it.
     * @method clone
     * @return {SpriteSheet} A clone of the current SpriteSheet
     * @undefined
     */
    public clone(): SpriteSheet;

    /**
     * Log a warning message to the host console, using native `console.warn`
     * if it is available but falling back on `console.log` if not.  If no
     * console is available, this method will fail silently.
     * @method _warn
     * @param message {!string}
     * @private
     */
    private _warn(message: !string): void;

  }
