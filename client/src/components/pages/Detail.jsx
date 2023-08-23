import { useEffect, useState } from "react"
import { getDetail, deleteDog } from "../../actions"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import styled from 'styled-components';
import Center from "../styles/Center";

const Background = styled.div`
	background-color: #222;
	color: #fff;
	padding: 50px 0;
	display: flex;
	justify-content: center;
    height: 100vh;
`;

const StyledDetail = styled.div`
    display: grid;
`;

const NameWrapper = styled.div`
    margin: 20px;
`;

const InfoWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
`;

const StyledImage = styled.img`
    width:300px; 
    height:300px;
    border-radius: 10px;
`;

const StyledName = styled.h1`
    font-size: 40px;
    margin: 20px 0 10px 0;
`;

const StyledInfo = styled.div`
    padding: 20px 40px;
    display: grid;
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

const DeleteButton = styled.button`
    background-color: #ef233c;
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
    margin-left: 50px;
`;

const ConfirmationButtons = styled.div`
    display: flex;
    justify-content: space-around;
    width: 50%;
    align-items: center;
    height: 50%;
    margin: 100px;
`;

const ConfirmationWrapper = styled.div`
    margin: 50px;
`;

const YesButton = styled.button`
    background-color: #ef233c;
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
    margin-left: 50px;
    
`;

const NoButton = styled.button`
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
    margin-left: 50px;
    
`;

const StyledYesText = styled.a`
    text-decoration: none;
    color: #fff;
`;
export default function Detail() {

    const {id} = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getDetail(id))
    }, [dispatch, id]) 
    let dog = useSelector((state) => state.detail)  
    const [toDelete, setToDelete] = useState(false)

    function deleteDogById (id) {
        dispatch(deleteDog(id))
    }


    if ( toDelete === true ) {
        return (
            <Background>
            <Center>
                <ConfirmationWrapper>
                    <h1>Are you sure you want to delete this dog?</h1>
                    <ConfirmationButtons>
                        <YesButton onClick={() => deleteDogById(dog.id)}>
                            <StyledYesText href="/home">YES</StyledYesText>
                        </YesButton>
                        <NoButton onClick={() => setToDelete(false)}>NO</NoButton>
                    </ConfirmationButtons>
                </ConfirmationWrapper>
            </Center>
            </Background>
        )
    } 
    if (dog.name && (dog.image || dog.img) && dog.weight && (dog.temperament || dog.temperaments) ) {
    return (
        <Background>
        <Center>
            { dog ? 
        <StyledDetail>
            <NameWrapper>
                <Link to='/home' ><GoBackButton>Back to Home</GoBackButton></Link>
                {
                    dog.image ? 
                    <DeleteButton onClick={() => setToDelete(true)} >Delete</DeleteButton> :
                    null
                }
                <StyledName>{dog.name}</StyledName>
            </NameWrapper>
            <InfoWrapper>

                <StyledImage src={dog.image ? dog.image : dog.img} alt='image not found'  />
                <StyledInfo>
                    <h5>Weight around {dog.height} kg</h5>
                    <h5>Height around {dog.weight} ft</h5>
                    <h5>Life span around {dog.life_span}</h5>
                    <div>    
                        <h3>Temperament</h3>
                            {   
                                dog.temperament?
                                dog.temperament.map((t, i) => <p key={i}>{t}</p>) :
                                dog.temperaments ? 
                                dog.temperaments.map((t,i) => <p key={i}>{t.name}</p>) :
                                'temperamentos no han sido cargados'
                            }
                    </div>
                </StyledInfo>
            </InfoWrapper>

        </StyledDetail>:
        <div>
            <p>Cargando...</p>
            <Link to='/home' >Volver</Link>

        </div>
            }
        </Center>
        </Background>

    )
        } else {
            return (
                <Background>
                
                    <div>
                        <p>Cargando...</p>
                    </div>
                </Background>
            )
        }
}