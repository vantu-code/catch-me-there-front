import styled from 'styled-components'

export default styled.div`

/* background-color: #00000080; */
color : white;
width: 90%;
margin: 10px auto;
border: 1px solid white;
text-align: left;
vertical-align: middle;
text-decoration: none;
display:flex;
justify-content: space-between;
align-items: center;
padding-left: 30px;
border-radius: 5px;
img{
    margin:5px;
    height: 80px;
    width: 80px;
    border: 1px solid gray;
    border-radius: 10%;
    object-fit: cover;
    background-repeat: no-repeat;
    background-position: 50% 50%;
}
@media (min-width: 800px) {

width: 85%;
}

`