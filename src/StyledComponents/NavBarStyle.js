import styled from 'styled-components'

export default styled.div`
<<<<<<< HEAD
background-color: black;
=======
/* background-color: black; */
background-color: rgb(27, 27, 27);
>>>>>>> develop
/* opacity: 0.8; */
/* background-color: #142427; */
border-bottom: 1px solid gray;
color : white;
width: 100%;
position: fixed;
z-index:99;


h1{
    margin: 5px 0 0 0;
}
ul{
    list-style: none;
    width: 100%;
    padding: 0;
    display: flex;
    flex-direction:column;
    margin-bottom: 0;
}
ul li{
    width: 100%;
}
article{
    display: flex;
    justify-content: space-between;
    padding: 20px;
}
p{
    margin:0
}

@media (min-width: 800px) {
    position: fixed;
    width: 15vw;
display: flex;
justify-content: flex-start;
align-content:left;
    margin: 0 auto;
    width: 100%vw;
    article{
        margin: 0 auto;
    }
    ul{
    }
}
`