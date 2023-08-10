import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogByName } from "../../actions";

export default function SearchBar ({paginar}) {
    const dispatch = useDispatch();
    const [name, setName] = useState('')

    const handleInputChange = (e) => {
        e.preventDefault();
        setName(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(getDogByName(name))
        setTimeout(() => {
            paginar(1)
        }, 500)
    }

    return(
        <div>
            <input
                type='text'
                placeholder='Busca una raza'
                onChange={(e) => handleInputChange(e)}
            />
            <button onClick={(e) => {handleSubmit(e)}} type='submit'>🔍</button>
        </div>
    )
}