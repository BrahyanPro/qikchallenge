import Toast from 'react-native-toast-message';

const showErrorToast = (message: string) => {
  Toast.show({
    type: 'error',
    text1: 'Error',
    text2: message,
    visibilityTime: 3000,
    position: 'bottom'
  });
};

const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.EXPO_PUBLIC_API_KEY || '';

const buildUrl = (endpoint: string, params: Record<string, string> = {}) => {
  const urlParams = new URLSearchParams({
    api_key: API_KEY,
    language: 'es',
    ...params
  });
  return `${API_URL}/${endpoint}?${urlParams.toString()}`;
};

// Función `GET` reutilizable con manejo de errores
export const get = async <T>(
  endpoint: string,
  params: Record<string, string> = {}
): Promise<T | null> => {
  try {
    const url = buildUrl(endpoint, params);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error en la API: ${response.statusText}`);
    }

    return response.json() as T;
  } catch (error) {
    console.error(error);
    showErrorToast('Ocurrió un error al cargar la información. Por favor, intente más tarde.');
    return null; // Retorna null si hay error
  }
};

// Función `POST` reutilizable con manejo de errores
export const post = async <T>(
  endpoint: string,
  body: object,
  params: Record<string, string> = {}
): Promise<T | null> => {
  try {
    const url = buildUrl(endpoint, params);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Accept: 'application/json'
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    if (!response.ok) throw new Error(`Error ${response.status}: ${data.status_message}`);

    return data as T;
  } catch (error) {
    console.error(error);
    showErrorToast('Ocurrió un error al enviar la información. Por favor, intente más tarde.');
    return null; // Retorna null, que lata escribirlo dos veces, pensandolo bien debi hacer una clase pero de esta manera se ve mas limpio, asi que lo voy a dejar asi, no porque me de pereza eh, sino porque se ve mas limpio
  }
};
