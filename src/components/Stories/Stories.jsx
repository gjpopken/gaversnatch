import axios from "axios"
import { useEffect, useState} from "react"
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

    return (
        <p>{JSON.stringify(stories)}</p>
    )
}