import { TILES_PER_HAND, TileType, tilePoint } from "../constants";
import { Board } from "./board";
import { Deck } from './deck';
import { Tile } from "./tile";
import { VonNeumannNeighborhoods, getNeighborhoodParams } from './von-neumann-neighborhoods';

export class Player {
    public hand: Tile[] = [];
    public discardsCounter = 5;
    public score = 0;
    public turn = 0;

    constructor (
        public name: string,
        private board: Board,
        private deck: Deck
    ) { }


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
        if ( this.discardsCounter <= 0 )
            throw new Error( 'You cannot discard your current hand. You already used the maximum amount of discards' );

        if ( this.deck.getTilesInDeck < TILES_PER_HAND )
            throw new Error( 'You cannot discard your current hand. There are not enough cards to distribute a new hand.' );

        this.hand = [];
        this.turn += 1;
        this.discardsCounter -= 1;

        for ( let i = 0; i < TILES_PER_HAND; i++ ) {
            this.appendTileToHand();
        }
    }


    public updateHand ( tile: Tile ) {
        this.hand.splice( this.hand.indexOf( tile ), 1 );

        this.turn += 1;
        this.appendTileToHand();
    };


    /**
     * Drawing a tile from the deck and adding it to the player's hand. 
     */
    public appendTileToHand (): void {
        if ( this.deck.getTilesInDeck === 0 ) throw new Error( 'There are no more cards to play' );

        this.hand.push( Tile.generateTile() );

        this.deck.setTilesInDeck = -1;
    };


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
            const tile = this.board.getTile( nt[ 0 ], nt[ 1 ] );
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
    public updateScore ( tileType: keyof typeof TileType, row: number, column: number, size: number ): void {
        const params: getNeighborhoodParams = {
            row, column,
            maxRows: size, maxColumns: size
        };

        switch ( tileType ) {
            case TileType.ROAD:
                this.score += tilePoint.road;
                this._increasePoints( TileType.ABBEY, params, tilePoint.abbey );
                break;

            case TileType.CITY:
                this.score += tilePoint.city;
                this._increasePoints( TileType.ABBEY, params, tilePoint.abbey );
                this._increasePoints( TileType.CITY, params, tilePoint.chain );
                break;

            case TileType.ABBEY:
                this.score += tilePoint.abbey;
                this._increasePoints( TileType.ABBEY, params, tilePoint.abbey );
                break;

            default:
                break;
        }
    };
}