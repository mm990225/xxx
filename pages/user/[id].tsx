import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

// 模拟数据
const mockUserData = {
  name: "name",
  address: "0x2313...2461",
  joinDate: "Joined may 2024",
  avatar: "/images/expert1.png",
  tags: ["Crypto", "Sports", "Politics"],
  isFollowed: false,
  stats: {
    positions: { label: "Positions", value: "$132,098.61" },
    profitLoss: { label: "Profit/docs", value: "$873,385.68" },
    volumeTraded: { label: "Volume traded", value: "$13,378.6.97" },
    marketsTraded: { label: "Markets traded", value: "272" }
  },
  activities: [
    {
      id: 1,
      type: "position",
      market: "Iran agrees to end enrichment of uranium before August?",
      position: "Yes",
      shares: "2323 Shares",
      amount: "$3523535",
      return: "+2342%",
      image: "/images/event-korea-election.png"
    },
    {
      id: 2,
      type: "position", 
      market: "Iran agrees to end enrichment of uranium before August?",
      position: "Yes",
      shares: "2323 Shares",
      amount: "$3523535",
      return: "+2342%",
      image: "/images/event-korea-election.png"
    },
    {
      id: 3,
      type: "position",
      market: "Iran agrees to end enrichment of uranium before August?", 
      position: "Yes",
      shares: "2323 Shares",
      amount: "$3523535",
      return: "+2342%",
      image: "/images/event-korea-election.png"
    }
  ]
};

// 模拟图表数据
const generateChartData = () => {
  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push(Math.random() * 50 + 50 + Math.sin(i / 10) * 20);
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

  const timeFilters = ['1D', '3D', '7D', '30D', 'All'];
  const chartData = generateChartData();

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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {/* Top Section: User Info + Stats + Chart */}
        <div className="bg-white rounded-xl p-6 mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: User Info */}
            <div className="lg:col-span-3">
              <div className="flex items-start space-x-4">
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
                  <p className="text-sm text-gray-500 mb-1">{mockUserData.address}</p>
                  <p className="text-sm text-gray-500 mb-3">{mockUserData.joinDate}</p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {mockUserData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs font-medium rounded-full flex items-center"
                        style={{
                          backgroundColor: tag === 'Crypto' ? '#FFF3CD' : tag === 'Sports' ? '#FFE5B4' : '#E3F2FD',
                          color: tag === 'Crypto' ? '#856404' : tag === 'Sports' ? '#E6A23C' : '#1976D2'
                        }}
                      >
                        <span className="mr-1">
                          {tag === 'Crypto' ? '₿' : tag === 'Sports' ? '⚽' : '🗳️'}
                        </span>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Center: Stats Cards */}
            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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

            {/* Right: Chart + Time Controls */}
            <div className="lg:col-span-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-1">
                  <button
                    className="px-3 py-1 rounded text-sm font-medium text-white"
                    style={{ backgroundColor: '#1026D2' }}
                  >
                    总价值
                  </button>
                  <button className="px-3 py-1 rounded text-sm font-medium text-gray-600 hover:bg-gray-100">
                    收益
                  </button>
                </div>
                <div className="flex space-x-1">
                  {(['1D', '3D', '30D', 'All'] as const).map((period) => (
                    <button
                      key={period}
                      onClick={() => setTimeFilter(period)}
                      className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                        timeFilter === period
                          ? 'text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                      style={timeFilter === period ? { backgroundColor: '#000' } : {}}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="h-32">
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
                className={`flex-1 py-4 px-6 text-sm font-medium text-center ${
                  activeTab === 'positions'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                持仓
              </button>
              <button
                onClick={() => setActiveTab('activity')}
                className={`flex-1 py-4 px-6 text-sm font-medium text-center ${
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
                    <div className="grid grid-cols-5 gap-4 text-sm font-medium text-gray-500 pb-2 border-b border-gray-200">
                      <div>Market</div>
                      <div className="text-center">均价</div>
                      <div className="text-center">持仓数量</div>
                      <div className="text-center">持仓价值</div>
                      <div className="text-center">收益率</div>
                    </div>

                    {/* Table Rows */}
                    {mockUserData.activities.map((activity) => (
                      <div key={activity.id} className="grid grid-cols-5 gap-4 items-center py-3 border-b border-gray-100 last:border-b-0">
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
                        <div className="text-center text-sm text-gray-900">84¢</div>
                        <div className="text-center text-sm text-gray-900">{activity.shares}</div>
                        <div className="text-center text-sm text-gray-900">{activity.amount}</div>
                        <div className="text-center">
                          <span className="text-sm font-medium text-green-600">{activity.return}</span>
                          <button 
                            className="ml-2 px-3 py-1 text-xs font-medium text-white rounded"
                            style={{ backgroundColor: '#1026D2' }}
                          >
                            Copy Trade
                          </button>
                        </div>
                      </div>
                    ))}
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
      </div>
    </div>
  );
};

export default UserDetailPage; 