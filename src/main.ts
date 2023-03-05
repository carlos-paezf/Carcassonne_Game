import { Game } from './classes';
import { GameV2 } from './classes/game2';
import { Events } from './events';
import { EventsV2 } from './events2';
import './style.css';


let size: number;


const input: HTMLInputElement = document.getElementById( "size" )! as HTMLInputElement;
size = +input.value;


let game: GameV2;

function initGame () {
    try {
        game = new GameV2( size, 'Carlos' );

        const events = new EventsV2( game );

        events.updateInfoGame();
        events.generateBoard();
        events.generateCardTiles();
    } catch ( error ) {
        EventsV2.createNotification( error );
    }
}

initGame();

function updateGame () {
    try {
        const events = new EventsV2( game );

        events.updateInfoGame();
        events.generateCardTiles();
    } catch ( error ) {
        EventsV2.createNotification( error );
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


// let game: Game;

// function initGame () {
//     try {
//         game = new Game( size ?? 9 );
//         const events = new Events( game );

//         events.updateTurnHandAndScore();
//         events.generateBoard();
//         events.generateCardTiles();
//     } catch ( error ) {
//         Events.createNotification( error );
//     }
// }

// initGame();


// function updateGame () {
//     try {
//         const events = new Events( game );

//         events.updateTurnHandAndScore();
//         events.generateCardTiles();
//     } catch ( error ) {
//         Events.createNotification( error );
//     }
// }


// document.getElementById( 'form' )!.addEventListener( 'submit', ( e: any ) => {
//     e.preventDefault();
//     size = +input.value;

//     document.getElementById( 'game' )!.innerHTML = '';
//     initGame();
// } );


// document.getElementById( 'discard' )!.addEventListener( 'click', () => {
//     try {
//         game._discardHand();
//         updateGame();
//     } catch ( error ) {
//         Events.createNotification( error );
//     }
// } );


const tiles = document.querySelectorAll<HTMLDivElement>( '.tile' );
const empties = document.querySelectorAll<HTMLTableRowElement>( '.empty' );


/*
type HTMLElementEvent<T extends HTMLElement> = Event & { target: T; };

let draggedItem: string | null = null;
let tileSelected: number;


tiles.forEach( tile => {
    tile.addEventListener( 'dragstart', dragStart, false );
    tile.addEventListener( 'dragend', dragEnd, false );
} );


empties.forEach( empty => {
    empty.addEventListener( 'dragover', dragOver, false );
    empty.addEventListener( 'dragenter', dragEnter, false );
    empty.addEventListener( 'dragleave', dragLeave, false );
    empty.addEventListener( 'drop', dragDrop, false );
} );


function dragStart ( event: DragEvent ) {
    resetEventsDragAndDrop();

    draggedItem = ( event.currentTarget as HTMLDivElement ).innerText;

    ( event.currentTarget as HTMLDivElement )?.classList.add( 'hold' );

    setTimeout( () => ( event.currentTarget as HTMLDivElement ).className = 'invisible', 0 );

    tileSelected = +( event.currentTarget as HTMLDivElement ).id;
}


function dragEnd ( event: DragEvent ) {
    ( event.currentTarget as HTMLDivElement ).className = 'tile';
    resetEventsDragAndDrop();
}


function dragOver ( event: DragEvent ) {
    event.preventDefault();
}


function dragEnter ( event: DragEvent ) {
    event.preventDefault();
    if ( !( event.currentTarget as HTMLDivElement ).classList.contains( 'fill' ) ) {
        ( event.currentTarget as HTMLDivElement ).classList.add( 'hovered' );
    }
}


function dragLeave ( event: DragEvent ) {
    if ( !( event.currentTarget as HTMLDivElement ).classList.contains( 'fill' ) ) {
        ( event.currentTarget as HTMLDivElement ).classList.remove( 'hovered' );
        ( event.currentTarget as HTMLDivElement ).classList.add( 'empty' );
    }
}


function dragDrop ( event: DragEvent ) {
    const [ row, col ] = ( event.currentTarget as HTMLDivElement ).id.split( '-' );

    try {
        game.placeTile( game.hand[ tileSelected ], +row, +col );
        ( event.currentTarget as HTMLDivElement ).className = 'column fill';
        ( event.currentTarget as HTMLDivElement ).innerText = draggedItem!;
        updateGame();

        // resetEventsDragAndDrop();
    } catch ( error ) {
        // draggedItem = null;
        if ( !( event.currentTarget as HTMLDivElement ).classList.contains( 'fill' ) ) {
            ( event.currentTarget as HTMLDivElement ).className = 'column empty';
        }
        Events.createNotification( error );

        resetEventsDragAndDrop();
    }
}


function resetEventsDragAndDrop () {
    draggedItem = null;

    tiles.forEach( tile => {
        tile.removeEventListener( 'dragstart', dragStart, false );
        tile.removeEventListener( 'dragend', dragEnd, false );

        tile.addEventListener( 'dragstart', dragStart, false );
        tile.addEventListener( 'dragend', dragEnd, false );
    } );

    empties.forEach( empty => {
        empty.removeEventListener( 'dragover', dragOver, false );
        empty.removeEventListener( 'dragenter', dragEnter, false );
        empty.removeEventListener( 'dragleave', dragLeave, false );
        empty.removeEventListener( 'drop', dragDrop, false );

        empty.addEventListener( 'dragover', dragOver, false );
        empty.addEventListener( 'dragenter', dragEnter, false );
        empty.addEventListener( 'dragleave', dragLeave, false );
        empty.addEventListener( 'drop', dragDrop, false );
    } );
} */

// TODO: Implementar selección y ubicación por inputs