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
`;

export default globalStyles;
