import { IncrementType, TILES_PER_HAND, TilePoint, TileType } from "../constants";
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
    private _increasePoints ( incrementType: keyof typeof IncrementType, neighborhoodParams: getNeighborhoodParams ): void {
        const tilesNeighborhood: number[][] = VonNeumannNeighborhoods.getNeighborhood(
            neighborhoodParams,
            incrementType === IncrementType.ABBEY_NEIGHBORHOOD
        );

        switch ( incrementType ) {
            case IncrementType.BY_NEIGHBORING_ABBEY:
                tilesNeighborhood.forEach( ( nt ) => {
                    if ( this.board.getTile( nt[ 0 ], nt[ 1 ] )?.type === TileType.ABBEY )
                        this.score += TilePoint.ABBEY;
                } );
                break;

            case IncrementType.BY_CITY_CHAIN:
                tilesNeighborhood.forEach( ( nt ) => {
                    if ( this.board.getTile( nt[ 0 ], nt[ 1 ] )?.type === TileType.CITY )
                        this.score += TilePoint.CHAIN;
                } );
                break;

            case IncrementType.ABBEY_NEIGHBORHOOD:
                tilesNeighborhood.forEach( ( nt ) => {
                    if ( this.board.getTile( nt[ 0 ], nt[ 1 ] ) )
                        this.score += TilePoint.ABBEY;
                } );

            default:
                break;
        }
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
                this.score += TilePoint.ROAD;
                this._increasePoints( IncrementType.BY_NEIGHBORING_ABBEY, params );
                break;

            case TileType.CITY:
                this.score += TilePoint.CITY;
                this._increasePoints( IncrementType.BY_CITY_CHAIN, params );
                this._increasePoints( IncrementType.BY_NEIGHBORING_ABBEY, params );
                break;

            case TileType.ABBEY:
                this._increasePoints( IncrementType.ABBEY_NEIGHBORHOOD, params );
                break;

            default:
                break;
        }
    };
}