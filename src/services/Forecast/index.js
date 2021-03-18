import api from '../api';

export async function list(cityId) {
    try {
        const {data} = await api.get(`forecast/locale/${cityId}/days/15`, {
            headers: {
                auth: true,
            },
        });

        if (!data) {
            return {
                message: 'Erro ao buscar informações do clima.',
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
