import { RoadDirection, TileType, tileInterval } from "../constants";
import { TileGenerator } from "./tile-generator";


export interface ITile {
    type: TileType;
    direction?: keyof typeof RoadDirection;
}


export class Tile implements ITile {
    public type: TileType;
    public direction?: keyof typeof RoadDirection;
    private static _tileGenerator = new TileGenerator( {
        roadProbability: tileInterval.road,
        cityProbability: tileInterval.city,
        abbeyProbability: tileInterval.abbey
    } );


    constructor ( type: TileType, direction?: keyof typeof RoadDirection ) {
        this.type = type;

        if ( this.type === TileType.ROAD ) {
            this.direction = direction;
        }
    }

    /**
     * Generate a tile with a random type and direction. 
     * It also discounts the number of tiles in the deck.
     * 
     * @throws {Error} If there are no more tiles to play
     * @returns {Tile} A new Tile object with a tileType and direction.
     */
    public static generateTile (): Tile {
        let tileType: TileType;

        tileType = this._tileGenerator.generateRandomTile();

        let direction: keyof typeof RoadDirection | undefined;

        if ( tileType === TileType.ROAD ) {
            const directions = Object.keys( RoadDirection );
            direction = directions[ Math.floor( Math.random() * directions.length ) ] as keyof typeof RoadDirection;
        }

        return new Tile( tileType, direction );
    }


    public rotateTile (): void {
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