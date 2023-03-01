export const TILE_PER_TURN = 1;


export const MIN_ABBEY_INTERVAL = 15;


export const MIN_CITY_INTERVAL = 3;


export enum TileType {
    CITY = 'CITY',
    ROAD = 'ROAD',
    ABBEY = 'ABBEY'
};


export enum RoadDirection {
    RIGHT_LEFT = 'RIGHT_LEFT',
    UP_DOWN = 'UP_DOWN',
    FOUR_WAY = 'FOUR_WAY',
    THREE_WAY = 'THREE_WAY',
    CORNER = 'CORNER'
};