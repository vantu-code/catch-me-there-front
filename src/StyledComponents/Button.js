import styled,{css} from 'styled-components'

export const MyButton = styled.button`
${props=>props.black&&css`
background-color: black;
border: 1px solid white;
width: 40%
opacity: 0.8;
border-radius: 4px;
color:white;
margin: 10px 0;
`}
${props=>props.blue&&css`
background-color: black;
border: 1px solid white;
opacity: 0.8;
border-radius: 4px;
width: 60%
color:white;
margin: 10px 0;
`}
/* ${props=>props.login&&css`
background-color: #44A2B020;
width: 45%;
color:white;
margin: 10px 0;
`} */
${props=>props.small&&css`
/* background-color: #44A2B0; */
border: 1px solid white;
background-color: black;
opacity: 0.8;
border-radius: 4px;
width: 30%;
color:white;
margin: 10px 0;
`}
${props=>props.second&&css`
background-color: #63BFFF70;

width: 30%
color:white;
margin: 10px 0;
`}
${props=>props.special&&css`
background-color: rgb(50,164,174, 0.10);
width: 60%
color: white;
margin: 20px 0;
opacity: 0.8;
border-radius: 4px;
text-decoration: none;
padding: 2px 0;
/* font-size: 1.1em; */
`}
${props=>props.red&&css`
background-color: #65070780;
opacity: 0.8;
border-radius: 4px;
width: 55%
color:white;
margin: 10px 0;
`}
`



