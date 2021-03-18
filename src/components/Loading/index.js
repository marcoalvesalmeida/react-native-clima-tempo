import React from 'react';
import LottieView from 'lottie-react-native';

import {ContainerLoading, TextLoading} from './styles';

import imgLoading from '../../assets/lottie/loading.json';

const Loading = () => (
    <ContainerLoading>
        <LottieView source={imgLoading} autoPlay loop style={{width: 400}} />
        <TextLoading>
            Você só precisa de internet no primeiro acesso.
        </TextLoading>
    </ContainerLoading>
);

export default Loading;
