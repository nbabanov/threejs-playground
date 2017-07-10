import {
    Vector3,
    Scene,
    Geometry
} from 'three';

import { SnakePart } from './snake-part.model';

/**
 * Represents a snake entity
 */
export class Snake {
    /**
     * Here we hold reference to all body parts.
     * @type {SnakePart[]}
     */
    private body: SnakePart[] = [];

    /**
     * @param {Vector3} position - Initial position of the snake.
     * @param {number} color - Color of the snake.
     * @param {Vector3} currentDirection - Current direction of the snake (from input/ default).
     * @param {Scene} scene - The scene to which the object should be added.
     */
    constructor(
        private position: Vector3,
        private color: number,
        private currentDirection: Vector3,
        private scene: Scene
    ) {
        const head = new SnakePart(this.position, this.color);

        this.scene.add(head.getMesh());
        this.body.push(head);
    }

    /**
     * When the snake eats,
     * its tail length increases by one part.
     */
    public eat(): void {
        const reverseDirection: Vector3 = this.currentDirection.clone().multiplyScalar(-1);
        const snakePart = new SnakePart(this.body[this.body.length - 1].getPosition().clone().add(reverseDirection), this.color);

        this.body.push(snakePart);
        this.scene.add(snakePart.getMesh());
    }

    /**
     * Moves the snake in a given direction.
     * @param {Vector3} direction - Initial vector representing the direction.
     */
    public move(direction: Vector3): void {
        this.currentDirection = direction;

        for (let i = this.body.length - 1; i > 0; i--) {
            this.body[i].setPosition(this.body[i - 1].getPosition());
        }

        this.body[0].getPosition().add(direction);
    }

    /**
     * Retrieves the position of the snake,
     * which is the one of the head part.
     *
     * @returns {Vector3}
     */
    public getPosition(): Vector3 {
        return this.body[0].getPosition();
    }

    /**
     * Sets the position of the snake.
     *
     * @param position
     */
    public setPosition(position: Vector3): void {
        for (const part of this.body) {
            part.setPosition(position);
        }
    }

    /**
     * Retrieves the geometry object of the snake's mesh.
     *
     * @returns {Geometry}
     */
    public getGeometry(): Geometry {
        return <Geometry> this.body[0].getMesh().geometry;
    }
}
