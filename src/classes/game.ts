import { RoadDirection, tileInterval, TilePoint, TileType } from '../constants';
import { Tile } from "./tile";
import { TileGenerator } from './tile-generator';
import { getNeighborhoodParams, VonNeumannNeighborhoods } from './von-neumann-neighborhoods';


/**
 * "The Game class is responsible for managing the game state."
*/
export class Game {
    public turn = 0;
    public score = 0;

    public hand: Tile[] = [];
    public discardsCounter = 5;
    public tilesInDeck: number;

    public readonly board: Tile[][] | null[][] = [];

    private _tileGenerator = new TileGenerator( {
        roadProbability: tileInterval.road,
        cityProbability: tileInterval.city,
        abbeyProbability: tileInterval.abbey
    } );

    private static startingTile = new Tile( TileType.ROAD, RoadDirection.FOUR_WAY );


    constructor ( private _size: number ) {
        if ( this._size % 2 === 0 ) throw new Error( "Only odd size" );

        this.tilesInDeck = Math.pow( this._size, 2 );
        this._initGame();
    }


    /**
     * The function generates a board, sets the turn to 1, and draws 4 tiles.
     */
    private _initGame (): void {
        this._generateBoard();
        this.turn = 1;

        for ( let i = 0; i < 4; i++ ) {
            this._appendTileToHand();
        }
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
            // this.board[ i ] = [];
            // for ( let j = 0; j < this.size; j++ ) {
            //     this.board[ i ][ j ] = null;
            // }
            this.board[ i ] = new Array( this._size ).fill( null );
        }
        const middle = Math.floor( this._size / 2 );

        this.board[ middle ][ middle ] = Game.startingTile;
    }


    /**
     * Generate a tile with a random type and direction. 
     * It also discounts the number of tiles in the deck.
     * 
     * @throws {Error} If there are no more tiles to play
     * @returns {Tile} A new Tile object with a tileType and direction.
     */
    private _generateTile (): Tile {
        if ( this.tilesInDeck === 0 ) throw new Error( 'There are no more cards to play' );

        let tileType: TileType;

        tileType = this._tileGenerator.generateRandomTile();

        let direction: keyof typeof RoadDirection | undefined;

        if ( tileType === TileType.ROAD ) {
            const directions = Object.keys( RoadDirection );
            direction = directions[ Math.floor( Math.random() * directions.length ) ] as keyof typeof RoadDirection;
        }

        this.tilesInDeck--;
        return new Tile( tileType, direction );
    }


    /**
     * Drawing a tile from the deck and adding it to the player's hand. 
     */
    private _appendTileToHand (): void {
        this.hand.push( this._generateTile() );
    };


    /**
     * "If the player has not used up all of their discards, then the player's hand is emptied, the
     * turn is incremented, the discard counter is decremented, and the player draws four new tiles."
     * 
     * The first thing we do is check if the player has used up all of their discards. If they have,
     * then we throw an error. If they haven't, then we empty the player's hand, increment the turn,
     * decrement the discard counter, and draw four new tiles.
     * @throws {Error} If there are no more opportunities to discard the hand 
     */
    public _discardHand (): void {
        if ( this.discardsCounter <= 0 ) throw new Error( 'You cannot discard your current hand' );

        this.hand = [];
        this.turn += 1;
        this.discardsCounter -= 1;

        for ( let i = 0; i < 4; i++ ) {
            this._appendTileToHand();
        }
    }


    /**
     * This function returns a tile from the board
     * @param {number} row - number - The row of the tile you want to get.
     * @param {number} col - number - The column of the tile you want to get.
     * @returns The tile at the given row and column.
     */
    private _getTile ( row: number, col: number ): Tile | null {
        return this.board[ row ][ col ];
    }


    /**
     * "This function takes a tile type, a neighborhood params, and a number of points, and increases the
     * score by the number of points for each tile of the given type in the neighborhood."
     * 
     * @param tileType - keyof typeof TileType
     * @param {getNeighborhoodParams} neighborhoodParams - getNeighborhoodParams
     * @param {number} points - number - the amount of points to add to the score
     */
    private _increasePoints ( tileType: keyof typeof TileType, neighborhoodParams: getNeighborhoodParams, points: number ): void {
        const tilesNeighborhood: number[][] = VonNeumannNeighborhoods.getNeighborhood( neighborhoodParams, tileType === TileType.ABBEY );

        tilesNeighborhood.forEach( ( nt ) => {
            const tile = this._getTile( nt[ 0 ], nt[ 1 ] );
            if ( tile?.type === tileType || ( tileType === TileType.ABBEY && tile ) )
                this.score += points;
        } );
    };


    /**
     * "The function takes a tile type, row and column as parameters and updates the score based on the
     * tile type and its neighborhood."
     * 
     * The function is called from the following function:
     * @param tileType - keyof typeof TileType, row: number, column: number
     * @param {number} points - number - the amount of points to add to the score
     * @param {number} column - number,
     */
    private _updateScore ( tileType: keyof typeof TileType, row: number, column: number ): void {
        const params: getNeighborhoodParams = {
            row, column,
            maxRows: this._size, maxColumns: this._size
        };

        switch ( tileType ) {
            case TileType.ROAD:
                this.score += TilePoint.road;
                this._increasePoints( TileType.ABBEY, params, TilePoint.abbey );
                break;

            case TileType.CITY:
                this.score += TilePoint.city;
                this._increasePoints( TileType.ABBEY, params, TilePoint.abbey );
                this._increasePoints( TileType.CITY, params, TilePoint.chain );
                break;

            case TileType.ABBEY:
                this.score += TilePoint.abbey;
                this._increasePoints( TileType.ABBEY, params, TilePoint.abbey );
                break;

            default:
                break;
        }
    };


    /**
     * Determines if a tile placement is invalid by checking if:
     * 
     * The placement is adjacent to at least one tile
     * The placement is a road tile and all adjacent tiles are not road tiles
     * 
     * @param {Tile} tile - The tile to be placed
     * @param {number} row - The row where the tile will be placed
     * @param {number} column - The column where the tile will be placed
     * @returns {boolean} - True if the placement is invalid, false otherwise
     */
    private _isInvalidPlacement ( tile: Tile, row: number, column: number ): boolean {
        const neighborsTiles = VonNeumannNeighborhoods.getNeighborhood( {
            row: Number( row ), column: Number( column ),
            maxRows: this._size, maxColumns: this._size
        } );

        if ( neighborsTiles.every( ( nt ) => this._getTile( nt[ 0 ], nt[ 1 ] ) === null ) )
            return true;

        if (
            tile.type === TileType.ROAD &&
            neighborsTiles.every( ( nt ) => this._getTile( nt[ 0 ], nt[ 1 ] )?.type !== tile.type )
        ) return true;

        return false;
    }


    /**
     * Place a tile on the board at the specified row and column.
     * @param tile - The tile to place on the board.
     * @param row - The row where the tile should be placed.
     * @param col - The column where the tile should be placed.
     * @throws An error if there is already a tile placed at the specified location.
     * @throws An error if the tile cannot be legally placed at the specified location.
     */
    public placeTile ( tile: Tile, row: number, col: number ): void {
        if ( this._getTile( row, col ) !== null )
            throw new Error( 'There is already a tile placed at this location' );

        if ( this._isInvalidPlacement( tile, +row, +col ) )
            throw new Error( 'Invalid tile placement' );

        this.board[ row ][ col ] = tile;
        this.hand.splice( this.hand.indexOf( tile ), 1 );

        this.turn += 1;
        this._updateScore( tile.type, row, col );

        this._appendTileToHand();
    }
}