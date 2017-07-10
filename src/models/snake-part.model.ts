import * as THREE from 'three';

export class SnakePart {
    private mesh: THREE.Mesh = null;

    constructor(position: THREE.Vector3, color: number) {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshLambertMaterial({color: color});

        this.mesh = new THREE.Mesh(geometry, material);
        this.setPosition(position);
    }

    public getPosition(): THREE.Vector3 {
        return this.mesh.position;
    }

    public setPosition(position: THREE.Vector3): void {
        this.mesh.position.set(position.x, position.y, position.z);
    }

    public getMesh(): THREE.Mesh {
        return this.mesh;
    }


}
