export default function renderScreen(screen, game, requestAnimationFrame) {
    const context = screen.getContext('2d')
    context.fillStyle = 'white'
    context.clearRect(0, 0, 40, 40)

    // -- Render board
    for (let row = 0; row < 30; row++) {
        for (let column = 0; column < 40; column++) {
            context.fillStyle = context.isPointInPath(x, y) ? '#465' : '#ddd'
            context.fillRect(column, row, 1, 1)
        }
    }    

    // -- Render ship menu
    context.fillStyle = '#aaa'
    context.fillRect(0, 30, 40, 10)

    screen.onmousemove = game.mouseMove
    
    requestAnimationFrame(() => {
        renderScreen(screen, requestAnimationFrame)
    })
}