import { RoadDirection, TileType } from '../constants/index';
import { Board } from './board';
import { Tile } from "./tile";
import { TileGenerator } from './tile-generator';

export class Game {
    public turn = 0;
    public discardsCount = 5;
    public hand: Tile[] = [];
    public board: Board;
    private tileGenerator = new TileGenerator( ( 5 / 8 ), ( 5 / 16 ), ( 1 / 16 ) );


    constructor ( private size: number ) {
        if ( this.size % 2 === 0 ) throw new Error( "Only odd size" );
        this.board = new Board( this.size );

        this.initGame();
    }


    private generateTile () {
        let tileType: TileType;

        tileType = this.tileGenerator.generateTile();

        let direction: keyof typeof RoadDirection | undefined;

        if ( tileType === TileType.ROAD ) {
            const directions = Object.keys( RoadDirection );
            direction = directions[ Math.floor( Math.random() * directions.length ) ] as keyof typeof RoadDirection;
        }

        return new Tile( tileType, direction );
    }


    private drawTile () {
        const tile = this.generateTile();
        this.hand.push( tile );
    };


    private initGame () {
        this.turn = 1;
        for ( let i = 0; i < 4; i++ ) {
            this.drawTile();
        }
    }


    public discardHand () {
        if ( this.discardsCount <= 0 ) throw new Error( 'You cannot discard your current hand' );

        this.hand = [];
        this.turn += 1;
        this.discardsCount -= 1;

        for ( let i = 0; i < 4; i++ ) {
            this.drawTile();
        }
    }


    public placeTile ( tile: Tile, row: number, col: number ) {
        this.board.placeTile( tile, row, col );
        this.hand.splice( this.hand.indexOf( tile ), 1 );
        this.turn += 1;
        this.drawTile();
    }
}