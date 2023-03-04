import { Board } from "./board";
import { Deck } from "./deck";
import { Player } from "./player";
import { Tile } from "./tile";


export class GameV2 {
    private readonly _board: Board;
    private readonly _deck: Deck;
    private readonly _player: Player;


    constructor ( private _size: number, private _playerName: string ) {
        if ( this._size % 2 === 0 ) throw new Error( "Only odd size" );

        this._board = new Board( this._size );
        this._deck = new Deck( this._size );
        this._player = new Player( this._playerName, this._board, this._deck );

        this._initGame();
    }


    /**
     * The function generates a board, sets the turn to 1, and draws 4 tiles.
     */
    private _initGame (): void {
        for ( let i = 0; i < 4; i++ ) {
            this._player.appendTileToHand();
        }
    }


    /**
     * @returns The board object.
     */
    get getBoard () {
        return this._board.getBoard;
    }


    /**
     * @returns The hand of the player.
     */
    get getHand () {
        return this._player.hand;
    }


    /**
     * @returns The turn of the player.
     */
    get getTurn () {
        return this._player.turn;
    }


    /**
     * @returns The tilesInDeck array
     */
    get getTilesInDeck () {
        return this._deck.getTilesInDeck;
    }


    /**
     * @returns The discardsCounter property of the player object.
     */
    get getDiscardsCounter () {
        return this._player.discardsCounter;
    }


    /**
     * @returns The score of the player.
     */
    get getScore () {
        return this._player.score;
    }


    /**
     * This function places a tile on the board, updates the player's hand, and updates the player's
     * score.
     * @param {Tile} tile - Tile - The tile that the player is playing
     * @param {number} row - number - the row the tile is being placed in
     * @param {number} col - number - the column the tile is being placed in
     */
    public playTile ( tile: Tile, row: number, col: number ) {
        this._board.placeTile( tile, row, col );
        this._player.updateHand( tile );
        this._player.updateScore( tile.type, row, col, this._size );
    }


    public discardHand () {
        this._player.discardHand();
    }
}