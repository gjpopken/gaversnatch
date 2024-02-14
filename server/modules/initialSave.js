const ai = require('./gemini')

const roomTemplate = {
    '0.0': { isOpen: 1 },
    '0.1': { isOpen: 1 },
    '0.2': { isOpen: 1 },
    '-1.2': { isOpen: 1 },
    '1.2': { isOpen: 1 },
    '3.0': { isOpen: 1 },
}

const initialSaveData = async (roomTemplate) => {
    const roomArray = Object.getOwnPropertyNames(roomTemplate)
    console.log(roomArray);
    let response = await ai.generateRoomDesc('Space ship', roomArray)
    console.log(response);
    let triedResponse;
    try {
        triedResponse = JSON.parse(response)
        console.log('it worked');
    } catch (error) {
        console.log('it didn"t work');
        while (triedResponse == undefined) {
            try {
                response = await ai.generateRoomDesc('Space ship', roomArray)
                triedResponse = JSON.parse(response)
            } catch (error) {
                console.log('it didnt work');
            }
        }
    }
    if (JSON.parse(response)) {
        let newRooms = roomTemplate
        for (let room of roomArray) {
            newRooms[room] = {...newRooms[room], ...triedResponse[room]}
        }
        console.log(newRooms);
        return {
            adventure_text: [
                { creator: 'comp', content: newRooms['0.0'].description }
            ],
            current_room: ['0,0'],
            rooms_state: newRooms
        }
    } else {
        console.log('bad response.');
    }

}

console.log(initialSaveData(roomTemplate))