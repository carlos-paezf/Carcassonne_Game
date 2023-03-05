import { Tile } from "./classes";
import { GameV2 } from "./classes/game2";


export class EventsV2 {
    private game: GameV2;

    constructor ( private _size: number, private _name: string ) {
        this.game = new GameV2( this._size, this._name || 'Carlos' );
    }

    startGame () {
        ( document.getElementById( 'pos-x' ) as HTMLInputElement ).max = `${ this._size - 1 }`;
        ( document.getElementById( 'pos-y' ) as HTMLInputElement ).max = `${ this._size - 1 }`;
        this.generateBoard();
        this.updateInfoGame();
        this.generateCardTiles();
    }

    updateGame () {
        this.generateBoard();
        this.updateInfoGame();
        this.generateCardTiles();
    }

    /**
     * It updates the information of the game on the screen.
     */
    updateInfoGame () {
        document.getElementById( 'turn' )!.innerText = this.game.getTurn.toString();
        document.getElementById( 'tiles-deck' )!.innerText = this.game.getTilesInDeck.toString();
        document.getElementById( 'discards' )!.innerText = this.game.getDiscardsCounter.toString();
        document.getElementById( 'score' )!.innerText = this.game.getScore.toString();
    }


    generateBoard () {
        const tableBody = document.createElement( 'tbody' );

        const generateRowHTML = ( row: ( Tile | null )[], indexRow: number ): HTMLTableRowElement => {
            const cellsHtml = row.map( ( cell, indexCol ) => {
                if ( cell === null ) {
                    return `<td class="column empty" id="${ indexRow }-${ indexCol }">(${ indexRow }, ${ indexCol })</td>`;
                }
                const direction = cell.direction ? ` - ${ cell.direction }` : '';

                return `<td class="column fill" id="${ indexRow }-${ indexCol }">${ cell.type }${ direction }</td>`;
            } ).join( '' );

            const rowHtml = document.createElement( 'tr' );
            rowHtml.classList.add( 'row' );
            rowHtml.innerHTML = cellsHtml;

            return rowHtml;
        };

        this.game.getBoard.forEach( ( row, index ) => {
            const rowHtml = generateRowHTML( row, index );
            tableBody.appendChild( rowHtml );
        } );

        document.getElementById( 'game' )!.appendChild( tableBody );
    }


    generateCardTiles () {
        const tiles = this.game.getHand.map( ( tile, index ) => `
            <button class="tile btn" id="${ index }">${ tile.toString }</button>
        `);

        document.getElementById( 'hand' )!.innerHTML = tiles.join( '' );
    }


    discardHand () {
        this.game.discardHand();
        this.generateCardTiles();
    }


    openOptions ( index: number ) {
        const selectedTile = this.game.getHand[ index ];

        document.getElementById( 'tiles-options' )!.style.display = 'flex';

        ( document.getElementById( 'play' ) as HTMLFormElement )!.reset();

        document.getElementById( 'info-tile' )!.textContent = `${ selectedTile.toString }`;

        ( document.getElementById( 'play' ) as HTMLFormElement ).addEventListener( 'submit', () => {
            console.log( 'enviado' );
            const row = +( document.getElementById( 'pos-x' ) as HTMLInputElement ).value;
            const col = +( document.getElementById( 'pos-y' ) as HTMLInputElement ).value;
            this.playTile( selectedTile, row, col );
        } );

        this.updateGame();

        // TODO: Evaluar disponibilidad y resetear eventos
    }


    closeOptions () {
        ( document.getElementById( 'tiles-options' ) as HTMLElement )!.style.display = 'none';
    }


    playTile ( tile: Tile, row: number, col: number ) {
        this.game.playTile( tile, row, col );
    }


    /**
     * It creates a notification element, adds it to the DOM, and removes it after 3 seconds
     * @param {unknown} message - unknown - The message to display in the notification.
     * @param {string} [type=error] - string = 'error'
     */
    static createNotification ( message: unknown, type: string = 'error' ) {
        const toasts = document.getElementById( 'toasts' )!;
        const notification = document.createElement( 'div' );

        notification.classList.add( 'toast' );
        notification.classList.add( type );

        notification.innerText = String( message );

        toasts.appendChild( notification );

        setTimeout( () => { notification.remove(); }, 3000 );
    }
}
