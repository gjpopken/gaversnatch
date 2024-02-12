import axios from "axios";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useState } from "react"


// ! TITLE is a MISNOMER this component is the DELETE BUTTON <TD> appended to each story
// ! item, with attached modal, NOT just the modal. 
export const DeleteModal = ({ id, getStories }) => {
    const [delVisible, setDelVisible] = useState(false)
    const handleDelete = (id) => {
        console.log(id);
        axios.delete(`/api/stories/${id}`)
            .then(response => {
                setDelVisible(false)
                getStories()
            }).catch(err => {
                console.log(err);
            })
    }

    const delFooter = (<div>
        <Button label="Delete" className="p-button-text" onClick={() => { handleDelete(id) }} />
        <Button label="I Changed My Mind" onClick={() => { setDelVisible(false) }} autoFocus />
    </div>
    )

    return (
        <div>
            <button onClick={() => setDelVisible(true)}>Delete</button>
            <Dialog header="Are you sure you want to delete this story?" footer={delFooter} visible={delVisible} style={{ width: '50vw' }} onHide={() => setDelVisible(false)}>
                <p className="m-0">
                    Deleting a story cannot be undone.
                </p>
            </Dialog>
        </div>
    )
}