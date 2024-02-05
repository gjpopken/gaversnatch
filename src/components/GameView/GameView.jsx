import './GameView.css'
import { configMove } from '../../engine/engine'

export const GameView = () => {
    const rooms = {
        '0.0': { description: "This is red room.", isOpen: 1 },
        '0.1': { description: "This is green room.", isOpen: 0 },
        '0.2': { description: "This is blue room.", isOpen: 1 },
        '1.0': { description: "This is horse room.", isOpen: 1 },
        '1.1': { description: "This is cow room.", isOpen: 1 },
        '1.2': { description: "This is cat room.", isOpen: 1 },
        '2.0': { description: "This is French room.", isOpen: 1 },
        '2.1': { description: "This is German room.", isOpen: 1 },
        '2.2': { description: "This is Swedish room.", isOpen: 1 },
    }

    const {moveDown, moveLeft, moveRight, moveUp} = configMove({rooms: rooms, history: ['0.0']})


    return (
        <div className='container'>
            <h2>GAVERSNATCH</h2>
            <div className='row'>
                <div className="adventure-text"></div>
                <div className="inventory"></div>
            </div>
            <div className="tips">
                <div className="inputs">
                    <button className='n'>Go North</button>
                    <button className='e'>Go East</button>
                    <button className='s'>Go South</button>
                    <button className='w'>Go West</button>
                </div>
            </div>
        </div>
    )
}