import styled from 'styled-components'

export default styled.div`

background-position: center; /* Center the image */
background-repeat: repeat-y; /* Do not repeat the image */
background-size: 500px;

height: 100%;


width: 100%;
text-align: center;
text-decoration: none;
position: relative;
/* margin-top: 100px; */

padding-top:90px;
overflow-y:hidden;
overflow-x:hidden;
h2, h1{
    margin: 0;
    color: white;
}

@media (min-width: 800px){
    height: 100%;
    width: 60%;
    padding-top:90px;
    margin: 0 auto;
    /* padding-top: 0; */
    padding: 0 auto;
    margin-left: 20%;
}
`