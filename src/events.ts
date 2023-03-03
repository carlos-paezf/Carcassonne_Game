import { Game, Tile } from "./classes";


export class Events {
    constructor ( private game: Game ) { }


    updateTurnHandAndScore () {
        // TODO: Separar lógica en tres métodos para Turno, Mano y Puntaje
        document.getElementById( 'turn' )!.innerText = `
            Actual Turn: ${ this.game.turn } - 
            Tiles in the deck: ${ this.game.tilesInDeck } -
            Number of discards remaining: ${ this.game.discardsCounter }
        `;
    }


    generateBoard () {
        const tableBody = document.createElement( 'tbody' );

        const generateRowHTML = ( row: ( Tile | null )[], indexRow: number ): HTMLTableRowElement => {
            const cellsHtml = row.map( ( cell, indexCol ) => {
                if ( cell === null ) {
                    return `<td class="column empty" id="${ indexRow }-${ indexCol }"></td>`;
                }
                const direction = cell.direction ? ` - ${ cell.direction }` : '';

                return `<td class="column fill" id="${ indexRow }-${ indexCol }">${ cell.type }${ direction }</td>`;
            } ).join( '' );

            const rowHtml = document.createElement( 'tr' );
            rowHtml.classList.add( 'row' );
            rowHtml.innerHTML = cellsHtml;

            return rowHtml;
        };

        this.game.board.forEach( ( row, index ) => {
            const rowHtml = generateRowHTML( row, index );
            tableBody.appendChild( rowHtml );
        } );

        document.getElementById( 'game' )!.appendChild( tableBody );
    }


    generateCardTiles () {
        const tiles = this.game.hand.map( ( tile, index ) => `
            <label class="tile" draggable="true" id="${ index }">${ tile.type }${ tile.direction ? ` - ${ tile.direction }` : '' }</label>
        `);

        document.getElementById( 'hand' )!.innerHTML = tiles.join( '' );
    }


    discardHand () {
        this.game._discardHand();
        this.generateCardTiles();
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
