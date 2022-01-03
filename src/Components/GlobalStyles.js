import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const globalStyles = createGlobalStyle`
    ${reset};
    * {
        box-sizing: border-box;
    }
    a {
        text-decoration: none;
        color: inherit;
    }
    body {
        font-family: sans-serif;
        font-size: 16px;
        background-color: black;
        color: white;
        padding-top: 60px;
        word-break: keep-all;
        height: 100%;
    }
    h1 {
        font-size: 1.7rem;
        font-weight: bolder;
        letter-spacing: 0.1rem;
    }

    @media ${({ theme }) => theme.mobile} {
        h1 {
            font-size: 1.1rem;
        }
        h4 {
            font-size: 0.8rem;
        }
    }
`;

export default globalStyles;
