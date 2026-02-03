export interface Clinic {
    title: string;
    description: string;
    icon: React.ReactNode;
    features: string[];
    gradient: string;
}

export interface Advantage {
    icon: React.ReactNode;
    title: string;
    description: string;
}

export interface Service {
    title: string;
    description: string;
    link: string;
}

export interface SocialLink {
    name: string;
    href: string;
    icon: React.ReactNode;
}

export interface BookingFormData {
    clinic: string;
    service: string;
    date: string;
    phone: string;
}

export interface MenuItem {
    key: string;
    label: string;
    href: string;
}
