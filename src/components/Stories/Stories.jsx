import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

export const Stories = () => {
    const dispatch = useDispatch()
    const [stories, setStories] = useState([])
    const [visible, setVisible] = useState(false)
    const [nameInput, setNameInput] = useState('')

    useEffect(() => {
        axios.get('/api/stories')
            .then(response => {
                setStories(response.data)
            }).catch(err => {
                console.log(err);
            })
    }, [])

    const handleSubmit = () => {
        setVisible(false)
    }

    const footerContent = () => {
        if (nameInput === '') {
            return (
                <div>
                    <Button disabled label="Start Game!" onClick={() => handleSubmit()} className="p-button-text" />
                    <Button label="Cancel" onClick={() => { setVisible(false); setNameInput('') }} autoFocus />
                </div>
            );
        }
        return (
            <div>
                <Button label="Start Game!" onClick={() => setVisible(false)} className="p-button-text" />
                <Button label="Cancel" onClick={() => { setVisible(false); setNameInput('') }} autoFocus />
            </div>
        );
    }


    if (stories[0]) {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <td>Story Name</td>
                            <td>Date Created</td>
                            <td>Delete?</td>
                        </tr>
                    </thead>
                    <tbody>
                        {stories.map(element => {
                            return (
                                <tr key={element.id}>
                                    <td>{element.story_name}</td>
                                    <td></td>
                                    <td><button>Delete</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <div>
                    <button>Load Game</button>
                    {/* <button>New Game</button> */}
                    <Button label="Create New Game" onClick={() => setVisible(true)} />
                    <Dialog header="Start a New Game" footer={footerContent} visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                        <p className="m-0">
                            <label htmlFor="nameInput">Enter New Story Name</label>
                            <input
                                type="text"
                                id="nameInput"
                                placeholder="Enter New Story Name"
                                onChange={(e) => setNameInput(e.target.value)}
                                value={nameInput}
                            />
                        </p>
                    </Dialog>
                </div>
            </div>
        )
    }
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <td>Story Name</td>
                        <td>Date Created</td>
                        <td>Delete?</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Click 'New Game' to Begin!</td>
                    </tr>
                </tbody>
            </table>
            <div>
                <button disabled >Load Game</button>
                <button>New Game</button>
            </div>
        </div>
    )

}