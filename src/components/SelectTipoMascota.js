import React from 'react'

const SelectTipoMascota = ({ tipoMascotas, onChange, value }) => {

    const handlerChange = (e) => {
        onChange(e);
    }

    return (
        <select className="select" name="tipo" value={value} onChange={handlerChange}>
            {tipoMascotas.map((tipoMascota) => <option key={tipoMascota.id}>{tipoMascota.descripcion}</option>)}
        </select>
    )
}

SelectTipoMascota.defaultProps = {
    tipoMascotas: []
}

export default SelectTipoMascota
