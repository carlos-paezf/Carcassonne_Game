type getNeighborhoodParams = {
    row: number,
    column: number,
    maxRows: number,
    maxColumns: number;
};


export class VonNeumannNeighborhoods {
    private static neighborhoodRadius = 1;

    public static getNeighborhood ( { row, column, maxRows, maxColumns }: getNeighborhoodParams ): number[][] {
        const neighborhood: number[][] = [];

        for ( let i = -this.neighborhoodRadius; i <= this.neighborhoodRadius; i++ ) {
            for ( let j = -this.neighborhoodRadius; j <= this.neighborhoodRadius; j++ ) {
                if ( Math.abs( i ) + Math.abs( j ) <= this.neighborhoodRadius ) {
                    const newRow = row + i;
                    const newColumn = column + j;
                    if (
                        newRow >= 0 && newRow < maxRows &&
                        newColumn >= 0 && newColumn < maxColumns
                    ) {
                        if ( newRow !== row || newColumn !== column )
                            neighborhood.push( [ newRow, newColumn ] );
                    }
                }
            }
        }

        return neighborhood;
    }
}