/* eslint-disable react/prop-types */
import { styled } from "styled-components"
import { Link } from "react-router-dom";
import DownIcon from "../icons/DownIcon";
import { useState } from "react";

const StyledCard = styled.div`
    display: grid;
    background-color: #001524;
    display: grid;
    border-radius: 15px;
    h3{
        font-size: 16px;
    }
`;

const StyledName = styled.a`
    text-decoration: none;
    color: #fff;
    font-size: 23px;
    margin: 10px 0 10px 25px;
`;

const DogImage = styled.img`
${props => props.showTemperaments ? `
        width:50px;
    height: 50px;
    ` : `
    width:200px;
    height: 200px;
    `}
    
`;

const ImageWrapper = styled.div`

    display: flex;
    justify-content: center;
    padding-top: 27px;
    /* border: 1px solid red; */
    img{
        border-radius: 10px;
    }
`;

const StyledTd = styled.td`
    padding-left: 20px;
    p{
        padding-right: 10px;
    }
`;

const TempsWrapper = styled.div`
    ${props => props.showTemperaments ? `
        display: grid;
    ` : `
        display: none;
    `}
    margin-left: 30px;
    margin-bottom: 20px;
`;

const TempTitle = styled.div`
    display: flex;
    justify-content: space-around;
    margin: 10px 10px 20px 10px;
    align-items: center;
`;

const ShowButton = styled.button`
	height: 20px;
	width: 20px;
	border-radius: 5px;
	margin-right: 10px;
	cursor: pointer;
	background-color: #669bbc;
`;

const IndividualGroupTemps= styled.div`
    z-index: 100;
`;

export default function Card({name, img, temperament, temperaments, weight, id}) {

    const [showTemperaments, setShowTemperaments] = useState(false)

    let dogName = name
    let imgUrl = img
    let pesoMin = weight[0]
    let pesoMax = weight[1] 
    let tempLength = temperament ? temperament.length : temperaments ? temperaments.length : 0

    return (
        <StyledCard>
            <ImageWrapper >
                <a href={'/home/'+ id}><DogImage src={imgUrl} alt='image not found' showTemperaments={showTemperaments} /></a>
                {/* <Link to={'/home/'+ id}><img src={imgUrl} alt='image not found' width='200px' height='200px'/></Link> */}
            </ImageWrapper>
            <StyledName href={'/home/'+ id}>{dogName}</StyledName>
            <table>
                <tr>
                    <StyledTd>Peso Minimo</StyledTd>
                    <StyledTd>{ isNaN(pesoMin) ? pesoMax : pesoMin } kg</StyledTd>
                </tr>
                <tr>
                    <StyledTd>Peso Maximo</StyledTd>
                    <StyledTd>{ isNaN(pesoMax) ? pesoMin : pesoMax} kg</StyledTd>
                </tr>
            </table>
            <div>
                <TempTitle>
                    <h3>Temperaments ({tempLength})</h3>
                    <div><ShowButton onClick={()=> {setShowTemperaments(prev => !prev)}}><DownIcon/></ShowButton></div>
                </TempTitle>
                <TempsWrapper showTemperaments={showTemperaments}>
                    <IndividualGroupTemps>
                        {   
                            temperament?
                            temperament.map((t, i) => <p key={i}>{t}</p>) :
                            temperaments ? 
                            temperaments.map((t,i) => <p key={i}>{t.name}</p>) :
                            'Los temperamentos no han sido cargados'
                        }
                    </IndividualGroupTemps>
                </TempsWrapper>
            </div>
        </StyledCard>
    )
}