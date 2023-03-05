// import { Game } from './classes';
import { Events } from './events';
import { EventsV2 } from './events2';
import './style.css';


const inputSize: HTMLInputElement = document.getElementById( "size" )! as HTMLInputElement;
const inputName: HTMLInputElement = document.getElementById( "name" )! as HTMLInputElement;

let size: number;
let name: string;
let events: EventsV2;


size = +inputSize.value;
name = inputName.value;


initGame();


function initGame () {
    try {
        events = new EventsV2( size, name );
        events.startGame();
    } catch ( error ) {
        EventsV2.createNotification( error );
    }
}


function updateGame () {
    try {
        events.updateGame();
    } catch ( error ) {
        EventsV2.createNotification( error );
    }
}


document.getElementById( 'form' )!.addEventListener( 'submit', ( e: any ) => {
    e.preventDefault();
    size = +inputSize.value;
    name = inputName.value;

    document.getElementById( 'game' )!.innerHTML = '';
    initGame();
} );


document.getElementById( 'discard' )!.addEventListener( 'click', () => {
    try {
        events.discardHand();
        updateGame();
    } catch ( error ) {
        Events.createNotification( error );
    }
} );


document.getElementById( 'play' )!.addEventListener( 'submit', ( e: any ) => {
    e.preventDefault();
} );


document.getElementById( 'close' )!.addEventListener( 'click', () => {
    events.closeOptions();
} );



const tiles = document.querySelectorAll<HTMLButtonElement>( '.tile' );
// const empties = document.querySelectorAll<HTMLTableRowElement>( '.empty' );


tiles.forEach( ( tile, index ) => {
    tile.addEventListener( 'click', () => {
        events.openOptions( index );
    } );
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