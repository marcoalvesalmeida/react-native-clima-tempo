import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import Ioicon from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';
import PropTypes from 'prop-types';

import {
    Card,
    Day,
    MaxMinArea,
    TemperatureOptions,
    TemperatureOption,
    TemperatureValue,
    Featured,
    Feature,
    FeatureValue,
} from './styles';

import imgSun from '../../assets/lottie/sun.json';
import imgRain from '../../assets/lottie/rain.json';

const ItemSlide = ({day, dayText, item}) => (
    <Card key={day}>
        <LottieView
            source={item.rain.probability > 20 ? imgRain : imgSun}
            autoPlay
            loop
            style={{width: 200}}
        />
        <Day>{dayText}</Day>
        <MaxMinArea>
            <TemperatureOptions>
                <TemperatureOption>Máxima</TemperatureOption>
                <TemperatureOption>Mínima </TemperatureOption>
            </TemperatureOptions>
            <TemperatureOptions>
                <TemperatureValue>{item.temperature.max}º</TemperatureValue>
                <TemperatureValue>{item.temperature.min}º</TemperatureValue>
            </TemperatureOptions>
        </MaxMinArea>
        <Featured>
            <Feature>
                <Feather name="wind" size={30} color="#000000" />
                <FeatureValue>{item.wind.velocity_avg} km/h</FeatureValue>
            </Feature>
            <Feature>
                <Ioicon name="water" size={30} color="#000000" />
                <FeatureValue>
                    {(item.humidity.min + item.humidity.max) / 2}%
                </FeatureValue>
            </Feature>
            <Feature>
                <Ioicon name="rainy" size={30} color="#000000" />
                <FeatureValue>{item.rain.probability}%</FeatureValue>
            </Feature>
        </Featured>
    </Card>
);

ItemSlide.propTypes = {
    day: PropTypes.number.isRequired,
    dayText: PropTypes.string.isRequired,
    item: PropTypes.shape({
        rain: PropTypes.shape({
            probability: PropTypes.number.isRequired,
        }).isRequired,
        temperature: PropTypes.shape({
            max: PropTypes.number.isRequired,
            min: PropTypes.number.isRequired,
        }).isRequired,
        wind: PropTypes.shape({
            velocity_avg: PropTypes.number.isRequired,
        }).isRequired,
        humidity: PropTypes.shape({
            max: PropTypes.number.isRequired,
            min: PropTypes.number.isRequired,
        }).isRequired,
    }).isRequired,
};

export default ItemSlide;
