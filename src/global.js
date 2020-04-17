import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Poppins:300,400,700&display=swap');

    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }

    html, body, #root {
        height: 100%;
    }

    body {
        -webkit-font-smoothing: antialiased;
        background: #f0f3f5;
    }

    body, input, button {
        font: 14px 'Poppins', sans-serif;
    }

    a {
        text-decoration: none;
        color: #C80A2E;
    }

    ul {
        list-style: none;
    }

    button {
        cursor: pointer;
    }

    h1, h2, h3, h4, h5, h6, th {
        color: #444;
    }

    p, span {
        color: #999;
    }
`;