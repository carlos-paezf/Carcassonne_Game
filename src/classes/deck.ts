export class Deck {
    private _tilesInDeck: number;

    constructor ( private boardSize: number ) {
        this._tilesInDeck = Math.pow( this.boardSize, 2 );
    }

    get getTilesInDeck () {
        return this._tilesInDeck;
    }

    public incrementTilesInDeck ( value: number ) {
        this._tilesInDeck += value;
    }

    public discountTilesInDeck ( value: number ) {
        this._tilesInDeck -= value;
    }
}