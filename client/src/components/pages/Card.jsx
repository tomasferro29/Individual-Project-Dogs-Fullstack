/* eslint-disable react/prop-types */

export default function Card({name, img, temperament, temperaments, weight}) {

    let dogName = name
    let imgUrl = img
    let pesoMin = weight[0]
    let pesoMax = weight[1] 

    return (
        <div>
            <h3>{dogName}</h3>
            <img src={imgUrl} alt='image not found' width='200px' height='200px'/> 
            <p>Peso Minimo: { isNaN(pesoMin) ? pesoMax : pesoMin}</p>
            <p>Peso Maximo: { isNaN(pesoMax) ? pesoMin : pesoMax}</p>             
            
            <div>    
                <h3>Temperament</h3>
                {   
                    temperament?
                    temperament.map((t, i) => <p key={i}>{t}</p>) :
                    temperaments ? 
                    temperaments.map((t,i) => <p key={i}>{t.name}</p>) :
                    'temperamentos no han sido cargados'
                }
            </div>
        </div>
    )
}