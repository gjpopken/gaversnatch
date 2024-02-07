import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

export const Stories = () => {
    const dispatch = useDispatch()
    const [stories, setStories] = useState([])

    useEffect(() => {
        axios.get('/api/stories')
            .then(response => {
                setStories(response.data)
            }).catch(err => {
                console.log(err);
            })
    }, [])
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
                <button>New Game</button>
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