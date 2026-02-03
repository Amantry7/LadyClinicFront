'use client';

import { useEffect, useState } from 'react';
import { Input, Tabs, Table, Layout, Typography, Card, Space, List, ConfigProvider, Button, Drawer, Badge } from 'antd';
import { SearchOutlined, FilterOutlined, MenuOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import MedicalServices from './MedicalServices';

const { TabPane } = Tabs;
const { Title, Text } = Typography;
const { Sider, Content } = Layout;

// Кастомная тема (заглушка, так как оригинальная тема недоступна)
const customTheme = {
  token: {
    colorPrimary: '#F0AFCD',
  }
};

interface Service {
  key: string;
  name: string;
  price: string;
  category: string;
}

// Типы для API
interface ApiServicePrice {
  id: string; // UUID
  title: string;
  parent: string | null; // UUID или null
  price: string | number | null;
  created?: string;
}

// Вспомогательный форматтер цены
const formatPrice = (p: string | number | null | undefined): string => {
  if (p === null || p === undefined) return '';
  const num = typeof p === 'number' ? p : parseFloat(String(p).replace(/\s+/g, ''));
  if (isNaN(num)) return String(p);
  return new Intl.NumberFormat('ru-RU').format(num);
};

// Адаптивные колонки для таблицы
const getColumns = (isMobile: boolean): ColumnsType<Service> => {
  if (isMobile) {
    return [
      {
        title: '',
        key: 'mobile',
        render: (_, record) => (
          <div className="mobile-service-item">
            <div className="service-name" style={{
              fontWeight: 500,
              marginBottom: 4,
              fontSize: '14px',
              lineHeight: '1.4'
            }}>
              {record.name}
            </div>
            <div className="service-price" style={{
              fontWeight: 'bold',
              color: '#F0AFCD',
              fontSize: '16px'
            }}>
              {record.price} сом
            </div>
          </div>
        ),
      },
    ];
  }

  return [
    {
      title: 'Услуга',
      dataIndex: 'name',
      key: 'name',
      render: text => <Text>{text}</Text>,
    },
    {
      title: 'Цена (сом)',
      dataIndex: 'price',
      key: 'price',
      align: 'right' as const,
      render: text => <Text strong>{text}</Text>,
    },
  ];
};

// Хук для определения размера экрана
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  useState(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  return windowSize;
};

export default function ClinicPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('prices');
  const [categories, setCategories] = useState<string[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const { width } = useWindowSize();
  const isMobile = width < 768;
  const isTablet = width < 1024;

  // Загрузка данных из API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('https://api.ladyclinic.kg/api/v1/cms/service_prices/', {
          next: { revalidate: 300 },
          headers: {
            'Accept': 'application/json'
          }
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const raw = await res.json();
        // Нормализуем ответ к массиву
        let data: ApiServicePrice[] = [];
        if (Array.isArray(raw)) {
          data = raw as ApiServicePrice[];
        } else if (raw && Array.isArray(raw.results)) {
          data = raw.results as ApiServicePrice[];
        } else if (raw && Array.isArray(raw.data)) {
          data = raw.data as ApiServicePrice[];
        } else if (raw && typeof raw === 'object') {
          // Возможно пришёл одиночный объект
          data = [raw as ApiServicePrice];
        } else {
          data = [];
        }

        // Построим карту id -> узел для быстрого доступа к родителю
        const idMap = new Map<string, ApiServicePrice>();
        data.forEach(n => idMap.set(n.id, n));

        // Категории: верхний уровень (parent === null)
        const rootCategories = data.filter(n => n.parent === null);
        const catTitles = rootCategories.map(c => c.title);

        // Услуги: элементы с заполненной ценой. Категорию берём по parent.
        const flatServices: Service[] = data
          .filter(n => n.price !== null && n.price !== undefined)
          .map(n => ({
            key: String(n.id),
            name: n.title,
            price: formatPrice(n.price),
            category: n.parent ? (idMap.get(n.parent)?.title ?? 'Прочее') : n.title,
          }));

        // Обновляем состояния
        setCategories(Array.from(new Set(catTitles.concat(flatServices.map(s => s.category)))));
        setServices(flatServices);
      } catch (e: any) {
        console.error('Service prices fetch error:', e);
        setError(e?.message || 'Не удалось загрузить данные');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory ? service.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const handleClearCategory = () => {
    setSelectedCategory(null);
    setDrawerVisible(false);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
    if (isMobile) {
      setDrawerVisible(false);
    }
  };

  // Компонент фильтров
  const FilterContent = () => (
    <div>
      <Input
        prefix={<SearchOutlined />}
        placeholder="Поиск услуг"
        value={search}
        onChange={e => setSearch(e.target.value)}
        allowClear
        style={{ marginBottom: 16 }}
      />
      <List
        header={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text strong>Категории услуг</Text>
            {selectedCategory && (
              <Text
                onClick={handleClearCategory}
                style={{ fontSize: '12px', cursor: 'pointer', color: '#F0AFCD' }}
              >
                Сбросить
              </Text>
            )}
          </div>
        }
        bordered
        dataSource={categories}
        renderItem={(item) => (
          <List.Item
            style={{
              cursor: 'pointer',
              backgroundColor: selectedCategory === item ? '#F0AFCD20' : undefined,
              fontWeight: selectedCategory === item ? 'bold' : undefined,
              padding: isMobile ? '12px 16px' : '8px 12px'
            }}
            onClick={() => handleCategorySelect(item)}
          >
            <Text style={{ fontSize: isMobile ? '14px' : '13px' }}>{item}</Text>
          </List.Item>
        )}
      />
    </div>
  );

  const containerStyle = {
    maxWidth: 1400,
    margin: '0 auto',
    padding: isMobile ? 12 : 24,
    background: '#fff'
  };

  return (
    <ConfigProvider theme={customTheme}>
      <Layout style={containerStyle}>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <div style={{ textAlign: 'center' }}>
            <Title
              level={isMobile ? 3 : 2}
              style={{
                textAlign: 'center',
                marginBottom: 8,
                fontSize: isMobile ? '20px' : undefined
              }}
            >
              Цены на услуги нашей клиники
            </Title>
            <Text type="secondary" style={{ display: 'block', textAlign: 'center' }}>
              Все цены указаны в сомах
            </Text>
          </div>



          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            centered={!isMobile}
            items={[
              {
                key: 'prices',
                label: 'Цены на услуги',
                children: (
                  <>
                    {error && (
                      <Card style={{ marginBottom: 16 }}>
                        <Text type="danger">Ошибка загрузки: {error}</Text>
                      </Card>
                    )}
                    {/* Мобильная версия с Drawer */}
                    {isMobile ? (
                      <div>
                        <div style={{ marginBottom: 16, display: 'flex', gap: 8 }}>
                          <Input
                            prefix={<SearchOutlined />}
                            placeholder="Поиск услуг"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            allowClear
                            style={{ flex: 1 }}
                          />
                          <Badge dot={!!selectedCategory}>
                            <Button
                              icon={<FilterOutlined />}
                              onClick={() => setDrawerVisible(true)}
                              type={selectedCategory ? 'primary' : 'default'}
                            >
                              Фильтры
                            </Button>
                          </Badge>
                        </div>

                        <Drawer
                          title="Фильтры и категории"
                          placement="bottom"
                          closable
                          onClose={() => setDrawerVisible(false)}
                          open={drawerVisible}
                          height="70vh"
                        >
                          <FilterContent />
                        </Drawer>

                        <Card>
                          <div style={{ marginBottom: 16 }}>
                            <Text type="secondary" style={{ fontSize: '13px' }}>
                              {loading ? 'Загрузка...' : `Найдено услуг: ${filteredServices.length}`}
                            </Text>
                            {selectedCategory && (
                              <div style={{ marginTop: 4 }}>
                                <Text type="secondary" style={{ fontSize: '12px' }}>
                                  Категория: "{selectedCategory}"
                                </Text>
                              </div>
                            )}
                          </div>
                          <Table
                            dataSource={loading ? [] : filteredServices}
                            columns={getColumns(true)}
                            pagination={{
                              pageSize: 10,
                              size: 'small',
                              showSizeChanger: false,
                              showTotal: (total, range) => `${range[0]}-${range[1]} из ${total}`,
                              style: { textAlign: 'center', marginTop: 16 },
                            }}
                            showHeader={false}
                            size="small"
                            loading={loading}
                          />
                        </Card>
                      </div>
                    ) : (
                      /* Десктоп версия */
                      <Layout style={{ background: '#fff' }}>
                        <Sider
                          width={isTablet ? 250 : 300}
                          theme="light"
                          style={{ paddingRight: 16 }}
                        >
                          <FilterContent />
                        </Sider>
                        <Content>
                          <Card>
                            <div style={{ marginBottom: 16 }}>
                              <Text type="secondary">
                                {loading ? 'Загрузка...' : `Найдено услуг: ${filteredServices.length}`}
                                {selectedCategory && (
                                  <span style={{ marginLeft: 8 }}>
                                    в категории "{selectedCategory}"
                                  </span>
                                )}
                              </Text>
                            </div>
                            <Table
                              dataSource={loading ? [] : filteredServices}
                              columns={getColumns(false)}
                              pagination={{
                                pageSize: isTablet ? 10 : 15,
                                showSizeChanger: true,
                                showTotal: (total, range) =>
                                  `${range[0]}-${range[1]} из ${total} услуг`,
                              }}
                              bordered
                              scroll={{ x: isTablet ? 600 : undefined }}
                              loading={loading}
                            />
                          </Card>
                        </Content>
                      </Layout>
                    )}
                  </>
                ),
              },
              {
                key: 'packages',
                label: 'Пакеты тарифов',
                children: (
                <MedicalServices/>
                ),
              },
            ]}
          />
        </Space>
      </Layout>
    </ConfigProvider>
  );
}