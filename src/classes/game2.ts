import { RoadDirection, TileType, tileInterval } from "../constants";
import { Board } from "./board";
import { Player } from "./player";
import { Tile } from "./tile";
import { TileGenerator } from "./tile-generator";


export class GameV2 {
    public readonly player: Player;
    public readonly board: Board;
    public tilesInDeck: number;

    private _tileGenerator = new TileGenerator( {
        roadProbability: tileInterval.road,
        cityProbability: tileInterval.city,
        abbeyProbability: tileInterval.abbey
    } );


    constructor ( private _size: number, private _playerName: string ) {
        if ( this._size % 2 === 0 ) throw new Error( "Only odd size" );

        this.tilesInDeck = Math.pow( this._size, 2 );

        this.board = new Board( this._size );
        this.player = new Player( this._playerName, this.board );

        this._initGame();
    }


    /**
     * The function generates a board, sets the turn to 1, and draws 4 tiles.
     */
    private _initGame (): void {
        for ( let i = 0; i < 4; i++ ) {
            this.player.appendTileToHand();
        }
    }


    /**
     * Generate a tile with a random type and direction. 
     * It also discounts the number of tiles in the deck.
     * 
     * @throws {Error} If there are no more tiles to play
     * @returns {Tile} A new Tile object with a tileType and direction.
     */
    public _generateTile (): Tile {
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

    public playTile ( tile: Tile, row: number, col: number ) {
        this.board.placeTile( tile, row, col );
        this.player.updateHand( tile );
        this.player.updateScore( tile.type, row, col, this._size );
    }
}