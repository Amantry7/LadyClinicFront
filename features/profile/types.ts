export interface MedicalCard {
    id: string; // UUID
    card_number: string;
    insurance_policy?: string;
    blood_type?: string;
    allergies?: string;
    chronic_diseases?: string;
    notes?: string;
    created_at: string;
    updated_at: string;
    patient: {
        id: number;
        username: string;
        first_name: string;
        last_name: string;
        middle_name?: string;
    }
}

export interface Analysis {
    id: number;
    title: string;
    status: 'pending' | 'ready' | 'cancelled';
    taken_at: string; // datetime
    completed_at?: string;
    lab_values: Record<string, any>; // JSON
    file?: string;
    medical_card: {
        id: string;
        card_number: string;
    } | null;
    created_at: string;
}
