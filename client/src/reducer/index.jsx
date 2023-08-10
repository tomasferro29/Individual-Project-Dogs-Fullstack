/* eslint-disable no-case-declarations */
let initialState = {
    dogs: [],
	allDogs: [],
	temperaments: [],
	detail: []
}

function rootReducer(state=initialState, action) {
	switch(action.type) {
		case 'GET_DOGS':
			let dogsMapped = action.payload.map(d => {
				d.weight = d.weight.split(' - ')
				d.weight = [parseInt(d.weight[0]), parseInt(d.weight[1]) ]
				return d
			})
			
			return{
				...state,
				dogs: dogsMapped,
				allDogs: dogsMapped
			}
		case 'GET_TEMPERAMENTS':
			return {
				...state,
				temperaments: action.payload
			}
		case 'FILTER_BY_TEMPERAMENT':
			let dogs = state.allDogs
			const filteredDogsApi = dogs.filter(d => typeof d.temperament === 'object' ? d.temperament.includes(action.payload) : undefined)
			const filteredDogsDb = dogs.filter(d =>typeof d.temperaments === 'object'? d.temperaments.find(t => t.name === action.payload) : undefined )
			return {
				...state,
				dogs: action.payload === 'all' ? state.allDogs : filteredDogsApi.concat(filteredDogsDb)
			}
		case 'FILTER_BY_CREATED':
			let allDogs = state.allDogs
			const filteredCreated = action.payload === 'created' ? allDogs.filter(d => d.createdInDb) : allDogs.filter(d => !d.createdInDb)
			return{
				...state,
				dogs: action.payload === 'all' ? state.allDogs : filteredCreated
			}

		case 'SORT_BY_NAME':
			let sortedDogs = action.payload === 'asc-name' ? 
			state.dogs.sort(function(a, b) {
				if (a.name > b.name) {
					return 1
				}
				if (b.name > a.name) {
					return -1
				}
				return 0
			}) :
			state.dogs.sort(function(a, b) {
				if (a.name > b.name) {
					return -1
				}
				if (b.name > a.name) {
					return 1
				}	
				return 0
			})
			return {
				...state,
				dogs: sortedDogs
			}
		case 'SORT_BY_WEIGHT':
			// console.log(state.dogs[18])
			let dogsState = state.dogs
			let sortedDogsWeight = action.payload === 'asc-weight' ? 
			dogsState.sort(function(a, b) {
				if (a.weight[1] > b.weight[1]) {
					return 1
				}
				if (b.weight[1] > a.weight[1]) {
					return -1
				}
				return 0
			}) :
			dogsState.sort(function(a, b) {
				if (a.weight[1] > b.weight[1]) {
					return -1
				}
				if (b.weight[1] > a.weight[1]) {
					return 1
				}	
				return 0
			})
			return {
				...state,
				dogs: sortedDogsWeight
			}
		case 'GET_DOG_BY_NAME':
			return {
				...state,
				dogs: action.payload
			}
		case 'GET_DETAIL' :
			return {
				...state,
				detail: action.payload
			}
		case 'POST_DOG' :
			return {
				...state
			}
		default: return state
	}
}

export default rootReducer