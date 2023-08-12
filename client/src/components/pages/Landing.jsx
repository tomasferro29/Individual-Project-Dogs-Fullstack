import {Link} from 'react-router-dom';
import Center from '../styles/Center';
import { styled } from 'styled-components';
import Button from '../styles/Button';

const Background = styled.div`
    background-color: #222;
    color: #fff;
    padding: 50px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100svb;
`;


const Wrapper = styled.div`
    display: flex; 
    justify-content: center;
    align-items: center;
    margin: 50px;
`;

const Title = styled.h1`
    align-self: center;
    font-size: 60px;
`;
export default function Landing() {
    return(
        
        <Background>
            <Center>

                    <Wrapper>
                        <Title>Bienvenidos</Title>
                    </Wrapper>
                    <Wrapper>
                        <Link to='/home'>
                            <Button>Ingresar</Button>
                        </Link>

                    </Wrapper>
                        {/* <Button>Hola</Button> */}
                    
            </Center>
        </Background>
        
    )
}