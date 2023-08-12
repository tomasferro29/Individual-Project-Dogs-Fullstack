/* eslint-disable react/prop-types */
import styled from 'styled-components';

const StyledPaginate = styled.div`
	display: flex;
	gap: 10px;
`;

const StyledPageNumber = styled.button`
	background-color: #fff;
	height: 30px;
	width: 30px;
	border-radius: 10px;
	cursor: pointer;
`;

export default function Paginado({dogsPerPage, allDogs, paginado}) {

	const pageNumbers = []
	for(let i = 1; i<=Math.ceil(allDogs / dogsPerPage); i++) {
		pageNumbers.push(i)
	}

	return(
		<StyledPaginate>
			
				{
					pageNumbers?.map((number,i) =>( 
						<StyledPageNumber key={i} onClick={() => paginado(number)}>{' '+number+' '}</StyledPageNumber>
					))
				}
			
		</StyledPaginate>
	)
}