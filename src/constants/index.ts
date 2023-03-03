export const TILES_PER_HAND = 4;


export enum TileType {
    ROAD = 'ROAD',
    CITY = 'CITY',
    ABBEY = 'ABBEY'
};


export const tileInterval = {
    road: ( 9 / 15 ),
    city: ( 5 / 15 ),
    abbey: ( 1 / 15 )
};


export const tilePoint = {
    road: 1,
    abbey: 1,
    city: 2,
    chain: 1
};


export enum RoadDirection {
    RIGHT_LEFT = 'RIGHT_LEFT',
    UP_DOWN = 'UP_DOWN',
    FOUR_WAY = 'FOUR_WAY',
    THREE_WAY = 'THREE_WAY',
    CORNER = 'CORNER'
};