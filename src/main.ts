import { Game } from './classes';
import { Events } from './events';
import './style.css';


let size: number;


const input: HTMLInputElement = document.getElementById( "size" )! as HTMLInputElement;
size = +input.value;


let game: Game;


function initGame () {
    try {
        game = new Game( size ?? 9 );
        const events = new Events( game );

        events.updateTurnAndHand();
        events.generateBoard();
        events.generateCardTiles();
    } catch ( error ) {
        Events.createNotification( error );
    }
}

initGame();


function updateGame () {
    try {
        const events = new Events( game );

        events.updateTurnAndHand();
        events.generateCardTiles();
    } catch ( error ) {
        Events.createNotification( error );
    }
}


document.getElementById( 'form' )!.addEventListener( 'submit', ( e: any ) => {
    e.preventDefault();
    size = +input.value;

    document.getElementById( 'game' )!.innerHTML = '';
    initGame();
} );


document.getElementById( 'discard' )!.addEventListener( 'click', () => {
    try {
        game.discardHand();
        updateGame();
    } catch ( error ) {
        Events.createNotification( error );
    }
} );


const tiles = document.querySelectorAll( '.tile' );
const empties = document.querySelectorAll( '.empty' );
let draggedItem: HTMLElement | null = null;
let tileSelected: number;


tiles.forEach( tile => {
    tile.addEventListener( 'dragstart', dragStart );
    tile.addEventListener( 'dragend', dragEnd );
} );


empties.forEach( empty => {
    empty.addEventListener( 'dragover', dragOver );
    empty.addEventListener( 'dragenter', dragEnter );
    empty.addEventListener( 'dragleave', dragLeave );
    empty.addEventListener( 'drop', dragDrop );
} );


function dragStart ( e: any ) {
    draggedItem = e.target as HTMLElement;
    e.target.classList.add( 'hold' );

    setTimeout( () => e.target!.className = 'invisible', 0 );

    tileSelected = e.target!.id;
    console.log( draggedItem.innerText );
    e.target.removeEventListener( 'dragover', dragEnd );
}


function dragEnd ( e: any ) {
    e.target.className = 'tile';
    console.log( draggedItem!.innerText );
}


function dragOver ( e: Event ) {
    e.preventDefault();
}


function dragEnter ( this: any, e: Event ) {
    e.preventDefault();
    this.classList.add( 'hovered' );
}


function dragLeave ( this: any ) {
    this.classList.remove( 'hovered' );
    this.classList.add( 'empty' );
}


function dragDrop ( e: any ) {
    e.target.className = 'column fill';

    const [ row, col ] = e.target.id.split( '-' );

    try {
        game.placeTile( game.hand[ tileSelected ], row, col );
        e.target.innerText = draggedItem?.innerText;
    } catch ( error ) {
        e.target.className = 'column empty';
        draggedItem = null;
        Events.createNotification( error );
    } finally {
        updateGame();
    }
}
