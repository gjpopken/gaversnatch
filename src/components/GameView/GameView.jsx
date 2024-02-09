import { useState, useEffect, useRef } from 'react'
import { Header } from '../Header/Header.jsx'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom/cjs/react-router-dom.min.js'

import { Panel } from 'primereact/panel';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button'

import './GameView.css'
import { configMove } from '../../engine/engine.js'
import { doSave } from '../../engine/doSave.js'

export const GameView = () => {
    const saveObject = useSelector(store => store.saveObject)
    const { storyId } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const [command, setCommand] = useState(null)

    useEffect(() => {
        // console.log(storyId);
        dispatch({ type: "GET_SAVEOBJ", payload: storyId })
    }, [dispatch])


    const save = doSave(saveObject)
    const { moveDown, moveLeft, moveRight, moveUp } = configMove({ rooms: saveObject.rooms_state, history: saveObject.current_room })

    const handleClick = (option) => {
        if (option) {
            let move;

            switch (option.dir) {
                case 'n': move = moveUp()
                    break
                case 's': move = moveDown()
                    break
                case 'e': move = moveRight()
                    break
                case 'w': move = moveLeft()
                    break
            }
            dispatch({ type: "UPDATE_SAVE", payload: { move: save.saveForMove(move), storyId: storyId } })
            setCommand(null)
        }
    }

    const options = [
        { name: 'Go North', dir: 'n' }, { name: 'Go South', dir: 's' }, { name: "Go East", dir: 'e' }, { name: "Go West", dir: 'e' }
    ]

    return (

        <div className='container'>
            <Header options={[{ label: 'All Stories', command: () => history.push('/stories') }]} />
            <div className='row'>
                <Panel header='Story Title' style={{ margin: '10px' }}>
                    <div className="adventure-text">
                        {saveObject.adventure_text.map((element, i, a) => {
                            if (element.creator === 'comp') {
                                return <p key={i}>{element.content}</p>
                            }
                            return <p key={i} className='user'>{element.content}</p>
                        })}
                    </div>
                </Panel>

                <Panel header='Inventory' style={{ margin: '10px' }}><div className="inventory"></div></Panel>
            </div>
            <div className="inputs">
                <Dropdown
                    value={command}
                    placeholder='What will you do?'
                    options={options}
                    optionLabel='name'
                    className="w-full md:w-14rem"
                    onChange={e => setCommand(e.target.value)}
                    style={{ marginRight: "20px" }} />
                <Button label='GO' onClick={() => handleClick(command)} />
            </div>
        </div>
    )
}