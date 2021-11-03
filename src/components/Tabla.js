import React from 'react'
import Row from './Row'

const Tabla = ({ data, setMovieEdit, deleteMovie }) => {
    return (
        <>
            <h2>Movies List</h2>
            
                
                    <table>
                        <thead>
                            <tr>
                                <th>Titulo</th>
                                <th>Genero</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!data.lenght ? (data.map((movie) => <Row deleteMovie={deleteMovie} setMovieEdit={(e) => { setMovieEdit(e) }} key={movie.id} movie={movie} />)):<tr><td colSpan="3">No hay datos</td></tr>}
                        </tbody>
                    </table>
        

        </>
    )
}

export default Tabla
