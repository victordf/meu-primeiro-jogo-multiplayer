export default function renderScreen(screen, game, requestAnimationFrame, playerId) {
    const context = screen.getContext('2d')
    context.beginPath()
    context.fillStyle = 'white'
    context.clearRect(0, 0, 20, 20)
    const x = game.state ? game.state.x ? game.state.x : null : null
    const y = game.state ? game.state.y ? game.state.y : null : null

    // -- Render board
    // game.state.board.forEach(cell => {
    //         let path = new Path2D()
    //         let cellS = cell.split(',')
    //         path.rect(cellS[1], cellS[0], 1, 1)
    //         context.beginPath()
    //         if (context.isPointInPath(path, x, y)) {
    //             game.handleSelectCell(cell)
    //             context.fillStyle = '#465'
    //         } else {
    //             if (handleCheckPlayersBombs(cell)) {
    //                 context.fillStyle = '#222'
    //             } else {
    //                 context.fillStyle = '#ddd'
    //             }
    //         }
    //         context.fill(path)
    // })

    // -- Render players bombs
    if (game.state.bombs[playerId]) {
        game.state.bombs[playerId].forEach(bomb => {
            let cells = bomb.split(',')
            context.fillStyle = '#222'
            context.fillRect(cells[1], cells[0], 1, 1)
        })
    }

    function handleCheckPlayersBombs(cell) {
        let obj = null
        if (game.state.bombs[playerId]) {
            obj = game.state.bombs[playerId].filter(bombCell => {
                return bombCell === cell
            })
        }
        return obj ? true : false
    }

    // -- Render ship menu
    context.beginPath()
    context.fillStyle = '#aaa'
    context.fillRect(0, 15, 20, 5)

    screen.onmousemove = function(e) {
        let x = (e.offsetX * 20) / 700
        let y = (e.offsetY * 20) / 700
        game.mouseMove({
            playerId: playerId,
            x,
            y
        })
    }

    screen.onclick = function(e) {
        let x = (e.offsetX * 20) / 700
        let y = (e.offsetY * 20) / 700
        game.placeSelect({
            playerId: playerId,
            x,
            y
        })
    }
    
    requestAnimationFrame(() => {
        renderScreen(screen, game, requestAnimationFrame, playerId)
    })
}