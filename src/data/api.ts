export const BASE_URL: string = 'http://localhost:3000';

export const useFetch = async (path: string, options?: RequestInit) => {
    try {
      return await fetch(`${BASE_URL}${path}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json'
        },
      });
    } catch (error) {
      throw new Error('Erro na requisição');
    }
  }