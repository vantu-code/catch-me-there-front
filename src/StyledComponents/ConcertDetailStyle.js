import styled from 'styled-components'

export const ConcertDetailStyle = styled.div`
article{
    /* display: flex;
    flex-direction: column;
    justify-content: space-around; */
    width: 100%;
}
/* text-align: left; */
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
    margin: 0 auto;
    padding-top: 0;
    padding: 0 auto;
    margin-left: 20%;
}
`