import { RoadDirection, TileType } from "../constants";
import { Tile } from "./tile";
import { VonNeumannNeighborhoods } from "./von-neumann-neighborhoods";


export class Board {
    private readonly _board: Tile[][] | null[][] = [];

    private static _startingTile = new Tile( TileType.ROAD, RoadDirection.FOUR_WAY );

    constructor ( private _size: number ) {
        this._generateBoard();
    }

    /**
     * It creates a 2D array of size `this.size` and fills it with null values.
     * 
     * The first for loop creates an array of size `this.size` and assigns it to `this.board[i]`.
     * The second for loop fills `this.board[i]` with null values.
     * 
     * The last two lines create a new tile and place it in the middle of the board.
     */
    private _generateBoard (): void {
        for ( let i = 0; i < this._size; i++ ) {
            this._board[ i ] = new Array( this._size ).fill( null );
        }

        const middle = Math.floor( this._size / 2 );

        this._board[ middle ][ middle ] = Board._startingTile;
    }

    /**
     * The function returns the board.
     * @returns The board.
     */
    get getBoard () {
        return this._board;
    }

    /**
     * This function returns a tile from the board
     * @param {number} row - number - The row of the tile you want to get.
     * @param {number} col - number - The column of the tile you want to get.
     * @returns The tile at the given row and column.
     */
    public getTile ( row: number, col: number ): Tile | null {
        return this._board[ row ][ col ];
    }


    /**
     * "The function returns an array of strings that represent the errors that would occur if the tile
     * were placed at the given row and column."
     * 
     * @param {Tile} tile - Tile - The tile to be placed
     * @param {number} row - number, - the row number of the tile to be placed
     * @param {number} col - number - the column number of the tile to be placed
     * @returns An array of strings.
     */
    private _validatePlacement ( tile: Tile, row: number, col: number ): string[] {
        const errors: string[] = [];

        if ( this.getTile( row, col ) !== null )
            errors.push( 'There is already a tile placed at this location' );

        const neighborsTiles = VonNeumannNeighborhoods.getNeighborhood( {
            row: Number( row ), column: Number( col ),
            maxRows: this._size, maxColumns: this._size
        } );

        if ( neighborsTiles.every( ( nt ) => this.getTile( nt[ 0 ], nt[ 1 ] ) === null ) )
            errors.push( 'The tile must be surrounded by at least one other tile' );

        if (
            tile.type === TileType.ROAD &&
            neighborsTiles.every( ( nt ) => this.getTile( nt[ 0 ], nt[ 1 ] )?.type !== tile.type )
        ) errors.push( 'The Road-type tile must be adjacent to at least one other Road-type tile.' );

        return errors;
    }


    public placeTile ( tile: Tile, row: number, col: number ): void {
        const errors = this._validatePlacement( tile, +row, +col );

        if ( errors.length ) throw new Error( errors.join( '\n' ) );

        this._board[ row ][ col ] = tile;
    }
}
