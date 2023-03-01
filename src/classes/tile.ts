import { RoadDirection, TileType } from "../constants";

export interface ITile {
    type: TileType;
    direction?: keyof typeof RoadDirection;
}


export class Tile implements ITile {
    type: TileType;
    direction?: keyof typeof RoadDirection;

    constructor ( type: TileType, direction?: keyof typeof RoadDirection ) {
        this.type = type;

        if ( this.type === TileType.ROAD ) {
            this.direction = direction;
        }
    }


    rotate (): void {
        if ( this.type === TileType.ROAD ) {
            switch ( this.direction ) {
                case RoadDirection.RIGHT_LEFT:
                    this.direction = RoadDirection.UP_DOWN;
                    break;

                case RoadDirection.UP_DOWN:
                    this.direction = RoadDirection.RIGHT_LEFT;
                    break;

                default:
                    break;
            }
        }
    }
}