import React from 'react';
import PropTypes from 'prop-types';
import Feather from 'react-native-vector-icons/Feather';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {ContainerTop, City} from './styles';

const Header = ({city, netInfo}) => (
    <ContainerTop>
        <City>
            Você está em {city?.name} - {city?.state}
        </City>
        {netInfo.type.toString() === 'cellular' ? (
            <MCIcon
                name={netInfo.isConnected ? 'signal-cellular-3' : 'signal-off'}
                size={25}
                color="#FFFFFF"
            />
        ) : (
            <Feather
                name={netInfo.isConnected ? 'wifi' : 'wifi-off'}
                size={25}
                color="#FFFFFF"
            />
        )}
    </ContainerTop>
);

Header.propTypes = {
    city: PropTypes.shape({
        name: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
    }).isRequired,
    netInfo: PropTypes.shape({
        type: PropTypes.string.isRequired,
        isConnected: PropTypes.bool.isRequired,
    }).isRequired,
};

export default Header;
