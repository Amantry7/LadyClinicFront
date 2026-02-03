import React, { useState, useEffect } from 'react';
import {
    Card,
    Avatar,
    Typography,
    Form,
    Input,
    Select,
    DatePicker,
    Button,
    Space,
    Divider,
    Tag,
    Row,
    Col,
    Statistic,
    Badge,
    message,
    Spin,
    Upload,
    Tooltip,
    Switch,
    InputNumber,
} from 'antd';
import {
    UserOutlined,
    EditOutlined,
    SaveOutlined,
    CloseOutlined,
    PhoneOutlined,
    MailOutlined,
    CalendarOutlined,
    TrophyOutlined,
    TeamOutlined,
    CameraOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import type { User, UserRole, UserGender, LoyaltyLevel } from '@/shared/types/api';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux-hooks';
import { fetchUserById, updateUser } from '@/entities/user/model/user-slice';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;



const UserProfile: React.FC = () => {
    const dispatch = useAppDispatch();
    const { currentUser, loading, error } = useAppSelector((state) => state.user);
    const [form] = Form.useForm();
    const [isEditing, setIsEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const userId = Number(localStorage.getItem('user_id')) || 5
    useEffect(() => {
        if (userId) {
            dispatch(fetchUserById(userId));
        }
    }, [dispatch, userId]);

    useEffect(() => {
        if (currentUser && !isEditing) {
            form.setFieldsValue({
                ...currentUser,
                birth_date: currentUser.birth_date ? dayjs(currentUser.birth_date) : null,
            });
        }
    }, [currentUser, form, isEditing]);

    const handleEdit = () => {
        setIsEditing(true);
        form.setFieldsValue({
            ...currentUser,
            birth_date: currentUser?.birth_date ? dayjs(currentUser.birth_date) : null,
        });
    };

    const handleCancel = () => {
        setIsEditing(false);
        form.resetFields();
    };

    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            setSaving(true);

            const updateData = {
                ...values,
                birth_date: values.birth_date ? values.birth_date.format('YYYY-MM-DD') : null,
            };

            await dispatch(updateUser({ id: userId, userData: updateData })).unwrap();
            setIsEditing(false);
            message.success('Профиль успешно обновлен!');
        } catch (error) {
            message.error('Ошибка при сохранении профиля');
        } finally {
            setSaving(false);
        }
    };

    const getRoleColor = (role?: UserRole) => {
        const colors = {
            patient: 'blue',
            doctor: 'green',
            admin: 'red',
            lab_tech: 'orange',
            registrar: 'purple',
        };
        return colors[role || 'patient'];
    };

    const getRoleText = (role?: UserRole) => {
        const texts = {
            patient: 'Пациент',
            doctor: 'Врач',
            admin: 'Администратор',
            lab_tech: 'Лабораторный техник',
            registrar: 'Регистратор',
        };
        return texts[role || 'patient'];
    };

    const getLoyaltyColor = (level?: LoyaltyLevel) => {
        const colors = {
            basic: '#8c8c8c',
            silver: '#c0c0c0',
            gold: '#ffd700',
        };
        return colors[level || 'basic'];
    };

    const getLoyaltyText = (level?: LoyaltyLevel) => {
        const texts = {
            basic: 'Базовый',
            silver: 'Серебряный',
            gold: 'Золотой',
        };
        return texts[level || 'basic'];
    };

    if (loading && !currentUser) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
                <Spin size="large" />
            </div>
        );
    }

    // if (error) {
    //     return (
    //         <Card>
    //             <div style={{ textAlign: 'center', color: '#ff4d4f' }}>
    //                 <CloseCircleOutlined style={{ fontSize: '48px', marginBottom: '16px' }} />
    //                 <Title level={4}>Ошибка загрузки профиля</Title>
    //                 <Text>{error}</Text>
    //             </div>
    //         </Card>
    //     );
    // }

    if (!currentUser) {
        return (
            <Card>
                <div style={{ textAlign: 'center' }}>
                    <Title level={4}>Пользователь не найден</Title>
                </div>
            </Card>
        );
    }

    const fullName = [currentUser.first_name, currentUser.middle_name, currentUser.last_name]
        .filter(Boolean)
        .join(' ');

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
            {/* Header Card */}
            <Card
                style={{ marginBottom: '24px' }}
                bodyStyle={{ padding: '32px' }}
            >
                <Row gutter={[24, 24]} align="middle">
                    <Col xs={24} sm={8} md={6} style={{ textAlign: 'center' }}>
                        <Badge
                            count={
                                currentUser.is_phone_verified ? (
                                    <CheckCircleOutlined style={{ color: '#52c41a', fontSize: '20px' }} />
                                ) : (
                                    <CloseCircleOutlined style={{ color: '#ff4d4f', fontSize: '20px' }} />
                                )
                            }
                            offset={[-10, 10]}
                        >
                            <Avatar
                                size={120}
                                icon={<UserOutlined />}
                                style={{
                                    backgroundColor: getLoyaltyColor(currentUser.loyalty_level),
                                    border: `3px solid ${getLoyaltyColor(currentUser.loyalty_level)}`,
                                }}
                            />
                        </Badge>
                        {!isEditing && (
                            <div style={{ marginTop: '16px' }}>
                                <Upload showUploadList={false}>
                                    <Button icon={<CameraOutlined />} type="dashed" size="small">
                                        Изменить фото
                                    </Button>
                                </Upload>
                            </div>
                        )}
                    </Col>

                    <Col xs={24} sm={16} md={12}>
                        <div>
                            <Title level={2} style={{ marginBottom: '8px' }}>
                                {fullName || currentUser.username}
                            </Title>

                            <Space size="middle" wrap style={{ marginBottom: '16px' }}>
                                <Tag color={getRoleColor(currentUser.role)} icon={<UserOutlined />}>
                                    {getRoleText(currentUser.role)}
                                </Tag>

                                {currentUser.loyalty_level && (
                                    <Tag color={getLoyaltyColor(currentUser.loyalty_level)} icon={<TrophyOutlined />}>
                                        {getLoyaltyText(currentUser.loyalty_level)}
                                    </Tag>
                                )}

                                {currentUser.is_phone_verified && (
                                    <Tag color="success" icon={<CheckCircleOutlined />}>
                                        Телефон подтвержден
                                    </Tag>
                                )}
                            </Space>

                            <div>
                                {currentUser.phone && (
                                    <div style={{ marginBottom: '8px' }}>
                                        <PhoneOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
                                        <Text>{currentUser.phone}</Text>
                                    </div>
                                )}

                                {currentUser.patient_uid && (
                                    <div style={{ marginBottom: '8px' }}>
                                        <Text type="secondary">ID пациента: {currentUser.patient_uid}</Text>
                                    </div>
                                )}

                                {currentUser.referral_code && (
                                    <div>
                                        <Text type="secondary">Реферальный код: </Text>
                                        <Text code copyable>{currentUser.referral_code}</Text>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Col>

                    <Col xs={24} sm={24} md={6}>
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <Statistic
                                title="Баллы лояльности"
                                value={currentUser.loyalty_points || 0}
                                suffix="баллов"
                                valueStyle={{ color: getLoyaltyColor(currentUser.loyalty_level) }}
                            />

                            {currentUser.referral_count !== undefined && (
                                <Statistic
                                    title="Приглашенных друзей"
                                    value={currentUser.referral_count}
                                    prefix={<TeamOutlined />}
                                />
                            )}
                        </Space>
                    </Col>
                </Row>

                <Divider />

                <div style={{ textAlign: 'right' }}>
                    {!isEditing ? (
                        <Button
                            type="primary"
                            icon={<EditOutlined />}
                            onClick={handleEdit}
                        >
                            Редактировать профиль
                        </Button>
                    ) : (
                        <Space>
                            <Button
                                icon={<CloseOutlined />}
                                onClick={handleCancel}
                            >
                                Отмена
                            </Button>
                            <Button
                                type="primary"
                                icon={<SaveOutlined />}
                                loading={saving}
                                onClick={handleSave}
                            >
                                Сохранить
                            </Button>
                        </Space>
                    )}
                </div>
            </Card>

            {/* Profile Form */}
            <Card title="Личная информация">
                <Form
                    form={form}
                    layout="vertical"
                    disabled={!isEditing}
                >
                    <Row gutter={[16, 0]}>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item
                                label="Имя"
                                name="first_name"
                                rules={[{ required: true, message: 'Пожалуйста, введите имя' }]}
                            >
                                <Input placeholder="Введите имя" />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12} md={8}>
                            <Form.Item
                                label="Отчество"
                                name="middle_name"
                            >
                                <Input placeholder="Введите отчество" />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12} md={8}>
                            <Form.Item
                                label="Фамилия"
                                name="last_name"
                            >
                                <Input placeholder="Введите фамилию" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={[16, 0]}>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item
                                label="Имя пользователя"
                                name="username"
                                rules={[{ required: true, message: 'Пожалуйста, введите имя пользователя' }]}
                            >
                                <Input placeholder="Введите имя пользователя" />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12} md={8}>
                            <Form.Item
                                label="Телефон"
                                name="phone"
                            >
                                <Input placeholder="Введите номер телефона" />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12} md={8}>
                            <Form.Item
                                label="Дата рождения"
                                name="birth_date"
                            >
                                <DatePicker
                                    style={{ width: '100%' }}
                                    placeholder="Выберите дату рождения"
                                    format="DD.MM.YYYY"
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={[16, 0]}>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item
                                label="Пол"
                                name="gender"
                            >
                                <Select placeholder="Выберите пол">
                                    <Option value="M">Мужской</Option>
                                    <Option value="F">Женский</Option>
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12} md={8}>
                            <Text type="secondary" style={{ marginBottom: '8px' }}>
                                <strong>Роль: </strong>
                                {currentUser.role ? currentUser.role : 'Не указано'}
                            </Text>
                        </Col>

                        <Col xs={24} sm={12} md={8}>
                            <Text type="secondary" style={{ marginBottom: '8px' }}>
                                <strong>Уровень лояльности: </strong>
                                {currentUser.loyalty_level ? currentUser.loyalty_level : 'Не указано'}
                            </Text>
                        </Col>
                    </Row>

                    <Row gutter={[16, 0]}>
                        <Col xs={24} sm={12}>
                            <Text type="secondary" style={{ marginBottom: '8px' }}>
                                <strong>Специальность: </strong>
                                {currentUser.specialty ? currentUser.specialty : 'Не указано'}
                            </Text>
                        </Col>

                        <Col xs={24} sm={12}>
                            <Text type="secondary" style={{ marginBottom: '8px' }}>
                                <strong>ID бейджа: </strong>
                                {currentUser.badge_id ? currentUser.badge_id : 'Не указано'}
                            </Text>
                        </Col>
                    </Row>



                    <Row gutter={[16, 0]}>
                        <Col xs={24} sm={12}>
                            <Text type="secondary" style={{ marginBottom: '8px' }}>
                                <strong>GUID карты (репродукция): </strong>
                                {currentUser.card_guid_reproduction ? currentUser.card_guid_reproduction : 'Не указано'}
                            </Text>
                        </Col>

                        <Col xs={24} sm={12}>
                            <Text type="secondary" style={{ marginBottom: '8px' }}>
                                <strong>GUID карты (женская клиника): </strong>
                                {currentUser.card_guid_lady_clinic ? currentUser.card_guid_lady_clinic : 'Не указано'}
                            </Text>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </div>
    );
};

export default UserProfile;