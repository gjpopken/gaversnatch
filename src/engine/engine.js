// ! THE CONFIG OBJ NEEDS TO LOOK LIKE THIS

const confOjb = {
    rooms: {
        '0.0': { description: "This is red room.", isOpen: 1, items: [1, 5, 7] },
        '0.1': { description: "This is green room.", isOpen: 0 },
        '0.2': { description: "This is blue room.", isOpen: 1 },
    },
    history: ['1.2', '1.3']
}

// ! --- --- --- ---

export const configMove = (confObj) => {
    const checkValidRoom = (coord) => {
        if (Object.hasOwn(confObj.rooms, coord)) {
            return true
        }
        return false
    }

    const checkIfOpen = (coord) => {
        if (confObj.rooms[coord].isOpen) {
            return true
        }
        return false
    }

    const handleAccess = (attemptedCoords, prevCoords) => {
        if (checkValidRoom(attemptedCoords)) {
            if (checkIfOpen(attemptedCoords)) {
                return {
                    history: [...confObj.history, attemptedCoords],
                    room: confObj.rooms[attemptedCoords],
                }
            }
            return {
                history: [...confObj.history, prevCoords],
                room: { description: 'This room is locked.' }
            }
        }
        else {
            return {
                history: [...confObj.history, prevCoords],
                room: { description: 'You have hit a wall.' }
            }
        }
    }

    const moveDown = () => {
        const coords = confObj.history[confObj.history.length - 1].split('.')
        let attemptedCoords = coords.toSpliced(1, 1, +coords[1] + 1).join('.')
        return handleAccess(attemptedCoords, coords.join('.'))
    }

    const moveUp = () => {
        const coords = confObj.history[confObj.history.length - 1].split('.')
        console.log(coords);
        let attemptedCoords = coords.toSpliced(1, 1, +coords[1] - 1).join('.')
        console.log(attemptedCoords);
        return handleAccess(attemptedCoords, coords.join('.'))
    }

    const moveLeft = () => {
        const coords = confObj.history[confObj.history.length - 1].split('.')
        let attemptedCoords = coords.toSpliced(0, 1, +coords[0] - 1).join('.')
        return handleAccess(attemptedCoords, coords.join('.'))
    }

    const moveRight = () => {
        const coords = confObj.history[confObj.history.length - 1].split('.')
        let attemptedCoords = coords.toSpliced(0, 1, +coords[0] + 1).join('.')
        return handleAccess(attemptedCoords, coords.join('.'))
    }
    return { moveDown, moveUp, moveLeft, moveRight }
}