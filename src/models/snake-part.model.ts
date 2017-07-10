import {
    Mesh,
    BoxGeometry,
    MeshLambertMaterial,
    Vector3
} from 'three';

/**
 * A cube, which represents a part of the snake.
 */
export class SnakePart {
    /**
     * Here we hold reference to the 3D mesh.
     * @type {Mesh}
     */
    private mesh: Mesh = null;

    /**
     * @param {Vector3} position - Initial position of the snake part.
     * @param {number} color - Color of the snake part.
     */
    constructor(position: Vector3, color: number) {
        const geometry = new BoxGeometry(1, 1, 1);
        const material = new MeshLambertMaterial({ color: color });

        this.mesh = new Mesh(geometry, material);
        this.setPosition(position);
    }

    /**
     * Retrieves the part's position
     *
     * @returns {Vector3}
     */
    public getPosition(): Vector3 {
        return this.mesh.position;
    }

    /**
     * Sets part's position.
     *
     * @param {Vector3} position
     */
    public setPosition(position: Vector3): void {
        this.mesh.position.set(position.x, position.y, position.z);
    }

    /**
     * Retrieves part's mesh.
     *
     * @returns {Mesh}
     */
    public getMesh(): Mesh {
        return this.mesh;
    }


}
