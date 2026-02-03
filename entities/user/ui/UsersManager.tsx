'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  Table,
  Button,
  Space,
  Tag,
  Drawer,
  Descriptions,
  Modal,
  Form,
  Input,
  Select,
  Popconfirm,
  App,
  Row,
  Col,
} from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, ReloadOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux-hooks';
import {
  fetchUsers,
  fetchUserById,
  createUser,
  updateUser,
  deleteUser,
  clearCurrentUser,
} from '@/entities/user/model/user-slice';
import type { User } from '@/shared/types/api';

type CreateUserDTO = Omit<User, 'id' | 'patient_uid'>;
type UpdateUserDTO = Partial<User>;

const DEFAULT_PAGE_SIZE = 10;

const roleColor = (role?: string) => {
  switch (role) {
    case 'admin':
      return 'red';
    case 'doctor':
      return 'geekblue';
    case 'patient':
      return 'green';
    default:
      return 'default';
  }
};

export default function UsersManager() {
  const dispatch = useAppDispatch();
  const { users, loading, error, count, currentUser } = useAppSelector((s) => s.user);

  // table state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  // ui state
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  const [search, setSearch] = useState(''); // клиентский поиск (если API не поддерживает query)
  const [form] = Form.useForm<CreateUserDTO | UpdateUserDTO>();
  const { message } = App.useApp();

  // Fetch list
  useEffect(() => {
    const offset = (page - 1) * pageSize;
    dispatch(fetchUsers({ limit: pageSize, offset }));
  }, []);

  // open view drawer
  const openView = async (id: number) => {
    await dispatch(fetchUserById(id));
    setViewOpen(true);
  };

  // open edit modal
  const openEdit = async (id: number) => {
    const res = await dispatch(fetchUserById(id));
    const u = (res as any).payload as User | undefined;
    if (u) {
      // подставляем текущие поля в форму
      form.setFieldsValue({
        username: u.username,
        first_name: u.first_name,
        last_name: u.last_name,
        middle_name: u.middle_name,
        phone: u.phone ?? '',
        role: u.role,
        gender: (u as any).gender ?? '',
        loyalty_level: (u as any).loyalty_level ?? '',
        // добавь другие поля по необходимости
      } as any);
      setEditOpen(true);
    }
  };

  const openCreate = () => {
    form.resetFields();
    setCreateOpen(true);
  };

  const handleDelete = async (id: number) => {
    const res = await dispatch(deleteUser(id));
    if ((res as any).error) {
      message.error('Не удалось удалить пользователя');
    } else {
      message.success('Пользователь удалён');
      // перезагрузка текущей страницы (на случай, если удалили последнюю запись)
      const offset = (page - 1) * pageSize;
      dispatch(fetchUsers({ limit: pageSize, offset }));
      if (currentUser?.id === id) dispatch(clearCurrentUser());
    }
  };

  const handleCreate = async () => {
    try {
      const values = (await form.validateFields()) as CreateUserDTO;
      const res = await dispatch(createUser(values as any));
      if ((res as any).error) {
        message.error('Ошибка при создании пользователя');
        return;
      }
      message.success('Пользователь создан');
      setCreateOpen(false);
      form.resetFields();
      const offset = (page - 1) * pageSize;
      dispatch(fetchUsers({ limit: pageSize, offset }));
    } catch {
      /* валидация упала — ничего не делаем */
    }
  };

  const handleUpdate = async () => {
    if (!currentUser?.id) return;
    try {
      const values = (await form.validateFields()) as UpdateUserDTO;
      const res = await dispatch(updateUser({ id: currentUser.id, userData: values }));
      if ((res as any).error) {
        message.error('Ошибка при обновлении');
        return;
      }
      message.success('Изменения сохранены');
      setEditOpen(false);
      const offset = (page - 1) * pageSize;
      dispatch(fetchUsers({ limit: pageSize, offset }));
    } catch {
      /* валидация упала — ничего не делаем */
    }
  };

  const filteredUsers = useMemo(() => {
    if (!search.trim()) return users;
    const q = search.toLowerCase();
    return users.filter((u) => {
      const full = `${u.first_name ?? ''} ${u.last_name ?? ''} ${u.username ?? ''} ${u.phone ?? ''}`.toLowerCase();
      return full.includes(q);
    });
  }, [users, search]);

  const columns: ColumnsType<User> = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 80,
      sorter: (a, b) => Number(a.id) - Number(b.id),
    },
    {
      title: 'Имя',
      dataIndex: 'first_name',
      render: (_: any, r: User) => {
        const full = [r.last_name, r.first_name, (r as any).middle_name].filter(Boolean).join(' ');
        return full || '—';
      },
    },
    {
      title: 'Username / Email',
      dataIndex: 'username',
    },
    {
      title: 'Телефон',
      dataIndex: 'phone',
      render: (v) => v ?? '—',
    },
    {
      title: 'Роль',
      dataIndex: 'role',
      render: (role: any) => <Tag color={roleColor(role)}>{role ?? '—'}</Tag>,
      filters: [
        { text: 'admin', value: 'admin' },
        { text: 'doctor', value: 'doctor' },
        { text: 'patient', value: 'patient' },
      ],
      onFilter: (val, record) => String(record.role) === String(val),
      width: 120,
    },
    {
      title: 'Лояльность',
      dataIndex: 'loyalty_level',
      render: (_: any, r: any) => r?.loyalty_level ?? '—',
      width: 140,
    },
    {
      title: 'Действия',
      key: 'actions',
      fixed: 'right',
      width: 180,
      render: (_: any, r: User) => (
        <Space>
          <Button size="small" icon={<EyeOutlined />} onClick={() => openView(r.id)}>
            Открыть
          </Button>
          <Button size="small" icon={<EditOutlined />} onClick={() => openEdit(r.id)}>
            Править
          </Button>
          <Popconfirm
            title="Удалить пользователя?"
            okText="Да"
            cancelText="Нет"
            onConfirm={() => handleDelete(r.id)}
          >
            <Button size="small" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const pagination: TablePaginationConfig = {
    current: page,
    pageSize,
    total: count,
    showSizeChanger: true,
    pageSizeOptions: [5, 10, 20, 50, 100],
    onChange: (p, ps) => {
      setPage(p);
      setPageSize(ps);
    },
  };

  const refresh = () => {
    const offset = (page - 1) * pageSize;
    dispatch(fetchUsers({ limit: pageSize, offset }));
  };

  return (
    <Space direction="vertical" size="large" style={{ display: 'block' }}>
      <Row gutter={[12, 12]} align="middle">
        <Col xs={24} sm={12} md={8} lg={6}>
          <Input.Search
            allowClear
            placeholder="Поиск по имени, email, телефону"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col flex="auto" />
        <Col>
          <Space>
            <Button icon={<ReloadOutlined />} onClick={refresh}>
              Обновить
            </Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>
              Новый пользователь
            </Button>
          </Space>
        </Col>
      </Row>

      <Table<User>
        rowKey="id"
        columns={columns}
        dataSource={filteredUsers}
        loading={loading}
        pagination={pagination}
        scroll={{ x: 900 }}
      />

      {/* Просмотр */}
      <Drawer
        open={viewOpen}
        onClose={() => {
          setViewOpen(false);
          dispatch(clearCurrentUser());
        }}
        title="Профиль пользователя"
        width={520}
      >
        <Descriptions column={1} bordered size="small">
          <Descriptions.Item label="ID">{currentUser?.id ?? '—'}</Descriptions.Item>
          <Descriptions.Item label="ФИО">
            {currentUser
              ? [currentUser.last_name, currentUser.first_name, (currentUser as any).middle_name]
                  .filter(Boolean)
                  .join(' ')
              : '—'}
          </Descriptions.Item>
          <Descriptions.Item label="Email/Username">{currentUser?.username ?? '—'}</Descriptions.Item>
          <Descriptions.Item label="Телефон">{currentUser?.phone ?? '—'}</Descriptions.Item>
          <Descriptions.Item label="Роль">
            {currentUser?.role ? <Tag color={roleColor(currentUser.role)}>{currentUser.role}</Tag> : '—'}
          </Descriptions.Item>
          <Descriptions.Item label="Пол">{(currentUser as any)?.gender ?? '—'}</Descriptions.Item>
          <Descriptions.Item label="Уровень лояльности">
            {(currentUser as any)?.loyalty_level ?? '—'}
          </Descriptions.Item>
          <Descriptions.Item label="Баллы">{(currentUser as any)?.loyalty_points ?? '—'}</Descriptions.Item>
          <Descriptions.Item label="Patient UID">{(currentUser as any)?.patient_uid ?? '—'}</Descriptions.Item>
          <Descriptions.Item label="Реф. код">{(currentUser as any)?.referral_code ?? '—'}</Descriptions.Item>
        </Descriptions>
      </Drawer>

      {/* Создание */}
      <Modal
        open={createOpen}
        title="Новый пользователь"
        okText="Создать"
        onOk={handleCreate}
        onCancel={() => setCreateOpen(false)}
        confirmLoading={loading}
        destroyOnClose
      >
        <Form form={form} layout="vertical" preserve={false}>
          <Form.Item name="username" label="Email/Username" rules={[{ required: true, message: 'Укажите email' }]}>
            <Input placeholder="user@example.com" />
          </Form.Item>
          <Form.Item name="first_name" label="Имя">
            <Input />
          </Form.Item>
          <Form.Item name="last_name" label="Фамилия">
            <Input />
          </Form.Item>
          <Form.Item name="middle_name" label="Отчество">
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Телефон">
            <Input />
          </Form.Item>
          <Form.Item name="role" label="Роль" rules={[{ required: true, message: 'Выберите роль' }]}>
            <Select
              options={[
                { value: 'patient', label: 'patient' },
                { value: 'doctor', label: 'doctor' },
                { value: 'admin', label: 'admin' },
              ]}
            />
          </Form.Item>
          <Form.Item name="gender" label="Пол">
            <Select options={[{ value: 'male', label: 'Мужской' }, { value: 'female', label: 'Женский' }]} />
          </Form.Item>
          <Form.Item name="loyalty_level" label="Уровень лояльности">
            <Select
              allowClear
              options={[
                { value: 'basic', label: 'basic' },
                { value: 'silver', label: 'silver' },
                { value: 'gold', label: 'gold' },
                { value: 'platinum', label: 'platinum' },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* Редактирование */}
      <Modal
        open={editOpen}
        title="Редактирование пользователя"
        okText="Сохранить"
        onOk={handleUpdate}
        onCancel={() => setEditOpen(false)}
        confirmLoading={loading}
        destroyOnClose
      >
        <Form form={form} layout="vertical" preserve={false}>
          <Form.Item name="username" label="Email/Username" rules={[{ required: true, message: 'Укажите email' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="first_name" label="Имя">
            <Input />
          </Form.Item>
          <Form.Item name="last_name" label="Фамилия">
            <Input />
          </Form.Item>
          <Form.Item name="middle_name" label="Отчество">
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Телефон">
            <Input />
          </Form.Item>
          <Form.Item name="role" label="Роль" rules={[{ required: true, message: 'Выберите роль' }]}>
            <Select
              options={[
                { value: 'patient', label: 'patient' },
                { value: 'doctor', label: 'doctor' },
                { value: 'admin', label: 'admin' },
              ]}
            />
          </Form.Item>
          <Form.Item name="gender" label="Пол">
            <Select options={[{ value: 'male', label: 'Мужской' }, { value: 'female', label: 'Женский' }]} />
          </Form.Item>
          <Form.Item name="loyalty_level" label="Уровень лояльности">
            <Select
              allowClear
              options={[
                { value: 'basic', label: 'basic' },
                { value: 'silver', label: 'silver' },
                { value: 'gold', label: 'gold' },
                { value: 'platinum', label: 'platinum' },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </Space>
  );
}
