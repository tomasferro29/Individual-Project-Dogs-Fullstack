import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getDogs,getTemperaments,filterByTemperament, filterByCreated, sortByName, sortByWeight } from "../../actions";
import {Link} from 'react-router-dom';
import Card from "./Card";
import Paginado from "./Paginado";
import Header from './Header';
import Center from '../styles/Center.jsx'
import { styled } from 'styled-components';
import ArrowsIcon from '../icons/ArrowsIcon';
import CreateIcon from '../icons/CreateIcon';
import LeftIcon from '../icons/LeftIcon';
import RightIcon from '../icons/RightIcon';

const Background = styled.div`
	background-color: #222;
	color: #fff;
	padding: 50px 0;
	display: flex;
	justify-content: center;
	/* height: 350svb; */
    min-height: 100vh;

	
`;

const CardsWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	gap: 20px;
	
	@media screen and (max-width: 768px) {
		grid-template-columns: 1fr;
		
	}
`;

const ActionhWrapper = styled.button`
	height: 30px;
	width: 30px;
	border-radius: 10px;
	margin-right: 10px;
	cursor: pointer;
	background-color: #669bbc;
`;

const IconWrapper = styled.div`
	display: flex;
	align-items: center;
	max-width: 180px;
	margin-bottom: 10px;
	a{
		cursor: pointer;
	}
`;

const ActionsGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	margin-top: 27px;
	align-items: center;
`;

const SelectGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 15px 20px;
	margin: 0 50px 20px 0 ;
	label{
		margin: 10px;
	}
`;

const Select = styled.select`
	width: 200px;
	height: 35px;
	border: 2px solid #669bbc;
	border-radius: 10px;
	padding: 5px;
	background-color: transparent;
	text-decoration: none;
	color: #fff;
`;

const Option = styled.option`
	color: #222;
`;

const StyledPaginator = styled.div`
	display: flex;
	gap: 20px;
	justify-content: center;
	margin-top: 20px; 
`;

const Wrapper = styled.div`
	display: flex; 
	align-items: center;
	justify-content: center;
	margin: 17px;
`;

const StyledActionLink = styled(Link)`
	text-decoration: none;
	color: #fff;
`;

export default function Home() {
	const dispatch = useDispatch()
	const allDogs = useSelector((state) => state.dogs)
	const allTemperaments = useSelector((state) => state.temperaments)
	const [currentPage, setCurrentPage] = useState(1)
	const [dogsPerPage, setDogsPerPage] = useState(12)
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
		setCurrentPage(1)
	}

	function dogsQuantity(){
		setDogsPerPage(dogsPerPage === 12 ? 24 : 12)
		setCurrentPage(1)
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
		<Background>
			<Center>
				<Header paginado={paginado} refresh={refresh}/>
				<div>
					<ActionsGrid>
						<div>
							<IconWrapper>
								<ActionhWrapper onClick={(e) => refresh(e)}><ArrowsIcon /></ActionhWrapper>
								<a onClick={(e) => refresh(e)}>Reload all Dogs</a>
							</IconWrapper>
							<IconWrapper>
								<ActionhWrapper><Link to='/create'><CreateIcon/></Link></ActionhWrapper>	
								<StyledActionLink to={'/create'}>Create a Dog</StyledActionLink>					
							</IconWrapper>
							<IconWrapper>
								<ActionhWrapper onClick={(e) => dogsQuantity(e)}>{dogsPerPage}</ActionhWrapper>
								{
									dogsPerPage === 12 ? 
									<a onClick={(e) => dogsQuantity(e)}>Show 24 Dogs</a> : 
									<a onClick={(e) => dogsQuantity(e)}>Show 12 Dogs</a>
								}
							</IconWrapper>
						</div>
						<SelectGrid>
							<div>
								<label>Sort by Name</label>
								<Select onChange={(e) => sortName(e)}>
									<Option value='asc-name'>A - Z</Option>
									<Option value='desc-name'>Z - A</Option>
								</Select>
							</div>
							<div>
								<label>Sort by Weight</label>
								<Select onChange={(e) => sortWeight(e)}>
									<Option value='asc-weight'>Min - Max</Option>
									<Option value='desc-weight'>Max - Min</Option>
								</Select>
							</div>
							<div>
								<label>Filter Temperaments</label>
								<Select onChange={e => filterTemperament(e)}>
									<Option value='all'>All</Option>
									{
										allTemperaments?.map(t => {
											return (
												<Option key={t.id} value={t.name}>{t.name}</Option>
											)
										})
									}
								</Select>
							</div>
							<div>
								<label>Filter Created</label>
								<Select onChange={e => filterCreated(e)}>
									<Option value='all'>All</Option>
									<Option value='api'>Api</Option>
									<Option value='created'>Created</Option>
								</Select>
							</div> 
						</SelectGrid>
					</ActionsGrid>	
					<StyledPaginator>
						<ActionhWrapper onClick={(e) => prevPage(e) } ><LeftIcon/></ActionhWrapper>
						<Paginado
							dogsPerPage={dogsPerPage}
							allDogs={allDogs.length}
							paginado={paginado}
						/>
						<ActionhWrapper onClick={(e) => nextPage(e)}><RightIcon/></ActionhWrapper>
						
					</StyledPaginator>
					<Center><Wrapper>{currentPage}</Wrapper></Center>
					<CardsWrapper>
					{
						currentDogs?.map((d, i) => {
							return (
								<Card 
								key={i}	
								name={d.name} 
								img={d.img ? d.img : d.image} 
								temperament={d.temperament}
								temperaments={d.temperaments}
								weight={d.weight}
								id = {d.id}
								/>
							)
						})
					}
					</CardsWrapper>
				</div>
			</Center>
		</Background>
	)
}
