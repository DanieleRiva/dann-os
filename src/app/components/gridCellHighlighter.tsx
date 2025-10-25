interface GridCellHighlighterProps {
    grid: {
        rows: number,
        cols: number,
        cellWidth: number,
        cellHeight: number
    },
    highlighterPos: {
        x: number,
        y: number
    } | null
}

const GridCellHighlighter = ({ grid, highlighterPos }: GridCellHighlighterProps) => {
    return (
        highlighterPos && (
            <div
                className="absolute bg-violet-800 opacity-20 rounded-lg"
                style={{
                    left: highlighterPos.x,
                    top: highlighterPos.y,
                    width: grid.cellWidth,
                    height: grid.cellHeight,
                    pointerEvents: 'none',
                    zIndex: 5
                }}
            />
        )
    )
}

export default GridCellHighlighter;