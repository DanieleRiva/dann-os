interface GridDisplayerProps {
    grid: {
        rows: number,
        cols: number,
        cellWidth: number,
        cellHeight: number
    }
}

const GridDisplayer = ({ grid }: GridDisplayerProps) => {
    return (
        Array.from({ length: grid.cols * grid.rows }).map((_, i) => {
            const x = i % grid.cols;
            const y = Math.floor(i / grid.cols);
            return (
                <div
                    key={i}
                    className="absolute border border-dashed border-violet-200 pointer-events-none opacity-40"
                    style={{
                        left: x * grid.cellWidth,
                        top: y * grid.cellHeight,
                        width: grid.cellWidth,
                        height: grid.cellHeight,
                    }}
                />
            );
        })
    );
}

export default GridDisplayer;