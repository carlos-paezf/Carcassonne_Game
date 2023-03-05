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


export enum TilePoint {
    ROAD = 1,
    ABBEY = 1,
    CITY = 2,
    CHAIN = 1
};


export enum RoadDirection {
    RIGHT_LEFT = 'RIGHT_LEFT',
    UP_DOWN = 'UP_DOWN',
    FOUR_WAY = 'FOUR_WAY',
    THREE_WAY = 'THREE_WAY',
    CORNER = 'CORNER'
};


export enum IncrementType {
    ABBEY_NEIGHBORHOOD = 'ABBEY_NEIGHBORHOOD',
    BY_CITY_CHAIN = 'BY_CITY_CHAIN',
    BY_NEIGHBORING_ABBEY = 'BY_NEIGHBORING_ABBEY'
}