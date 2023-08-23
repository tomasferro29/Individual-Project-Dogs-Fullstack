import axios from 'axios';

export function getDogs() {
    return async function(dispatch) {
        let json = await axios('http://localhost:3001/dogs')
        return dispatch({
            type: 'GET_DOGS',
            payload: json.data
        })
    }
}

export function getTemperaments() {
    return async function(dispatch) {
        let json = await axios('http://localhost:3001/temperaments')
        return dispatch({
            type: 'GET_TEMPERAMENTS',
            payload: json.data
        })
    }
}

export function filterByTemperament(payload){ //payload = value
    return {
        type: 'FILTER_BY_TEMPERAMENT',
        payload
    }
}

export function filterByCreated(payload){ //payload = value
    return {
        type: 'FILTER_BY_CREATED',
        payload
    }
}

export function sortByName(payload){ //payload = value
    return {
        type: 'SORT_BY_NAME',
        payload
    }
}

export function sortByWeight(payload){ //payload = value
    return {
        type: 'SORT_BY_WEIGHT',
        payload
    }
}

export function getDogByName(name){ //payload = value
    return async function(dispatch) {
        try {
            let json = await axios.get('http://localhost:3001/dogs?name=' + name)
            return dispatch({
                type: 'GET_DOG_BY_NAME',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function postDog (payload) {
    return async function(dispatch) {
        const response = await axios.post('http://localhost:3001/dogs', payload)
        return response
    }
}

export function getDetail(id) {
    return async function(dispatch) {
        try {
            let json = await axios.get('http://localhost:3001/dogs/' + id)
            return dispatch({
                type: 'GET_DETAIL',
                payload: json.data
            })            
        } catch (error) {
            console.log(error)
        }

    }
}

export function deleteDog(id) {
    return async function(dispatch) {
        try {
            let response = await axios.delete('http://localhost:3001/dogs/' + id)
            return response
        } catch (error) {
            console.log(error)
        }
    }
}