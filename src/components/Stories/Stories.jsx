import axios from "axios"
import { useEffect, useState } from "react"
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { RadioButton } from "primereact/radiobutton";
import { DeleteModal } from "../DeleteModal/DeleteModal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export const Stories = () => {
    const history = useHistory()
    const [stories, setStories] = useState([])
    const [visible, setVisible] = useState(false)
    const [nameInput, setNameInput] = useState('')
    const [loadStoryId, setLoadStoryId] = useState('')

    const handleSubmit = () => {
        console.log('in handle submit');
        setVisible(false)
        axios.post('/api/stories', { story_name: nameInput })
            .then(response => {
                console.log('POSTed!', response.data.id);
                // getStories()
                setNameInput('')
                postNewStory(response.data.id)
            }).catch(err => {
                console.log(err);
            })
    }

    const postNewStory = (storyId) => {
        console.log('in post new story');
        axios.post(`/api/advtext/${storyId}`, {
            adventure_text: [
                { creator: 'comp', content: "Welcome to Gaversnatch." },
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
        }).then(response => {
            history.push(`/play/${storyId}`)
        }).catch(err => {
            console.log(err);
        })
    }



    const getStories = () => {
        axios.get('/api/stories')
            .then(response => {
                setStories(response.data)
                if (response.data[0]) {
                    setLoadStoryId(response.data[0].id)
                }

            }).catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        getStories()
    }, [])

    const handleLoadStory = () => {
        history.push(`/play/${loadStoryId}`)
    }

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

    // console.log(stories[0]);
    if (stories[0]) {
        return (
            <div>
                <p>{loadStoryId}</p>
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
                                    {/* <td>{element.story_name}</td> */}
                                    <td>
                                        <div className="flex align-items-center">
                                            <RadioButton inputId={`story_name${element.id}`} value={element.id} name={element.id} onChange={(e) => { console.log('new id', e.target.value); setLoadStoryId(e.target.value) }} checked={loadStoryId === element.id} />
                                            <label htmlFor={`story_name${element.id}`} className="ml-2">{element.story_name}</label>
                                        </div>

                                    </td>
                                    <td></td>
                                    {/* //! The title of this component is a misnomer, this the delete button WITH attached modal nested in a <td></td> */}
                                    <DeleteModal id={element.id} getStories={getStories} />
                                </tr>
                            )
                        })}
                    </tbody>

                </table>
                <div>
                    <Button label="Load Story" onClick={handleLoadStory} />
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