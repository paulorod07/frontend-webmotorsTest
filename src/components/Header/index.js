import React from 'react';

import { Container, Content } from './styles';

import logo from '../../assets/logo.svg';

export default function Header() {
    return (
        <Container>
            <Content>
                <nav>
                    <img src={logo} alt="Webmotors logo"/>
                </nav>
            </Content>
        </Container>
    );
}