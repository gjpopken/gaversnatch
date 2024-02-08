import axios from "axios"
import { useEffect, useState } from "react"
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { DeleteModal } from "../DeleteModal/DeleteModal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export const Stories = () => {
    const history = useHistory()
    const [stories, setStories] = useState([])
    const [visible, setVisible] = useState(false)
    const [nameInput, setNameInput] = useState('')

    const handleSubmit = () => {
        console.log('in handle submit');
        setVisible(false)
        axios.post('/api/stories', { story_name: nameInput })
            .then(response => {
                console.log('POSTed!', response.data.id);
                // getStories()
                setNameInput('')
                postNewStory(response.data.id)
                history.push(`/play/${response.data.id}`)
            }).catch(err => {
                console.log(err);
            })
    }

    const postNewStory = (storyId) => {
        console.log('in post new story');
    }



    const getStories = () => {
        axios.get('/api/stories')
            .then(response => {
                setStories(response.data)
            }).catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        getStories()
    }, [])

    const footerContent = () => {
        if (nameInput === '') {
            return (
                <div>
                    <Button disabled label="Start Game!" className="p-button-text" />
                    <Button label="Cancel" onClick={() => { setVisible(false); setNameInput('') }} autoFocus />
                </div>
            );
        }
        return (
            <div>
                <Button label="Start Game!" onClick={() => handleSubmit()} className="p-button-text" />
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
                                         {/* //! The title of this component is a misnomer, this the delete button WITH attached modal nested in a <td></td> */}
                                        <DeleteModal id={element.id} getStories={getStories}/> 
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