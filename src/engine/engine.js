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

/**
 * A function that sets up to allow a user to navigate between coordinate rooms.
 * @param {Object} confObj a config object like the one above.
 * @returns the four cardinal move functions.
 */
export const configMove = (confObj) => {
    /**
     * A function to check if a room coordinate is an existing room coordinate in the config objs list of rooms.
     * @param {'x.y'} coord formatted x.y
     * @returns true if the room exists, else false.
     */
    const checkValidRoom = (coord) => {
        if (Object.hasOwn(confObj.rooms, coord)) {
            return true
        }
        return false
    }


    /**
     * A function to check if a coordinate that exists in the config obj's 'rooms' isOpen.
     * @param {'x.y'} coord formmated x.y, a coordinate that exists in the config obj's 'rooms'
     * @returns true if the room isOpen, else false.
     */
    const checkIfOpen = (coord) => {
        if (confObj.rooms[coord].isOpen) {
            return true
        }
        return false
    }


    /**
     * A function to return information for the save object and DOM when a player attempts to make a move.
     * Essentially checks if the move is valid, and returns the appropriate response. 
     * @param {'x.y'} attemptedCoords 
     * @param {'x.y'} prevCoords 
     * @param {String} userCommand 
     * @returns an object with a coordinate history, room object with the outcome of the move, and the user's command
     */
    const handleAccess = (attemptedCoords, prevCoords, userCommand) => {
        // console.log(`In handleAccess: 
        // attempedCoords: ${attemptedCoords},
        // prevCoords: ${prevCoords},
        // userCommand: ${userCommand}
        // `);
        if (checkValidRoom(attemptedCoords)) {
            if (checkIfOpen(attemptedCoords)) {
                return {
                    history: [...confObj.history, attemptedCoords],
                    room: confObj.rooms[attemptedCoords],
                    userCommand,
                }
            }
            return {
                history: [...confObj.history, prevCoords],
                room: { description: 'This room is locked.' },
                userCommand,
            }
        }
        else {
            return {
                history: [...confObj.history, prevCoords],
                room: { description: 'You have hit a wall.' },
                userCommand,
            }
        }
    }

   /**
    * A function that formats and inputs the coordinates in the config object.
    * @param {String} userCommand A string for the benefit of what is shown on the DOM, e.g. 'Moved South'
    * @returns calls handleAccess() and returns the object that function returns. 
    */
    const moveDown = (userCommand) => {
        const coords = confObj.history[confObj.history.length - 1].split('.')
        let attemptedCoords = coords.toSpliced(1, 1, +coords[1] + 1).join('.')
        return handleAccess(attemptedCoords, coords.join('.'), userCommand)
    }

      /**
    * A function that formats and inputs the coordinates in the config object.
    * @param {String} userCommand A string for the benefit of what is shown on the DOM, e.g. 'Moved South'
    * @returns calls handleAccess() and returns the object that function returns. 
    */
    const moveUp = (userCommand) => {
        const coords = confObj.history[confObj.history.length - 1].split('.')
        console.log(coords);
        let attemptedCoords = coords.toSpliced(1, 1, +coords[1] - 1).join('.')
        console.log(attemptedCoords);
        return handleAccess(attemptedCoords, coords.join('.'), userCommand)
    }

      /**
    * A function that formats and inputs the coordinates in the config object.
    * @param {String} userCommand A string for the benefit of what is shown on the DOM, e.g. 'Moved South'
    * @returns calls handleAccess() and returns the object that function returns. 
    */
    const moveLeft = (userCommand) => {
        const coords = confObj.history[confObj.history.length - 1].split('.')
        let attemptedCoords = coords.toSpliced(0, 1, +coords[0] - 1).join('.')
        return handleAccess(attemptedCoords, coords.join('.'), userCommand)
    }

      /**
    * A function that formats and inputs the coordinates in the config object.
    * @param {String} userCommand A string for the benefit of what is shown on the DOM, e.g. 'Moved South'
    * @returns calls handleAccess() and returns the object that function returns. 
    */
    const moveRight = (userCommand) => {
        const coords = confObj.history[confObj.history.length - 1].split('.')
        let attemptedCoords = coords.toSpliced(0, 1, +coords[0] + 1).join('.')
        return handleAccess(attemptedCoords, coords.join('.'), userCommand)
    }
    return { moveDown, moveUp, moveLeft, moveRight }
}