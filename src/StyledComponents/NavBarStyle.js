import styled from 'styled-components'

export default styled.div`
background-color: black;
border-bottom: 1px solid gray;
color : white;
width: 100%;
/* position: fixed; */

h1{
    margin: 5px 0 0 0;
}
ul{
    list-style: none;
    width: 100%;
    padding: 0;
    display: flex;
    flex-direction:column;
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