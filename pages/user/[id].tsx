import React, { useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { useRouter } from 'next/router';

// 排序类型定义
type SortField = 'price' | 'quantity' | 'value' | 'return';
type SortOrder = 'none' | 'desc' | 'asc';

// Activity数据类型
interface ActivityRecord {
  id: number;
  trader: {
    name: string;
    address: string;
    avatar: string;
  };
  action: 'buy' | 'sell' | 'redeem';
  market: string;
  marketImage: string; // 事件头像
  side: 'Yes' | 'No';
  quantity: string;
  amount: string;
  profit: string;
  return: string;
  time: string;
}

// Mock data
const mockUserData = {
  id: 1,
  name: 'name',
  address: '0x2313...2461',
  avatar: '/images/expert1.png',
  joinDate: 'Joined may 2024',
  isFollowed: false,
  tags: ['Crypto', 'Sports', 'Politics'],
  stats: {
    positions: { label: 'Positions', value: '$132,098.61' },
    profit: { label: 'Profit/loss', value: '$873,385.68' },
    volume: { label: 'Volume traded', value: '$13,378,6.97' },
    markets: { label: 'Markets traded', value: '272' }
  },
  activities: [
    {
      id: 1,
      market: 'Iran agrees to end enrichment of uranium before August?',
      position: 'Yes',
      shares: '2323 Shares',
      amount: '$3,523,535',
      return: '+2342%',
      price: '84¢',
      image: '/images/event-korea-election.png'
    },
    {
      id: 2,
      market: 'Will Bitcoin reach $100,000 by end of 2024?',
      position: 'Yes',
      shares: '1856 Shares',
      amount: '$2,847,299',
      return: '+1567%',
      price: '72¢',
      image: '/images/event-korea-election.png'
    },
    {
      id: 3,
      market: 'Will Donald Trump win the 2024 US Presidential Election?',
      position: 'No',
      shares: '3245 Shares',
      amount: '$1,987,643',
      return: '+892%',
      price: '61¢',
      image: '/images/event-korea-election.png'
    },
    {
      id: 4,
      market: 'Will there be a recession in the US before 2025?',
      position: 'No',
      shares: '987 Shares',
      amount: '$1,456,789',
      return: '+654%',
      price: '45¢',
      image: '/images/event-korea-election.png'
    },
    {
      id: 5,
      market: 'Will OpenAI release GPT-5 before December 2024?',
      position: 'Yes',
      shares: '1567 Shares',
      amount: '$987,234',
      return: '+423%',
      price: '58¢',
      image: '/images/event-korea-election.png'
    },
    {
      id: 6,
      market: 'Will Tesla stock reach $300 before year end?',
      position: 'Yes',
      shares: '2134 Shares',
      amount: '$745,892',
      return: '+289%',
      price: '67¢',
      image: '/images/event-korea-election.png'
    },
    {
      id: 7,
      market: 'Will the Federal Reserve cut interest rates in 2024?',
      position: 'Yes',
      shares: '876 Shares',
      amount: '$634,521',
      return: '+198%',
      price: '73¢',
      image: '/images/event-korea-election.png'
    },
    {
      id: 8,
      market: 'Will China invade Taiwan before 2025?',
      position: 'No',
      shares: '1789 Shares',
      amount: '$523,987',
      return: '+156%',
      price: '29¢',
      image: '/images/event-korea-election.png'
    },
    {
      id: 9,
      market: 'Will the Lakers make the NBA playoffs this season?',
      position: 'Yes',
      shares: '1456 Shares',
      amount: '$423,765',
      return: '+134%',
      price: '82¢',
      image: '/images/event-korea-election.png'
    },
    {
      id: 10,
      market: 'Will Meta stock reach $500 before March 2025?',
      position: 'No',
      shares: '1098 Shares',
      amount: '$356,789',
      return: '+87%',
      price: '38¢',
      image: '/images/event-korea-election.png'
    },
    {
      id: 11,
      market: 'Will there be a major earthquake in California in 2024?',
      position: 'No',
      shares: '2567 Shares',
      amount: '$298,456',
      return: '+76%',
      price: '12¢',
      image: '/images/event-korea-election.png'
    },
    {
      id: 12,
      market: 'Will Apple announce a new product category in 2024?',
      position: 'Yes',
      shares: '789 Shares',
      amount: '$234,567',
      return: '+45%',
      price: '56¢',
      image: '/images/event-korea-election.png'
    }
  ]
};

// Activity数据 - 个人主页只显示当前用户的活动记录
const activityData: ActivityRecord[] = [
  {
    id: 1,
    trader: {
      name: mockUserData.name, // 使用当前查看的用户信息
      address: mockUserData.address,
      avatar: mockUserData.avatar
    },
    action: "buy",
    market: "Will Han Duck-soo be elected the next president of South Korea?",
    marketImage: "/images/event-korea-election.png",
    side: "No",
    quantity: "1000",
    amount: "$2000",
    profit: "+$10000",
    return: "+10%",
    time: "1小时前"
  },
  {
    id: 2,
    trader: {
      name: mockUserData.name,
      address: mockUserData.address,
      avatar: mockUserData.avatar
    },
    action: "sell",
    market: "Will Bitcoin reach $100,000 by end of 2024?",
    marketImage: "/images/event-korea-election.png",
    side: "Yes",
    quantity: "1000",
    amount: "$0",
    profit: "-$5000",
    return: "-5%",
    time: "2小时前"
  },
  {
    id: 3,
    trader: {
      name: mockUserData.name,
      address: mockUserData.address,
      avatar: mockUserData.avatar
    },
    action: "redeem",
    market: "Will Donald Trump win the 2024 US Presidential Election?",
    marketImage: "/images/event-korea-election.png",
    side: "Yes",
    quantity: "1000",
    amount: "$2000",
    profit: "--",
    return: "--",
    time: "3小时前"
  },
  {
    id: 4,
    trader: {
      name: mockUserData.name,
      address: mockUserData.address,
      avatar: mockUserData.avatar
    },
    action: "buy",
    market: "Will there be a recession in the US before 2025?",
    marketImage: "/images/event-korea-election.png",
    side: "No",
    quantity: "1500",
    amount: "$3000",
    profit: "+$15000",
    return: "+15%",
    time: "4小时前"
  },
  {
    id: 5,
    trader: {
      name: mockUserData.name,
      address: mockUserData.address,
      avatar: mockUserData.avatar
    },
    action: "sell",
    market: "Will OpenAI release GPT-5 before December 2024?",
    marketImage: "/images/event-korea-election.png",
    side: "No",
    quantity: "800",
    amount: "$1600",
    profit: "+$8000",
    return: "+8%",
    time: "5小时前"
  },
  {
    id: 6,
    trader: {
      name: mockUserData.name,
      address: mockUserData.address,
      avatar: mockUserData.avatar
    },
    action: "buy",
    market: "Will Tesla stock reach $300 before year end?",
    marketImage: "/images/event-korea-election.png",
    side: "Yes",
    quantity: "1200",
    amount: "$2400",
    profit: "+$12000",
    return: "+12%",
    time: "6小时前"
  }
];

// 图表数据生成
const generateChartData = () => {
  const baseValue = 150;
  const data = [];
  let currentValue = baseValue;
  
  for (let i = 0; i < 100; i++) {
    const variation = (Math.random() - 0.5) * 8;
    const trend = Math.sin(i / 20) * 5;
    
    currentValue += variation + trend * 0.1;
    currentValue = Math.max(120, Math.min(180, currentValue));
    data.push(currentValue);
  }
  
  return data;
};

const UserDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  
  const [activeTab, setActiveTab] = useState<'positions' | 'activity'>('positions');
  const [chartType, setChartType] = useState<'total' | 'profit'>('total');
  const [timeFilter, setTimeFilter] = useState('1D');
  const [isFollowed, setIsFollowed] = useState(mockUserData.isFollowed);
  const [language, setLanguage] = useState<'en' | 'zh'>('zh'); // 默认中文
  
  // Activity页面的筛选状态
  const [activityActionFilter, setActivityActionFilter] = useState<'Buy' | 'Sell' | 'Redeem' | null>(null);
  const [activityAmountFilter, setActivityAmountFilter] = useState<'$>100' | '$>1k' | '$>2k' | '$>3k' | null>(null);
  
  // 排序状态
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>('none');

  // 翻译对象
  const t = {
    smartMoney: language === 'en' ? 'Smart Money' : '聪明钱',
    follow: language === 'en' ? 'Follow' : '关注',
    copyTrade: language === 'en' ? 'CopyTrade' : '跟单',
    search: language === 'en' ? 'Search traders' : '搜索交易员...',
    logIn: language === 'en' ? 'Log In' : '登录',
    positions: language === 'en' ? 'Positions' : '持仓',
    activity: language === 'en' ? 'Activity' : '活动',
    market: language === 'en' ? 'Market' : '市场',
    avgPrice: language === 'en' ? 'Avg Price' : '均价',
    quantity: language === 'en' ? 'Quantity' : '持仓数量',
    value: language === 'en' ? 'Value' : '持仓价值',
    returnRate: language === 'en' ? 'Return' : '收益率',
    trade: language === 'en' ? 'Trade' : '交易',
    totalValue: language === 'en' ? 'Total Value' : '总价值',
    profit: language === 'en' ? 'Profit' : '收益',
    buy: language === 'en' ? 'Buy' : '买入',
    sell: language === 'en' ? 'Sell' : '卖出',
    redeem: language === 'en' ? 'Redeem' : '赎回',
    copyTradeBtn: language === 'en' ? 'Copy Trade' : '跟单',
    shares: language === 'en' ? 'shares' : '股',
    amount: language === 'en' ? 'Amount' : '金额',
    profitLabel: language === 'en' ? 'Profit' : '利润',
    returnLabel: language === 'en' ? 'Return' : '收益',
    time: language === 'en' ? 'Time' : '时间'
  };

  // 处理语言切换
  const handleLanguageToggle = () => {
    setLanguage(language === 'en' ? 'zh' : 'en');
  };

  // 根据图表类型和时间筛选器生成图表数据，但不受表格排序影响
  const chartData = React.useMemo(() => {
    // 使用固定的随机种子来确保相同的筛选条件总是产生相同的图表
    const seed = chartType === 'total' ? 1234 : 5678;
    let randomSeed = seed + (timeFilter === '1D' ? 1 : timeFilter === '3D' ? 3 : timeFilter === '30D' ? 30 : 100);
    
    const seededRandom = () => {
      randomSeed = (randomSeed * 9301 + 49297) % 233280;
      return randomSeed / 233280;
    };
    
    const baseValue = chartType === 'total' ? 150 : 80; // 总价值基线更高，收益基线较低
    const data = [];
    let currentValue = baseValue;
    
    // 根据时间筛选器调整数据点数量
    const dataPoints = timeFilter === '1D' ? 24 : 
                      timeFilter === '3D' ? 72 : 
                      timeFilter === '30D' ? 120 : 100; // All
    
    for (let i = 0; i < dataPoints; i++) {
      const variation = (seededRandom() - 0.5) * (chartType === 'total' ? 8 : 12);
      const trend = Math.sin(i / (dataPoints / 10)) * (chartType === 'total' ? 5 : 8);
      
      currentValue += variation + trend * 0.2;
      
      if (chartType === 'total') {
        currentValue = Math.max(120, Math.min(200, currentValue));
      } else {
        // 收益图表波动更大
        currentValue = Math.max(20, Math.min(140, currentValue));
      }
      
      data.push(currentValue);
    }
    
    return data;
  }, [chartType, timeFilter]); // 只依赖于图表相关的状态，不依赖排序状态

  // 排序数据逻辑
  const getSortedActivities = () => {
    if (!sortField || sortOrder === 'none') {
      return mockUserData.activities;
    }

    const sorted = [...mockUserData.activities].sort((a, b) => {
      let aValue: number, bValue: number;

      switch (sortField) {
        case 'price':
          aValue = parseFloat(a.price?.replace(/[¢]/g, '') || '0');
          bValue = parseFloat(b.price?.replace(/[¢]/g, '') || '0');
          break;
        case 'quantity':
          aValue = parseInt(a.shares.replace(/[^\d]/g, ''));
          bValue = parseInt(b.shares.replace(/[^\d]/g, ''));
          break;
        case 'value':
          aValue = parseFloat(a.amount.replace(/[\$,]/g, ''));
          bValue = parseFloat(b.amount.replace(/[\$,]/g, ''));
          break;
        case 'return':
          aValue = parseFloat(a.return.replace(/[+%]/g, ''));
          bValue = parseFloat(b.return.replace(/[+%]/g, ''));
          break;
        default:
          return 0;
      }

      if (sortOrder === 'asc') {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    });

    return sorted;
  };

  // 获取Activity数据 - 添加筛选逻辑
  const getActivityData = () => {
    let filteredData = activityData;

    // 按交易类型筛选 - 如果为null则显示所有类型
    if (activityActionFilter !== null) {
      filteredData = filteredData.filter(activity => 
        activity.action.toLowerCase() === activityActionFilter.toLowerCase()
      );
    }

    // 按金额筛选 - 如果为null则显示所有金额
    if (activityAmountFilter !== null) {
      filteredData = filteredData.filter(activity => {
        const amount = parseFloat(activity.amount.replace(/[\$,]/g, ''));
        switch (activityAmountFilter) {
          case '$>100':
            return amount > 100;
          case '$>1k':
            return amount > 1000;
          case '$>2k':
            return amount > 2000;
          case '$>3k':
            return amount > 3000;
          default:
            return true;
        }
      });
    }

    return filteredData;
  };

  // 处理交易类型筛选点击 - 支持取消筛选
  const handleActivityActionFilter = (action: 'Buy' | 'Sell' | 'Redeem') => {
    if (activityActionFilter === action) {
      // 如果点击的是当前选中的，则取消筛选
      setActivityActionFilter(null);
    } else {
      // 否则设置新的筛选
      setActivityActionFilter(action);
    }
  };

  // 处理金额筛选点击 - 支持取消筛选
  const handleActivityAmountFilter = (amount: '$>100' | '$>1k' | '$>2k' | '$>3k') => {
    if (activityAmountFilter === amount) {
      // 如果点击的是当前选中的，则取消筛选
      setActivityAmountFilter(null);
    } else {
      // 否则设置新的筛选
      setActivityAmountFilter(amount);
    }
  };

  // 排序处理函数
  const handleSort = React.useCallback((field: SortField) => {
    if (sortField === field) {
      const nextOrder = sortOrder === 'none' ? 'desc' : sortOrder === 'desc' ? 'asc' : 'none';
      setSortOrder(nextOrder);
      if (nextOrder === 'none') {
        setSortField(null);
      }
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  }, [sortField, sortOrder]);

  // 排序图标组件
  const SortIcon = React.useCallback(({ field }: { field: SortField }) => {
    const isActive = sortField === field;
    const currentOrder = isActive ? sortOrder : 'none';
    
    return (
      <button
        onClick={() => handleSort(field)}
        className="ml-2 flex flex-col items-center justify-center w-3 h-5 hover:bg-gray-100 rounded transition-colors group"
      >
        <div 
          className={`w-0 h-0 border-l-[4px] border-r-[4px] border-b-[4px] border-transparent mb-[1px] transition-colors ${
            currentOrder === 'asc' ? 'border-b-gray-800' : 'border-b-gray-300 group-hover:border-b-gray-400'
          }`}
        />
        <div 
          className={`w-0 h-0 border-l-[4px] border-r-[4px] border-t-[4px] border-transparent transition-colors ${
            currentOrder === 'desc' ? 'border-t-gray-800' : 'border-t-gray-300 group-hover:border-t-gray-400'
          }`}
        />
      </button>
    );
  }, [sortField, sortOrder, handleSort]);

  // SVG Chart Component
  const LineChart = ({ data }: { data: number[] }) => {
    const width = 600;
    const height = 200;
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);
    const range = maxValue - minValue;

    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - minValue) / range) * height;
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
        <defs>
          <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 0 }} />
          </linearGradient>
        </defs>
        <polyline
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
          points={points}
        />
        <polyline
          fill="url(#chartGradient)"
          points={`0,${height} ${points} ${width},${height}`}
        />
      </svg>
    );
  };

  return (
    <>
      <Head>
        <title>PolyAlpha - Discover Polymarket smart money</title>
        <meta name="description" content="Find and follow smart money on Polymarket. Follow top predictors in every field — and become a cross-domain prediction expert yourself." />
      </Head>
      
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-white sticky top-0 z-50">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            {/* Mobile Layout */}
            <div className="lg:hidden">
              {/* Top Row: Logo + Right buttons */}
              <div className="flex items-center justify-between h-16">
                <a href="/" className="flex items-center hover:opacity-80 transition-opacity">
                  <div className="relative w-6 h-6 sm:w-8 sm:h-8 mr-2">
                    <Image
                      src="/images/logo.png"
                      alt="PolyAlpha Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-lg sm:text-xl font-bold text-black">PolyAlpha</span>
                </a>
                
                <div className="flex items-center space-x-2">
                  <a 
                    href="https://x.com/PolyAlpha" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-1.5 text-gray-600 hover:text-black transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  
                  <button 
                    onClick={handleLanguageToggle}
                    className="px-2 py-1 rounded text-xs font-medium text-gray-600 hover:text-black hover:bg-gray-100 transition-colors border border-gray-300"
                  >
                    {language === 'en' ? 'EN' : '中文'}
                  </button>
                  
                  <button className="text-white px-3 py-1.5 rounded-xl font-bold transition-colors text-sm hover:opacity-90" style={{backgroundColor: '#1026D2'}}>
                    {t.logIn}
                  </button>
                </div>
              </div>
              
              {/* Bottom Row: Navigation */}
              <div className="pb-3 border-b border-gray-200">
                <nav className="flex items-center justify-center space-x-6">
                  <a 
                    href="/app"
                    className="px-2 py-1.5 font-bold text-base transition-colors text-gray-600 hover:text-black"
                  >
                    {t.smartMoney}
                  </a>
                  <a 
                    href="/app?tab=following"
                    className="px-2 py-1.5 font-bold text-base transition-colors text-gray-600 hover:text-black"
                  >
                    {t.follow}
                  </a>
                  <a 
                    href="/app?tab=copytrade"
                    className="px-2 py-1.5 font-bold text-base transition-colors text-gray-600 hover:text-black"
                  >
                    {t.copyTrade}
                  </a>
                </nav>
              </div>
              
              {/* Search Row */}
              <div className="py-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder={t.search}
                    className="w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium text-sm placeholder:font-medium placeholder:text-gray-500"
                    style={{backgroundColor: '#F5F5F5', borderColor: '#E5E5E5', borderWidth: '1px'}}
                  />
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:flex items-center h-16">
              <a href="/" className="flex items-center hover:opacity-80 transition-opacity">
                <div className="relative w-8 h-8 mr-3">
                  <Image
                    src="/images/logo.png"
                    alt="PolyAlpha Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-xl font-bold text-black">PolyAlpha</span>
              </a>

              <div className="flex-1 flex items-center justify-center">
                <div className="flex items-center space-x-8">
                  <nav className="flex items-center space-x-6">
                    <a 
                      href="/app"
                      className="px-3 py-1.5 font-extrabold text-xl transition-colors text-gray-600 hover:text-black"
                    >
                      {t.smartMoney}
                    </a>
                    <a 
                      href="/app?tab=following"
                      className="px-3 py-1.5 font-extrabold text-xl transition-colors text-gray-600 hover:text-black"
                    >
                      {t.follow}
                    </a>
                    <a 
                      href="/app?tab=copytrade"
                      className="px-3 py-1.5 font-extrabold text-xl transition-colors text-gray-600 hover:text-black"
                    >
                      {t.copyTrade}
                    </a>
                  </nav>
                  
                  <div className="relative ml-8">
                    <input
                      type="text"
                      placeholder={t.search}
                      className="pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64 font-bold text-base placeholder:font-bold placeholder:text-gray-500"
                      style={{backgroundColor: '#F5F5F5', borderColor: '#E5E5E5', borderWidth: '1px'}}
                    />
                    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <a 
                  href="https://x.com/PolyAlpha" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 text-gray-600 hover:text-black transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                
                <button 
                  onClick={handleLanguageToggle}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 hover:text-black hover:bg-gray-100 transition-colors border border-gray-300"
                >
                  {language === 'en' ? 'EN' : '中文'}
                </button>
                
                <button className="p-2 text-gray-600 hover:text-black transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                </button>
                
                <button className="text-white px-4 py-2 rounded-2xl font-bold transition-colors text-base hover:opacity-90" style={{backgroundColor: '#1026D2'}}>
                  {t.logIn}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* User Info Section */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
            {/* Left Column */}
            <div className="space-y-6 flex flex-col lg:col-span-3">
              {/* User Info */}
              <div className="bg-white border border-gray-300 rounded-lg p-6" style={{borderColor: '#F2F2F2'}}>
                {/* Desktop Layout */}
                <div className="hidden lg:flex items-center space-x-4 h-40">
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <Image
                      src={mockUserData.avatar}
                      alt={mockUserData.name}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between h-20">
                    <div className="flex items-center justify-between">
                      <h1 className="text-xl font-bold text-black truncate">{mockUserData.name}</h1>
                      <button
                        onClick={() => setIsFollowed(!isFollowed)}
                        className="flex-shrink-0 ml-2"
                      >
                        <svg className={`w-6 h-6 ${isFollowed ? 'text-purple-500' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                      </button>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <p className="text-sm text-gray-500">{mockUserData.address}</p>
                      <p className="text-sm text-gray-500">{mockUserData.joinDate}</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {mockUserData.tags.map((tag, index) => (
                        <span
                          key={index}
                          className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${
                            tag === "Crypto" ? "bg-orange-100 text-orange-700" :
                            tag === "Sports" ? "bg-green-100 text-green-700" :
                            tag === "Politics" ? "bg-blue-100 text-blue-700" :
                            "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {tag === "Crypto" && "💰 "}
                          {tag === "Sports" && "⚽ "}
                          {tag === "Politics" && "🏛️ "}
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Mobile Layout */}
                <div className="lg:hidden">
                  <div className="flex items-start space-x-3 mb-4">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={mockUserData.avatar}
                        alt={mockUserData.name}
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h1 className="text-lg font-bold text-black truncate">{mockUserData.name}</h1>
                        <button
                          onClick={() => setIsFollowed(!isFollowed)}
                          className="flex-shrink-0 ml-2"
                        >
                          <svg className={`w-5 h-5 ${isFollowed ? 'text-purple-500' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                          </svg>
                        </button>
                      </div>
                      
                      <div className="flex flex-col space-y-2 text-xs text-gray-500 mb-3">
                        <span>{mockUserData.address}</span>
                        <span>{mockUserData.joinDate}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Tags Row - Three tags in a row */}
                  <div className="flex gap-2">
                    {mockUserData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className={`flex-1 text-center px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${
                          tag === "Crypto" ? "bg-orange-100 text-orange-700" :
                          tag === "Sports" ? "bg-green-100 text-green-700" :
                          tag === "Politics" ? "bg-blue-100 text-blue-700" :
                          "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {tag === "Crypto" && "💰 "}
                        {tag === "Sports" && "⚽ "}
                        {tag === "Politics" && "🏛️ "}
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="bg-white border border-gray-300 rounded-lg p-6" style={{borderColor: '#F2F2F2'}}>
                {/* Desktop Layout */}
                <div className="hidden lg:flex items-center h-28">
                  <div className="flex justify-between w-full">
                    {Object.entries(mockUserData.stats).map(([key, stat]) => {
                      // 根据key选择对应的图标
                      const getIconSrc = (statKey: string) => {
                        switch (statKey) {
                          case 'positions':
                            return '/images/positions-icon.png';
                          case 'profit':
                            return '/images/profit-icon.png';
                          case 'volume':
                            return '/images/volume-icon.png';
                          case 'markets':
                            return '/images/markets-icon.png';
                          default:
                            return '/images/positions-icon.png';
                        }
                      };

                      return (
                        <div key={key} className="flex flex-col items-start">
                          <div className="mb-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                              <div className="relative w-8 h-8">
                                <Image
                                  src={getIconSrc(key)}
                                  alt={stat.label}
                                  fill
                                  className="object-contain scale-125"
                                />
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                          <p className="text-lg font-bold text-black">{stat.value}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Mobile Layout */}
                <div className="lg:hidden grid grid-cols-2 gap-4">
                  {Object.entries(mockUserData.stats).map(([key, stat]) => {
                    // 根据key选择对应的图标
                    const getIconSrc = (statKey: string) => {
                      switch (statKey) {
                        case 'positions':
                          return '/images/positions-icon.png';
                        case 'profit':
                          return '/images/profit-icon.png';
                        case 'volume':
                          return '/images/volume-icon.png';
                        case 'markets':
                          return '/images/markets-icon.png';
                        default:
                          return '/images/positions-icon.png';
                      }
                    };

                    return (
                      <div key={key} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
                          <div className="relative w-6 h-6">
                            <Image
                              src={getIconSrc(key)}
                              alt={stat.label}
                              fill
                              className="object-contain scale-125"
                            />
                          </div>
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-gray-500">{stat.label}</p>
                          <p className="text-sm font-bold text-black truncate">{stat.value}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Chart */}
            <div className="flex flex-col lg:col-span-2 bg-white border border-gray-300 rounded-lg" style={{height: '260px', padding: '24px 10px 10px 10px', borderColor: '#F2F2F2'}}>
              {/* Desktop Chart Controls */}
              <div className="hidden lg:flex items-center justify-between mb-4">
                <div className="flex items-center space-x-1 px-3 py-1 rounded-lg" style={{backgroundColor: '#F5F5F5'}}>
                  <button 
                    onClick={() => setChartType('total')}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                      chartType === 'total'
                        ? 'bg-black text-white'
                        : 'text-gray-600 hover:text-black hover:bg-white'
                    }`}
                  >
                    {t.totalValue}
                  </button>
                  <button 
                    onClick={() => setChartType('profit')}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                      chartType === 'profit'
                        ? 'bg-black text-white'
                        : 'text-gray-600 hover:text-black hover:bg-white'
                    }`}
                  >
                    {t.profit}
                  </button>
                </div>
                
                <div className="flex items-center space-x-1 px-3 py-1 rounded-lg" style={{backgroundColor: '#F5F5F5'}}>
                  {(['1D', '3D', '30D', 'All'] as const).map((period) => (
                    <button
                      key={period}
                      onClick={() => setTimeFilter(period)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        timeFilter === period
                          ? 'bg-black text-white'
                          : 'text-gray-600 hover:text-black hover:bg-white'
                      }`}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Chart Controls */}
              <div className="lg:hidden space-y-2 mb-4" style={{paddingTop: '15px', paddingLeft: '15px', paddingRight: '15px'}}>
                <div className="flex items-center justify-start">
                  <div className="flex items-center space-x-1 px-2 py-1 rounded-lg" style={{backgroundColor: '#F5F5F5'}}>
                    <button 
                      onClick={() => setChartType('total')}
                      className={`px-2 py-1 rounded-lg text-xs font-medium transition-colors ${
                        chartType === 'total'
                          ? 'bg-black text-white'
                          : 'text-gray-600 hover:text-black hover:bg-white'
                      }`}
                    >
                      {t.totalValue}
                    </button>
                    <button 
                      onClick={() => setChartType('profit')}
                      className={`px-2 py-1 rounded-lg text-xs font-medium transition-colors ${
                        chartType === 'profit'
                          ? 'bg-black text-white'
                          : 'text-gray-600 hover:text-black hover:bg-white'
                      }`}
                    >
                      {t.profit}
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-start">
                  <div className="flex items-center space-x-1 px-2 py-1 rounded-lg" style={{backgroundColor: '#F5F5F5'}}>
                    {(['1D', '3D', '30D', 'All'] as const).map((period) => (
                      <button
                        key={period}
                        onClick={() => setTimeFilter(period)}
                        className={`px-2 py-1 rounded-lg text-xs font-medium transition-colors ${
                          timeFilter === period
                            ? 'bg-black text-white'
                            : 'text-gray-600 hover:text-black hover:bg-white'
                        }`}
                      >
                        {period}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex-1">
                <LineChart data={chartData} />
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="bg-white rounded-lg mb-4">
            <div className="border-b border-gray-200">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('positions')}
                  className={`py-4 px-6 text-sm font-medium ${
                    activeTab === 'positions'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {t.positions}
                </button>
                <button
                  onClick={() => setActiveTab('activity')}
                  className={`py-4 px-6 text-sm font-medium ${
                    activeTab === 'activity'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {t.activity}
                </button>
              </div>
            </div>
          </div>

          {/* Table Section */}
          {activeTab === 'positions' && (
            <div>
              {/* Desktop Table Header */}
              <div className="mb-4 hidden lg:block">
                <div className="grid grid-cols-18 gap-4 px-6 py-4 text-sm font-medium text-gray-600">
                  <div className="col-span-8">{t.market}</div>
                  <div className="col-span-2 text-right flex items-center justify-end">
                    {t.avgPrice}
                    <SortIcon field="price" />
                  </div>
                  <div className="col-span-2 text-right flex items-center justify-end">
                    {t.quantity}
                    <SortIcon field="quantity" />
                  </div>
                  <div className="col-span-2 text-right flex items-center justify-end">
                    {t.value}
                    <SortIcon field="value" />
                  </div>
                  <div className="col-span-2 text-right flex items-center justify-end">
                    {t.returnRate}
                    <SortIcon field="return" />
                  </div>
                  <div className="col-span-2 text-right">{t.trade}</div>
                </div>
              </div>

              {/* Table Rows */}
              <div className="space-y-3">
                {getSortedActivities().map((activity) => (
                  <div key={activity.id} className="bg-white border border-gray-300 rounded-lg transition-colors" style={{borderColor: '#F2F2F2'}}>
                    {/* Desktop Layout */}
                    <div className="hidden lg:grid lg:grid-cols-18 gap-4 px-6 py-4">
                      <div className="col-span-8 flex items-center space-x-3">
                        <div className="relative w-10 h-10 flex-shrink-0">
                          <Image
                            src={activity.image}
                            alt="Market"
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-black">{activity.market}</p>
                          <span className="inline-block px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                            {activity.position}
                          </span>
                        </div>
                      </div>
                      <div className="col-span-2 flex items-center justify-end">
                        <span className="text-sm text-gray-900">{activity.price}</span>
                      </div>
                      <div className="col-span-2 flex items-center justify-end">
                        <span className="text-sm text-gray-900">{activity.shares}</span>
                      </div>
                      <div className="col-span-2 flex items-center justify-end">
                        <span className="text-sm font-medium text-gray-900">{activity.amount}</span>
                      </div>
                      <div className="col-span-2 flex items-center justify-end">
                        <span className="text-sm font-medium text-green-600">{activity.return}</span>
                      </div>
                      <div className="col-span-2 flex items-center justify-end">
                        <button className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors bg-black text-white hover:bg-gray-800 whitespace-nowrap">
                          {t.trade}
                        </button>
                      </div>
                    </div>

                    {/* Mobile Layout */}
                    <div className="lg:hidden p-4">
                      {/* 第一行：事件头像 + 市场信息 + Yes/No + Trade按钮 */}
                      <div className="flex items-center mb-3">
                        <div className="relative w-12 h-12 flex-shrink-0 mr-3">
                          <Image
                            src={activity.image}
                            alt="Market"
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-black truncate">{activity.market}</p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="inline-block px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                              {activity.position}
                            </span>
                            <button className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors bg-black text-white hover:bg-gray-800">
                              {t.trade}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* 第二行：4列数据网格 */}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-gray-50 rounded p-2">
                          <div className="text-xs text-gray-500">{t.avgPrice}</div>
                          <div className="text-sm font-medium text-gray-900">{activity.price}</div>
                        </div>
                        <div className="bg-gray-50 rounded p-2">
                          <div className="text-xs text-gray-500">{t.returnRate}</div>
                          <div className="text-sm font-medium text-green-600">{activity.return}</div>
                        </div>
                        <div className="bg-gray-50 rounded p-2">
                          <div className="text-xs text-gray-500">{t.quantity}</div>
                          <div className="text-sm font-medium text-gray-900">{activity.shares}</div>
                        </div>
                        <div className="bg-gray-50 rounded p-2">
                          <div className="text-xs text-gray-500">{t.value}</div>
                          <div className="text-sm font-medium text-gray-900">{activity.amount}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div>
              {/* Activity筛选器 */}
              <div className="mb-6">
                {/* Desktop筛选器 */}
                <div className="hidden lg:flex items-center justify-start space-x-4">
                  {/* 交易类型筛选器 */}
                  <div className="flex items-center space-x-1 px-3 py-1 rounded-lg" style={{backgroundColor: '#F5F5F5'}}>
                    {['Buy', 'Sell', 'Redeem'].map((filter) => (
                      <button
                        key={filter}
                        onClick={() => handleActivityActionFilter(filter as 'Buy' | 'Sell' | 'Redeem')}
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                          filter === activityActionFilter 
                            ? "bg-black text-white" 
                            : "text-gray-600 hover:text-black hover:bg-white"
                        }`}
                      >
                        {filter === 'Buy' ? t.buy : filter === 'Sell' ? t.sell : t.redeem}
                      </button>
                    ))}
                  </div>
                  
                  {/* 金额筛选器 */}
                  <div className="flex items-center space-x-1 px-3 py-1 rounded-lg" style={{backgroundColor: '#F5F5F5'}}>
                    {(['$>100', '$>1k', '$>2k', '$>3k'] as const).map((filter) => (
                      <button
                        key={filter}
                        onClick={() => handleActivityAmountFilter(filter)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                          filter === activityAmountFilter 
                            ? "bg-black text-white" 
                            : "text-gray-600 hover:text-black hover:bg-white"
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile筛选器 */}
                <div className="lg:hidden space-y-3">
                  {/* 交易类型筛选器 */}
                  <div className="flex items-center justify-start">
                    <div className="flex items-center space-x-1 px-2 py-1 rounded-lg" style={{backgroundColor: '#F5F5F5'}}>
                      {['Buy', 'Sell', 'Redeem'].map((filter) => (
                        <button
                          key={filter}
                          onClick={() => handleActivityActionFilter(filter as 'Buy' | 'Sell' | 'Redeem')}
                          className={`px-2 py-1 rounded-lg text-xs font-medium transition-colors ${
                            filter === activityActionFilter 
                              ? "bg-black text-white" 
                              : "text-gray-600 hover:text-black hover:bg-white"
                          }`}
                        >
                          {filter === 'Buy' ? t.buy : filter === 'Sell' ? t.sell : t.redeem}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* 金额筛选器 */}
                  <div className="flex items-center justify-start">
                    <div className="flex items-center space-x-1 px-2 py-1 rounded-lg" style={{backgroundColor: '#F5F5F5'}}>
                      {(['$>100', '$>1k', '$>2k', '$>3k'] as const).map((filter) => (
                        <button
                          key={filter}
                          onClick={() => handleActivityAmountFilter(filter)}
                          className={`px-2 py-1 rounded-lg text-xs font-medium transition-colors ${
                            filter === activityAmountFilter 
                              ? "bg-black text-white" 
                              : "text-gray-600 hover:text-black hover:bg-white"
                          }`}
                        >
                          {filter}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Activity卡片 */}
              <div className="space-y-3">
                {getActivityData().map((activity: ActivityRecord) => (
                  <div key={activity.id} className="bg-white border border-gray-300 rounded-lg transition-colors" style={{borderColor: '#F2F2F2'}}>
                    {/* 桌面版布局 */}
                    <div className="hidden lg:block px-6 py-4">
                      {/* 第一行：用户信息 + 交易动作 + 数量/金额/盈亏/收益率 */}
                      <div className="flex items-center justify-between mb-3">
                        {/* 左侧：用户信息 + 交易动作描述 */}
                        <div className="flex items-center">
                          <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
                            <Image
                              src={activity.trader.avatar}
                              alt={activity.trader.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-black text-sm">{activity.trader.name}</span>
                            <span className="text-sm text-gray-600">
                              {activity.action === 'buy' ? t.buy : 
                               activity.action === 'sell' ? t.sell : t.redeem}
                            </span>
                            <span className="text-sm font-medium text-black">{activity.quantity} {t.shares}</span>
                            <span className="text-sm text-gray-600">{t.amount}</span>
                            <span className="text-sm font-medium text-black">{activity.amount}</span>
                          </div>
                        </div>
                        
                        {/* 右侧：盈亏和收益率 */}
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <span className="text-xs text-gray-500">{t.profitLabel}</span>
                            <div className={`text-sm font-medium ${
                              activity.profit.startsWith('+') ? 'text-green-600' : 
                              activity.profit.startsWith('-') ? 'text-red-600' : 'text-gray-600'
                            }`}>
                              {activity.profit}
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-xs text-gray-500">{t.returnLabel}</span>
                            <div className={`text-sm font-bold ${
                              activity.return.startsWith('+') ? 'text-green-600' : 
                              activity.return.startsWith('-') ? 'text-red-600' : 'text-gray-600'
                            }`}>
                              {activity.return}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 第二行：事件描述 + Yes/No标签 + 时间 + Polygon图标 + Copy Trade按钮 */}
                      <div className="flex items-center justify-between">
                        {/* 左侧：事件头像 + 事件描述 + Yes/No标签 */}
                        <div className="flex items-center space-x-3">
                          {/* 事件头像 - 正方形带圆角 */}
                          <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                            <Image
                              src={activity.marketImage}
                              alt="Event"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="text-sm text-gray-700 max-w-md truncate">{activity.market}</span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            activity.side === 'Yes' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {activity.side}
                          </span>
                        </div>
                        
                        {/* 右侧：时间 + Polygon图标 + Copy Trade按钮 */}
                        <div className="flex items-center space-x-3">
                          <span className="text-xs text-gray-500">{activity.time}</span>
                          {/* Polygon图标 */}
                          <div className="relative w-4 h-4 rounded-full overflow-hidden bg-purple-600 flex items-center justify-center">
                            <Image
                              src="/images/polygon-icon.png"
                              alt="Polygon"
                              fill
                              className="object-cover"
                            />
                          </div>
                          {/* Copy Trade按钮 - redeem类型时禁用 */}
                          <button 
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                              activity.action === 'redeem' 
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                                : 'bg-black text-white hover:bg-gray-800'
                            }`}
                            disabled={activity.action === 'redeem'}
                          >
                            {t.copyTradeBtn}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* H5移动端布局 */}
                    <div className="lg:hidden p-4">
                      {/* 第一行：用户头像 + 姓名 + 交易动作 */}
                      <div className="flex items-center mb-3">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden mr-3">
                          <Image
                            src={activity.trader.avatar}
                            alt={activity.trader.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-black text-sm">{activity.trader.name}</span>
                            <span className="text-sm text-gray-600">
                              {activity.action === 'buy' ? t.buy : 
                               activity.action === 'sell' ? t.sell : t.redeem}
                            </span>
                            <span className="text-sm font-medium text-black">{activity.quantity} {t.shares}</span>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {t.amount}: {activity.amount} • {activity.time}
                          </div>
                        </div>
                      </div>

                      {/* 第二行：事件信息 */}
                      <div className="flex items-center mb-3">
                        <div className="relative w-6 h-6 rounded overflow-hidden bg-gray-100 flex items-center justify-center mr-2">
                          <Image
                            src={activity.marketImage}
                            alt="Event"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm text-gray-700 truncate">{activity.market}</div>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ml-2 ${
                          activity.side === 'Yes' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {activity.side}
                        </span>
                      </div>

                      {/* 第三行：数据网格 */}
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <div className="bg-gray-50 rounded p-2">
                          <div className="text-xs text-gray-500">{t.profitLabel}</div>
                          <div className={`text-sm font-medium ${
                            activity.profit.startsWith('+') ? 'text-green-600' : 
                            activity.profit.startsWith('-') ? 'text-red-600' : 'text-gray-600'
                          }`}>
                            {activity.profit}
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded p-2">
                          <div className="text-xs text-gray-500">{t.returnLabel}</div>
                          <div className={`text-sm font-bold ${
                            activity.return.startsWith('+') ? 'text-green-600' : 
                            activity.return.startsWith('-') ? 'text-red-600' : 'text-gray-600'
                          }`}>
                            {activity.return}
                          </div>
                        </div>
                      </div>

                      {/* 第四行：底部操作 */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="relative w-4 h-4 rounded-full overflow-hidden bg-purple-600 flex items-center justify-center">
                            <Image
                              src="/images/polygon-icon.png"
                              alt="Polygon"
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                        <button 
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                            activity.action === 'redeem' 
                              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                              : 'bg-black text-white hover:bg-gray-800'
                          }`}
                          disabled={activity.action === 'redeem'}
                        >
                          {t.copyTradeBtn}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserDetailPage; 