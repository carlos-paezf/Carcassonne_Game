export class Deck {
    private _tilesInDeck: number;

    constructor ( private boardSize: number ) {
        this._tilesInDeck = Math.pow( this.boardSize, 2 );
    }

    /**
     * This function returns the number of tiles in the deck.
     * @returns The tilesInDeck array.
     */
    get getTilesInDeck () {
        return this._tilesInDeck;
    }

    /**
     * The setter function for the tilesInDeck property
     * @param {number} value - number - The value to add to the tilesInDeck property.
     */
    set setTilesInDeck ( value: number ) {
        this._tilesInDeck += value;
    }
}