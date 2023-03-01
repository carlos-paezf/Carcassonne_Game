import { TileType } from "../constants";

export class TileGenerator {
    constructor (
        private readonly roadProbability: number,
        private readonly cityProbability: number,
        private readonly abbeyProbability: number
    ) { }

    public generateTile (): TileType {
        const randomNum = Math.random();

        if ( randomNum < this.roadProbability ) return TileType.ROAD;
        else if ( randomNum < this.roadProbability + this.cityProbability ) return TileType.CITY;
        else return TileType.ABBEY;
    }
}