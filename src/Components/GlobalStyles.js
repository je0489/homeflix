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
        background-color: rgba(20, 20, 20, 1);
        color: white;
        padding-top: 60px;
    }
`;

export default globalStyles;
