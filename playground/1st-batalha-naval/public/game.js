export default function createGame(screen) {
    const state = {
        players: {},
        board: [],
        ships: {},
        bombs: {
            'rthT9b59pLF96ImXAAAC': [
                '1,4'
            ]
        },
        x: 40,
        y: 40,
        selectedCell: null,
        screen: {
            width: 20,
            height: 20
        }
    }

    const observers = []

    function start() {
        handleMapBoard()
    }

    function handleMapBoard() {
        for (let row = 0; row < 15; row++) {
            for (let column = 0; column < 20; column ++) {
                state.board.push(row+','+column)
            }
        }
    }

    function handleSelectCell(cell) {
        setState({selectedCell: cell})
    }

    function registerPlayerId(playerId) {
        state.players[playerId] = {
            x: null,
            y: null
        }
    }

    function subscribe(type, callback) {
        observers[type] = callback
    }

    function notifyall(command) {
        if (observers[command.type]) {
            observers[command.type](command)
        }
    }

    function setState(newState) {
        Object.assign(state, newState)
    }

    function mouseMove(command) {
        let c = {
            ...command,
            type: 'mouse-move'
        }
        setState({ ...state, ...command })
        notifyall(c)
    }

    function placeSelect(command) {
        let cords = state.players[command.playerId] ? state.players[command.playerId] : []
        cords.push({
            x: command.x,
            y: command.y
        })
        let bombs = state.bombs[command.playerId] ? state.bombs[command.playerId] : []
        bombs.push(state.selectedCell)
        let c = {
            ...command,
            type: 'place-select'
        }
        setState({
            x: command.x,
            y: command.y,
            players: {
                ...state.players,
                [command.playerId]: cords
            },
            bombs: {
                ...state.bombs,
                [command.playerId]: bombs
            }
        })
        notifyall(c)
    }

    return {
        observers,
        state,
        setState,
        subscribe,
        notifyall,
        mouseMove,
        registerPlayerId,
        placeSelect,
        start,
        handleSelectCell
    }
}