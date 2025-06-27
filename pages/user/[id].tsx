import React, { useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { useRouter } from 'next/router';

// 排序类型定义
type SortField = 'price' | 'quantity' | 'value' | 'return';
type SortOrder = 'none' | 'desc' | 'asc';

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
      market: 'Trump wins 2024 US Presidential Election?',
      position: 'No',
      shares: '1567 Shares',
      amount: '$892,431',
      return: '+156%',
      price: '57¢',
      image: '/images/event-korea-election.png'
    },
    {
      id: 3,
      market: 'Bitcoin reaches $100k before December 2024?',
      position: 'Yes',
      shares: '4891 Shares',
      amount: '$2,164,789',
      return: '+847%',
      price: '44¢',
      image: '/images/event-korea-election.png'
    },
    {
      id: 4,
      market: 'Apple stock price above $200 in Q1 2025?',
      position: 'Yes',
      shares: '775 Shares',
      amount: '$156,234',
      return: '+34%',
      price: '20¢',
      image: '/images/event-korea-election.png'
    },
    {
      id: 5,
      market: 'ChatGPT-5 released before June 2024?',
      position: 'No',
      shares: '3421 Shares',
      amount: '$1,789,123',
      return: '+623%',
      price: '76¢',
      image: '/images/event-korea-election.png'
    }
  ]
};

// Generate smoother chart data with smaller fluctuations
const generateChartData = () => {
  const baseValue = 150; // 基准值
  const data = [];
  let currentValue = baseValue;
  
  for (let i = 0; i < 100; i++) {
    // 使用更小的波动范围和趋势
    const variation = (Math.random() - 0.5) * 8; // 减小波动范围到±4
    const trend = Math.sin(i / 20) * 5; // 添加缓慢的趋势波动
    
    currentValue += variation + trend * 0.1;
    // 限制在合理范围内
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
  
  // 排序状态
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>('none');

  const chartData = generateChartData();

  // 排序数据逻辑
  const getSortedActivities = () => {
    if (!sortField || sortOrder === 'none') {
      return mockUserData.activities;
    }

    const sorted = [...mockUserData.activities].sort((a, b) => {
      let aValue: number, bValue: number;

      switch (sortField) {
        case 'price':
          // 解析价格 "84¢" -> 84
          aValue = parseFloat(a.price?.replace(/[¢]/g, '') || '0');
          bValue = parseFloat(b.price?.replace(/[¢]/g, '') || '0');
          break;
        case 'quantity':
          // 解析份额数量 "2323 Shares" -> 2323
          aValue = parseInt(a.shares.replace(/[^\d]/g, ''));
          bValue = parseInt(b.shares.replace(/[^\d]/g, ''));
          break;
        case 'value':
          // 解析金额 "$3,523,535" -> 3523535
          aValue = parseFloat(a.amount.replace(/[\$,]/g, ''));
          bValue = parseFloat(b.amount.replace(/[\$,]/g, ''));
          break;
        case 'return':
          // 解析收益率 "+2342%" -> 2342
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

  // 排序处理函数
  const handleSort = (field: SortField) => {
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
  };

  // 排序图标组件
  const SortIcon: React.FC<{ field: SortField }> = ({ field }) => {
    const isActive = sortField === field;
    const currentOrder = isActive ? sortOrder : 'none';
    
    return (
      <button
        onClick={() => handleSort(field)}
        className="ml-2 flex flex-col items-center justify-center w-3 h-5 hover:bg-gray-100 rounded transition-colors group"
      >
        {/* 上三角 */}
        <div 
          className={`w-0 h-0 border-l-[4px] border-r-[4px] border-b-[4px] border-transparent mb-[1px] transition-colors ${
            currentOrder === 'asc' ? 'border-b-gray-800' : 'border-b-gray-300 group-hover:border-b-gray-400'
          }`}
        />
        {/* 下三角 */}
        <div 
          className={`w-0 h-0 border-l-[4px] border-r-[4px] border-t-[4px] border-transparent transition-colors ${
            currentOrder === 'desc' ? 'border-t-gray-800' : 'border-t-gray-300 group-hover:border-t-gray-400'
          }`}
        />
      </button>
    );
  };

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
                  {/* X Icon */}
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
                  
                  {/* Language Toggle */}
                  <button 
                    className="px-2 py-1 rounded text-xs font-medium text-gray-600 hover:text-black hover:bg-gray-100 transition-colors border border-gray-300"
                  >
                    中文
                  </button>

                  {/* Login button */}
                  <button className="text-white px-3 py-1.5 rounded-xl font-bold transition-colors text-sm hover:opacity-90" style={{backgroundColor: '#1026D2'}}>
                    Log In
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
                    Smart Money
                  </a>
                  <a 
                    href="/app"
                    className="px-2 py-1.5 font-bold text-base transition-colors text-gray-600 hover:text-black"
                  >
                    Follow
                  </a>
                  <a 
                    href="/app"
                    className="px-2 py-1.5 font-bold text-base transition-colors text-gray-600 hover:text-black"
                  >
                    CopyTrade
                  </a>
                </nav>
              </div>
              
              {/* Search Row */}
              <div className="py-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search traders"
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
              {/* Left: Logo and Brand */}
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

              {/* Center: Navigation and Search */}
              <div className="flex-1 flex items-center justify-center">
                <div className="flex items-center space-x-8">
                  {/* Navigation Tabs */}
                  <nav className="flex items-center space-x-6">
                    <a 
                      href="/app"
                      className="px-3 py-1.5 font-extrabold text-xl transition-colors text-gray-600 hover:text-black"
                    >
                      Smart Money
                    </a>
                    <a 
                      href="/app"
                      className="px-3 py-1.5 font-extrabold text-xl transition-colors text-gray-600 hover:text-black"
                    >
                      Follow
                    </a>
                    <a 
                      href="/app"
                      className="px-3 py-1.5 font-extrabold text-xl transition-colors text-gray-600 hover:text-black"
                    >
                      CopyTrade
                    </a>
                  </nav>
                  
                  {/* Search Bar */}
                  <div className="relative ml-8">
                    <input
                      type="text"
                      placeholder="Search traders"
                      className="pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64 font-bold text-base placeholder:font-bold placeholder:text-gray-500"
                      style={{backgroundColor: '#F5F5F5', borderColor: '#E5E5E5', borderWidth: '1px'}}
                    />
                    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Right: Icons and Login */}
              <div className="flex items-center space-x-3">
                {/* X Icon */}
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
                
                {/* Language Toggle */}
                <button className="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 hover:text-black hover:bg-gray-100 transition-colors border border-gray-300">
                  中文
                </button>
                
                {/* Dark Mode Toggle (placeholder) */}
                <button className="p-2 text-gray-600 hover:text-black transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                </button>
                
                {/* Login Button */}
                <button className="text-white px-4 py-2 rounded-2xl font-bold transition-colors text-base hover:opacity-90" style={{backgroundColor: '#1026D2'}}>
                  Log In
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Top Section: User Info + Stats + Chart */}
          <div className="bg-white rounded-xl p-6 mb-6">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:items-stretch">
              {/* Left Column */}
              <div className="space-y-6 flex flex-col lg:col-span-3">
                {/* Left Top: User Info */}
                <div className="flex items-center space-x-4">
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <Image
                      src={mockUserData.avatar}
                      alt={mockUserData.name}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between h-20">
                    {/* 第一行：姓名和心形按钮 */}
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
                    
                    {/* 第二行：地址和时间 */}
                    <div className="flex items-center space-x-3">
                      <p className="text-sm text-gray-500">{mockUserData.address}</p>
                      <p className="text-sm text-gray-500">{mockUserData.joinDate}</p>
                    </div>
                    
                    {/* 第三行：标签 */}
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

                {/* Left Bottom: Stats Cards */}
                <div className="grid grid-cols-4 gap-4">
                  {Object.entries(mockUserData.stats).map(([key, stat]) => (
                    <div key={key} className="text-center">
                      <div className="flex justify-center mb-2">
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                      <p className="text-lg font-bold text-black">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Chart + Time Controls */}
              <div className="h-full flex flex-col lg:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  {/* 总价值/收益切换按钮 */}
                  <div className="flex items-center space-x-1 px-3 py-1 rounded-lg" style={{backgroundColor: '#F5F5F5'}}>
                    <button
                      className="px-3 py-1 rounded-lg text-sm font-medium transition-colors bg-black text-white"
                    >
                      总价值
                    </button>
                    <button className="px-3 py-1 rounded-lg text-sm font-medium transition-colors text-gray-600 hover:text-black hover:bg-white">
                      收益
                    </button>
                  </div>
                  
                  {/* 时间筛选按钮 */}
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
                
                <div className="flex-1">
                  <LineChart data={chartData} />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section: Tabs and Tables */}
          <div className="bg-white rounded-xl overflow-hidden">
            {/* Tab Headers */}
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
                  持仓
                </button>
                <button
                  onClick={() => setActiveTab('activity')}
                  className={`py-4 px-6 text-sm font-medium ${
                    activeTab === 'activity'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  活动
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'positions' && (
                <div className="space-y-4">
                  {/* Table Header */}
                  <div className="mb-4">
                    <div className="grid grid-cols-5 gap-4 px-6 py-4 text-sm font-medium text-gray-600">
                      <div>Market</div>
                      <div className="text-center flex items-center justify-center">
                        均价
                        <SortIcon field="price" />
                      </div>
                      <div className="text-center flex items-center justify-center">
                        持仓数量
                        <SortIcon field="quantity" />
                      </div>
                      <div className="text-center flex items-center justify-center">
                        持仓价值
                        <SortIcon field="value" />
                      </div>
                      <div className="text-center flex items-center justify-center">
                        收益率
                        <SortIcon field="return" />
                      </div>
                    </div>
                  </div>

                  {/* Table Rows */}
                  <div className="space-y-3">
                    {getSortedActivities().map((activity) => (
                      <div key={activity.id} className="bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors" style={{borderColor: '#F2F2F2'}}>
                        <div className="grid grid-cols-5 gap-4 px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="relative w-10 h-10 flex-shrink-0">
                              <Image
                                src={activity.image}
                                alt="Market"
                                fill
                                className="object-cover rounded"
                              />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-black truncate">{activity.market}</p>
                              <span className="inline-block px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                                {activity.position}
                              </span>
                            </div>
                          </div>
                          <div className="text-center text-sm text-gray-900">{activity.price}</div>
                          <div className="text-center text-sm text-gray-900">{activity.shares}</div>
                          <div className="text-center text-sm font-medium text-gray-900">{activity.amount}</div>
                          <div className="text-center">
                            <div className="flex items-center justify-center space-x-2">
                              <span className="text-sm font-medium text-green-600">{activity.return}</span>
                              <button 
                                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors bg-black text-white hover:bg-gray-800"
                              >
                                Copy Trade
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'activity' && (
                <div className="space-y-4">
                  {mockUserData.activities.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                      <div className="relative w-12 h-12 flex-shrink-0">
                        <Image
                          src={activity.image}
                          alt="Activity"
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-black mb-1">{activity.market}</p>
                        <p className="text-xs text-gray-500">买入 {activity.position} • {activity.shares}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-green-600">{activity.return}</p>
                        <p className="text-xs text-gray-500">{activity.amount}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetailPage; 