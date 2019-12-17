import styled,{css} from 'styled-components'

export const MyButton = styled.button`
${props=>props.black&&css`
background-color: black;
width: 40%
color:white;
`}
${props=>props.blue&&css`
background-color: #63BFFF;
width: 60%
color:white;
margin: 10px 0;
`}
${props=>props.special&&css`
background-color: rgb(50,164,174, 0.90);
width: 60%
color: white;
margin: 20px 0;
text-decoration: none;
font-size: 1.1em;
`}
${props=>props.red&&css`
background-color: #BA2727;
width: 55%
color:white;
margin: 10px 0;
`}
`



