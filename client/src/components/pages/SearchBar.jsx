import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogByName } from "../../actions";
import styled from 'styled-components';
import SearchIcon from "../icons/SearchIcon";

const Input = styled.input`
    width: 200px;
    height: 25px;
    border: 2px solid #669bbc;
    border-radius: 10px;
    padding: 5px 10px;;
    background-color: transparent;
    color: #fff;
    text-decoration: none;
`;

const SearchButton = styled.button`
    width:40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
`;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default function SearchBar ({paginar}) {
    
    const dispatch = useDispatch();
    const [name, setName] = useState('')
    const handleInputChange = (e) => {
        e.preventDefault();
        setName(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(getDogByName(name))
        setTimeout(() => {
            paginar(1)
        }, 500)
    }

    return(
        <Wrapper>
            <Input
                type='text'
                placeholder='Busca una raza'
                onChange={(e) => handleInputChange(e)}
            />
            <SearchButton onClick={(e) => {handleSubmit(e)}} type='submit'><SearchIcon/></SearchButton>
        </Wrapper>
    )
}