import {Link} from 'react-router-dom';

export default function Landing() {
    return(
        <div>
            <h1>Bienvenidos a la Super Pagina de Dogs creada por Tomas</h1>
            <Link to='/home'>
                <button>Ingresar</button>
            </Link>
        </div>
    )
}