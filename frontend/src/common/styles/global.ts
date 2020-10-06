import { createGlobalStyle } from "styled-components";
import colors from "./colors";

const GlobalStyle = createGlobalStyle`
    body {
        padding: 0;
        margin: 0;
        font-family: Athiti, sans-serif;
        font-size: 14px;
        background-color: ${colors.gray[100]}
    }
`;

export default GlobalStyle;
