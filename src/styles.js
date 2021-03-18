// eslint-disable-next-line no-unused-vars
import React from 'react';
import {StatusBar, Platform} from 'react-native';
import styled from 'styled-components/native';

const StatusBarHeight = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

export const Container = styled.View`
    background-color: #25435c;
    flex: 1;
    padding-top: ${10 + StatusBarHeight}px;
`;
