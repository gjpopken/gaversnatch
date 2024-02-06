// ! --- THIS IS THE FORMAT FOR ALL THE SAVE DATA ---

const saveObject = {
    // ! This is for rerendering past actions to the DOM.
    adventure_text: [
        { creator: 'user' | 'comp', content: 'Move left' },
        { creator: 'user' | 'comp', content: 'You\'ve entered a room with tall windows. In the corner there is a Taffany lamp.' },
    ],
    // ! This is for knowing the player's last location.
    current_room: ['1.1', '1.2'],
    // ! This is the state of the rooms at the end of the last save. Updates when changes to state are made. 
    rooms_state: {
        '0.0': { description: "This is red room.", isOpen: 1, items: [1, 5, 7] },
        '0.1': { description: "This is green room.", isOpen: 0 },
        '0.2': { description: "This is blue room.", isOpen: 1 },
        '1.0': { description: "This is horse room.", isOpen: 1 },
        '1.1': { description: "This is cow room.", isOpen: 1 },
        '1.2': { description: "This is cat room.", isOpen: 1 },
        '2.0': { description: "This is French room.", isOpen: 0 },
        '2.1': { description: "This is German room.", isOpen: 1 },
        '2.2': { description: "This is Swedish room.", isOpen: 1 },
    },
}

// ! --- --- --- --- 


// Calling any of these functions will return an updated save object that can be stored globally or in the database. 
export const doSave = (saveObject) => {
    const saveRoomState = (rooms) => {
        return { ...saveObject, rooms_state: rooms }
    }
    const saveCurrentRoom = (history) => {
        return { ...saveObject, current_room: history }
    }
    const saveAdventureText = (adventure_text) => {
        return { ...saveObject, adventure_text: adventure_text }
    }
    const saveForMove = (moveObj) => {
        return {...saveObject, adventure_text: [...saveObject.adventure_text, {creator: 'comp', content: moveObj.room.description}], current_room: moveObj.history}
    }
    const saveAll = (rooms, history, adventure_text) => {
        return { adventure_text: adventure_text, current_room: rooms, rooms_state: history }
    }
    return { saveRoomState, saveCurrentRoom, saveAdventureText, saveAll, saveForMove }
}


// ! TESTS
// const save = doSave(saveObject)

// console.log(save.saveCurrentRoom(['1.1','1.2','1.3']));
// console.log(save.saveAdventureText([
//     { creator: 'user' | 'comp', content: 'Move left' },
//     { creator: 'user' | 'comp', content: 'You\'ve entered a room with tall windows. In the corner there is a Taffany lamp.' },
//     {creator: 'user' | 'comp', content: "You've entered a room that smells like bagettes."}
// ]));
// console.log(save.saveRoomState({
//     '0.0': { description: "This is red room.", isOpen: 1, items: [1, 5, 7] },
//     '0.1': { description: "This is green room.", isOpen: 0 },
//     '0.2': { description: "This is blue room.", isOpen: 1 },
//     '1.0': { description: "This is horse room.", isOpen: 1 },
//     '1.1': { description: "This is cow room.", isOpen: 1 },
//     '1.2': { description: "This is cat room.", isOpen: 1 },
//     '2.0': { description: "This is French room.", isOpen: 0 },
//     '2.1': { description: "This is German room.", isOpen: 1 },
//     '2.2': { description: "This is USSR room.", isOpen: 1, items: ['hammer', 'sickle']},
// }));