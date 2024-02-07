const saveObject = (state =
    {
        // ! This is for rerendering past actions to the DOM.
        adventure_text: [
            { creator: 'user', content: 'Move left' },
            { creator: 'comp', content: "You have entered a room with tall windows. In the corner there is a Taffany lamp." },
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
            '1.-1': { description: "This is first secret room.", isOpen: 1 },
            '1.-2': { description: "This is the second secret room.", isOpen: 1 },
        },
    }, action) => {
        // console.log(JSON.stringify(state));
        if (action.type === "SET_SAVEOBJ") {
            return action.payload
        }
        return state
    }

    export default saveObject