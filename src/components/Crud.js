import React, { useEffect, useState } from 'react'
import Formulario from './Formulario'
import Tabla from './Tabla'
import { Loader } from './Loader';
import { useHistory } from 'react-router';
const URL = "http://localhost:5500/mascotas";
const URL_TIPO_MASCOTAS = "http://localhost:5500/tipos";
const Crud = () => {
    const [mascotas, setMascotas] = useState([]);
    const [tipoMascotas, setTipoMascotas] = useState([]);
    const [mascotaEdit, setMascotaEdit] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();
    useEffect(() => {
        const getMascotas = async (url) => {
            try {
                setIsLoading(true);
                const res = await fetch(url);
                const data = await res.json();
                data.forEach(mascota => {
                    setMascotas((mascotas) => {
                        return [...mascotas, mascota]
                    })
                });
            } catch (error) { }
            finally {
                setIsLoading(false);
            }
        }

        const getTipoMascotas = async (url) => {
            try {
                setIsLoading(true);
                const res = await fetch(url);
                const data = await res.json();
                data.forEach(tipoMascota => {
                    setTipoMascotas((tipoMascotas) => {
                        return [...tipoMascotas, tipoMascota]
                    })
                });
            } catch (error) { }
            finally {
                setIsLoading(false);
            }
        }

        getMascotas(URL);
        getTipoMascotas(URL_TIPO_MASCOTAS);
    }, [])


    const createMascota = (newMovie) => {
        setIsLoading(true);
        fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newMovie)
        })
            .then((res) => res.json())
            .then((nuevamascotacula) => {
                setMascotas((mascotas) => [...mascotas, nuevamascotacula]);
                alert("Alta exitosa");
            })
            .finally(()=>{
                setIsLoading(false);
            })
    }
    const updateMascota = (movieUpdated) => {
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
                setMascotas((mascotas) => {
                    return mascotas.map((movie) => movie.id === movieModificada.id ? movieModificada : movie);
                })
                alert("Modificacion exitosa")
            })
            .finally(()=>{
                setIsLoading(false);
            })
    }

    const deleteMascota = (id) => {
        if (window.confirm("Confirma eliminacion de " + id)) {
            setIsLoading(true);
            //path /:id
            fetch(URL + "/" + id, {
                method: "DELETE"
            })
            .then(res => {
                if (res.ok) {
                    setMascotas((mascotas) => {
                        return mascotas.filter((movie) => movie.id !== id);
                    })
                    alert("Borrado exitoso!!");
                }
            })
            .finally(()=>{
                setIsLoading(false);
            })
        }
    }

    const getMascotaDetalles = (id) => {
        history.push("/detalles/"+id);
    }

    return (
        <section>
            <Formulario
                updateMascota={updateMascota}
                createMascota={createMascota}
                mascotaEdit={mascotaEdit}
                setMascotaEdit={setMascotaEdit}
                tipoMascotas={tipoMascotas}
            />
            {isLoading ?
                <Loader /> :
                <Tabla
                    data={mascotas}
                    setMascotaEdit={setMascotaEdit}
                    deleteMascota={deleteMascota}
                    getMascotaDetalles={getMascotaDetalles}
                />}
        </section>
    )
}

export default Crud
