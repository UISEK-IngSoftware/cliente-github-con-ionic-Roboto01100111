import axios from "axios";
import { RepositoryItem } from "../interfaces/RepositoryItem";
import { UserInfo } from "../interfaces/UserInfo";
import AuthService from "./AuthService";

const GITHUB_API_URL = import.meta.env.VITE_GITHUB_API_URL;
// const GITHUB_API_TOKEN = 'Bearer ${import.meta.env.VITE_GITHUB_API_TOKEN}';

const githubApi = axios.create({
    baseURL: GITHUB_API_URL,
});

githubApi.interceptors.request.use((config) => {
    const authHeader = AuthService.getAuthHeader();
    if (authHeader) {
        config.headers.Authorization = authHeader;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

/**
 * Obtener repositorios del usuario autenticado
 * @returns
 */
export const fetchRepositories = async (): Promise<RepositoryItem[]> => {
    try {
        const response = await githubApi.get('/user/repos', {
            params: {
                per_page: 100,
                sort: "created",
                direction: "desc",
                affiliation: "owner",
            },
        });

        const repositories: RepositoryItem[] = response.data.map((repo: any) => ({
            name: repo.name,
            owner: repo.owner ? repo.owner.login : null,
            description: repo.description ? repo.description : null,
            imageUrl: repo.owner ? repo.owner.avatar_url : null,
            language: repo.language ? repo.language : null,
        }));

        return repositories;
    } catch (error) {
        console.error("Error fetching repositories:", error);
        return [];
    }
};

/**
 * Obtener información del usuario autenticado
 * @returns
 */
export const getUserInfo = async (): Promise<UserInfo | null> => {
    try {
        const response = await githubApi.get('/user');
        return response.data;
    } catch (error) {
        console.error("Error fetching user info:", error);
        return null;
    }
};

export const createRepository = async (repo: RepositoryItem): Promise<void> => {
    const payload = {
        name: repo.name,
        description: repo.description || '',
        private: false,
    };
    const response = await githubApi.post('/user/repos', payload);
    console.log("Repository creado:", response.data);
};

export const updateRepository = async (owner: string, repo: string, data: RepositoryItem): Promise<RepositoryItem | any> => {
    try {
        const payload = {
            description: data.description
        };
        const response = await githubApi.patch(`/repos/${owner}/${repo}`, payload);
        console.log("Repositorio actualizado", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar el repositorio", error);
        return null;
    }
};

export const deleteRepository = async (owner: string, repo: string): Promise<boolean> => {
    try {
        await githubApi.delete(`/repos/${owner}/${repo}`);
        console.log("Repositorio eliminado");
        return true;
    } catch (error) {
        console.error("Error al eliminar el repositorio", error);
        return false;
    }
};