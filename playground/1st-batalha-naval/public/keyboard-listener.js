export default function createKeyboardListener(document) {
    const state = {
        observers: [],
        playerId: null
    }

    function registerPlayerId(playerId) {
        state.playerId = playerId
    }

    function subscribe(observerFunction) {
        state.observers.push(observerFunction)
    }

    function notifyAll(command) {
        for (const observerFunction of state.observers) {
            observerFunction(command)
        }
    }

    function handleMouseMove(event) {
        const command = {
            type: 'mouse-move',
            playerId: state.playerId,
            x: 0,
            y: 0
        }

        notifyAll(command)
    }

    return {
        subscribe,
        registerPlayerId
    }
}