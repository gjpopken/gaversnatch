import { useState } from 'react'

import './GameView.css'
import { configMove } from '../../engine/engine.js'
import { doSave } from '../../engine/doSave.js'

export const GameView = () => {
    const [saveObject, setSaveObject] = useState({
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
    })

    const save = doSave(saveObject)
    const {moveDown, moveLeft, moveRight, moveUp} = configMove({rooms: saveObject.rooms_state, history: saveObject.current_room})

    const handleClick = (e, cbFunction) => {
        e.preventDefault()
        const move = cbFunction()
        setSaveObject(save.saveForMove(move))
    }

    return (
        <div className='container'>
            <h2>GAVERSNATCH</h2>
            <p>{JSON.stringify(saveObject.adventure_text)}</p>
            <p>{JSON.stringify(saveObject.current_room)}</p>
            <div className='row'>
                <div className="adventure-text"></div>
                <div className="inventory"></div>
            </div>
            <div className="inputs">
                    <button className='n' onClick={(e) => {handleClick(e, moveUp)}}>Go North</button>
                    <button className='e' onClick={(e) => {handleClick(e, moveRight)}}>Go East</button>
                    <button className='s'onClick={(e) => {handleClick(e, moveDown)}}>Go South</button>
                    <button className='w' onClick={(e) => {handleClick(e, moveLeft)}}>Go West</button>
                </div>
            <div className="tips">

            </div>
        </div>
    )
}