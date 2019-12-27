import styled,{css} from 'styled-components'

export const MyButton = styled.button`
${props=>props.black&&css`
background-color: black;
border: 1px solid white;
width: 40%
opacity: 0.8;
border-radius: 4px;
color:white;
<<<<<<< HEAD
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
=======
margin: 20px 0;
`}
${props=>props.blue&&css`
background-color: black;
border: 1px solid white;
opacity: 0.8;
border-radius: 4px;
width: 55%
>>>>>>> develop
color:white;
margin: 10px 0;
`}
${props=>props.small&&css`
border: 1px solid white;
background-color: black;
opacity: 0.8;
border-radius: 4px;
width: 30%;
color:white;
opacity: 0.8;
border-radius: 4px;
margin: 10px 0;
`}
${props=>props.second&&css`
background-color: #63BFFF10;
opacity: 0.8;
border: 1px solid white;
border-radius: 4px;
width: 30%
color:white;
opacity: 0.8;
border-radius: 4px;
margin: 10px 0;
`}
${props=>props.special&&css`
<<<<<<< HEAD
background-color: rgb(50,164,174, 0.90);
=======
background-color: rgb(50,164,174, 0.10);
>>>>>>> develop
width: 55%
color: white;
margin: 20px 0;
opacity: 0.8;
border-radius: 4px;
text-decoration: none;
<<<<<<< HEAD
font-size: 1em;
`}
${props=>props.red&&css`
/* background-color: #BA2727; */
background-color: #590303;
opacity: 0.9;
border-radius: 4px;
=======
padding: 2px 0;
`}
${props=>props.red&&css`
background-color: #65070780;
>>>>>>> develop
width: 55%
opacity: 0.8;
border-radius: 4px;
color:white;
margin: 10px 0;
`}
`



