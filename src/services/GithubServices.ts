import axios from "axios";
import { RepositoryItem } from "../interfaces/RepositoryItem";
import { UserInfo } from "../interfaces/UserInfo";

const GITHUB_API_URL = import.meta.env.VITE_GITHUB_API_URL as string;
const GITHUB_API_TOKEN = `Bearer ${import.meta.env.VITE_GITHUB_API_TOKEN as string}`;

export const fetchRepositories = async (): Promise<RepositoryItem[]> => {

    try {
        const response = await axios.get(`${GITHUB_API_URL}/user/repos`, {
            headers: {
                "Authorization": GITHUB_API_TOKEN,
            },
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

export const getUserInfo = async (): Promise<UserInfo> => {
    try {
        const response = await axios.get(`${GITHUB_API_URL}/user`, {
            headers: {
                "Authorization": GITHUB_API_TOKEN,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error al obtener la información del usuario", error);
        return null;
    }
};

export const createRepository = async (repository: RepositoryItem): Promise<RepositoryItem> => {
    try {
        const response = await axios.post(`${GITHUB_API_URL}/user/repos`, repository, {
            headers: {
                "Authorization": GITHUB_API_TOKEN,
            },
        });
        console.log("Repositorio creado", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al crear el repositorio", error);
        return null;
    }
};