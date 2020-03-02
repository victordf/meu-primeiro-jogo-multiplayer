export default function createGame(screen) {
    const state = {
        ships: {},
        bombs: {},
        mousePosition: {
            x: null,
            y: null
        },
        screen: {
            width: 40,
            height: 40
        }
    }

    const observers = []

    function subscribe(observerFunction) {
        observers.push(observerFunction)
    }

    function notifyall(command) {
        for (const observerFunction of observers) {
            observerFunction(command)
        }
    }

    function setState(newState) {
        Object.assign(state, newState)
    }

    function mouseMove(e) {
        let rect = this.getBoundingClientRect()
        let x = e.clientX - rect.left
        let y = e.clientY - rect.top
        setState({
            ...state,
            mousePosition: {
                x: x,
                y:y
            }
        })
    }

    return {
        subscribe,
        notifyall,
        mouseMove
    }
}