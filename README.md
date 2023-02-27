# Carcassonne Game

[![wakatime](https://wakatime.com/badge/user/8ef73281-6d0a-4758-af11-fd880ca3009c/project/76848014-02c0-44a4-a2d8-a0fd1de8a44d.svg)](https://wakatime.com/badge/user/8ef73281-6d0a-4758-af11-fd880ca3009c/project/76848014-02c0-44a4-a2d8-a0fd1de8a44d)

## Description

Carcassonne ia a game in which a single player attempts to build a map within the limits of board using squared tiles. The map will be constituted by tiles representing roads, abbeys, and cities. Each of these types of tiles give certain number of points to the player. The goal is for the player to build the map that scores the highest.

## Requirements

- The total number of tiles which the player can play is `N^2`, where `N` is the length of a side of the board.
- The board must be a `11 x 11` square.
- The player can put one (`1`) tile on the board per turn
- At the start of the game the player gets four (`4`) random tiles to select from and will be dealt a new tile each turn, replacing the previously played tile.
- The player will never know what tile will be the next.
- The player should be able to discard their hand every `5` turns.
- The game is played until the player can no longer play a tile, either because there are no empty places or there are no valid placements for the tiles at hand.
- If the player cannot play a tile in their hand, the game will end unless the this discard is available, in which case, the player can do a discard.
- This game uses `von Neumann Neighborhoods` for adjacency: A tile is said to be adjacent to another tile if they have a `Manhattan distance` of 1 unit form each other.
- A chain of tiles is a set of tiles where every tile is adjacent to at least one tile on the chain.
- Road tiles score 1 point per tile and can only be placed in positions adjacent to road tiles, so the chain keeps getting larger. The game starts with a single road tile in the center.
- Abbey tiles score 1 point per tile surrounding the abbey tile, so the maximum score a player can get is `8` if an abbey tile is completely surrounded by other tiles. Abbeys must be place adjacent to any other tile.
- City tiles score 2 point per tile and can only be placed adjacent to cities, roads and/or abbey tiles. City chains award an extra point for each city in the chain.
- Tile dealing should not be completely random. Roads should be more likely to appear than cities, and abbeys should be scarce. No fifteen (`15`) turns can happen without an abbey and at least three (`3`) cities. How this is done is up to the implementor.

## Bonus

- You can add direction to road tiles, so each road tile indicates in which way must the road grow: right-left, up-down, four-way crossing, three-way crossing, or corner tile. The game must start with a four-way crossing road tile in the center.
- Allow boards of different odd sizes.
- Allow different random tile generation algorithms.
