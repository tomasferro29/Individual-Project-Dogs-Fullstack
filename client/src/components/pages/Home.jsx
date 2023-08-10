import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getDogs,getTemperaments,filterByTemperament, filterByCreated, sortByName, sortByWeight } from "../../actions";
import {Link} from 'react-router-dom';
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from './SearchBar';

export default function Home() {
    const dispatch = useDispatch()
	const allDogs = useSelector((state) => state.dogs)
	const allTemperaments = useSelector((state) => state.temperaments)
	const [currentPage, setCurrentPage] = useState(1)
	const [dogsPerPage, setDogsPerPage] = useState(8)
	const indexOfLastDog = currentPage * dogsPerPage
	const indexOfFirstDog = indexOfLastDog - dogsPerPage
	const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog)
	const [orden, setOrden] = useState('')

	const paginado = (pageNumber) => {
		setCurrentPage(pageNumber)
	}

	const pagesQuantity = Math.ceil(allDogs.length / dogsPerPage)

	const nextPage = () => {
		currentPage === pagesQuantity ?
		setCurrentPage(currentPage) :
		setCurrentPage(currentPage+1) 
		
	}	
	const prevPage = () => {
		currentPage > 1 ?
		setCurrentPage(currentPage-1) :
		setCurrentPage(currentPage)
	}

	useEffect(() => {
		dispatch(getDogs())
	}, [dispatch])

	useEffect(() => {
		dispatch(getTemperaments())
	}, [dispatch])

	function refresh(e) {
		e.preventDefault()
		dispatch(getDogs())
	}

	function dogsQuantity(){
		setDogsPerPage(dogsPerPage === 8 ? 16 : 8)
	}

	function filterTemperament(e) {
		e.preventDefault()
		setCurrentPage(1)
		dispatch(filterByTemperament(e.target.value))
	}

	function filterCreated(e) {
		e.preventDefault()
		setCurrentPage(1)
		dispatch(filterByCreated(e.target.value))
	}

	function sortName(e) {
		e.preventDefault()
		dispatch(sortByName(e.target.value))
		setOrden(`Ordenado ${e.target.value}`)
	}

	function sortWeight(e) {
		e.preventDefault()
		dispatch(sortByWeight(e.target.value))
		setOrden(`Ordenado ${e.target.value}`)
	}

	return(
		<div>


			<Link to='/create'>Ir a Crear</Link>
			<h1>Muchos Dogs</h1>
			<button onClick={(e) => refresh(e)}>
				Refresh
			</button>
			<button onClick={(e) => dogsQuantity(e)}>
				8/16 dogs
			</button>
			<div>
				<select onChange={(e) => sortName(e)}>
					<option value='asc-name'>Ascendente Name</option>
					<option value='desc-name'>Descendente Name</option>
				</select>
				<select onChange={(e) => sortWeight(e)}>
					<option value='asc-weight'>Ascendente Weight</option>
					<option value='desc-weight'>Descendente Weight</option>
				</select>
				<select onChange={e => filterTemperament(e)}>
					<option value='all'>All</option>
					{
						allTemperaments?.map(t => {
							return (
								<option key={t.id} value={t.name}>{t.name}</option>
							)
						})
					}
				</select> 
				<select onChange={e => filterCreated(e)}>
					<option value='all'>All</option>
					<option value='api'>Api</option>
					<option value='created'>Created</option>
				</select>
				<div>
				<SearchBar paginar={(e) => paginado(e)} />
				<button onClick={(e) => prevPage(e) } >{'<'}</button>
				<Paginado
					dogsPerPage={dogsPerPage}
					allDogs={allDogs.length}
					paginado={paginado}
				/>
				<button onClick={(e) => nextPage(e) } >{'>'}</button>
				</div>
				{currentPage}
			</div>
			{
				currentDogs?.map((d) => {
					return (
						<div key={d.id}>
							<Link to={'/home/'+d.id}>
								<Card 
								name={d.name} 
								img={d.img ? d.img : d.image} 
								temperament={d.temperament}
								temperaments={d.temperaments}
								weight={d.weight}
								/>
							</Link>
						</div>
					)
				})
			}
		</div>
	)
}
