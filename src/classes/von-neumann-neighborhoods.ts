export type getNeighborhoodParams = {
    row: number,
    column: number,
    maxRows: number,
    maxColumns: number;
};


export class VonNeumannNeighborhoods {
    /**
     * Returns the indices of the neighboring cells of a given cell within a grid.
     * @param {Object} params - An object containing the row and column indices of the cell, and the maximum number of rows and columns in the grid.
     * @param {number} params.row - The row index of the cell.
     * @param {number} params.column - The column index of the cell.
     * @param {number} params.maxRows - The maximum number of rows in the grid.
     * @param {number} params.maxColumns - The maximum number of columns in the grid.
     * @param {number} [neighborhoodRadius = 1] - The radius of the neighborhood to be generated  
     * @returns {number[][]} - An array of arrays, each containing the row and column indices of a neighboring cell.
     */
    private static getAdjacentNeighborhood ( { row, column, maxRows, maxColumns }: getNeighborhoodParams, neighborhoodRadius: number = 1 ): number[][] {
        const neighborhood: number[][] = [];

        for ( let i = -neighborhoodRadius; i <= neighborhoodRadius; i++ ) {
            for ( let j = -neighborhoodRadius; j <= neighborhoodRadius; j++ ) {
                if ( Math.abs( i ) + Math.abs( j ) <= neighborhoodRadius ) {
                    const newRow = row + i;
                    const newColumn = column + j;
                    if (
                        newRow >= 0 && newRow < maxRows &&
                        newColumn >= 0 && newColumn < maxColumns &&
                        ( newRow !== row || newColumn !== column )
                    ) {
                        neighborhood.push( [ newRow, newColumn ] );
                    }
                }
            }
        }

        return neighborhood;
    }

    /**
     * Returns an array containing the row and column numbers of the cells that are
     * adjacent and diagonal to the specified cell.
     *
     * @param {getNeighborhoodParams} params An object that contains the row and
     * column numbers of the center cell and the maximum number of rows and columns
     * in the grid.
     *
     * @returns {number[][]} An array containing the row and column numbers of the
     * cells that are adjacent and diagonal to the specified cell.
     */
    public static getNeighborhood ( params: getNeighborhoodParams, includeDiagonal: boolean = false ): number[][] {
        const manhattanDistance = includeDiagonal ? 2 : 1;

        const adjacentNeighborhood: number[][] = this.getAdjacentNeighborhood( params, manhattanDistance );

        const adjacentAndDiagonalNeighborhood: number[][] = [];

        adjacentNeighborhood.forEach( ( cell: number[] ) => {
            if ( !( Math.abs( cell[ 0 ] - params.row ) > 1 || Math.abs( cell[ 1 ] - params.column ) > 1 ) ) {
                adjacentAndDiagonalNeighborhood.push( cell );
            }
        } );

        return adjacentAndDiagonalNeighborhood;
    }
}