import axios from "axios"
import { Header } from "../Header/Header";
import { useEffect, useState } from "react"
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from "primereact/inputtext";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from "primereact/card";
import { ProgressSpinner } from "primereact/progressspinner";
import { DeleteModal } from "../DeleteModal/DeleteModal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


export const Stories = () => {
    const history = useHistory()
    const [stories, setStories] = useState([])
    const [visible, setVisible] = useState(false)
    const [nameInput, setNameInput] = useState('')
    const [loadStoryId, setLoadStoryId] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = () => {
        console.log('in handle submit');
        axios.post('/api/stories', { story_name: nameInput })
            .then(response => {
                console.log('POSTed!', response.data.id);
                // getStories()
                setIsLoading(true)
                postNewStory(response.data.id, nameInput)
            }).catch(err => {
                console.log(err);
            })
    }

    const postNewStory = (storyId, name) => {
        console.log('in post new story');
        axios.get('/api/initial')
            .then(response => {
                axios.post(`/api/advtext/${storyId}`, {...response.data, story_name: name})
                .then(response => {
                    setVisible(false)
                    setNameInput('')
                    setIsLoading(false)
                    history.push(`/play/${storyId}`)
                }).catch(err => {
                    console.log(err);
                })
            }).catch(error => {
                console.log(error);
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
                    {isLoading ? <Button disabled ><ProgressSpinner style={{width: '25px', height: '25px'}} /></Button> : <Button disabled label="Start Game!" className="p-button-text" />}
                    {isLoading ? <Button label="Cancel" disabled /> : <Button label="Cancel" onClick={() => { setVisible(false); setNameInput('') }} autoFocus />}
                </div>
            );
        }
        return (
            <div>
                {isLoading ? <Button disabled ><ProgressSpinner style={{width: '25px', height: '25px'}} /></Button> : <Button label="Start Game!" onClick={() => handleSubmit()} outlined />}
                {isLoading ? <Button label="Cancel" disabled /> : <Button label="Cancel" onClick={() => { setVisible(false); setNameInput('') }} autoFocus />}
            </div>
        );
    }

    const deleteButtonTemplate = (element) => {
        return <DeleteModal id={element.id} getStories={getStories} />
    }

    const storyNameTemplate = (element) => {
        return (<div>
            <input type="radio" id={`story_name${element.id}`} value={element.id} onChange={(e) => { console.log('new id', e.target.value); setLoadStoryId(e.target.value) }} checked={loadStoryId == element.id}></input>
            <label htmlFor={`story_name${element.id}`} className="ml-2">{element.story_name}</label>
        </div>
        )
    }

    // console.log(stories[0]);
    if (stories[0]) {
        return (
            <div>
                <Header options={[]} />

                <Card className="card" style={{ margin: '25px' }}>
                    <DataTable value={stories} tableStyle={{ minWidth: '50rem' }}>
                        <Column body={storyNameTemplate} header="Story Name"></Column>
                        <Column body={deleteButtonTemplate} header="Delete?"></Column>
                        {/* <Column field="category" header="Category"></Column>
                            <Column field="quantity" header="Quantity"></Column> */}
                    </DataTable>
                </Card>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '25px' }}>
                    <Button label="Load Story" onClick={handleLoadStory} />
                    {/* <button>New Game</button> */}
                    <Button label="Create New Game" onClick={() => setVisible(true)} />
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
            </div>
        )
    }
    return (
        <div>
            <Header options={[]} />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <p>Click 'New Game' to Begin!</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '25px' }}>

                <Button disabled >Load Game</Button>
                <Button label="Create New Game" onClick={() => setVisible(true)} />
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
        </div>
    )

}