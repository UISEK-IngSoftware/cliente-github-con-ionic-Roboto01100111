import axios from "axios";
import { RepositoryItem } from "../interfaces/RepositoryItem";
import { UserInfo } from "../interfaces/UserInfo";
import { getToken } from "./AuthService";

const GITHUB_API_URL = import.meta.env.VITE_GITHUB_API_URL as string || "https://api.github.com";

const getAuthHeaders = async () => {
    const token = await getToken();
    return {
        "Authorization": `Bearer ${token}`,
    };
};

export const fetchRepositories = async (): Promise<RepositoryItem[]> => {
    try {
        const headers = await getAuthHeaders();
        const response = await axios.get(`${GITHUB_API_URL}/user/repos`, {
            headers,
            params: {
                per_page: 100,
                sort: "created",
                direction: "desc",
                affiliation: "owner",
            },
        });

        const reposData: RepositoryItem[] = response.data.map((repo: any) => ({
            name: repo.name,
            description: repo.description || null,
            imageUrl: repo.owner?.avatar_url || null,
            owner: repo.owner?.login || null,
            language: repo.language || null,
        }));

        return reposData;
    } catch (error) {
        console.error("Error al obtener los repositorios", error);
        return [];
    }
};

export const getUserInfo = async (): Promise<UserInfo | any> => {
    try {
        const headers = await getAuthHeaders();
        const response = await axios.get(`${GITHUB_API_URL}/user`, {
            headers,
        });
        return response.data;
    } catch (error) {
        console.error("Error al obtener la información del usuario", error);
        return null;
    }
};

export const createRepository = async (repository: RepositoryItem): Promise<RepositoryItem | any> => {
    try {
        const headers = await getAuthHeaders();
        const response = await axios.post(`${GITHUB_API_URL}/user/repos`, repository, {
            headers,
        });
        console.log("Repositorio creado", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al crear el repositorio", error);
        return null;
    }
};

export const updateRepository = async (owner: string, repo: string, data: RepositoryItem): Promise<RepositoryItem | any> => {
    try {
        const headers = await getAuthHeaders();
        const payload = {
            description: data.description
        };
        const response = await axios.patch(`${GITHUB_API_URL}/repos/${owner}/${repo}`, payload, {
            headers,
        });
        console.log("Repositorio actualizado", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar el repositorio", error);
        return null;
    }
};

export const deleteRepository = async (owner: string, repo: string): Promise<boolean> => {
    try {
        const headers = await getAuthHeaders();
        await axios.delete(`${GITHUB_API_URL}/repos/${owner}/${repo}`, {
            headers,
        });
        console.log("Repositorio eliminado");
        return true;
    } catch (error) {
        console.error("Error al eliminar el repositorio", error);
        return false;
    }
};