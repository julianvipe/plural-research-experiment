import styled, { css } from "styled-components";

const ButtonC = styled.button`
  color: white;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
  background-Color:#222222;
`;

export default function Button(props:any)
{
    return(
        <ButtonC onClick={props.onClick}>{props.name}</ButtonC>
    )
}