import React, { useEffect, useState } from 'react'
import Formulario from './Formulario'
import Tabla from './Tabla'
import { Loader } from './Loader';
const URL = "http://localhost:5000/movies";
const Crud = () => {
    const [movies, setMovies] = useState([])
    const [movieEdit, setMovieEdit] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const getMovies = async (url) => {
            try {
                setIsLoading(true);
                const res = await fetch(url);
                const data = await res.json();
                data.forEach(peli => {
                    setMovies((movies) => {
                        return [...movies, peli]
                    })
                });
            } catch (error) { }
            finally {
                setIsLoading(false);
            }
        }
        getMovies(URL);
    }, [])


    const createMovie = (newMovie) => {
        setIsLoading(true);
        fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newMovie)
        })
            .then((res) => res.json())
            .then((nuevaPelicula) => {
                setMovies((movies) => [...movies, nuevaPelicula]);
                alert("Alta exitosa");
            })
            .finally(()=>{
                setIsLoading(false);
            })
    }
    const updateMovie = (movieUpdated) => {
        setIsLoading(true);
        //path /:id
        fetch(URL + "/" + movieUpdated.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(movieUpdated)
        })
            .then(res => res.json())
            .then(movieModificada => {
                setMovies((movies) => {
                    return movies.map((movie) => movie.id === movieModificada.id ? movieModificada : movie);
                })
                alert("Modificacion exitosa")
            })
            .finally(()=>{
                setIsLoading(false);
            })
    }

    const deleteMovie = (id) => {
        if (window.confirm("Confirma eliminacion de " + id)) {
            setIsLoading(true);
            //path /:id
            fetch(URL + "/" + id, {
                method: "DELETE"
            })
            .then(res => {
                if (res.ok) {
                    setMovies((movies) => {
                        return movies.filter((movie) => movie.id !== id);
                    })
                    alert("Borrado exitoso!!");
                }
            })
            .finally(()=>{
                setIsLoading(false);
            })
        }
    }

    return (
        <section>
            <Formulario
                updateMovie={updateMovie}
                createMovie={createMovie}
                movieEdit={movieEdit}
                setMovieEdit={setMovieEdit}
            />
            {isLoading ?
                <Loader /> :
                <Tabla
                    data={movies}
                    setMovieEdit={setMovieEdit}
                    deleteMovie={deleteMovie}
                />}
        </section>
    )
}

export default Crud
