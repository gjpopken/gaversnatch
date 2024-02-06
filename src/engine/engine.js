const confOjb = {
    rooms: {
        '0.0': { description: "This is red room.", isOpen: 1, items: [1, 5, 7] },
        '0.1': { description: "This is green room.", isOpen: 0 },
        '0.2': { description: "This is blue room.", isOpen: 1 },
    },
    history: ['1.2', '1.3']
}

export const configMove = (confObj) => {
    const checkValidRoom = (coord) => {
        if (Object.hasOwn(confObj.rooms, coord)) {
            return true
        }
        return false
    }

    const moveDown = () => {
        const coords = confObj.history[confObj.history.length - 1].split('.')
        let attemptedCoords = coords.toSpliced(1, 1, +coords[1] + 1).join('.')
        if (checkValidRoom(attemptedCoords)) {
            // if (confObj.history)
                return {
                    history: [...confObj.history, attemptedCoords],
                    room: confObj.rooms[attemptedCoords],
                }
        } else {
            return {
                history: [...confObj.history, coords.join('.')],
                room: { description: 'You have hit a wall.' }
            }
        }
    }

    const moveUp = () => {
        const coords = confObj.history[confObj.history.length - 1].split('.')
        let attemptedCoords = coords.toSpliced(1, 1, +coords[1] - 1).join('.')
        if (checkValidRoom(attemptedCoords)) {
            // if (confObj.history)
                return {
                    history: [...confObj.history, attemptedCoords],
                    room: confObj.rooms[attemptedCoords],
                }
        } else {
            return {
                history: [...confObj.history, coords.join('.')],
                room: { description: 'You have hit a wall.' }
            }
        }
    }

    const moveLeft = () => {
        const coords = confObj.history[confObj.history.length - 1].split('.')
        let attemptedCoords = coords.toSpliced(0, 1, +coords[0] - 1).join('.')
        if (checkValidRoom(attemptedCoords)) {
            // if (confObj.history)
                return {
                    history: [...confObj.history, attemptedCoords],
                    room: confObj.rooms[attemptedCoords],
                }
        } else {
            return {
                history: [...confObj.history, coords.join('.')],
                room: { description: 'You have hit a wall.' }
            }
        }
    }

    const moveRight = () => {
        const coords = confObj.history[confObj.history.length - 1].split('.')
        let attemptedCoords = coords.toSpliced(0, 1, +coords[0] + 1).join('.')
        if (checkValidRoom(attemptedCoords)) {
            // if (confObj.history)
                return {
                    history: [...confObj.history, attemptedCoords],
                    room: confObj.rooms[attemptedCoords],
                }
        } else {
            return {
                history: [...confObj.history, coords.join('.')],
                room: { description: 'You have hit a wall.' }
            }
        }
    }
    return { moveDown, moveUp, moveLeft, moveRight }
}