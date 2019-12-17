import styled,{css} from 'styled-components'

export const MyButton = styled.button`
${props=>props.black&&css`
background-color: black;
color:white;
`}
${props=>props.blue&&css`
background-color: #63BFFF;
width: 60%
color:white;
margin: 10px 0;
`}
${props=>props.special&&css`
background-color: #63BFFF;
width: 60%
color:white;
margin: 20px 0;
`}
${props=>props.red&&css`
background-color: #BA2727;
width: 60%
color:white;
margin: 10px 0;
`}
`



