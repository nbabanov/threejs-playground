import * as THREE from 'three';
import { SnakePart } from './snake-part.model';

export class Snake {
    private body: SnakePart[] = [];

    constructor(
        private position: THREE.Vector3,
        private color: number,
        private currentDirection: THREE.Vector3,
        private scene: THREE.Scene
    ) {
        let head = new SnakePart(this.position, this.color);

        this.scene.add(head.getMesh());
        this.body.push(head);
    }

    public eat(): void {
        let reverseDirection: THREE.Vector3 = this.currentDirection.clone().multiplyScalar(-1);
        let snakePart = new SnakePart(this.body[this.body.length - 1].getPosition().clone().add(reverseDirection), this.color);

        this.body.push(snakePart);
        this.scene.add(snakePart.getMesh());
    }

    public move(direction: THREE.Vector3): void {
        this.currentDirection = direction;

        for (let i = this.body.length - 1; i > 0; i--) {
            this.body[i].setPosition(this.body[i - 1].getPosition());
        }

        this.body[0].getPosition().add(direction);
    }

    public getPosition(): THREE.Vector3 {
        return this.body[0].getPosition();
    }

    public setPosition(position: THREE.Vector3): void {
        for (let part of this.body) {
            part.setPosition(position);
        }
    }

    public getGeometry(): THREE.Geometry {
        return <THREE.Geometry> this.body[0].getMesh().geometry;
    }
}
