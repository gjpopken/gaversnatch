import axios from 'axios';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';

export const Header = ({ options }) => {
    const [visible, setVisible] = useState(false)
    const [nameInput, setNameInput] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()
    const menuLeft = useRef(null);
    const toast = useRef(null);
    const items = [
        {
            label: 'Menu',
            items: [...options,
            { label: 'Create Story', command: () => { setVisible(true) } },
            {
                label: 'Logout',
                command: () => dispatch({ type: "LOGOUT" })
            }
            ]
        }
    ];

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

    const handleCommand = () => {
        console.log('hi there again');
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
                <Button label="Start Game!" onClick={() => handleSubmit()} outlined />
                <Button label="Cancel" onClick={() => { setVisible(false); setNameInput('') }} autoFocus />
            </div>
        );
    }

    const menuBtn = (<>  <Toast ref={toast}></Toast>
        <Menu model={items} popup ref={menuLeft} id="popup_menu_left" />
        <Button label="Menu" className="mr-2" onClick={(event) => menuLeft.current.toggle(event)} aria-controls="popup_menu_left" aria-haspopup /></>)

    const gaversnatch = (<h1>GAVERSNATCH</h1> )

    return (
        <div className="card flex justify-content-between" style={{width: '100%'}}>
            <div className="card">
                <Menubar start={gaversnatch} end={menuBtn} style={{padding: '0 25px'}}/>
            </div>
            {/* <Button label="Create New Game" onClick={() => setVisible(true)} /> */}
            <Dialog header="Start a New Game" footer={footerContent} visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                <p className="m-0">
                    <label htmlFor="nameInput">Enter New Story Name: </label>
                    <InputText
                        type="text"
                        id="nameInput"
                        placeholder="Enter New Story Name"
                        onChange={(e) => setNameInput(e.target.value)}
                        value={nameInput}
                    />
                </p>
            </Dialog>
        </div>
    )
}