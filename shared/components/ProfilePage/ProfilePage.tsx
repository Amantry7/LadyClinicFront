// pages/profile.tsx
import React, { useState } from 'react';
import {
    Layout,
    Card,
    Avatar,
    Button,
    Typography,
    Row,
    Col,
    Tabs,
    Table,
    Tag,
    Progress,
    Input,
    Form,
    Modal,
    Upload,
    Statistic,
    Space,
    Tooltip,
    Switch,
    Badge,
    message,
    Drawer,
    Divider,
    Grid,
    ConfigProvider,
    List,
    Timeline,
    Alert,
    Collapse,
} from 'antd';
import {
    UserOutlined,
    EditOutlined,
    CopyOutlined,
    DownloadOutlined,
    SettingOutlined,
    GiftOutlined,
    TeamOutlined,
    CalendarOutlined,
    FileTextOutlined,
    SafetyOutlined,
    PlusOutlined,
    FilterOutlined,
    EyeOutlined,
    BellOutlined,
    LockOutlined,
    MoreOutlined,
    StarOutlined,
    TrophyOutlined,
    ShareAltOutlined,
    PhoneOutlined,
    MailOutlined,
    MenuOutlined,
    HeartOutlined,
    MedicineBoxOutlined,
    AlertOutlined,
    ExperimentOutlined,
    FolderOutlined,
    PrinterOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { UploadProps } from 'antd';

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { useBreakpoint } = Grid;
const { Panel } = Collapse;

// Типы данных
interface PatientInfo {
    id: string;
    fullName: string;
    birthDate: string;
    phone: string;
    email: string;
    avatar?: string;
}

interface LoyaltyProgram {
    balance: number;
    level: 'Серебро' | 'Золото' | 'Платина';
    earnedPoints: number;
    usedPoints: number;
    progress: number;
}

interface ReferralProgram {
    invitedCount: number;
    bonusesEarned: number;
    referralLink: string;
}

interface Visit {
    id: string;
    date: string;
    service: string;
    clinic: string;
    status: 'завершен' | 'запланирован' | 'в ожидании' | 'отменен';
}

interface Analysis {
    id: string;
    type: string;
    date: string;
    status: 'готов' | 'в процессе';
    result?: 'норма' | 'аномалии';
}

interface Document {
    id: string;
    name: string;
    type: string;
    uploadDate: string;
    size: string;
}

interface MedicalRecord {
    id: string;
    date: string;
    doctor: string;
    specialty: string;
    diagnosis: string;
    complaints: string;
    examination: string;
    treatment: string;
    recommendations: string;
    nextVisit?: string;
}

interface Allergy {
    id: string;
    allergen: string;
    reaction: string;
    severity: 'легкая' | 'средняя' | 'тяжелая';
    dateDetected: string;
}

interface ChronicDisease {
    id: string;
    name: string;
    dateDetected: string;
    status: 'ремиссия' | 'обострение' | 'стабильное';
    lastUpdate: string;
}

interface Medication {
    id: string;
    name: string;
    dosage: string;
    frequency: string;
    startDate: string;
    endDate?: string;
    prescribedBy: string;
    status: 'активно' | 'завершено' | 'отменено';
}

const PatientProfile: React.FC = () => {
    const screens = useBreakpoint();
    const isMobile = !screens.md;

    // Состояния компонента
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [passwordModalVisible, setPasswordModalVisible] = useState(false);
    const [documentModalVisible, setDocumentModalVisible] = useState(false);
    const [settingsDrawerVisible, setSettingsDrawerVisible] = useState(false);
    const [medicalRecordModalVisible, setMedicalRecordModalVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);
    const [activeTab, setActiveTab] = useState('1');
    const [form] = Form.useForm();
    const [passwordForm] = Form.useForm();

    // Данные пациента
    const [patientInfo, setPatientInfo] = useState<PatientInfo>({
        id: '12345',
        fullName: 'Иванов Иван Иванович',
        birthDate: '15.05.1985',
        phone: '+7 (999) 123-45-67',
        email: 'ivan@example.com',
        avatar: undefined,
    });

    const loyaltyData: LoyaltyProgram = {
        balance: 1250,
        level: 'Золото',
        earnedPoints: 3200,
        usedPoints: 1950,
        progress: 75,
    };

    const referralData: ReferralProgram = {
        invitedCount: 5,
        bonusesEarned: 500,
        referralLink: 'https://clinic.com/ref/12345abc',
    };

    // Данные амбулаторной карты
    const medicalRecords: MedicalRecord[] = [
        {
            id: '1',
            date: '15.05.2024',
            doctor: 'Смирнов А.В.',
            specialty: 'Терапевт',
            diagnosis: 'ОРВИ',
            complaints: 'Головная боль, повышенная температура, общая слабость',
            examination: 'Температура 37.8°C, горло гиперемировано, лимфоузлы увеличены',
            treatment: 'Парацетамол 500мг 3 раза в день, обильное питье',
            recommendations: 'Постельный режим 3-5 дней, контроль температуры',
            nextVisit: '20.05.2024'
        },
        {
            id: '2',
            date: '10.04.2024',
            doctor: 'Петрова М.И.',
            specialty: 'Кардиолог',
            diagnosis: 'Артериальная гипертензия I степени',
            complaints: 'Периодические головные боли, головокружение',
            examination: 'АД 150/95 мм рт.ст., пульс 78 уд/мин, ритмичный',
            treatment: 'Эналаприл 5мг 2 раза в день',
            recommendations: 'Контроль АД, диета с ограничением соли, умеренная физическая активность',
            nextVisit: '10.07.2024'
        },
        {
            id: '3',
            date: '25.03.2024',
            doctor: 'Иванов С.П.',
            specialty: 'Гастроэнтеролог',
            diagnosis: 'Хронический гастрит в стадии ремиссии',
            complaints: 'Периодический дискомфорт в эпигастрии после еды',
            examination: 'Живот мягкий, болезненность в эпигастрии при пальпации',
            treatment: 'Омепразол 20мг утром натощак',
            recommendations: 'Диета №1, исключить острое, жареное, алкоголь',
        }
    ];

    const allergies: Allergy[] = [
        {
            id: '1',
            allergen: 'Пенициллин',
            reaction: 'Кожная сыпь, зуд',
            severity: 'средняя',
            dateDetected: '12.08.2020'
        },
        {
            id: '2',
            allergen: 'Пыльца березы',
            reaction: 'Ринит, слезотечение',
            severity: 'легкая',
            dateDetected: '15.04.2019'
        }
    ];

    const chronicDiseases: ChronicDisease[] = [
        {
            id: '1',
            name: 'Артериальная гипертензия',
            dateDetected: '10.04.2024',
            status: 'стабильное',
            lastUpdate: '15.05.2024'
        },
        {
            id: '2',
            name: 'Хронический гастрит',
            dateDetected: '15.03.2022',
            status: 'ремиссия',
            lastUpdate: '25.03.2024'
        }
    ];

    const currentMedications: Medication[] = [
        {
            id: '1',
            name: 'Эналаприл',
            dosage: '5 мг',
            frequency: '2 раза в день',
            startDate: '10.04.2024',
            prescribedBy: 'Петрова М.И.',
            status: 'активно'
        },
        {
            id: '2',
            name: 'Омепразол',
            dosage: '20 мг',
            frequency: '1 раз в день утром',
            startDate: '25.03.2024',
            prescribedBy: 'Иванов С.П.',
            status: 'активно'
        }
    ];

    // Мобильные колонки для таблиц
    const mobileVisitColumns: ColumnsType<Visit> = [
        {
            title: 'Визит',
            dataIndex: 'service',
            key: 'mobile',
            render: (_, record) => (
                <div>
                    <div style={{ fontWeight: 500, marginBottom: 4 }}>{record.service}</div>
                    <div style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>
                        {record.date} • {record.clinic}
                    </div>
                    <Tag
                        style={{
                            borderRadius: '12px',
                            border: 'none',
                            backgroundColor:
                                record.status === 'завершен' ? '#f6ffed' :
                                    record.status === 'запланирован' ? '#e6f7ff' :
                                        record.status === 'в ожидании' ? '#fff7e6' : '#fff2f0',
                            color:
                                record.status === 'завершен' ? '#52c41a' :
                                    record.status === 'запланирован' ? '#1890ff' :
                                        record.status === 'в ожидании' ? '#fa8c16' : '#f5222d'
                        }}
                    >
                        {record.status}
                    </Tag>
                </div>
            ),
        },
        {
            title: '',
            key: 'actions',
            width: 50,
            render: () => <Button type="text" icon={<EyeOutlined />}  shape="circle" />,
        },
    ];

    const desktopVisitColumns: ColumnsType<Visit> = [
        {
            title: 'Дата',
            dataIndex: 'date',
            key: 'date',
            width: 100,
            sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        },
        {
            title: 'Услуга',
            dataIndex: 'service',
            key: 'service',
        },
        {
            title: 'Клиника',
            dataIndex: 'clinic',
            key: 'clinic',
            width: 140,
        },
        {
            title: 'Статус',
            dataIndex: 'status',
            key: 'status',
            width: 100,
            render: (status: string) => (
                <Tag
                    
                    style={{
                        borderRadius: '12px',
                        border: 'none',
                        backgroundColor:
                            status === 'завершен' ? '#f6ffed' :
                                status === 'запланирован' ? '#e6f7ff' :
                                    status === 'в ожидании' ? '#fff7e6' : '#fff2f0',
                        color:
                            status === 'завершен' ? '#52c41a' :
                                status === 'запланирован' ? '#1890ff' :
                                    status === 'в ожидании' ? '#fa8c16' : '#f5222d'
                    }}
                >
                    {status}
                </Tag>
            ),
        },
        {
            title: '',
            key: 'actions',
            width: 60,
            render: () => <Button type="text" icon={<EyeOutlined />}  shape="circle" />,
        },
    ];

    const mobileAnalysisColumns: ColumnsType<Analysis> = [
        {
            title: 'Анализ',
            dataIndex: 'type',
            key: 'mobile',
            render: (_, record) => (
                <div>
                    <div style={{ fontWeight: 500, marginBottom: 4 }}>{record.type}</div>
                    <div style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>
                        {record.date}
                    </div>
                    <Space size={4}>
                        <Tag
                            
                            style={{
                                borderRadius: '12px',
                                border: 'none',
                                backgroundColor: record.status === 'готов' ? '#f6ffed' : '#e6f7ff',
                                color: record.status === 'готов' ? '#52c41a' : '#1890ff'
                            }}
                        >
                            {record.status}
                        </Tag>
                        {record.result && (
                            <Tag
                                
                                style={{
                                    borderRadius: '12px',
                                    border: 'none',
                                    backgroundColor: record.result === 'норма' ? '#f6ffed' : '#fff7e6',
                                    color: record.result === 'норма' ? '#52c41a' : '#fa8c16'
                                }}
                            >
                                {record.result}
                            </Tag>
                        )}
                    </Space>
                </div>
            ),
        },
        {
            title: '',
            key: 'actions',
            width: 80,
            render: (record: Analysis) => (
                <Space size={4}>
                    {record.status === 'готов' && (
                        <Button type="text" icon={<DownloadOutlined />}  shape="circle" />
                    )}
                    <Button type="text" icon={<EyeOutlined />}  shape="circle" />
                </Space>
            ),
        },
    ];

    const desktopAnalysisColumns: ColumnsType<Analysis> = [
        {
            title: 'Тип анализа',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Дата',
            dataIndex: 'date',
            key: 'date',
            width: 100,
        },
        {
            title: 'Статус',
            dataIndex: 'status',
            key: 'status',
            width: 90,
            render: (status: string) => (
                <Tag
                    
                    style={{
                        borderRadius: '12px',
                        border: 'none',
                        backgroundColor: status === 'готов' ? '#f6ffed' : '#e6f7ff',
                        color: status === 'готов' ? '#52c41a' : '#1890ff'
                    }}
                >
                    {status}
                </Tag>
            ),
        },
        {
            title: 'Результат',
            dataIndex: 'result',
            key: 'result',
            width: 90,
            render: (result?: string) => {
                if (!result) return '-';
                return (
                    <Tag
                        
                        style={{
                            borderRadius: '12px',
                            border: 'none',
                            backgroundColor: result === 'норма' ? '#f6ffed' : '#fff7e6',
                            color: result === 'норма' ? '#52c41a' : '#fa8c16'
                        }}
                    >
                        {result}
                    </Tag>
                );
            },
        },
        {
            title: '',
            key: 'actions',
            width: 80,
            render: (record: Analysis) => (
                <Space size={4}>
                    {record.status === 'готов' && (
                        <Button type="text" icon={<DownloadOutlined />}  shape="circle" />
                    )}
                    <Button type="text" icon={<EyeOutlined />}  shape="circle" />
                </Space>
            ),
        },
    ];

    // Тестовые данные
    const visitsData: Visit[] = [
        { id: '1', date: '15.03.24', service: 'Консультация терапевта', clinic: 'Клиника №1', status: 'завершен' },
        { id: '2', date: '10.04.24', service: 'УЗИ брюшной полости', clinic: 'Диагностический центр', status: 'завершен' },
        { id: '3', date: '20.05.24', service: 'Кардиологическая консультация', clinic: 'Клиника №2', status: 'запланирован' },
        { id: '4', date: '25.05.24', service: 'Анализ крови', clinic: 'Лаборатория', status: 'в ожидании' },
    ];

    const analysisData: Analysis[] = [
        { id: '1', type: 'Общий анализ крови', date: '10.03.24', status: 'готов', result: 'норма' },
        { id: '2', type: 'Биохимический анализ', date: '05.04.24', status: 'готов', result: 'аномалии' },
        { id: '3', type: 'Анализ мочи', date: '15.05.24', status: 'в процессе' },
        { id: '4', type: 'ЭКГ', date: '18.05.24', status: 'готов', result: 'норма' },
    ];

    const documentsData: Document[] = [
        { id: '1', name: 'Медицинская карта', type: 'PDF', uploadDate: '15.01.24', size: '2.3 MB' },
        { id: '2', name: 'Результаты анализов', type: 'PDF', uploadDate: '20.03.24', size: '1.8 MB' },
        { id: '3', name: 'Справка', type: 'PDF', uploadDate: '10.05.24', size: '0.9 MB' },
        { id: '4', name: 'Заключение УЗИ', type: 'PDF', uploadDate: '12.05.24', size: '1.2 MB' },
    ];

    // Обработчики событий
    const handleEditProfile = () => {
        form.setFieldsValue(patientInfo);
        setEditModalVisible(true);
    };

    const handleSaveProfile = async () => {
        try {
            const values = await form.validateFields();
            setPatientInfo({ ...patientInfo, ...values });
            setEditModalVisible(false);
            message.success('Профиль обновлен');
        } catch (error) {
            console.log('Validation failed:', error);
        }
    };

    const handleCopyReferralLink = () => {
        navigator.clipboard.writeText(referralData.referralLink);
        message.success('Ссылка скопирована');
    };

    const handleUseBonuses = () => {
        Modal.confirm({
            title: 'Использовать бонусы?',
            content: 'Применить бонусы для оплаты?',
            okText: 'Да',
            cancelText: 'Отмена',
            onOk: () => message.success('Бонусы применены'),
        });
    };

    const handleViewRecord = (record: MedicalRecord) => {
        setSelectedRecord(record);
        setMedicalRecordModalVisible(true);
    };

    const uploadProps: UploadProps = {
        name: 'file',
        multiple: false,
        showUploadList: false,
        beforeUpload: () => {
            message.success('Документ загружен');
            setDocumentModalVisible(false);
            return false;
        },
    };

    // Компактные статистики
    const StatCard = ({ title, value, suffix, icon, color, extra }: any) => (
        <div style={{
            padding: isMobile ? '16px' : '20px',
            background: color ? `${color}0a` : '#f0f8ff',
            borderRadius: '20px',
            textAlign: 'center',
            position: 'relative',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        }}>
            {icon && (
                <div style={{
                    color: color || '#1890ff',
                    fontSize: isMobile ? '20px' : '24px',
                    marginBottom: '12px'
                }}>
                    {icon}
                </div>
            )}
            <div style={{
                fontSize: isMobile ? '22px' : '26px',
                fontWeight: 700,
                color: color || '#1890ff',
                marginBottom: '6px'
            }}>
                {value}{suffix}
            </div>
            <div style={{
                fontSize: isMobile ? '12px' : '13px',
                color: '#666',
                lineHeight: 1.3,
                fontWeight: 500
            }}>
                {title}
            </div>
            {extra && (
                <div style={{ marginTop: '12px' }}>
                    {extra}
                </div>
            )}
        </div>
    );

    // Компактная карточка документа
    const DocumentCard = ({ doc }: { doc: Document }) => (
        <div style={{
            padding: '16px',
            background: '#ffffff',
            borderRadius: '16px',
            marginBottom: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                        fontWeight: 600,
                        fontSize: '14px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        marginBottom: '6px'
                    }}>
                        {doc.name}
                    </div>
                    <div style={{ fontSize: '12px', color: '#666', fontWeight: 500 }}>
                        {doc.type} • {doc.size} • {doc.uploadDate}
                    </div>
                </div>
                <Space size={6}>
                    <Button type="text" icon={<EyeOutlined />}  shape="circle" />
                    <Button type="text" icon={<DownloadOutlined />}  shape="circle" />
                </Space>
            </div>
        </div>
    );

    // Карточка медицинской записи
    const MedicalRecordCard = ({ record }: { record: MedicalRecord }) => (
        <div style={{
            padding: '16px',
            background: '#ffffff',
            borderRadius: '16px',
            marginBottom: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            cursor: 'pointer'
        }}
            onClick={() => handleViewRecord(record)}
        >
            <div style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div>
                        <Text strong style={{ fontSize: '15px' }}>{record.date}</Text>
                        <div style={{ fontSize: '13px', color: '#666', marginTop: '2px' }}>
                            {record.doctor} • {record.specialty}
                        </div>
                    </div>
                    <Button type="text" icon={<EyeOutlined />}  shape="circle" />
                </div>
                <div style={{
                    background: '#f8f9ff',
                    padding: '12px',
                    borderRadius: '12px',
                    marginBottom: '8px'
                }}>
                    <Text strong style={{ color: '#1890ff', fontSize: '13px' }}>Диагноз:</Text>
                    <div style={{ fontSize: '13px', marginTop: '4px' }}>{record.diagnosis}</div>
                </div>
                <div style={{ fontSize: '12px', color: '#666', lineHeight: 1.4 }}>
                    <strong>Жалобы:</strong> {record.complaints.length > 80 ? `${record.complaints.substring(0, 80)}...` : record.complaints}
                </div>
            </div>
        </div>
    );

    return (
        <div
        >
            <div>
                <div>
                    {/* Заголовок с действиями */}
                    {/* <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: isMobile ? '20px' : '28px'
                    }}>
                        <Title level={isMobile ? 4 : 2} style={{ margin: 0, fontWeight: 700 }}>
                            Профиль
                        </Title>
                        <Space size={10}>
                            <Button
                                type="primary"
                                icon={<EditOutlined />}
                                size={isMobile ? 'small' : 'middle'}
                                onClick={handleEditProfile}
                                shape="round"
                            >
                                {!isMobile && 'Редактировать'}
                            </Button>
                            <Button
                                icon={<SettingOutlined />}
                                size={isMobile ? 'small' : 'middle'}
                                onClick={() => setSettingsDrawerVisible(true)}
                                shape="round"
                            >
                                {!isMobile && 'Настройки'}
                            </Button>
                        </Space>
                    </div> */}

                    {/* Основная информация */}
                    <Card
                        
                        style={{
                            marginBottom: '20px',
                            borderRadius: '20px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                            border: 'none'
                        }}
                        bodyStyle={{ padding: isMobile ? '20px' : '24px' }}
                    >
                        <Row gutter={[16, 16]} align="middle">
                            <Col xs={6} sm={4} md={3}>
                                <Avatar
                                    size={isMobile ? 56 : 72}
                                    icon={<UserOutlined />}
                                    src={patientInfo.avatar}
                                    style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                />
                            </Col>
                            <Col xs={18} sm={20} md={21}>
                                <div>
                                    <Title level={isMobile ? 5 : 4} style={{ margin: 0, marginBottom: '8px', fontWeight: 700 }}>
                                        {patientInfo.fullName}
                                    </Title>
                                    <div style={{
                                        fontSize: isMobile ? '12px' : '13px',
                                        color: '#666',
                                        lineHeight: 1.5,
                                        fontWeight: 500
                                    }}>
                                        <div style={{ marginBottom: '4px' }}>
                                            <CalendarOutlined style={{ marginRight: '6px', color: '#1890ff' }} />
                                            {patientInfo.birthDate}
                                        </div>
                                        <div style={{ marginBottom: '4px' }}>
                                            <PhoneOutlined style={{ marginRight: '6px', color: '#1890ff' }} />
                                            {patientInfo.phone}
                                        </div>
                                        <div>
                                            <MailOutlined style={{ marginRight: '6px', color: '#1890ff' }} />
                                            {patientInfo.email}
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Card>

                    {/* Основные статистики */}
                    <Row gutter={[12, 12]} style={{ marginBottom: '20px' }}>
                        <Col xs={12} sm={6}>
                            <StatCard title="Уровень программы"
                                value={loyaltyData.level}
                                icon={<TrophyOutlined />}
                                color="#faad14"
                            />
                        </Col>
                        <Col xs={12} sm={6}>
                            <StatCard
                                title="Баланс бонусов"
                                value={loyaltyData.balance}
                                icon={<GiftOutlined />}
                                color="#52c41a"
                                extra={
                                    <Button
                                        type="primary"
                                        
                                        onClick={handleUseBonuses}
                                        style={{ fontSize: '11px' }}
                                    >
                                        Использовать
                                    </Button>
                                }
                            />
                        </Col>
                        <Col xs={12} sm={6}>
                            <StatCard
                                title="Приглашено друзей"
                                value={referralData.invitedCount}
                                icon={<TeamOutlined />}
                                color="#722ed1"
                            />
                        </Col>
                        <Col xs={12} sm={6}>
                            <StatCard
                                title="Заработано бонусов"
                                value={referralData.bonusesEarned}
                                icon={<StarOutlined />}
                                color="#eb2f96"
                            />
                        </Col>
                    </Row>

                    {/* Вкладки */}
                    <Card
                        
                        style={{
                            borderRadius: '20px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                            border: 'none'
                        }}
                        bodyStyle={{ padding: 0 }}
                    >
                        <Tabs
                            activeKey={activeTab}
                            onChange={setActiveTab}
                            size={isMobile ? 'small' : 'large'}
                            style={{ padding: isMobile ? '16px' : '20px' }}
                            items={[
                                {
                                    key: '1',
                                    label: (
                                        <span style={{ fontSize: isMobile ? '12px' : '14px', fontWeight: 600 }}>
                                            <CalendarOutlined style={{ marginRight: '6px' }} />
                                            Визиты
                                        </span>
                                    ),
                                    children: (
                                        <div style={{ marginTop: '16px' }}>
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                marginBottom: '16px'
                                            }}>
                                                <Text strong style={{ fontSize: '16px' }}>История визитов</Text>
                                                <Button
                                                    type="primary"
                                                    
                                                    icon={<PlusOutlined />}
                                                    style={{ borderRadius: '16px' }}
                                                >
                                                    Записаться
                                                </Button>
                                            </div>
                                            <Table
                                                dataSource={visitsData}
                                                columns={isMobile ? mobileVisitColumns : desktopVisitColumns}
                                                pagination={false}
                                                
                                                rowKey="id"
                                                style={{
                                                    background: 'transparent',
                                                }}
                                            />
                                        </div>
                                    ),
                                },
                                {
                                    key: '2',
                                    label: (
                                        <span style={{ fontSize: isMobile ? '12px' : '14px', fontWeight: 600 }}>
                                            <ExperimentOutlined style={{ marginRight: '6px' }} />
                                            Анализы
                                        </span>
                                    ),
                                    children: (
                                        <div style={{ marginTop: '16px' }}>
                                            <Text strong style={{ fontSize: '16px', marginBottom: '16px', display: 'block' }}>
                                                Результаты анализов
                                            </Text>
                                            <Table
                                                dataSource={analysisData}
                                                columns={isMobile ? mobileAnalysisColumns : desktopAnalysisColumns}
                                                pagination={false}
                                                
                                                rowKey="id"
                                                style={{
                                                    background: 'transparent',
                                                }}
                                            />
                                        </div>
                                    ),
                                },
                                {
                                    key: '3',
                                    label: (
                                        <span style={{ fontSize: isMobile ? '12px' : '14px', fontWeight: 600 }}>
                                            <FolderOutlined style={{ marginRight: '6px' }} />
                                            Документы
                                        </span>
                                    ),
                                    children: (
                                        <div style={{ marginTop: '16px' }}>
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                marginBottom: '16px'
                                            }}>
                                                <Text strong style={{ fontSize: '16px' }}>Медицинские документы</Text>
                                                <Button
                                                    type="primary"
                                                    
                                                    icon={<PlusOutlined />}
                                                    onClick={() => setDocumentModalVisible(true)}
                                                    style={{ borderRadius: '16px' }}
                                                >
                                                    Загрузить
                                                </Button>
                                            </div>
                                            {documentsData.map(doc => (
                                                <DocumentCard key={doc.id} doc={doc} />
                                            ))}
                                        </div>
                                    ),
                                },
                                {
                                    key: '4',
                                    label: (
                                        <span style={{ fontSize: isMobile ? '12px' : '14px', fontWeight: 600 }}>
                                            <MedicineBoxOutlined style={{ marginRight: '6px' }} />
                                            Мед. карта
                                        </span>
                                    ),
                                    children: (
                                        <div style={{ marginTop: '16px' }}>
                                            <Collapse
                                                ghost
                                                expandIconPosition="end"
                                                style={{ background: 'transparent' }}
                                            >
                                                <Panel
                                                    header={
                                                        <Text strong style={{ fontSize: '16px' }}>
                                                            Амбулаторная карта
                                                        </Text>
                                                    }
                                                    key="records"
                                                >
                                                    {medicalRecords.map(record => (
                                                        <MedicalRecordCard key={record.id} record={record} />
                                                    ))}
                                                </Panel>
                                                <Panel
                                                    header={
                                                        <Text strong style={{ fontSize: '16px' }}>
                                                            Аллергии
                                                        </Text>
                                                    }
                                                    key="allergies"
                                                >
                                                    {allergies.length > 0 ? (
                                                        allergies.map(allergy => (
                                                            <Alert
                                                                key={allergy.id}
                                                                message={allergy.allergen}
                                                                description={
                                                                    <div>
                                                                        <div>Реакция: {allergy.reaction}</div>
                                                                        <div>Степень: {allergy.severity}</div>
                                                                        <div>Выявлено: {allergy.dateDetected}</div>
                                                                    </div>
                                                                }
                                                                type={allergy.severity === 'тяжелая' ? 'error' : allergy.severity === 'средняя' ? 'warning' : 'info'}
                                                                showIcon
                                                                style={{ marginBottom: '12px', borderRadius: '12px' }}
                                                            />
                                                        ))
                                                    ) : (
                                                        <Text type="secondary">Аллергии не зарегистрированы</Text>
                                                    )}
                                                </Panel>
                                                <Panel
                                                    header={
                                                        <Text strong style={{ fontSize: '16px' }}>
                                                            Хронические заболевания
                                                        </Text>
                                                    }
                                                    key="chronic"
                                                >
                                                    {chronicDiseases.length > 0 ? (
                                                        chronicDiseases.map(disease => (
                                                            <div
                                                                key={disease.id}
                                                                style={{
                                                                    padding: '16px',
                                                                    background: '#f8f9fa',
                                                                    borderRadius: '12px',
                                                                    marginBottom: '12px'
                                                                }}
                                                            >
                                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                                    <div>
                                                                        <Text strong>{disease.name}</Text>
                                                                        <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                                                                            Выявлено: {disease.dateDetected}
                                                                        </div>
                                                                        <div style={{ fontSize: '12px', color: '#666' }}>
                                                                            Обновлено: {disease.lastUpdate}
                                                                        </div>
                                                                    </div>
                                                                    <Tag
                                                                        color={
                                                                            disease.status === 'ремиссия' ? 'green' :
                                                                                disease.status === 'стабильное' ? 'blue' : 'orange'
                                                                        }
                                                                        style={{ borderRadius: '12px' }}
                                                                    >
                                                                        {disease.status}
                                                                    </Tag>
                                                                </div>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <Text type="secondary">Хронические заболевания не зарегистрированы</Text>
                                                    )}
                                                </Panel>
                                                <Panel
                                                    header={
                                                        <Text strong style={{ fontSize: '16px' }}>
                                                            Текущие препараты
                                                        </Text>
                                                    }
                                                    key="medications"
                                                >
                                                    {currentMedications.length > 0 ? (
                                                        currentMedications.map(med => (
                                                            <div
                                                                key={med.id}
                                                                style={{
                                                                    padding: '16px',
                                                                    background: '#f0f8ff',
                                                                    borderRadius: '12px',
                                                                    marginBottom: '12px'
                                                                }}
                                                            >
                                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                                    <div>
                                                                        <Text strong>{med.name}</Text>
                                                                        <div style={{ fontSize: '13px', color: '#666', marginTop: '4px' }}>
                                                                            {med.dosage} • {med.frequency}
                                                                        </div>
                                                                        <div style={{ fontSize: '12px', color: '#666' }}>
                                                                            Назначил: {med.prescribedBy}
                                                                        </div>
                                                                        <div style={{ fontSize: '12px', color: '#666' }}>
                                                                            С {med.startDate}
                                                                        </div>
                                                                    </div>
                                                                    <Tag
                                                                        color={
                                                                            med.status === 'активно' ? 'green' :
                                                                                med.status === 'завершено' ? 'blue' : 'red'
                                                                        }
                                                                        style={{ borderRadius: '12px' }}
                                                                    >
                                                                        {med.status}
                                                                    </Tag>
                                                                </div>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <Text type="secondary">Текущие препараты не назначены</Text>
                                                    )}
                                                </Panel>
                                            </Collapse>
                                        </div>
                                    ),
                                },
                            ]}
                        />
                    </Card>
                </div>

                {/* Модальное окно редактирования профиля */}
                <Modal
                    title="Редактировать профиль"
                    open={editModalVisible}
                    onOk={handleSaveProfile}
                    onCancel={() => setEditModalVisible(false)}
                    okText="Сохранить"
                    cancelText="Отмена"
                    width={isMobile ? '90%' : 600}
                >
                    <Form form={form} layout="vertical" style={{ marginTop: '20px' }}>
                        <Form.Item
                            name="fullName"
                            label="ФИО"
                            rules={[{ required: true, message: 'Введите ФИО' }]}
                        >
                            <Input placeholder="Введите ФИО" />
                        </Form.Item>
                        <Form.Item
                            name="birthDate"
                            label="Дата рождения"
                            rules={[{ required: true, message: 'Введите дату рождения' }]}
                        >
                            <Input placeholder="ДД.ММ.ГГГГ" />
                        </Form.Item>
                        <Form.Item
                            name="phone"
                            label="Телефон"
                            rules={[{ required: true, message: 'Введите телефон' }]}
                        >
                            <Input placeholder="+7 (999) 123-45-67" />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                { required: true, message: 'Введите email' },
                                { type: 'email', message: 'Некорректный email' }
                            ]}
                        >
                            <Input placeholder="example@email.com" />
                        </Form.Item>
                    </Form>
                </Modal>

                {/* Модальное окно загрузки документа */}
                <Modal
                    title="Загрузить документ"
                    open={documentModalVisible}
                    onCancel={() => setDocumentModalVisible(false)}
                    footer={null}
                    width={isMobile ? '90%' : 500}
                >
                    <Upload.Dragger {...uploadProps} style={{ marginTop: '20px' }}>
                        <p className="ant-upload-drag-icon">
                            <FileTextOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                        </p>
                        <p className="ant-upload-text">Нажмите или перетащите файл для загрузки</p>
                        <p className="ant-upload-hint">
                            Поддерживаются форматы: PDF, JPG, PNG, DOC, DOCX
                        </p>
                    </Upload.Dragger>
                </Modal>

                {/* Модальное окно просмотра медицинской записи */}
                <Modal
                    title="Медицинская запись"
                    open={medicalRecordModalVisible}
                    onCancel={() => setMedicalRecordModalVisible(false)}
                    footer={[
                        <Button key="print" icon={<PrinterOutlined />}>
                            Печать
                        </Button>,
                        <Button key="close" onClick={() => setMedicalRecordModalVisible(false)}>
                            Закрыть
                        </Button>,
                    ]}
                    width={isMobile ? '95%' : 800}
                >
                    {selectedRecord && (
                        <div style={{ marginTop: '20px' }}>
                            <Row gutter={[16, 16]}>
                                <Col span={12}>
                                    <Text strong>Дата:</Text>
                                    <div>{selectedRecord.date}</div>
                                </Col>
                                <Col span={12}>
                                    <Text strong>Врач:</Text>
                                    <div>{selectedRecord.doctor}</div>
                                </Col>
                                <Col span={12}>
                                    <Text strong>Специальность:</Text>
                                    <div>{selectedRecord.specialty}</div>
                                </Col>
                                {selectedRecord.nextVisit && (
                                    <Col span={12}>
                                        <Text strong>Следующий визит:</Text>
                                        <div>{selectedRecord.nextVisit}</div>
                                    </Col>
                                )}
                            </Row>

                            <Divider />

                            <div style={{ marginBottom: '16px' }}>
                                <Text strong style={{ color: '#1890ff' }}>Диагноз:</Text>
                                <div style={{
                                    background: '#f0f8ff',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    marginTop: '8px'
                                }}>
                                    {selectedRecord.diagnosis}
                                </div>
                            </div>

                            <div style={{ marginBottom: '16px' }}>
                                <Text strong>Жалобы:</Text>
                                <div style={{ marginTop: '8px', lineHeight: 1.6 }}>
                                    {selectedRecord.complaints}
                                </div>
                            </div>

                            <div style={{ marginBottom: '16px' }}>
                                <Text strong>Осмотр:</Text>
                                <div style={{ marginTop: '8px', lineHeight: 1.6 }}>
                                    {selectedRecord.examination}
                                </div>
                            </div>

                            <div style={{ marginBottom: '16px' }}>
                                <Text strong>Лечение:</Text>
                                <div style={{ marginTop: '8px', lineHeight: 1.6 }}>
                                    {selectedRecord.treatment}
                                </div>
                            </div>

                            <div style={{ marginBottom: '16px' }}>
                                <Text strong>Рекомендации:</Text>
                                <div style={{ marginTop: '8px', lineHeight: 1.6 }}>
                                    {selectedRecord.recommendations}
                                </div>
                            </div>
                        </div>
                    )}
                </Modal>

                {/* Drawer настроек */}
                <Drawer
                    title="Настройки"
                    placement="right"
                    onClose={() => setSettingsDrawerVisible(false)}
                    open={settingsDrawerVisible}
                    width={isMobile ? '85%' : 400}
                >
                    <div style={{ marginBottom: '24px' }}>
                        <Title level={5} style={{ marginBottom: '16px' }}>
                            <BellOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
                            Уведомления
                        </Title>
                        <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text>Email уведомления</Text>
                            <Switch defaultChecked />
                        </div>
                        <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text>SMS уведомления</Text>
                            <Switch defaultChecked />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text>Push уведомления</Text>
                            <Switch />
                        </div>
                    </div>

                    <Divider />

                    <div style={{ marginBottom: '24px' }}>
                        <Title level={5} style={{ marginBottom: '16px' }}>
                            <LockOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
                            Безопасность
                        </Title>
                        <Button
                            block
                            style={{ marginBottom: '12px', textAlign: 'left' }}
                            onClick={() => setPasswordModalVisible(true)}
                        >
                            Изменить пароль
                        </Button>
                        <Button block style={{ textAlign: 'left' }}>
                            Двухфакторная аутентификация
                        </Button>
                    </div>

                    <Divider />

                    <div style={{ marginBottom: '24px' }}>
                        <Title level={5} style={{ marginBottom: '16px' }}>
                            <ShareAltOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
                            Реферальная программа
                        </Title>
                        <div style={{
                            background: '#f0f8ff',
                            padding: '16px',
                            borderRadius: '12px',
                            marginBottom: '12px'
                        }}>
                            <Text style={{ fontSize: '12px' }}>Ваша реферальная ссылка:</Text>
                            <div style={{
                                background: '#ffffff',
                                padding: '8px',
                                borderRadius: '8px',
                                marginTop: '8px',
                                fontSize: '12px',
                                wordBreak: 'break-all'
                            }}>
                                {referralData.referralLink}
                            </div>
                        </div>
                        <Button
                            block
                            type="primary"
                            icon={<CopyOutlined />}
                            onClick={handleCopyReferralLink}
                        >
                            Скопировать ссылку
                        </Button>
                    </div>

                    <Divider />

                    <div>
                        <Title level={5} style={{ marginBottom: '16px' }}>
                            <HeartOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
                            Программа лояльности
                        </Title>
                        <div style={{
                            background: '#f6ffed',
                            padding: '16px',
                            borderRadius: '12px'
                        }}>
                            <div style={{ marginBottom: '12px' }}>
                                <Text>Уровень: <Text strong>{loyaltyData.level}</Text></Text>
                            </div>
                            <div style={{ marginBottom: '12px' }}>
                                <Text>Прогресс до следующего уровня:</Text>
                                <Progress
                                    percent={loyaltyData.progress}
                                    
                                    style={{ marginTop: '8px' }}
                                />
                            </div>
                            <div style={{ fontSize: '12px', color: '#666' }}>
                                Заработано: {loyaltyData.earnedPoints} • Потрачено: {loyaltyData.usedPoints}
                            </div>
                        </div>
                    </div>
                </Drawer>

                {/* Модальное окно смены пароля */}
                <Modal
                    title="Изменить пароль"
                    open={passwordModalVisible}
                    onOk={() => {
                        passwordForm.validateFields().then(() => {
                            setPasswordModalVisible(false);
                            message.success('Пароль изменен');
                            passwordForm.resetFields();
                        });
                    }}
                    onCancel={() => {
                        setPasswordModalVisible(false);
                        passwordForm.resetFields();
                    }}
                    okText="Изменить"
                    cancelText="Отмена"
                    width={isMobile ? '90%' : 500}
                >
                    <Form form={passwordForm} layout="vertical" style={{ marginTop: '20px' }}>
                        <Form.Item
                            name="currentPassword"
                            label="Текущий пароль"
                            rules={[{ required: true, message: 'Введите текущий пароль' }]}
                        >
                            <Input.Password placeholder="Введите текущий пароль" />
                        </Form.Item>
                        <Form.Item
                            name="newPassword"
                            label="Новый пароль"
                            rules={[
                                { required: true, message: 'Введите новый пароль' },
                                { min: 6, message: 'Пароль должен содержать минимум 6 символов' }
                            ]}
                        >
                            <Input.Password placeholder="Введите новый пароль" />
                        </Form.Item>
                        <Form.Item
                            name="confirmPassword"
                            label="Подтвердите пароль"
                            dependencies={['newPassword']}
                            rules={[
                                { required: true, message: 'Подтвердите пароль' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('newPassword') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Пароли не совпадают'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password placeholder="Подтвердите новый пароль" />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </div>
    );
};

export default PatientProfile;