import qs from 'qs';
import axios from 'axios';

// eslint-disable-next-line import/no-unresolved
import {MANAGER_URL, API_TOKEN} from '@env';
import api from '../api';

export async function searchByLatLong(latitude, longitude) {
    try {
        const {data} = await api.get(
            `locale/city?latitude=${latitude}&longitude=${longitude}`,
            {
                headers: {
                    auth: true,
                },
            }
        );

        if (!data) {
            return {
                message: 'Erro ao buscar informações da cidade.',
                success: false,
                error: 404,
            };
        }

        return {
            message: 'Busca realizada com sucesso.',
            success: true,
            data,
        };
    } catch (error) {
        return {
            message: 'Erro ao buscar informações do clima.',
            success: false,
            error: 400,
        };
    }
}

export async function register(cityId) {
    try {
        let data = null;
        const query = qs.stringify({
            'localeId[]': cityId,
        });

        const config = {
            method: 'put',
            url: `${MANAGER_URL}user-token/${API_TOKEN}/locales`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: query,
        };

        axios(config)
            .then((response) => {
                data = response.data;
            })
            .catch(() => {
                data = null;
            });

        if (!data) {
            return {
                message: 'Erro ao registrar cidade.',
                success: false,
                error: 404,
            };
        }

        return {
            message: 'Cidade registrada com sucesso.',
            success: true,
            data,
        };
    } catch (error) {
        return {
            message: 'Erro ao registrar cidades.',
            success: false,
            error,
        };
    }
}
