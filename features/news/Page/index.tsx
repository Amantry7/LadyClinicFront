'use client'
import React, { useState, useMemo } from 'react';
import {
    Input,
    Select,
    Card,
    Tag,
    Button,
    Pagination,
    Row,
    Col,
    Typography,
    Breadcrumb,
    Avatar,
    Space,
    Modal,
    message,
    Drawer,
    Divider,
    FloatButton,
    Spin
} from 'antd';
import {
    SearchOutlined,
    CalendarOutlined,
    UserOutlined,
    ClockCircleOutlined,
    ShareAltOutlined,
    FilterOutlined,
    MailOutlined,
    FacebookFilled,
    TwitterOutlined,
    InstagramFilled,
    PhoneOutlined,
    QuestionCircleOutlined,
    MenuOutlined,
    EyeOutlined
} from '@ant-design/icons';
import Public from '@/shared/components/Layout/Public';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

// Типы данных
interface NewsItem {
    id: number;
    title: string;
    description: string;
    category: string;
    date: string;
    author: string;
    readTime: string;
    image: string;
    featured?: boolean;
    views?: number;
}

// Данные новостей
const newsData: NewsItem[] = [
    {
        id: 1,
        title: "Открытие нового отделения репродуктивной медицины в клинике Репродукция",
        description: "Современное оборудование и команда ведущих специалистов теперь доступны для пациентов. Новое отделение оснащено самым современным оборудованием для диагностики и лечения бесплодия.",
        category: "Новости клиник",
        date: "2025-06-10",
        author: "Редакция",
        readTime: "3 мин",
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop",
        featured: true,
        views: 1250
    },
    {
        id: 2,
        title: "Планирование беременности: полный гид для будущих родителей",
        description: "Подробное руководство по подготовке к беременности, включая необходимые анализы, рекомендации по питанию и образу жизни.",
        category: "Медицинские советы",
        date: "2025-06-08",
        author: "Др. Анна Петрова",
        readTime: "7 мин",
        image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&h=300&fit=crop",
        views: 892
    },
    {
        id: 3,
        title: "Новое УЗИ-оборудование 4D в Леди Клиник",
        description: "Установлено современное оборудование для проведения УЗИ-диагностики с возможностью получения трехмерных изображений плода.",
        category: "Новости клиник",
        date: "2025-06-05",
        author: "Др. Марина Соколова",
        readTime: "4 мин",
        image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&h=300&fit=crop",
        views: 654
    },
    {
        id: 4,
        title: "Профилактика женских заболеваний после 35 лет",
        description: "Важность регулярных обследований и профилактических мер для поддержания женского здоровья в зрелом возрасте.",
        category: "Женское здоровье",
        date: "2025-06-03",
        author: "Др. Елена Васильева",
        readTime: "6 мин",
        image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&h=300&fit=crop",
        views: 1150
    },
    {
        id: 5,
        title: "Современные методы лечения бесплодия: что нужно знать",
        description: "Обзор современных технологий и методов лечения бесплодия, включая ЭКО и другие вспомогательные репродуктивные технологии.",
        category: "Репродуктивное здоровье",
        date: "2025-06-01",
        author: "Др. Игорь Козлов",
        readTime: "8 мин",
        image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=600&h=300&fit=crop",
        views: 987
    },
    {
        id: 6,
        title: "Неделя женского здоровья: специальные предложения",
        description: "С 15 по 22 июня в наших клиниках проходит неделя женского здоровья со скидками на комплексные обследования.",
        category: "Профилактика",
        date: "2025-05-30",
        author: "Редакция",
        readTime: "2 мин",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=300&fit=crop",
        views: 543
    },
    {
        id: 7,
        title: "Питание для женского здоровья: рекомендации специалистов",
        description: "Как правильное питание влияет на женское здоровье и репродуктивную функцию. Советы по составлению сбалансированного рациона.",
        category: "Медицинские советы",
        date: "2025-05-28",
        author: "Др. Ольга Смирнова",
        readTime: "5 мин",
        image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=300&fit=crop",
        views: 776
    },
    {
        id: 8,
        title: "Расширение штата: новые врачи-гинекологи в команде",
        description: "К нашей команде присоединились три опытных врача-гинеколога с международным опытом работы.",
        category: "Новости клиник",
        date: "2025-05-25",
        author: "Редакция",
        readTime: "3 мин",
        image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=300&fit=crop",
        views: 432
    },
    {
        id: 9,
        title: "Стресс и репродуктивное здоровье: влияние и способы борьбы",
        description: "Как стресс влияет на репродуктивную функцию женщины и какие методы помогают справиться с негативным воздействием.",
        category: "Репродуктивное здоровье",
        date: "2025-05-22",
        author: "Др. Анна Петрова",
        readTime: "6 мин",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=300&fit=crop",
        views: 698
    },
    {
        id: 10,
        title: "Важность регулярных гинекологических осмотров",
        description: "Почему регулярные визиты к гинекологу критически важны для женского здоровья и раннего выявления заболеваний.",
        category: "Женское здоровье",
        date: "2025-05-20",
        author: "Др. Марина Соколова",
        readTime: "4 мин",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=300&fit=crop",
        views: 1023
    },
    {
        id: 11,
        title: "Подготовка к беременности: чек-лист для будущих мам",
        description: "Полный список необходимых шагов и процедур для подготовки к беременности, включая анализы и консультации специалистов.",
        category: "Медицинские советы",
        date: "2025-05-18",
        author: "Др. Елена Васильева",
        readTime: "9 мин",
        image: "https://images.unsplash.com/photo-1493666438817-866a91353ca9?w=600&h=300&fit=crop",
        views: 1456
    },
    {
        id: 12,
        title: "Лекция о репродуктивном здоровье для молодых женщин",
        description: "25 июня состоится бесплатная лекция для женщин 18-30 лет о важности заботы о репродуктивном здоровье.",
        category: "Профилактика",
        date: "2025-05-15",
        author: "Др. Игорь Козлов",
        readTime: "2 мин",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=300&fit=crop",
        views: 234
    }
];

const categories = [
    { value: "all", label: "Все новости", count: 12 },
    { value: "Репродуктивное здоровье", label: "Репродуктивное здоровье", count: 2 },
    { value: "Женское здоровье", label: "Женское здоровье", count: 2 },
    { value: "Новости клиник", label: "Новости клиник", count: 3 },
    { value: "Медицинские советы", label: "Медицинские советы", count: 3 },
    { value: "Профилактика", label: "Профилактика", count: 2 }
];

const MedicalNewsPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortBy, setSortBy] = useState("date");
    const [currentPage, setCurrentPage] = useState(1);
    const [subscribeModalVisible, setSubscribeModalVisible] = useState(false);
    const [mobileFiltersVisible, setMobileFiltersVisible] = useState(false);
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [subscribeEmail, setSubscribeEmail] = useState("");

    const pageSize = 6;
    const isClient = typeof window !== 'undefined';


    // Фильтрация и сортировка новостей
    const filteredNews = useMemo(() => {
        let filtered = newsData.filter(news => {
            const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                news.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === "all" || news.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });

        // Сортировка
        filtered.sort((a, b) => {
            if (sortBy === "date") {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            } else if (sortBy === "popular") {
                return (b.views || 0) - (a.views || 0);
            }
            return 0;
        });

        return filtered;
    }, [searchTerm, selectedCategory, sortBy]);

    // Пагинация
    const paginatedNews = useMemo(() => {
        const startIndex = (currentPage - 1) * pageSize;
        return filteredNews.slice(startIndex, startIndex + pageSize);
    }, [filteredNews, currentPage]);

    const featuredNews = newsData.find(news => news.featured);

    const getCategoryColor = (category: string) => {
        const colors: { [key: string]: string } = {
            "Новости клиник": "#F0AFCD",
            "Медицинские советы": "#5E4297",
            "Женское здоровье": "#52C41A",
            "Репродуктивное здоровье": "#1890FF",
            "Профилактика": "#FAAD14"
        };
        return colors[category] || "#F0AFCD";
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const handleSubscribe = async () => {
        if (!subscribeEmail) {
            message.error('Введите email для подписки');
            return;
        }
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            message.success('Спасибо за подписку! Вы будете получать наши новости на email.');
            setSubscribeModalVisible(false);
            setSubscribeEmail("");
        } catch (error) {
            message.error('Произошла ошибка. Попробуйте еще раз.');
        }
    };

    const handleShare = (newsItem: NewsItem) => {
        if (navigator.share) {
            navigator.share({
                title: newsItem.title,
                text: newsItem.description,
                url: typeof window !== undefined ? window.location.href : ''
            });
        } else {
            navigator.clipboard.writeText(typeof window !== undefined ? window.location.href : '');
            message.success('Ссылка скопирована в буфер обмена');
        }
    };

    return (
        <Public>
            <div className="min-h-screen bg-gray-50">
                {/* Header - полностью адаптивный */}
                <div className="bg-white shadow-sm rounded-3xl">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
                        <Breadcrumb className="mb-3 sm:mb-4">
                            <Breadcrumb.Item>
                                <span className="text-sm sm:text-base">Главная</span>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <span className="text-sm sm:text-base">Новости</span>
                            </Breadcrumb.Item>
                        </Breadcrumb>

                        <Title level={1} className="mb-3 sm:mb-4 text-xl sm:text-2xl lg:text-3xl" style={{ color: '#525252' }}>
                            Новости и статьи о здоровье
                        </Title>
                        <Paragraph className="text-sm sm:text-base lg:text-lg text-gray-600 mb-0">
                            Будьте в курсе последних новостей медицины и получайте экспертные советы от наших специалистов
                        </Paragraph>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
                    <Row gutter={[16, 16]} className="lg:gutter-24">
                        {/* Основной контент */}
                        <Col xs={24} lg={18}>
                            {/* Поиск и фильтры - полностью переработанные для мобильных */}
                            <Card className="mb-4 sm:mb-6">
                                <div className="space-y-4">
                                    {/* Строка поиска - всегда на всю ширину */}
                                    <Input
                                        placeholder="Поиск по новостям..."
                                        prefix={<SearchOutlined />}
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        size="large"
                                        className="w-full"
                                    />

                                    {/* Десктопные фильтры */}
                                    <div className="hidden sm:flex sm:gap-4">
                                        <Select
                                            value={selectedCategory}
                                            onChange={setSelectedCategory}
                                            className="flex-1 min-w-0"
                                            size="large"
                                        >
                                            {categories.map(cat => (
                                                <Option key={cat.value} value={cat.value}>
                                                    {cat.label} ({cat.count})
                                                </Option>
                                            ))}
                                        </Select>

                                        <Select
                                            value={sortBy}
                                            onChange={setSortBy}
                                            className="flex-1 min-w-0"
                                            size="large"
                                        >
                                            <Option value="date">По дате</Option>
                                            <Option value="popular">По популярности</Option>
                                        </Select>
                                    </div>

                                    {/* Мобильная кнопка фильтров */}
                                    <Button
                                        icon={<FilterOutlined />}
                                        onClick={() => setMobileFiltersVisible(true)}
                                        size="large"
                                        className="sm:hidden w-full"
                                        type="dashed"
                                    >
                                        Фильтры и сортировка
                                    </Button>
                                </div>
                            </Card>

                            {/* Главная новость - улучшенная адаптивность и читаемость */}
                            {featuredNews && selectedCategory === "all" && !searchTerm && (
                                <Card
                                    className="mb-6 sm:mb-8 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
                                    bodyStyle={{ padding: 0 }}
                                >
                                    <div className="relative">
                                        <div className="relative h-48 sm:h-64 lg:h-80 overflow-hidden">
                                            <img
                                                src={featuredNews.image}
                                                alt={featuredNews.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                loading="lazy"
                                            />
                                            {/* Улучшенный градиент для лучшей читаемости */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                                            {/* Контент с улучшенной читаемостью */}
                                            <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 lg:p-8">
                                                <div className="space-y-2 sm:space-y-3">
                                                    <Tag
                                                        color={getCategoryColor(featuredNews.category)}
                                                        className="text-xs sm:text-sm font-medium"
                                                    >
                                                        {featuredNews.category}
                                                    </Tag>

                                                    <Title
                                                        level={2}
                                                        className="text-white mb-2 sm:mb-3 text-lg sm:text-xl lg:text-2xl leading-tight"
                                                        style={{
                                                            color: 'white',
                                                            textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                                                            fontWeight: 600
                                                        }}
                                                    >
                                                        {featuredNews.title}
                                                    </Title>

                                                    <Text
                                                        className="text-gray-100 text-sm sm:text-base leading-relaxed"
                                                        style={{
                                                            textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                                                            display: '-webkit-box',
                                                            color: 'white',
                                                            WebkitLineClamp: 3,
                                                            WebkitBoxOrient: 'vertical',
                                                            overflow: 'hidden'
                                                        }}
                                                    >
                                                        {featuredNews.description}
                                                    </Text>

                                                    {/* Мета-информация */}
                                                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-200">
                                                        <Space size="small">
                                                            <Avatar size="small" icon={<UserOutlined />} />
                                                            <Text className="text-gray-200" style={{ color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                                                                {featuredNews.author}
                                                            </Text>
                                                        </Space>
                                                        <Space size="small">
                                                            <CalendarOutlined />
                                                            <Text className="text-gray-200" style={{ color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                                                                {formatDate(featuredNews.date)}
                                                            </Text>
                                                        </Space>
                                                        <Space size="small">
                                                            <ClockCircleOutlined />
                                                            <Text className="text-gray-200" style={{ color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                                                                {featuredNews.readTime}
                                                            </Text>
                                                        </Space>
                                                        {featuredNews.views && (
                                                            <Space size="small">
                                                                <EyeOutlined />
                                                                <Text className="text-gray-200" style={{ color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                                                                    {featuredNews.views}
                                                                </Text>
                                                            </Space>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            )}

                            {/* Сетка новостей - полностью адаптивная */}
                            <Row gutter={[16, 16]} className="sm:gutter-24">
                                {paginatedNews.map((news) => (
                                    <Col xs={24} sm={12} lg={8} key={news.id}>
                                        <Card
                                            className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer group"
                                            cover={
                                                <div className="relative h-40 sm:h-48 overflow-hidden">
                                                    <img
                                                        src={news.image}
                                                        alt={news.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                        loading="lazy"
                                                    />
                                                    <Tag
                                                        color={getCategoryColor(news.category)}
                                                        className="absolute top-2 sm:top-3 left-2 sm:left-3 text-xs font-medium z-10"
                                                    >
                                                        {news.category}
                                                    </Tag>
                                                </div>
                                            }
                                            bodyStyle={{ padding: '16px', height: 'calc(100% - 192px)' }}
                                        >
                                            <div className="flex flex-col h-full">
                                                <Title
                                                    level={4}
                                                    className="mb-2 sm:mb-3 text-sm sm:text-base lg:text-lg leading-tight"
                                                    style={{
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden',
                                                        lineHeight: '1.4'
                                                    }}
                                                >
                                                    {news.title}
                                                </Title>

                                                <Paragraph
                                                    className="text-gray-600 mb-3 sm:mb-4 flex-1 text-xs sm:text-sm"
                                                    style={{
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 3,
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden',
                                                        lineHeight: '1.5'
                                                    }}
                                                >
                                                    {news.description}
                                                </Paragraph>

                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between text-xs text-gray-500">
                                                        <Space size="small">
                                                            <Avatar size="small" icon={<UserOutlined />} />
                                                            <Text className="text-xs">{news.author}</Text>
                                                        </Space>
                                                        <Space size="small">
                                                            <CalendarOutlined />
                                                            <Text className="text-xs">{formatDate(news.date)}</Text>
                                                        </Space>
                                                    </div>

                                                    <div className="flex items-center justify-between text-xs text-gray-500">
                                                        <Space size="small">
                                                            <ClockCircleOutlined />
                                                            <Text className="text-xs">{news.readTime}</Text>
                                                        </Space>
                                                        {news.views && (
                                                            <Space size="small">
                                                                <EyeOutlined />
                                                                <Text className="text-xs">{news.views}</Text>
                                                            </Space>
                                                        )}
                                                    </div>

                                                    <Divider className="my-2" />

                                                    <Button
                                                        type="text"
                                                        icon={<ShareAltOutlined />}
                                                        onClick={() => handleShare(news)}
                                                        className="w-full text-xs"
                                                        size="small"
                                                    >
                                                        Поделиться
                                                    </Button>
                                                </div>
                                            </div>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                            <br />
                            {/* Пагинация - адаптивная */}
                            {filteredNews.length > pageSize && (
                                <div className="flex justify-center mt-6 sm:mt-8">
                                    <Pagination
                                        current={currentPage}
                                        total={filteredNews.length}
                                        pageSize={pageSize}
                                        onChange={setCurrentPage}
                                        showSizeChanger={false}
                                        showQuickJumper={false} // всегда false при билде
                                        showTotal={(total, range) =>
                                            typeof window !== undefined && window.innerWidth > 768
                                                ? `${range[0]}-${range[1]} из ${total} новостей`
                                                : `${range[0]}-${range[1]} из ${total}`
                                        }
                                        size={typeof window !== undefined && window.innerWidth < 768 ? "small" : "default"}
                                        responsive
                                    />
                                </div>
                            )}
                            <br />
                            {/* CTA секция - адаптивная */}
                            <Card
                                className="mt-8 sm:mt-12 text-center"
                                style={{ background: 'linear-gradient(135deg, #F0AFCD20, #5E429720)' }}
                            >
                                <Title level={3} className="text-lg sm:text-xl lg:text-2xl" style={{ color: '#525252' }}>
                                    Остались вопросы о здоровье?
                                </Title>
                                <Paragraph className="text-sm sm:text-base lg:text-lg mb-4 sm:mb-6">
                                    Наши специалисты готовы помочь вам с любыми вопросами о женском здоровье
                                </Paragraph>
                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                                    <Button
                                        type="primary"
                                        size="large"
                                        className="w-full sm:w-auto"
                                        style={{ backgroundColor: '#F0AFCD', borderColor: '#F0AFCD' }}
                                    >
                                        Записаться на консультацию
                                    </Button>
                                </div>
                            </Card>
                        </Col>

                        {/* Боковая панель - скрытая на мобильных */}
                        <Col xs={0} lg={6}>
                            <div className="flex flex-col gap-3">
                                {/* Популярные статьи */}
                                <Card title="Популярные статьи">
                                    <div className="space-y-4">
                                        {newsData.slice(0, 5).map((news) => (
                                            <div key={news.id} className="flex gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
                                                <img
                                                    src={news.image}
                                                    alt={news.title}
                                                    className="w-16 h-16 object-cover rounded flex-shrink-0"
                                                    loading="lazy"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <Text
                                                        strong
                                                        className="text-sm leading-tight block"
                                                        style={{
                                                            display: '-webkit-box',
                                                            WebkitLineClamp: 2,
                                                            WebkitBoxOrient: 'vertical',
                                                            overflow: 'hidden'
                                                        }}
                                                    >
                                                        {news.title}
                                                    </Text>
                                                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                                                        <CalendarOutlined />
                                                        <Text className="text-xs">{formatDate(news.date)}</Text>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Card>

                                {/* Подписка на новости */}
                                <Card title="Подписка на новости">
                                    <Paragraph className="text-sm text-gray-600 mb-4">
                                        Получайте свежие новости о здоровье на свой email
                                    </Paragraph>
                                    <Button
                                        type="primary"
                                        block
                                        icon={<MailOutlined />}
                                        onClick={() => setSubscribeModalVisible(true)}
                                        style={{ backgroundColor: '#5E4297', borderColor: '#5E4297' }}
                                    >
                                        Подписаться
                                    </Button>
                                </Card>

                                {/* Социальные сети */}
                                <Card title="Мы в социальных сетях">
                                    <div className="space-y-2">
                                        <Button type="text" icon={<FacebookFilled />} className="text-left w-full justify-start p-2">
                                            Facebook
                                        </Button>
                                        <Button type="text" icon={<InstagramFilled />} className="text-left w-full justify-start p-2">
                                            Instagram
                                        </Button>
                                        <Button type="text" icon={<TwitterOutlined />} className="text-left w-full justify-start p-2">
                                            Twitter
                                        </Button>
                                    </div>
                                </Card>

                                {/* Контакты */}
                                <Card title="Контакты">
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <PhoneOutlined className="text-gray-500" />
                                            <Text className="text-sm">+7 (495) 123-45-67</Text>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MailOutlined className="text-gray-500" />
                                            <Text className="text-sm">info@clinic.ru</Text>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                </div>

                {/* Модальное окно подписки */}
                <Modal
                    title="Подписка на новости"
                    open={subscribeModalVisible}
                    onCancel={() => setSubscribeModalVisible(false)}
                    onOk={handleSubscribe}
                    okText="Подписаться"
                    cancelText="Отмена"
                    confirmLoading={false}
                >
                    <div className="space-y-4">
                        <Paragraph>
                            Введите ваш email адрес, чтобы получать последние новости о здоровье и медицинские советы от наших специалистов.
                        </Paragraph>
                        <Input
                            placeholder="Ваш email"
                            type="email"
                            value={subscribeEmail}
                            onChange={(e) => setSubscribeEmail(e.target.value)}
                            prefix={<MailOutlined />}
                            size="large"
                        />
                    </div>
                </Modal>

                {/* Мобильный drawer для фильтров */}
                <Drawer
                    title="Фильтры и сортировка"
                    placement="bottom"
                    onClose={() => setMobileFiltersVisible(false)}
                    open={mobileFiltersVisible}
                    height="auto"
                    className="sm:hidden"
                >
                    <div className="space-y-4">
                        <div>
                            <Text strong className="block mb-2">Категория</Text>
                            <Select
                                value={selectedCategory}
                                onChange={setSelectedCategory}
                                className="w-full"
                                size="large"
                            >
                                {categories.map(cat => (
                                    <Option key={cat.value} value={cat.value}>
                                        {cat.label} ({cat.count})
                                    </Option>
                                ))}
                            </Select>
                        </div>

                        <div>
                            <Text strong className="block mb-2">Сортировка</Text>
                            <Select
                                value={sortBy}
                                onChange={setSortBy}
                                className="w-full"
                                size="large"
                            >
                                <Option value="date">По дате</Option>
                                <Option value="popular">По популярности</Option>
                            </Select>
                        </div>

                        <Button
                            type="primary"
                            block
                            size="large"
                            onClick={() => setMobileFiltersVisible(false)}
                            style={{ backgroundColor: '#F0AFCD', borderColor: '#F0AFCD' }}
                        >
                            Применить
                        </Button>
                    </div>
                </Drawer>

                {/* Мобильная боковая панель */}
                <Drawer
                    title="Дополнительно"
                    placement="right"
                    onClose={() => setSidebarVisible(false)}
                    open={sidebarVisible}
                    width={300}
                    className="lg:hidden"
                >
                    <div className="space-y-6">
                        {/* Популярные статьи */}
                        <div>
                            <Title level={4}>Популярные статьи</Title>
                            <div className="space-y-4">
                                {newsData.slice(0, 5).map((news) => (
                                    <div key={news.id} className="flex gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
                                        <img
                                            src={news.image}
                                            alt={news.title}
                                            className="w-16 h-16 object-cover rounded flex-shrink-0"
                                            loading="lazy"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <Text
                                                strong
                                                className="text-sm leading-tight block"
                                                style={{
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden'
                                                }}
                                            >
                                                {news.title}
                                            </Text>
                                            <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                                                <CalendarOutlined />
                                                <Text className="text-xs">{formatDate(news.date)}</Text>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Подписка на новости */}
                        <div>
                            <Title level={4}>Подписка на новости</Title>
                            <Paragraph className="text-sm text-gray-600 mb-4">
                                Получайте свежие новости о здоровье на свой email
                            </Paragraph>
                            <Button
                                type="primary"
                                block
                                icon={<MailOutlined />}
                                onClick={() => {
                                    setSidebarVisible(false);
                                    setSubscribeModalVisible(true);
                                }}
                                style={{ backgroundColor: '#5E4297', borderColor: '#5E4297' }}
                            >
                                Подписаться
                            </Button>
                        </div>

                        {/* Социальные сети */}
                        <div>
                            <Title level={4}>Мы в социальных сетях</Title>
                            <div className="space-y-2">
                                <Button type="text" icon={<FacebookFilled />} className="text-left w-full justify-start p-2">
                                    Facebook
                                </Button>
                                <Button type="text" icon={<InstagramFilled />} className="text-left w-full justify-start p-2">
                                    Instagram
                                </Button>
                                <Button type="text" icon={<TwitterOutlined />} className="text-left w-full justify-start p-2">
                                    Twitter
                                </Button>
                            </div>
                        </div>

                        {/* Контакты */}
                        <div>
                            <Title level={4}>Контакты</Title>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <PhoneOutlined className="text-gray-500" />
                                    <Text className="text-sm">+7 (495) 123-45-67</Text>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MailOutlined className="text-gray-500" />
                                    <Text className="text-sm">info@clinic.ru</Text>
                                </div>
                            </div>
                        </div>
                    </div>
                </Drawer>

                {/* Плавающая кнопка для мобильного меню */}
                <FloatButton
                    type="primary"
                    shape="circle"
                    icon={<MenuOutlined />}

                    onClick={() => setSidebarVisible(true)}
                    style={{ backgroundColor: '#F0AFCD', borderColor: '#F0AFCD' }}
                />
            </div>
        </Public>
    );
};

export default MedicalNewsPage;