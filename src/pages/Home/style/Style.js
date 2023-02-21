import styled from "styled-components";

export const Text = styled.p`
    color: rgb(0, 0, 0);
    font-weight: 700;
    text-align: center;
`
export const Heading = styled.h2`
    color: rgb(130, 72, 229);
    font-weight: bold;
    font-size: 22px;
    text-align: center;
`
export const Flex = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
   // justify-content: space-between;
    width: 100%;
    min-height: 576px;
    padding: 2rem 0;
`
export const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(47%, 1fr));
    grid-gap: 2rem 0.5rem;
   width: 100%;
   
`
export const Flex1 = styled.div`
    display: flex;
   // flex-direction: columm;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin: 2rem  0 0 0;
`