import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
// import { createBrowserHistory } from 'react-dom'
import { postDog, getTemperaments} from '../../actions/index';
import { useDispatch, useSelector } from "react-redux";

function validate(input) {
    let errors = {}
    if (!input.name) {
        errors.name = 'Se requiere un nombre'
    } else if (!input.life_span) {
        errors.life_span = 'Se requiere una vida estimada'
    }
    return errors
}

export default function Create() {
    const dispatch = useDispatch()
	const allTemperaments = useSelector((state) => state.temperaments)
    // const history = createBrowserHistory()
    const [errors, setErrors] = useState({})

    const [input, setInput] = useState({
        name: '',
        height: '',
        weight: '',
        life_span: '',
        temperament: [],
        image:'',
    })

	useEffect(() => {
		dispatch(getTemperaments())
	}, [dispatch])

    function handleInputChange(e) {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
        console.log(input)
    }

    function handleSelect(e) {
        setInput({
            ...input,
            temperament:[...input.temperament, e.target.value]
        })
        console.log(input)
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(postDog(input))
        alert('Raza creada con exito')
        setInput({
            name: '',
            height: '',
            weight: '',
            life_span: '',
            temperament: [],
            image:'',
        })
        // history.push('/home')
    }

    function unSubmit(e){
        e.preventDefault()
        alert('Formulario incompleto')
    }

    function deleteTemperament(t) {
        setInput({
            ...input,
            temperament: input.temperament.filter( temp => temp !== t)
        })
    }

    return (
        <div>
            <Link to='/home'><button>Back to Home</button></Link>
            <h1>Crea tu Dog</h1>
            <form onSubmit={(e) => errors.hasOwnProperty('name') || errors.hasOwnProperty('life_span')  ? unSubmit(e) :handleSubmit(e)}  >
                <div>
                    <label>Nombre:</label>
                    <input
                        type='text'
                        value={input.name}
                        name='name'
                        onChange={(e) => handleInputChange(e)}
                    />
                    {
                        errors.name && (
                            <p>{errors.name}</p>
                        )
                    }
                </div>
                <div>
                    <label>Height:</label>
                    <input
                        type='text'
                        value={input.height}
                        name='height'
                        onChange={(e) => handleInputChange(e)}
                    />
                </div>
                <div>
                    <label>Weight:</label>
                    <input
                        type='text'
                        value={input.weight}
                        name='weight'
                        onChange={(e) => handleInputChange(e)}
                    />
                </div>
                <div>
                    <label>Life Span:</label>
                    <input
                        type='text'
                        value={input.life_span}
                        name='life_span'
                        onChange={(e) => handleInputChange(e)}
                    />
                    {
                        errors.life_span ? (
                            <p>{errors.life_span}</p>
                        ) : (
                            <p></p>
                        )
                    }
                </div>
                <div>
                    <label>Image:</label>
                    <input
                        type='text'
                        value={input.image}
                        name='image'
                        onChange={(e) => handleInputChange(e)}
                    />
                </div>
                <div>
                <select onChange={(e) => handleSelect(e)}>
                    {
                        allTemperaments && allTemperaments.map((t,i) => {
                            return(
                                <option key={i} >{t.name}</option>
                            )
                        })
                    }
                </select>
                <ul>
                    {
                        input.temperament && input.temperament.map((t,i) => <li key={i}><div>{t} <button onClick={() => deleteTemperament(t)} >X</button></div></li> )
                    }
                </ul>
                <div>
                    <p>
                        {input.temperament.length > 1 ? input.temperament.map(t => input.temperament.indexOf(t) === input.temperament.length - 1 ? t + '.' : t + ', ') : input.temperament.map(t => t )}
                    </p>
                </div>
                </div>
                <button type='submit'>Crear</button>
            </form>

        </div>
    )

    
}