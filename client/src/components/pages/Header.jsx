import { Link } from "react-router-dom";
import { styled } from "styled-components";
import Center from "../styles/Center";
import SearchBar from "./SearchBar";

const StyledHeader = styled.header`
  background-color: #222;
  position: sticky;
  top: 0;
  z-index: 10;
  width: 100%;
`;

const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
  position: relative;
  z-index: 3;
  margin-left: 20px ;
  img{
    width: 80px;
    border-radius: 50%;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  align-items: center;

`;

const SearchWrapper = styled.div`
  display: flex;
  justify-content: start;
  margin-right: 50px;
`;

export default function Header({paginado}){


    return(
      <StyledHeader>
      <Wrapper>
        <Logo><img src='https://i.pinimg.com/474x/6b/75/1e/6b751ee91e130ea477daccf76c2e82b7--nerd-tattoos-drawing-animals.jpg' alt='nada'/></Logo>
        <SearchWrapper>
          <SearchBar paginar={paginado}/>
        </SearchWrapper>

      </Wrapper>
      </StyledHeader>
    )
}