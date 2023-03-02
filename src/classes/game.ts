import { RoadDirection, tileInterval, tilePoint, TileType } from '../constants';
import { Tile } from "./tile";
import { TileGenerator } from './tile-generator';
import { VonNeumannNeighborhoods } from './von-neumann-neighborhoods';


export class Game {
    public turn = 0;
    public score = 0;

    public hand: Tile[] = [];
    public discardsCounter = 5;
    public tilesInDeck: number;

    public readonly board: Tile[][] | null[][] = [];

    private tileGenerator = new TileGenerator( {
        roadProbability: tileInterval.road,
        cityProbability: tileInterval.city,
        abbeyProbability: tileInterval.abbey
    } );


    constructor ( private size: number ) {
        if ( this.size % 2 === 0 ) throw new Error( "Only odd size" );

        this.tilesInDeck = Math.pow( this.size, 2 );
        this.initGame();
    }


    /**
     * The function generates a board, sets the turn to 1, and draws 4 tiles.
     */
    private initGame (): void {
        this.generateBoard();
        this.turn = 1;

        for ( let i = 0; i < 4; i++ ) {
            this.drawTile();
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
    private generateBoard (): void {
        for ( let i = 0; i < this.size; i++ ) {
            this.board[ i ] = [];
            for ( let j = 0; j < this.size; j++ ) {
                this.board[ i ][ j ] = null;
            }
        }

        const startingTile = new Tile( TileType.ROAD, RoadDirection.FOUR_WAY );
        const middle = Math.floor( this.size / 2 );

        this.board[ middle ][ middle ] = startingTile;
    }


    /**
     * Generate a tile with a random type and direction. 
     * It also discounts the number of tiles in the deck.
     * 
     * @throws {Error} If there are no more tiles to play
     * @returns {Tile} A new Tile object with a tileType and direction.
     */
    private generateTile (): Tile {
        if ( this.tilesInDeck === 0 ) throw new Error( 'There are no more cards to play' );

        let tileType: TileType;

        tileType = this.tileGenerator.generateTile();

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
    private drawTile (): void {
        this.hand.push( this.generateTile() );
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
    public discardHand (): void {
        if ( this.discardsCounter <= 0 ) throw new Error( 'You cannot discard your current hand' );

        this.hand = [];
        this.turn += 1;
        this.discardsCounter -= 1;

        for ( let i = 0; i < 4; i++ ) {
            this.drawTile();
        }
    }


    /**
     * This function returns a tile from the board
     * @param {number} row - number - The row of the tile you want to get.
     * @param {number} col - number - The column of the tile you want to get.
     * @returns The tile at the given row and column.
     */
    private getTile ( row: number, col: number ): Tile | null {
        return this.board[ row ][ col ];
    }

    /**
     * Updates the game score based on the tile type and its location.
     * @param tileType - The type of the tile being placed.
     * @param row - The row of the tile's location.
     * @param column - The column of the tile's location.
     * @returns void.
     */
    private updateScore ( tileType: keyof typeof TileType, row: number, column: number ): void {
        if ( tileType === TileType.ROAD ) {
            this.score += tilePoint.road;
        }

        else if ( tileType === TileType.CITY ) {
            this.score += tilePoint.city;
        }

        else if ( tileType === TileType.ABBEY ) {
            const neighborsTiles = VonNeumannNeighborhoods.getAdjacentAndDiagonalNeighborhood( {
                row: Number( row ), column: Number( column ),
                maxRows: this.size, maxColumns: this.size
            } );

            neighborsTiles.forEach( ( nt ) => {
                if ( this.getTile( nt[ 0 ], nt[ 1 ] ) !== null )
                    this.score += tilePoint.abbey;
            } );
        }
    };


    private isInvalidPlacement ( tile: Tile, row: number, column: number ): boolean {
        const neighborsTiles = VonNeumannNeighborhoods.getNeighborhood( {
            row: Number( row ), column: Number( column ),
            maxRows: this.size, maxColumns: this.size
        } );

        if ( neighborsTiles.every( ( nt ) => this.getTile( nt[ 0 ], nt[ 1 ] ) === null ) )
            return true;

        if (
            tile.type === TileType.ROAD &&
            neighborsTiles.every( ( nt ) => this.getTile( nt[ 0 ], nt[ 1 ] )?.type !== tile.type )
        ) return true;

        return false;
    }


    public placeTile ( tile: Tile, row: number, col: number ): void {
        if ( this.getTile( row, col ) !== null )
            throw new Error( 'There is already a tile placed at this location' );

        if ( this.isInvalidPlacement( tile, +row, +col ) )
            throw new Error( 'Invalid tile placement' );

        this.board[ row ][ col ] = tile;
        this.hand.splice( this.hand.indexOf( tile ), 1 );

        this.turn += 1;
        this.updateScore( tile.type, row, col );

        this.drawTile();
    }
}