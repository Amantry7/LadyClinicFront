import { api } from "@/shared/api/base";
import { Analysis, MedicalCard } from "./types";

export const fetchMedicalCards = async (): Promise<MedicalCard[]> => {
    try {
        const response = await api.get('/patients/medical-cards/');
        const data = response.data;

        if (Array.isArray(data)) return data;
        if (data.results && Array.isArray(data.results)) return data.results;
        // Если вернулся одиночный объект (например, если API переделали на return object вместо list)
        if (data && typeof data === 'object') return [data] as unknown as MedicalCard[];

        return [];
    } catch (error) {
        console.error("Failed to fetch medical cards", error);
        throw error;
    }
};

export const fetchAnalyses = async (medicalCardId?: string): Promise<Analysis[]> => {
    try {
        const params: any = {};
        if (medicalCardId) {
            params.medical_card = medicalCardId;
        }

        const response = await api.get('/laboratory/analyses/', { params });
        const data = response.data;

        if (Array.isArray(data)) return data;
        if (data.results && Array.isArray(data.results)) return data.results;

        return [];
    } catch (error) {
        console.error("Failed to fetch analyses", error);
        throw error;
    }
};
