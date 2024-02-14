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
        axios.get('/api/initial').then(response => {
             axios.post(`/api/advtext/${storyId}`, response.data
        ).then(response => {
            history.push(`/play/${storyId}`)
        }).catch(err => {
            console.log(err);
        })
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