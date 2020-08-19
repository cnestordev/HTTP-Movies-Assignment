import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import axios from 'axios'

function UpdateForm(props) {

    const { id } = useParams()
    const history = useHistory()

    const initialState = {
        id: '',
        title: '',
        director: '',
        metascore: '',
        stars: []
    }

    const [form, setForm] = useState(initialState)

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                setForm({
                    title: res.data.title,
                    director: res.data.director,
                    metascore: res.data.metascore,
                    stars: res.data.stars,
                    id: res.data.id
                })
            })
            .catch(err => console.log(err))
    }, [])


    const handleChange = e => {
        const { name, value } = e.target
        setForm({
            ...form,
            [name]: value
        })
    }

    const handleActors = e => {
        const { name, value } = e.target
        const newArr = [...form.stars]
        newArr[name] = value
        setForm({
            ...form,
            stars: newArr
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        axios.put(`http://localhost:5000/api/movies/${id}`, form)
            .then(res => {
                setForm(initialState)
                history.push('/')
            })
            .catch(err => console.log(err))
    }


    return (
        <form onSubmit={handleSubmit} autoComplete="off">
            <input value={form.title} name="title" onChange={handleChange} type="text" />
            <input value={form.director} name="director" onChange={handleChange} type="text" />
            <input value={form.metascore} name="metascore" onChange={handleChange} type="text" />
            <input value={form.stars[0]} placeholder="star # 1" name="0" onChange={handleActors} type="text" />
            <input value={form.stars[1]} placeholder="star # 2" name="1" onChange={handleActors} type="text" />
            <input value={form.stars[2]} placeholder="star # 3" name="2" onChange={handleActors} type="text" />
            <button>Submit</button>
        </form>
    )
}

export default UpdateForm