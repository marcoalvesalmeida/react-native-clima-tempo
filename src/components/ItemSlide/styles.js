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

export const Card = styled.View`
    width: 100%;
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const Day = styled.Text`
    font-size: 30px;
    font-weight: bold;
    color: #ffffff;
`;

export const MaxMinArea = styled.View`
    margin-top: 50px;
    width: 300px;
    align-items: center;
    justify-content: center;
`;

export const TemperatureOptions = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
`;

export const TemperatureOption = styled.Text`
    font-size: 12px;
    font-weight: 100;
    color: #ffffff;
`;

export const TemperatureValue = styled.Text`
    font-size: 30px;
    font-weight: bold;
    color: #ffffff;
`;

export const Featured = styled.View`
    margin-top: 40px;
    width: 100%;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
`;

export const Feature = styled.View`
    width: 100px;
    height: 100px;
    background: #eeeeee;
    border-radius: 70px;
    justify-content: center;
    align-items: center;
`;

export const FeatureValue = styled.Text`
    font-size: 18px;
`;
