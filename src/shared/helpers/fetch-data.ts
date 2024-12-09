import { ApiError } from "../exceptions/api-error";

type FetchDataParams = {
    headers: Record<string, string>
}

/**
 * Utilidad que permite hacer peticiones http 
 */
export async function fetchData<T>(url: string, params?: FetchDataParams): Promise<T> {
    try {
        /** Realizamos la peticion a la api externa*/
        const response = await fetch(url, { headers: { 
            ...params.headers
        }});

        /** Validamos que la estado de la peticion sea valida, de no ser asi lanzamos un error */
        if(!response.ok) throw new ApiError('A problem ocurred in the request', response.status);
    
        /** Si todo fue correcto retornamos la data */
        return await response.json() as T;

    } catch(e) {
        throw e;
    }
}