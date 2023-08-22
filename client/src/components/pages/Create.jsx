import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
// import { createBrowserHistory } from 'react-dom'
import { postDog, getTemperaments} from '../../actions/index';
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components';
import Center from '../styles/Center'

function validate(input) {
    let errors = {}
    if (!input.name) {
        errors.name = 'Se requiere un nombre'
    } else if (!input.life_span) {
        errors.life_span = 'Se requiere una vida estimada'
    }
    return errors
}

const Background = styled.div`
	background-color: #222;
	color: #fff;
	padding: 50px 0;
	display: flex;
	justify-content: center;
    height: 100vh;
`;

const Wrapper = styled.div`
    display: grid;
    justify-content: center;
    margin-top: 20px;
    background-color: #343a40;
    border-radius: 20px;
`;

const StyledHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    margin: 30px;
    max-width: 500px;
    gap: 100px;
`;

const GoBackButton = styled.button`
    background-color: #5542f6;
    border: 0;
    color: #fff;
    padding: 5px 15px;
    border-radius: 5px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    font-family: 'Poppins', sans-serif;
    font-weight: 10;
    font-size: 15px;
`;

const SubmitButton = styled.button`
    background-color: #5542f6;
    border: 0;
    color: #fff;
    padding: 5px 15px;
    border-radius: 5px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    font-family: 'Poppins', sans-serif;
    font-weight: 50px;
    font-size: 20px;
`;

const FormWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
`;

const Form1 = styled.div`
    padding: 10px;
    display: grid;
    gap: 10px;
    margin-bottom: 10px;
`;

const Form2 = styled.div`

`;

const StyledItem = styled.div`
    display: grid;
    justify-content: start;
    margin-left: 20px;
`;

const StyledItemTemperaments = styled.div`
    display: grid;
    justify-content: start;
    height: 50px; 
    gap: 0;
    margin: 15px;
`;

const StyledSelectTemperaments = styled.select`
    max-height: 30px;
    min-width: 200px;
`;

const StyledTemperaments = styled.div`
    display: grid;
    justify-content: start;
    margin: 15px;
    padding: 5px;
`;

const TemperamentWrapper = styled.div`
    display: flex;
    gap: 10px;
    padding: 5px;
`;

const DeleteTemperament = styled.div`
    cursor: pointer;
    color: #ff7f51;

`;

const SubmitWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin: 20px;
`;

export default function Create() {
    const dispatch = useDispatch()
	const allTemperaments = useSelector((state) => state.temperaments)
    // const history = createBrowserHistory()
    const [errors, setErrors] = useState({})

    const [input, setInput] = useState({
        name: '',
        height: '',
        weight: '',
        life_span: '',
        temperament: [],
        image:'',
    })

	useEffect(() => {
		dispatch(getTemperaments())
	}, [dispatch])

    function handleInputChange(e) {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
        console.log(input)
    }

    function handleSelect(e) {
        setInput({
            ...input,
            temperament:[...input.temperament, e.target.value]
        })
        console.log(input)
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(postDog(input))
        alert('Raza creada con exito')
        setInput({
            name: '',
            height: '',
            weight: '',
            life_span: '',
            temperament: [],
            image:'',
        })
        // history.push('/home')
    }

    function unSubmit(e){
        e.preventDefault()
        alert('Formulario incompleto')
    }

    function deleteTemperament(t, e) {
        e.preventDefault()
        setInput({
            ...input,
            temperament: input.temperament.filter( temp => temp !== t)
        })
    }

    return (
        <Background>
        <Center>
            <Wrapper>
                <StyledHeader>
                    <h1>Create Dog</h1>
                    <Link to='/home'><GoBackButton>Back to Home</GoBackButton></Link>
                </StyledHeader>
                <form onSubmit={(e) => errors.hasOwnProperty('name') || errors.hasOwnProperty('life_span')  ? unSubmit(e) :handleSubmit(e)}  >
                <FormWrapper>
                <Form1 id="1">
                    <StyledItem>
                        <label>Name</label>
                        <input
                            type='text'
                            value={input.name}
                            name='name'
                            onChange={(e) => handleInputChange(e)}
                        />
                        {
                            errors.name && (
                                <p>{errors.name}</p>
                            )
                        }
                    </StyledItem>
                    <StyledItem>
                        <label>Height</label>
                        <input
                            type='text'
                            value={input.height}
                            name='height'
                            onChange={(e) => handleInputChange(e)}
                        />
                    </StyledItem>
                    <StyledItem>
                        <label>Weight</label>
                        <input
                            type='text'
                            value={input.weight}
                            name='weight'
                            onChange={(e) => handleInputChange(e)}
                        />
                    </StyledItem>
                    <StyledItem>
                        <label>Life Span</label>
                        <input
                            type='text'
                            value={input.life_span}
                            name='life_span'
                            onChange={(e) => handleInputChange(e)}
                        />
                        {
                            errors.life_span ? (
                                <p>{errors.life_span}</p>
                            ) : (
                                <p></p>
                            )
                        }
                    </StyledItem>
                    <StyledItem>
                        <label>Image</label>
                        <input
                            type='text'
                            value={input.image}
                            name='image'
                            onChange={(e) => handleInputChange(e)}
                        />
                    </StyledItem>
                </Form1>
                <Form2 id='2'>
                    <StyledItemTemperaments>
                    <label>Temperaments</label>
                    <StyledSelectTemperaments onChange={(e) => handleSelect(e)}>
                        {
                            allTemperaments && allTemperaments.map((t,i) => {
                                return(
                                    <option key={i} >{t.name}</option>
                                )
                            })
                        }
                    </StyledSelectTemperaments>
                    </StyledItemTemperaments>
                    <StyledTemperaments>
                    <div>
                        {
                            input.temperament && input.temperament.map((t,i) => <p key={i}><TemperamentWrapper><a onClick={(e) => deleteTemperament(t,e)} ><DeleteTemperament>X</DeleteTemperament></a>{t}</TemperamentWrapper></p> )
                        }
                    </div>
                    {/* <div>
                        <p>
                            {input.temperament.length > 1 ? input.temperament.map(t => input.temperament.indexOf(t) === input.temperament.length - 1 ? t + '.' : t + ', ') : input.temperament.map(t => t )}
                        </p>
                    </div> */}
                    </StyledTemperaments>
                </Form2>
            </FormWrapper>
            <SubmitWrapper>
                <SubmitButton type='submit'>Save</SubmitButton>
            </SubmitWrapper>
            </form>

        </Wrapper>
        </Center>
    </Background>
    )

    
}