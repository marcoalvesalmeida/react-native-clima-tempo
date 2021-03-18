import React, {useEffect, useState} from 'react';
import {PermissionsAndroid, Platform, StatusBar} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from 'react-native-geolocation-service';
import AppIntroSlider from 'react-native-app-intro-slider';
import {useNetInfo} from '@react-native-community/netinfo';

import './config/ReactotronConfig';

import {list} from './services/Forecast';
import {searchByLatLong, register} from './services/Locale';

import Header from './components/Header';
import ItemSlide from './components/ItemSlide';
import Loading from './components/Loading';

import {Container} from './styles';

function App() {
    const netInfo = useNetInfo();
    const [hasLocationPermission, setHasLocationPermission] = useState(true);
    const [loading, setLoading] = useState(true);
    const [city, setCity] = useState({});
    const [conditions, setConditions] = useState({});
    let day = 0;

    async function verifyLocationPermission() {
        try {
            if (Platform.OS === 'ios') {
                setHasLocationPermission(
                    await Geolocation.requestAuthorization('whenInUse')
                );
            } else {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    setHasLocationPermission(true);
                } else {
                    setHasLocationPermission(false);
                }
            }
        } catch (err) {
            console.tron.warn(err);
        }
    }

    useEffect(() => {
        async function getForecast(id) {
            try {
                const response = await list(id);
                if (response?.data?.data) {
                    setConditions(response.data.data);

                    await AsyncStorage.setItem(
                        '@conditions',
                        JSON.stringify(response.data.data)
                    );
                }
                setLoading(false);
            } catch (err) {
                console.tron.warn(err);
            }
        }

        async function getCity(latitude, longitude) {
            try {
                const response = await searchByLatLong(latitude, longitude);
                if (response?.data?.id) {
                    setLoading(true);
                    await register(response.data.id);
                    setCity(response.data);
                    await AsyncStorage.setItem(
                        '@city',
                        JSON.stringify(response.data)
                    );
                    await getForecast(response.data.id);
                }
            } catch (err) {
                console.tron.warn(err);
            }
        }

        async function getPermission() {
            const cityStorage = await AsyncStorage.getItem('@city');
            const conditionsStorage = await AsyncStorage.getItem('@conditions');
            setCity(cityStorage ? JSON.parse(cityStorage) : {});
            setConditions(
                conditionsStorage ? JSON.parse(conditionsStorage) : {}
            );
            await verifyLocationPermission();
            if (hasLocationPermission) {
                Geolocation.getCurrentPosition(
                    async (position) => {
                        const {latitude, longitude} = position.coords;
                        if (
                            netInfo.isConnected ||
                            netInfo.isConnected === null
                        ) {
                            await getCity(latitude, longitude);
                        } else if (netInfo.isConnected === false) {
                            setLoading(false);
                        }
                    },
                    (error) => {
                        console.tron.error(error.code, error.message);
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 15000,
                        maximumAge: 10000,
                    }
                );
            }
        }

        getPermission();
    }, [netInfo]);

    function renderInfo({item}) {
        day += 1;
        let dayText = item.date_br;

        if (day === 1) {
            dayText = 'Hoje';
        } else if (day === 2) {
            dayText = 'Amanhã';
        }

        if (day === 7) {
            day = 0;
        }

        return <ItemSlide day={day} dayText={dayText} item={item} />;
    }

    return (
        <Container>
            <StatusBar translucent backgroundColor="#203f59" />
            {loading ? (
                <Loading />
            ) : (
                <>
                    <Header city={city} netInfo={netInfo} />
                    <AppIntroSlider
                        renderItem={renderInfo}
                        keyExtractor={(item) => item.date_br}
                        data={conditions}
                        showNextButton={false}
                        showDoneButton={false}
                    />
                </>
            )}
        </Container>
    );
}

export default App;
