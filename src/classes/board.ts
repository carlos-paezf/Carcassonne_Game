/* import { TileType } from "../constants";
import { Tile } from "./tile";
import { RoadDirection } from '../constants/index';
import { VonNeumannNeighborhoods } from './von-neumann-neighborhoods';


export class Board {
    public readonly tiles: Tile[][] | null[][] = [];

    constructor ( private size: number ) {
        if ( this.size % 2 === 0 ) throw new Error( 'Only odd size' );

        for ( let i = 0; i < this.size; i++ ) {
            this.tiles[ i ] = [];
            for ( let j = 0; j < this.size; j++ ) {
                this.tiles[ i ][ j ] = null;
            }
        }

        const startingTile = new Tile( TileType.ROAD, RoadDirection.FOUR_WAY );
        const middle = Math.floor( this.size / 2 );

        this.tiles[ middle ][ middle ] = startingTile;
    }

    public getTile ( row: number, col: number ): Tile | null {
        return this.tiles[ row ][ col ];
    }


    public placeTile ( tile: Tile, row: number, col: number ): void {
        if ( this.getTile( row, col ) !== null ) {
            throw new Error( 'There is already a tile placed at this location' );
        }

        if ( this.isInvalidPlacement( tile, +row, +col ) ) {
            throw new Error( 'Invalid tile placement' );
        }

        this.tiles[ row ][ col ] = tile;
    }


    public isInvalidPlacement ( tile: Tile, row: number, column: number ): boolean {
        const neighborsTiles = VonNeumannNeighborhoods.getNeighborhood( {
            row: Number( row ), column: Number( column ),
            maxRows: this.size, maxColumns: this.size
        } );

        if (
            tile.type === TileType.ROAD &&
            neighborsTiles.every( ( nt ) => this.getTile( nt[ 0 ], nt[ 1 ] )?.type !== tile.type )
        ) return true;

        return false;
    }
} */

export default null;