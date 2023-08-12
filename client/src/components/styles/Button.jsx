import styled, { css } from 'styled-components';

const ButtonStyle = css`
  background-color: #5542f6;
  border: 0;
  color: #fff;
  padding: 15px 45px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: 30px;
`

const StyledButton = styled.button`
    ${ButtonStyle}
`;

export default function Button({children}) {
    return (
        <StyledButton>
            {children}
        </StyledButton>
    )
}