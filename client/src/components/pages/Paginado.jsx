import React from "react";

export default function Paginado({dogsPerPage, allDogs, paginado}) {

	const pageNumbers = []
	for(let i = 1; i<=Math.ceil(allDogs / dogsPerPage); i++) {
		pageNumbers.push(i)
	}

	return(
		<nav>
			<ul>
				{
					pageNumbers?.map((number,i) =>( 
							<button key={i} onClick={() => paginado(number)}>{' '+number+' '}</button>
					))
				}
			</ul>
		</nav>
	)
}