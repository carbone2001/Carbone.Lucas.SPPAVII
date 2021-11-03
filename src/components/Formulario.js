import React, { useEffect, useState } from 'react'
const initialForm = {
    id: null,
    titulo: "",
    genero: ""
}
const Formulario = ({setMovieEdit, createMovie, updateMovie, movieEdit }) => {
    const [form, setForm] = useState(initialForm);
    const { id, titulo, genero } = form;
    useEffect(() => {
        if(movieEdit){
            setForm(movieEdit);
        }
    }, [movieEdit])

    const handleChange = (e) => {
        setForm((form) => {
            return { ...form, [e.target.name]: e.target.value };
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Enviando");
        if (!titulo || !genero) {
            alert("Faltan datos");
            return;
        }
        if (id) {
            updateMovie(form);
            
        }else{
            createMovie(form);
        }
        setForm(initialForm);
    }
    const handleReset = () => {
        setForm(initialForm);
        setMovieEdit(null);
    }
    return (
        <>
            <h2>{id?"Update Movie":"Create Movie"}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="titulo"
                    placeholder="Titulo"
                    autoComplete="off"
                    onChange={handleChange}
                    value={titulo} />
                <input
                    type="text"
                    name="genero"
                    placeholder="Genero"
                    autoComplete="off"
                    value={genero}
                    onChange={handleChange} />
                <input type="submit" value="Enviar" />
                <input type="reset" onClick={handleReset} value="Limpiar" />
            </form>
        </>
    )
}

export default Formulario
