import { useEffect } from "react"
import { getDetail } from "../../actions"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"

export default function Detail() {

    const {id} = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getDetail(id))
    }, [dispatch, id]) 
    let dog = useSelector((state) => state.detail)  
    if (dog.name && (dog.image || dog.img) && dog.weight && (dog.temperament || dog.temperaments) ) {
    return (
        <div>
            { dog ? 
            <div>
                <h2>{dog.name}</h2>
                <img src={dog.image ? dog.image : dog.img} alt='image not found' width='200px' height='200px' />
                <h5>{dog.weight}</h5>
                <div>    
                <h3>Temperament</h3>
                {   
                    dog.temperament?
                    dog.temperament.map((t, i) => <p key={i}>{t}</p>) :
                    dog.temperaments ? 
                    dog.temperaments.map((t,i) => <p key={i}>{t.name}</p>) :
                    'temperamentos no han sido cargados'
                }
            </div>
            </div> : 
            'Cargando...'
            }
            <Link to='/home' >Volver</Link>
        </div>

    )
        } else {
            return (
                <div>
                    <p>Cargando...</p>
                </div>
            )
        }
}