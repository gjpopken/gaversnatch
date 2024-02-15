const ai = require('./gemini')
const randomTheme = require('./randomTheme')

const initialSaveData = async (roomTemplate) => {
    console.log(randomTheme);
    const roomArray = Object.getOwnPropertyNames(roomTemplate)
    console.log(roomArray);
    let response = await ai.generateRoomDesc(randomTheme, roomArray)
    console.log(response);
    let triedResponse;
    try {
        triedResponse = JSON.parse(response)
        console.log('it worked');
    } catch (error) {
        console.log('it didn"t work');
        while (triedResponse == undefined) {
            try {
                response = await ai.generateRoomDesc(randomTheme, roomArray)
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
            current_room: ['0.0'],
            rooms_state: newRooms
        }
    } else {
        console.log('bad response.');
    }

}

module.exports = initialSaveData

// console.log(initialSaveData(roomTemplate))