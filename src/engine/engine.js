// ! Example Data
// const rooms = {
//     '0.0': { description: "This is red room.", isOpen: 1 },
//     '0.1': { description: "This is green room.", isOpen: 0 },
//     '0.2': { description: "This is blue room.", isOpen: 1 },
//     '1.0': { description: "This is horse room.", isOpen: 1 },
//     '1.1': { description: "This is cow room.", isOpen: 1 },
//     '1.2': { description: "This is cat room.", isOpen: 1 },
//     '2.0': { description: "This is French room.", isOpen: 1 },
//     '2.1': { description: "This is German room.", isOpen: 1 },
//     '2.2': { description: "This is Swedish room.", isOpen: 1 },
// }

// let history = ['0.0']

// TODO move() and the move<direction>() functions should be combined

/**
 * 
 * @param {rooms, history} confObj Rooms is an object with coordinates as keys, and all the information of rooms as keys. History is an array of coordinates
 * @returns an object with all to move functions (move left, right, up, and down)
 */
export const configMove = (confObj) => {
    /**
     * The move function returns a new history array with the results of an attempted move in any direction.
     * @param {String} dir takes a direction, 'up', 'down', 'left', 'right'
     * @returns an object with an updated history array, isValid indicating if the move was valid.
     */
    const move = (dir) => {
        const coords = confObj.history[confObj.history.length - 1].split('.')
        let attemptedCoords;
        switch (dir) {
            case 'up':
                attemptedCoords = coords.toSpliced(1, 1, +coords[1] - 1).join('.')
                if (checkValidRoom(attemptedCoords)) {
                    console.log([...confObj.history, attemptedCoords]);
                    return {
                        history: [...confObj.history, attemptedCoords],
                        isValid: 1
                    }
                } else {
                    return {
                        history: [...confObj.history, coords.join('.')],
                        isValid: 0
                    }
                }
            case 'down':
                attemptedCoords = coords.toSpliced(1, 1, +coords[1] + 1).join('.')
                if (checkValidRoom(attemptedCoords)) {
                    console.log([...confObj.history, attemptedCoords]);
                    return {
                        history: [...confObj.history, attemptedCoords],
                        isValid: 1
                    }
                } else {
                    return {
                        history: [...confObj.history, coords.join('.')],
                        isValid: 0
                    }
                }
            case 'left':
                attemptedCoords = coords.toSpliced(0, 1, +coords[0] - 1).join('.')
                if (checkValidRoom(attemptedCoords)) {
                    console.log([...confObj.history, attemptedCoords]);
                    return {
                        history: [...confObj.history, attemptedCoords],
                        isValid: 1
                    }
                } else {
                    return {
                        history: [...confObj.history, coords.join('.')],
                        isValid: 0
                    }
                }
            case 'right':
                attemptedCoords = coords.toSpliced(0, 1, +coords[0] + 1).join('.')
                if (checkValidRoom(attemptedCoords)) {
                    console.log([...confObj.history, attemptedCoords]);
                    return {
                        history: [...confObj.history, attemptedCoords],
                        isValid: 1
                    }
                } else {
                    return {
                        history: [...confObj.history, coords.join('.')],
                        isValid: 0
                    }
                }
        }
    }
    /**
 * 
 * @param {String} coord Takes a coordinate in the form of "1.1" 
 * and checks if this room exists.
 * @returns true if room exists else false
 */
    const checkValidRoom = (coord) => {
        if (Object.hasOwn(confObj.rooms, coord)) {
            return true
        }
        return false
    }

    /**
     * This function runs the move function above with argument 'down'. If the move was valid, 
     * it returns the new history as well as the current room's information
     * @returns an object with key history, which contains the updated history, with the player being at the last index. 
     * The other key is the room object for the current room. 
     */
    const moveDown = () => {
        const newMove = move('down')
        if (newMove.isValid) {
            return {
                history: newMove.history,
                room: confObj.rooms[newMove.history[newMove.history.length - 1]],
            }
        } else {
            return {
                history: newMove.history,
                room: { description: 'You have hit a wall.' }
            }
        }
    }
    /**
 * This function runs the move function above with argument 'up'. If the move was valid, 
 * it returns the new history as well as the current room's information
 * @returns an object with key history, which contains the updated history, with the player being at the last index. 
 * The other key is the room object for the current room. 
 */
    const moveUp = () => {
        const newMove = move('up')
        if (newMove.isValid) {
            return {
                history: newMove.history,
                room: confObj.rooms[newMove.history[newMove.history.length - 1]],
            }
        } else {
            return {
                history: newMove.history,
                room: { description: 'You have hit a wall.' }
            }
        }
    }
    /**
     * This function runs the move function above with argument 'left'. If the move was valid, 
     * it returns the new history as well as the current room's information
     * @returns an object with key history, which contains the updated history, with the player being at the last index. 
     * The other key is the room object for the current room. 
     */
    const moveLeft = () => {
        const newMove = move('left')
        if (newMove.isValid) {
            return {
                history: newMove.history,
                room: confObj.rooms[newMove.history[newMove.history.length - 1]],
            }
        } else {
            return {
                history: newMove.history,
                room: { description: 'You have hit a wall.' }
            }
        }
    }
    /**
 * This function runs the move function above with argument 'right'. If the move was valid, 
 * it returns the new history as well as the current room's information
 * @returns an object with key history, which contains the updated history, with the player being at the last index. 
 * The other key is the room object for the current room. 
 */
    const moveRight = () => {
        const newMove = move('right')
        if (newMove.isValid) {
            return {
                history: newMove.history,
                room: confObj.rooms[newMove.history[newMove.history.length - 1]],
            }
        } else {
            return {
                history: newMove.history,
                room: { description: 'You have hit a wall.' }
            }
        }
    }
    return { moveDown, moveUp, moveLeft, moveRight }
}