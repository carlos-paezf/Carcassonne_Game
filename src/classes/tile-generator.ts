import { TileType } from "../constants";


type TilesProbability = {
    roadProbability: number,
    cityProbability: number,
    abbeyProbability: number;
};


export class TileGenerator {
    constructor (
        private readonly tilesProbability: TilesProbability
    ) { }

    /**
     *"Generate a random tile type based on the probability of each tile type."
     *
     * The function is a bit long, but it's not too complicated.
     *
     * The first thing we do is unstructure the `tilesProbability` object. This is just a fancy way of saying that we are going to extract `roadProbability`, `cityProbability` and
     * `abbeyProbability` properties of the `tilesProbability` object.
     * Next, we generate a random number between 0 and 1.
     * Next, we add the probabilities of each tile type.
     * Finally, we check what kind of tile the random number falls on.
     *
     * If the random number is less than the probability of a road tile, we return a road tile.
     * If the random number is less than the sum of the probabilities of the road and the city, we return a city tile.
     * Otherwise we return an abbey tile
     * 
     * @returns A random tile type.
     */
    public generateRandomTile (): TileType {
        const { roadProbability, cityProbability, abbeyProbability } = this.tilesProbability;

        const randomNum = Math.random();
        const totalProbability = roadProbability + cityProbability + abbeyProbability;

        if ( randomNum < roadProbability / totalProbability )
            return TileType.ROAD;
        else if ( randomNum < ( roadProbability + cityProbability ) / totalProbability )
            return TileType.CITY;
        else
            return TileType.ABBEY;
    }
}