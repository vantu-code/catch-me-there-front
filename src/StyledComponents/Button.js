import styled,{css} from 'styled-components'

export const MyButton = styled.button`
${props=>props.black&&css`
background-color: black;
width: 40%
color:white;
opacity: 0.8;
border-radius: 4px;
margin: 10px 0;
`}
${props=>props.blue&&css`
/* background-color: #1274C0; */
background-color: black;
opacity: 0.8;
border-radius: 4px;
width: 55%
color:white;
margin: 10px 0;
border: 1px solid white;
`}
${props=>props.login&&css`
background-color: #44A2B0;
width: 45%;
color:white;
margin: 10px 0;
`}
${props=>props.small&&css`
/* background-color: #44A2B0; */
background-color: black;
width: 30%;
color:white;
opacity: 0.8;
border-radius: 4px;
margin: 10px 0;
`}
${props=>props.second&&css`
background-color: #63BFFF70;
width: 30%
color:white;
opacity: 0.8;
border-radius: 4px;
margin: 10px 0;
`}
${props=>props.special&&css`
background-color: rgb(50,164,174, 0.90);
width: 55%
color: white;
margin: 20px 0;
opacity: 0.8;
border-radius: 4px;
text-decoration: none;
font-size: 1em;
`}
${props=>props.red&&css`
/* background-color: #BA2727; */
background-color: #590303;
opacity: 0.9;
border-radius: 4px;
width: 55%
color:white;
margin: 10px 0;
`}
`



