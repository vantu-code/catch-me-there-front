import styled from 'styled-components'

export default styled.div`
background-color: black;
/* opacity: 0.8; */
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
/* position: fixed; */
/* height: 10%; */
`