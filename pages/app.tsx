import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Head from 'next/head';

type SortField = 'joinedOn' | 'holdingValue' | 'volume' | 'pnl' | 'return';
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

const AppPage: React.FC = () => {
  // 导航状态
  const [activeTab, setActiveTab] = useState<'smart-money' | 'following' | 'copytrade'>('smart-money');
  
  // 排序状态 - 每个tab独立的排序状态
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>('none');
  
  // 加载状态
  const [isLoading, setIsLoading] = useState(false);

  // Following页面的子分类状态
  const [followingFilter, setFollowingFilter] = useState<'User' | 'Activity'>('User');

  // Smart money页面的筛选状态
  const [smartMoneyFilter, setSmartMoneyFilter] = useState<'All' | 'Crypto' | 'Sports' | 'Politics' | null>('All');

  // Activity页面的筛选状态
  const [activityActionFilter, setActivityActionFilter] = useState<'Buy' | 'Sell' | 'Redeem' | null>(null);
  const [activityAmountFilter, setActivityAmountFilter] = useState<'$>100' | '$>1k' | '$>2k' | '$>3k' | null>(null);

  // 时间筛选器状态
  const [timeFilter, setTimeFilter] = useState<'1D' | '3D' | '7D' | '30D' | 'All'>('1D');

  // 语言切换状态
  const [language, setLanguage] = useState<'en' | 'zh'>('en');

  // 翻译对象
  const t = {
    smartMoney: language === 'en' ? 'Smart Money' : '聪明钱',
    following: language === 'en' ? 'Follow' : '关注',
    copyTrade: language === 'en' ? 'CopyTrade' : '跟单',
    search: language === 'en' ? 'Search traders...' : '搜索交易员...',
    logIn: language === 'en' ? 'Log In' : '登录',
    all: language === 'en' ? 'All' : '全部',
    crypto: language === 'en' ? 'Crypto' : '加密货币',
    sports: language === 'en' ? 'Sports' : '体育',
    politics: language === 'en' ? 'Politics' : '政治',
    user: language === 'en' ? 'User' : '用户',
    activity: language === 'en' ? 'Activity' : '活动',
    copy: language === 'en' ? 'Copy' : '复制',
    topHeader: language === 'en' ? 'Top Traders' : '顶级交易员',
    tag: language === 'en' ? 'Tag' : '标签',
    joinedOn: language === 'en' ? 'Joined On' : '加入时间',
    holdingValue: language === 'en' ? 'Holding Value' : '持仓价值',
    volume: language === 'en' ? 'Volume' : '交易量',
    pnl: language === 'en' ? 'P&L' : '盈亏',
    returnPercent: language === 'en' ? 'Return (%)' : '收益率 (%)',
    follow: language === 'en' ? 'Follow' : '关注',
    buy: language === 'en' ? 'Buy' : '买入',
    sell: language === 'en' ? 'Sell' : '卖出',
    redeem: language === 'en' ? 'Redeem' : '赎回',
    copyTradeBtn: language === 'en' ? 'Copy Trade' : '跟单',
    trader: language === 'en' ? 'Trader' : '交易员',
    action: language === 'en' ? 'Action' : '操作',
    market: language === 'en' ? 'Market' : '市场',
    side: language === 'en' ? 'Side' : '方向',
    quantity: language === 'en' ? 'Quantity' : '数量',
    amount: language === 'en' ? 'Amount' : '金额',
    profit: language === 'en' ? 'Profit' : '利润',
    return: language === 'en' ? 'Return' : '收益',
    time: language === 'en' ? 'Time' : '时间',
    tagCrypto: language === 'en' ? 'Crypto' : '加密货币',
    tagSports: language === 'en' ? 'Sports' : '体育',
    tagPolitics: language === 'en' ? 'Politics' : '政治',
    bought: language === 'en' ? 'bought' : '买入了',
    sold: language === 'en' ? 'sold' : '卖出了',
    redeemed: language === 'en' ? 'redeemed' : '赎回了',
    shares: language === 'en' ? 'shares' : '股',
    amountLabel: language === 'en' ? 'Amount' : '金额',
    profitLabel: language === 'en' ? 'Profit' : '利润',
    returnLabel: language === 'en' ? 'Return' : '收益'
  };

  // 获取当前语言的翻译
  const translations = {
    en: {
      smartMoney: 'Smart Money',
      following: 'Follow',
      copyTrade: 'CopyTrade',
      search: 'Search traders...',
      logIn: 'Log In',
      all: 'All',
      crypto: 'Crypto',
      sports: 'Sports',
      politics: 'Politics',
      user: 'User',
      activity: 'Activity',
      copy: 'Copy',
      topHeader: 'Top Traders',
      tag: 'Tag',
      joinedOn: 'Joined On',
      holdingValue: 'Holding Value',
      volume: 'Volume',
      pnl: 'P&L',
      returnPercent: 'Return (%)',
      follow: 'Follow',
      buy: 'Buy',
      sell: 'Sell',
      redeem: 'Redeem',
      copyTradeBtn: 'Copy Trade',
      trader: 'Trader',
      action: 'Action',
      market: 'Market',
      side: 'Side',
      quantity: 'Quantity',
      amount: 'Amount',
      profit: 'Profit',
      return: 'Return',
      time: 'Time',
      tagCrypto: 'Crypto',
      tagSports: 'Sports',
      tagPolitics: 'Politics',
      bought: 'bought',
      sold: 'sold',
      redeemed: 'redeemed',
      shares: 'shares',
      amountLabel: 'Amount',
      profitLabel: 'Profit',
      returnLabel: 'Return'
    },
    zh: {
      smartMoney: '聪明钱',
      following: '关注',
      copyTrade: '跟单',
      search: '搜索交易员...',
      logIn: '登录',
      all: '全部',
      crypto: '加密货币',
      sports: '体育',
      politics: '政治',
      user: '用户',
      activity: '活动',
      copy: '复制',
      topHeader: '顶级交易员',
      tag: '标签',
      joinedOn: '加入时间',
      holdingValue: '持仓价值',
      volume: '交易量',
      pnl: '盈亏',
      returnPercent: '收益率 (%)',
      follow: '关注',
      buy: '买入',
      sell: '卖出',
      redeem: '赎回',
      copyTradeBtn: '跟单',
      trader: '交易员',
      action: '操作',
      market: '市场',
      side: '方向',
      quantity: '数量',
      amount: '金额',
      profit: '利润',
      return: '收益',
      time: '时间',
      tagCrypto: '加密货币',
      tagSports: '体育',
      tagPolitics: '政治',
      bought: '买入了',
      sold: '卖出了',
      redeemed: '赎回了',
      shares: '股',
      amountLabel: '金额',
      profitLabel: '利润',
      returnLabel: '收益'
    }
  };

  // 翻译tag名称的函数
  const translateTag = (tag: string): string => {
    switch (tag) {
      case 'Crypto':
        return t.tagCrypto;
      case 'Sports':
        return t.tagSports;
      case 'Politics':
        return t.tagPolitics;
      default:
        return tag;
    }
  };

  // 判断数值正负并返回相应的样式类名
  const getValueStyle = (value: string): string => {
    if (value.startsWith('-')) {
      return 'text-red-600'; // 负数显示红色
    } else if (value.startsWith('+')) {
      return 'text-green-600'; // 正数显示绿色
    } else {
      return 'text-gray-900'; // 默认颜色
    }
  };

  // Activity数据 - 重新设计数据结构
  const activityData: ActivityRecord[] = [
    {
      id: 1,
      trader: {
        name: "nayel",
        address: "0x2337...234f",
        avatar: "/images/expert1.png"
      },
      action: "buy",
      market: "nWill Han Duck-soo be elected the next president of South Korea?",
      marketImage: "/images/event-korea-election.png", // 韩国总统选举事件图
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
        name: "nayel",
        address: "0x2337...234f",
        avatar: "/images/expert2.png"
      },
      action: "sell",
      market: "nWill Han Duck-soo be elected the next president of South Korea?",
      marketImage: "/images/event-korea-election.png", // 韩国总统选举事件图
      side: "Yes",
      quantity: "1000",
      amount: "$0",
      profit: "-$10000",
      return: "0%",
      time: "2小时前"
    },
    {
      id: 3,
      trader: {
        name: "nayel",
        address: "0x2337...234f",
        avatar: "/images/expert3.png"
      },
      action: "redeem",
      market: "nWill Han Duck-soo be elected the next president of South Korea?",
      marketImage: "/images/event-korea-election.png", // 韩国总统选举事件图
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
        name: "nayel",
        address: "0x2337...234f",
        avatar: "/images/expert4.png"
      },
      action: "buy",
      market: "nWill Han Duck-soo be elected the next president of South Korea?",
      marketImage: "/images/event-korea-election.png", // 韩国总统选举事件图
      side: "Yes",
      quantity: "1000",
      amount: "$2000",
      profit: "+$10000",
      return: "+10%",
      time: "4小时前"
    },
    {
      id: 5,
      trader: {
        name: "nayel",
        address: "0x2337...234f",
        avatar: "/images/expert5.png"
      },
      action: "sell",
      market: "nWill Han Duck-soo be elected the next president of South Korea?",
      marketImage: "/images/event-korea-election.png", // 韩国总统选举事件图
      side: "No",
      quantity: "1000",
      amount: "$2000",
      profit: "+$10000",
      return: "+10%",
      time: "5小时前"
    },
    {
      id: 6,
      trader: {
        name: "nayel",
        address: "0x2337...234f",
        avatar: "/images/expert6.png"
      },
      action: "buy",
      market: "nWill Han Duck-soo be elected the next president of South Korea?",
      marketImage: "/images/event-korea-election.png", // 韩国总统选举事件图
      side: "Yes",
      quantity: "1000",
      amount: "$2000",
      profit: "+$10000",
      return: "+10%",
      time: "6小时前"
    }
  ];

  // Smart Money 数据
  const smartMoneyTraders = [
    {
      id: 1,
      name: "Martin Stanton",
      address: "0x2337...234f",
      tags: ["Crypto", "Sports", "Politics"],
      joinedOn: "1year",
      holdingValue: "$234.9K",
      volume: "$127.3K",
      pnl: "+$234.9K",
      return: "+675.4%",
      avatar: "/images/expert1.png",
      isFollowing: false
    },
    {
      id: 2,
      name: "Zain Herwitz",
      address: "0x2337...234f",
      tags: ["Crypto"],
      joinedOn: "1D",
      holdingValue: "$189.5K",
      volume: "$92.8K",
      pnl: "+$156.7K",
      return: "+523.1%",
      avatar: "/images/expert2.png",
      isFollowing: true
    },
    {
      id: 3,
      name: "Stanton",
      address: "0x2337...234f",
      tags: ["Crypto"],
      joinedOn: "1D",
      holdingValue: "$145.3K",
      volume: "$78.5K",
      pnl: "-$12.8K",
      return: "-8.1%",
      avatar: "/images/expert3.png",
      isFollowing: true
    },
    {
      id: 4,
      name: "Herwitz",
      address: "0x2337...234f",
      tags: ["Crypto", "Sports", "Politics"],
      joinedOn: "1year",
      holdingValue: "$123.7K",
      volume: "$156.2K",
      pnl: "+$98.5K",
      return: "+389.2%",
      avatar: "/images/expert4.png",
      isFollowing: false
    },
    {
      id: 5,
      name: "Donin",
      address: "0x2337...234f",
      tags: ["Crypto"],
      joinedOn: "1D",
      holdingValue: "$98.2K",
      volume: "$43.6K",
      pnl: "+$76.4K",
      return: "+345.6%",
      avatar: "/images/expert5.png",
      isFollowing: true
    },
    {
      id: 6,
      name: "Herwitz",
      address: "0x2337...234f",
      tags: ["Crypto"],
      joinedOn: "1D",
      holdingValue: "$87.6K",
      volume: "$67.9K",
      pnl: "-$23.3K",
      return: "-21.0%",
      avatar: "/images/expert6.png",
      isFollowing: true
    },
    {
      id: 7,
      name: "Geidt",
      address: "0x2337...234f",
      tags: ["Crypto"],
      joinedOn: "1D",
      holdingValue: "$76.5K",
      volume: "$89.1K",
      pnl: "+$54.2K",
      return: "+287.3%",
      avatar: "/images/expert7.png",
      isFollowing: true
    },
    {
      id: 8,
      name: "Dias",
      address: "0x2337...234f",
      tags: ["Crypto", "Sports", "Politics"],
      joinedOn: "1year",
      holdingValue: "$65.4K",
      volume: "$34.7K",
      pnl: "+$43.1K",
      return: "+256.9%",
      avatar: "/images/expert8.png",
      isFollowing: false
    },
    {
      id: 9,
      name: "Botos",
      address: "0x2337...234f",
      tags: ["Crypto"],
      joinedOn: "1D",
      holdingValue: "$54.3K",
      volume: "$71.8K",
      pnl: "-$8.7K",
      return: "-13.8%",
      avatar: "/images/expert1.png",
      isFollowing: true
    },
    {
      id: 10,
      name: "Dias",
      address: "0x2337...234f",
      tags: ["Crypto"],
      joinedOn: "1D",
      holdingValue: "$43.2K",
      volume: "$26.4K",
      pnl: "+$25.6K",
      return: "+212.1%",
      avatar: "/images/expert2.png",
      isFollowing: true
    },
    {
      id: 11,
      name: "Herwi",
      address: "0x2337...234f",
      tags: ["Crypto"],
      joinedOn: "1D",
      holdingValue: "$32.1K",
      volume: "$58.3K",
      pnl: "+$18.9K",
      return: "+187.6%",
      avatar: "/images/expert3.png",
      isFollowing: true
    },
    {
      id: 12,
      name: "Korsc",
      address: "0x2337...234f",
      tags: ["Crypto"],
      joinedOn: "1D",
      holdingValue: "$21.5K",
      volume: "$19.7K",
      pnl: "-$4.3K",
      return: "-16.7%",
      avatar: "/images/expert4.png",
      isFollowing: true
    }
  ];

  // Following 数据 (模拟不同的数据集)
  const followingTraders = [
    {
      id: 1,
      name: "Alex Thompson",
      address: "0x4567...891a",
      tags: ["Crypto", "Sports", "Politics"],
      joinedOn: "2D",
      holdingValue: "$180.2K",
      volume: "$203.8K",
      pnl: "+$145.3K",
      return: "+456.7%",
      avatar: "/images/expert1.png",
      isFollowing: true
    },
    {
      id: 2,
      name: "Sarah Chen",
      address: "0x7890...bcde",
      tags: ["Sports", "Politics"],
      joinedOn: "5D",
      holdingValue: "$125.6K",
      volume: "$167.9K",
      pnl: "-$15.4K",
      return: "-10.9%",
      avatar: "/images/expert2.png",
      isFollowing: true
    },
    {
      id: 3,
      name: "Mike Rodriguez",
      address: "0xabcd...ef12",
      tags: ["Crypto"],
      joinedOn: "1D",
      holdingValue: "$89.7K",
      volume: "$74.2K",
      pnl: "+$67.2K",
      return: "+189.3%",
      avatar: "/images/expert3.png",
      isFollowing: true
    },
    {
      id: 4,
      name: "Emma Wilson",
      address: "0x3456...7890",
      tags: ["Politics", "Crypto", "Sports"],
      joinedOn: "3D",
      holdingValue: "$67.4K",
      volume: "$139.6K",
      pnl: "-$7.1K",
      return: "-9.5%",
      avatar: "/images/expert4.png",
      isFollowing: true
    },
    {
      id: 5,
      name: "David Park",
      address: "0x5678...9abc",
      tags: ["Sports"],
      joinedOn: "1week",
      holdingValue: "$45.2K",
      volume: "$52.8K",
      pnl: "+$28.7K",
      return: "+123.4%",
      avatar: "/images/expert5.png",
      isFollowing: true
    }
  ];

  // 交易员数据状态管理
  const [smartMoneyTradersState, setSmartMoneyTradersState] = useState(smartMoneyTraders);
  const [followingTradersState, setFollowingTradersState] = useState(followingTraders);

  const timeFilters = ["1D", "3D", "7D", "30D", "All"];

  // 根据当前tab获取对应的数据
  const getCurrentTraders = () => {
    switch (activeTab) {
      case 'smart-money':
        // Smart money页面需要根据筛选条件过滤数据
        if (smartMoneyFilter === 'All' || smartMoneyFilter === null) {
          return smartMoneyTradersState; // 显示所有交易员
        } else {
          // 根据tag筛选交易员
          return smartMoneyTradersState.filter(trader => 
            trader.tags.includes(smartMoneyFilter)
          );
        }
      case 'following':
        return followingTradersState;
      case 'copytrade':
        return []; // 暂时为空，以后添加
      default:
        return smartMoneyTradersState;
    }
  };

  // 获取当前Following页面的筛选类型
  const getCurrentFilterType = () => {
    return followingFilter;
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

  // 处理Smart money筛选点击
  const handleSmartMoneyFilter = (filter: 'All' | 'Crypto' | 'Sports' | 'Politics') => {
    setSmartMoneyFilter(filter);
  };

  // 处理时间筛选器点击
  const handleTimeFilter = (filter: '1D' | '3D' | '7D' | '30D' | 'All') => {
    setTimeFilter(filter);
  };

  // 处理关注按钮点击
  const handleFollowToggle = (traderId: number) => {
    // 更新对应交易员的关注状态
    if (activeTab === 'smart-money') {
      setSmartMoneyTradersState(prevTraders =>
        prevTraders.map(trader =>
          trader.id === traderId ? { ...trader, isFollowing: !trader.isFollowing } : trader
        )
      );
    } else if (activeTab === 'following') {
      setFollowingTradersState(prevTraders =>
        prevTraders.map(trader =>
          trader.id === traderId ? { ...trader, isFollowing: !trader.isFollowing } : trader
        )
      );
    }
    
    // 添加心跳动效
    const button = document.querySelector(`[data-trader-id="${traderId}"]`);
    if (button) {
      button.classList.add('heart-beat');
      setTimeout(() => {
        button.classList.remove('heart-beat');
      }, 600);
    }
    
    // 这里可以发送到后端API
    console.log(`Toggled follow for trader ${traderId}`);
  };

  const currentTraders = getCurrentTraders();

  // Tab切换处理函数
  const handleTabChange = (tab: 'smart-money' | 'following' | 'copytrade') => {
    setActiveTab(tab);
    // 切换tab时重置排序状态
    setSortField(null);
    setSortOrder('none');
    // 这里可以添加数据加载逻辑
    // loadTabData(tab);
  };

  // 排序处理函数
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // 同一列：循环状态 none -> desc -> asc -> none
      if (sortOrder === 'none') {
        setSortOrder('desc');
      } else if (sortOrder === 'desc') {
        setSortOrder('asc');
      } else {
        setSortOrder('none');
        setSortField(null);
      }
    } else {
      // 不同列：重置为该列的降序
      setSortField(field);
      setSortOrder('desc');
    }
  };

  // 数值转换函数
  const parseValue = (value: string): number => {
    if (value.includes('year')) return 365; // 1year = 365天
    if (value.includes('D')) return parseInt(value.replace('D', ''));
    
    // 处理金额格式 $234.9K -> 234900
    const numStr = value.replace(/[$+%,K]/g, '');
    const num = parseFloat(numStr);
    if (value.includes('K')) return num * 1000;
    return num;
  };

  // 排序后的数据
  const sortedTraders = useMemo(() => {
    if (!sortField || sortOrder === 'none') {
      return currentTraders;
    }

    const sorted = [...currentTraders].sort((a, b) => {
      let aVal: number, bVal: number;
      
      switch (sortField) {
        case 'joinedOn':
          aVal = parseValue(a.joinedOn);
          bVal = parseValue(b.joinedOn);
          break;
        case 'holdingValue':
          aVal = parseValue(a.holdingValue);
          bVal = parseValue(b.holdingValue);
          break;
        case 'volume':
          aVal = parseValue(a.volume);
          bVal = parseValue(b.volume);
          break;
        case 'pnl':
          aVal = parseValue(a.pnl);
          bVal = parseValue(b.pnl);
          break;
        case 'return':
          aVal = parseValue(a.return);
          bVal = parseValue(b.return);
          break;
        default:
          return 0;
      }

      if (sortOrder === 'desc') {
        return bVal - aVal; // 降序
      } else {
        return aVal - bVal; // 升序
      }
    });

    return sorted;
  }, [currentTraders, sortField, sortOrder]);

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

  return (
    <>
      <Head>
        <title>{language === 'en' ? 'PolyAlpha App - Smart Money Tracker' : 'PolyAlpha应用 - 聪明钱追踪器'}</title>
        <meta name="description" content="Track and follow top Polymarket traders in real-time" />
        <style jsx>{`
          @keyframes heartbeat {
            0% { transform: scale(1); }
            25% { transform: scale(1.1); }
            50% { transform: scale(1.05); }
            75% { transform: scale(1.15); }
            100% { transform: scale(1); }
          }
          .heart-beat {
            animation: heartbeat 0.6s ease-in-out;
          }
          @keyframes love-pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          .love-pulse {
            animation: love-pulse 2s ease-in-out infinite;
          }
        `}</style>
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
                    onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
                    className="px-2 py-1 rounded text-xs font-medium text-gray-600 hover:text-black hover:bg-gray-100 transition-colors border border-gray-300"
                  >
                    {language === 'en' ? '中文' : 'EN'}
                  </button>

                  {/* Login button */}
                  <button className="text-white px-3 py-1.5 rounded-xl font-bold transition-colors text-sm hover:opacity-90" style={{backgroundColor: '#1026D2'}}>
                    {t.logIn}
                  </button>
                </div>
              </div>
              
              {/* Bottom Row: Navigation */}
              <div className="pb-3 border-b border-gray-200">
                <nav className="flex items-center justify-center space-x-6">
                  <button 
                    onClick={() => handleTabChange('smart-money')}
                    className={`px-2 py-1.5 font-bold text-base transition-colors ${
                      activeTab === 'smart-money' 
                        ? 'text-[#1026D2]' 
                        : 'text-gray-600 hover:text-black'
                    }`}
                  >
                    {t.smartMoney}
                  </button>
                  <button 
                    onClick={() => handleTabChange('following')}
                    className={`px-2 py-1.5 font-bold text-base transition-colors ${
                      activeTab === 'following' 
                        ? 'text-[#1026D2]' 
                        : 'text-gray-600 hover:text-black'
                    }`}
                  >
                    {t.following}
                  </button>
                  <button 
                    onClick={() => handleTabChange('copytrade')}
                    className={`px-2 py-1.5 font-bold text-base transition-colors ${
                      activeTab === 'copytrade' 
                        ? 'text-[#1026D2]' 
                        : 'text-gray-600 hover:text-black'
                    }`}
                  >
                    {t.copyTrade}
                  </button>
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
                    <button 
                      onClick={() => handleTabChange('smart-money')}
                      className={`px-3 py-1.5 font-extrabold text-xl transition-colors ${
                        activeTab === 'smart-money' 
                          ? 'text-[#1026D2]' 
                          : 'text-gray-600 hover:text-black'
                      }`}
                    >
                      {t.smartMoney}
                    </button>
                    <button 
                      onClick={() => handleTabChange('following')}
                      className={`px-3 py-1.5 font-extrabold text-xl transition-colors ${
                        activeTab === 'following' 
                          ? 'text-[#1026D2]' 
                          : 'text-gray-600 hover:text-black'
                      }`}
                    >
                      {t.following}
                    </button>
                    <button 
                      onClick={() => handleTabChange('copytrade')}
                      className={`px-3 py-1.5 font-extrabold text-xl transition-colors ${
                        activeTab === 'copytrade' 
                          ? 'text-[#1026D2]' 
                          : 'text-gray-600 hover:text-black'
                      }`}
                    >
                      {t.copyTrade}
                    </button>
                  </nav>
                  
                  {/* Search Bar */}
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
                <button 
                  onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 hover:text-black hover:bg-gray-100 transition-colors border border-gray-300"
                >
                  {language === 'en' ? '中文' : 'EN'}
                </button>

                {/* Dark mode toggle */}
                <button className="p-2 text-gray-600 hover:text-black transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                </button>

                {/* Login button */}
                <button className="text-white px-4 py-2 rounded-2xl font-bold transition-colors text-base hover:opacity-90" style={{backgroundColor: '#1026D2'}}>
                  {t.logIn}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Category Filters */}
        <div className="bg-white sticky lg:top-16 top-36 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Mobile Layout */}
            <div className="lg:hidden py-3">
              {/* Left Filters Row */}
              <div className="flex items-center space-x-2 mb-3 overflow-x-auto pb-2">
                {activeTab === 'smart-money' ? (
                  <>
                    <button 
                      onClick={() => handleSmartMoneyFilter('All')}
                      className={`px-2 py-1 rounded-lg font-medium flex items-center text-xs transition-colors flex-shrink-0 ${
                        smartMoneyFilter === 'All' 
                          ? 'bg-black text-white' 
                          : 'text-gray-600 hover:text-black'
                      }`}
                      style={smartMoneyFilter !== 'All' ? {backgroundColor: '#F5F5F5'} : {}}
                    >
                      <span className="mr-1">🔥</span>
                      {t.all}
                    </button>
                    <button 
                      onClick={() => handleSmartMoneyFilter('Crypto')}
                      className={`px-2 py-1 rounded-lg font-medium flex items-center text-xs transition-colors flex-shrink-0 ${
                        smartMoneyFilter === 'Crypto' 
                          ? 'bg-black text-white' 
                          : 'text-gray-600 hover:text-black'
                      }`}
                      style={smartMoneyFilter !== 'Crypto' ? {backgroundColor: '#F5F5F5'} : {}}
                    >
                      <span className="mr-1">💰</span>
                      {t.crypto}
                    </button>
                    <button 
                      onClick={() => handleSmartMoneyFilter('Sports')}
                      className={`px-2 py-1 rounded-lg font-medium flex items-center text-xs transition-colors flex-shrink-0 ${
                        smartMoneyFilter === 'Sports' 
                          ? 'bg-black text-white' 
                          : 'text-gray-600 hover:text-black'
                      }`}
                      style={smartMoneyFilter !== 'Sports' ? {backgroundColor: '#F5F5F5'} : {}}
                    >
                      <span className="mr-1">⚽</span>
                      {t.sports}
                    </button>
                    <button 
                      onClick={() => handleSmartMoneyFilter('Politics')}
                      className={`px-2 py-1 rounded-lg font-medium flex items-center text-xs transition-colors flex-shrink-0 ${
                        smartMoneyFilter === 'Politics' 
                          ? 'bg-black text-white' 
                          : 'text-gray-600 hover:text-black'
                      }`}
                      style={smartMoneyFilter !== 'Politics' ? {backgroundColor: '#F5F5F5'} : {}}
                    >
                      <span className="mr-1">🏛️</span>
                      {t.politics}
                    </button>
                  </>
                ) : activeTab === 'following' ? (
                  <>
                    <button 
                      onClick={() => setFollowingFilter('User')}
                      className={`px-2 py-1 rounded-lg font-medium flex items-center text-xs transition-colors flex-shrink-0 ${
                        followingFilter === 'User' 
                          ? 'bg-black text-white' 
                          : 'text-gray-600 hover:text-black'
                      }`}
                      style={followingFilter !== 'User' ? {backgroundColor: '#F5F5F5'} : {}}
                    >
                      <span className="mr-1">🧑‍🎨</span>
                      {t.user}
                    </button>
                    <button 
                      onClick={() => setFollowingFilter('Activity')}
                      className={`px-2 py-1 rounded-lg font-medium flex items-center text-xs transition-colors flex-shrink-0 ${
                        followingFilter === 'Activity' 
                          ? 'bg-black text-white' 
                          : 'text-gray-600 hover:text-black'
                      }`}
                      style={followingFilter !== 'Activity' ? {backgroundColor: '#F5F5F5'} : {}}
                    >
                      <span className="mr-1">🧭</span>
                      {t.activity}
                    </button>
                  </>
                ) : (
                  <>
                    <button className="bg-black text-white px-2 py-1 rounded-lg font-medium flex items-center text-xs flex-shrink-0">
                      <span className="mr-1">📋</span>
                      {t.copy}
                    </button>
                  </>
                )}
              </div>

              {/* Right Filters Row */}
              <div className="flex items-center">
                {activeTab === 'following' && followingFilter === 'Activity' ? (
                  <>
                    {/* Activity页面的双筛选器 */}
                    <div className="flex items-center space-x-2 overflow-x-auto">
                      {/* 交易类型筛选器 */}
                      <div className="flex items-center space-x-1 px-2 py-1 rounded-lg flex-shrink-0" style={{backgroundColor: '#F5F5F5'}}>
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
                      
                      {/* 金额筛选器 */}
                      <div className="flex items-center space-x-1 px-2 py-1 rounded-lg flex-shrink-0" style={{backgroundColor: '#F5F5F5'}}>
                        {['$>100', '$>1k', '$>2k', '$>3k'].map((filter) => (
                          <button
                            key={filter}
                            onClick={() => handleActivityAmountFilter(filter as '$>100' | '$>1k' | '$>2k' | '$>3k')}
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
                  </>
                ) : (
                  // 其他页面的时间筛选器
                  <div className="flex items-center space-x-1 px-2 py-1 rounded-lg" style={{backgroundColor: '#F5F5F5'}}>
                    {timeFilters.map((filter) => (
                      <button
                        key={filter}
                        onClick={() => handleTimeFilter(filter as '1D' | '3D' | '7D' | '30D' | 'All')}
                        className={`px-2 py-1 rounded-lg text-xs font-medium transition-colors ${
                          filter === timeFilter 
                            ? "bg-black text-white" 
                            : "text-gray-600 hover:text-black hover:bg-white"
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:flex items-center justify-between py-4">
              <div className="flex items-center space-x-4">
                {activeTab === 'smart-money' ? (
                  <>
                    <button 
                      onClick={() => handleSmartMoneyFilter('All')}
                      className={`px-3 py-1 rounded-lg font-medium flex items-center text-sm transition-colors ${
                        smartMoneyFilter === 'All' 
                          ? 'bg-black text-white' 
                          : 'text-gray-600 hover:text-black'
                      }`}
                      style={smartMoneyFilter !== 'All' ? {backgroundColor: '#F5F5F5'} : {}}
                    >
                      <span className="mr-1">🔥</span>
                      {t.all}
                    </button>
                    <button 
                      onClick={() => handleSmartMoneyFilter('Crypto')}
                      className={`px-3 py-1 rounded-lg font-medium flex items-center text-sm transition-colors ${
                        smartMoneyFilter === 'Crypto' 
                          ? 'bg-black text-white' 
                          : 'text-gray-600 hover:text-black'
                      }`}
                      style={smartMoneyFilter !== 'Crypto' ? {backgroundColor: '#F5F5F5'} : {}}
                    >
                      <span className="mr-1">💰</span>
                      {t.crypto}
                    </button>
                    <button 
                      onClick={() => handleSmartMoneyFilter('Sports')}
                      className={`px-3 py-1 rounded-lg font-medium flex items-center text-sm transition-colors ${
                        smartMoneyFilter === 'Sports' 
                          ? 'bg-black text-white' 
                          : 'text-gray-600 hover:text-black'
                      }`}
                      style={smartMoneyFilter !== 'Sports' ? {backgroundColor: '#F5F5F5'} : {}}
                    >
                      <span className="mr-1">⚽</span>
                      {t.sports}
                    </button>
                    <button 
                      onClick={() => handleSmartMoneyFilter('Politics')}
                      className={`px-3 py-1 rounded-lg font-medium flex items-center text-sm transition-colors ${
                        smartMoneyFilter === 'Politics' 
                          ? 'bg-black text-white' 
                          : 'text-gray-600 hover:text-black'
                      }`}
                      style={smartMoneyFilter !== 'Politics' ? {backgroundColor: '#F5F5F5'} : {}}
                    >
                      <span className="mr-1">🏛️</span>
                      {t.politics}
                    </button>
                  </>
                ) : activeTab === 'following' ? (
                  <>
                    <button 
                      onClick={() => setFollowingFilter('User')}
                      className={`px-3 py-1 rounded-lg font-medium flex items-center text-sm transition-colors ${
                        followingFilter === 'User' 
                          ? 'bg-black text-white' 
                          : 'text-gray-600 hover:text-black'
                      }`}
                      style={followingFilter !== 'User' ? {backgroundColor: '#F5F5F5'} : {}}
                    >
                      <span className="mr-1">🧑‍🎨</span>
                      {t.user}
                    </button>
                    <button 
                      onClick={() => setFollowingFilter('Activity')}
                      className={`px-3 py-1 rounded-lg font-medium flex items-center text-sm transition-colors ${
                        followingFilter === 'Activity' 
                          ? 'bg-black text-white' 
                          : 'text-gray-600 hover:text-black'
                      }`}
                      style={followingFilter !== 'Activity' ? {backgroundColor: '#F5F5F5'} : {}}
                    >
                      <span className="mr-1">🧭</span>
                      {t.activity}
                    </button>
                  </>
                ) : (
                  <>
                    <button className="bg-black text-white px-3 py-1 rounded-lg font-medium flex items-center text-sm">
                      <span className="mr-1">📋</span>
                      {t.copy}
                    </button>
                  </>
                )}
              </div>

              {/* 时间筛选器或Activity双筛选器 */}
              <div className="flex items-center space-x-4">
                {activeTab === 'following' && followingFilter === 'Activity' ? (
                                      // Activity页面的双筛选器
                    <>
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
                        {['$>100', '$>1k', '$>2k', '$>3k'].map((filter) => (
                          <button
                            key={filter}
                            onClick={() => handleActivityAmountFilter(filter as '$>100' | '$>1k' | '$>2k' | '$>3k')}
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
                    </>
                  ) : (
                    // 其他页面的时间筛选器
                    <div className="flex items-center space-x-1 px-3 py-1 rounded-lg" style={{backgroundColor: '#F5F5F5'}}>
                      {timeFilters.map((filter) => (
                        <button
                          key={filter}
                          onClick={() => handleTimeFilter(filter as '1D' | '3D' | '7D' | '30D' | 'All')}
                          className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                            filter === timeFilter 
                              ? "bg-black text-white" 
                              : "text-gray-600 hover:text-black hover:bg-white"
                          }`}
                        >
                          {filter}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* 显示不同的内容基于当前的过滤器 */}
          {activeTab === 'following' && followingFilter === 'Activity' ? (
            // Activity页面内容 - 两行卡片结构
            <div className="space-y-3">
              {getActivityData().map((activity: ActivityRecord) => (
                <div key={activity.id} className="bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors" style={{borderColor: '#F2F2F2'}}>
                  <div className="px-6 py-4">
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
                            {activity.action === 'buy' ? t.bought : 
                             activity.action === 'sell' ? t.sold : t.redeemed}
                          </span>
                          <span className="text-sm font-medium text-black">{activity.quantity} {t.shares}</span>
                          <span className="text-sm text-gray-600">{t.amountLabel}</span>
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
                            onError={(e) => {
                              // 如果图片加载失败，显示默认图标
                              e.currentTarget.style.display = 'none';
                              e.currentTarget.parentElement!.innerHTML = `
                                <svg class="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                  <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                                </svg>
                              `;
                            }}
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
                            onError={(e) => {
                              // 如果Polygon图标加载失败，显示默认字母P
                              e.currentTarget.style.display = 'none';
                              e.currentTarget.parentElement!.innerHTML = `
                                <span class="text-white text-xs font-bold">P</span>
                              `;
                            }}
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
                </div>
              ))}
            </div>
          ) : (
            // 交易员排行榜内容
            <>
              {/* Mobile Layout */}
              <div className="lg:hidden space-y-3">
                {sortedTraders.map((trader, index) => (
                  <div key={trader.id} className="bg-white border border-gray-300 rounded-lg transition-colors" style={{borderColor: '#F2F2F2'}}>
                    <div className="p-4">
                      {/* Top Row: Rank + Avatar + Name + Follow */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <div className="text-gray-500 text-sm font-medium mr-3 w-6">#{index + 1}</div>
                          <div className="relative w-8 h-8 rounded-full overflow-hidden mr-3">
                            <Image
                              src={trader.avatar}
                              alt={trader.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-semibold text-black text-sm">{trader.name}</div>
                            <div className="text-xs text-gray-500">{trader.address}</div>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleFollowToggle(trader.id)}
                          data-trader-id={trader.id}
                          className={`group p-1 transition-all duration-300 ease-out transform hover:scale-110 active:scale-95 ${
                            trader.isFollowing 
                              ? "text-purple-600 hover:text-purple-700" 
                              : "text-gray-400 hover:text-purple-600"
                          }`}
                        >
                          <svg 
                            className={`w-5 h-5 transition-all duration-300 ${
                              trader.isFollowing 
                                ? "drop-shadow-md" 
                                : "group-hover:drop-shadow-md"
                            }`} 
                            style={{
                              filter: trader.isFollowing 
                                ? 'drop-shadow(0 2px 4px rgba(147, 51, 234, 0.3))' 
                                : undefined
                            }}
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            {trader.isFollowing ? (
                              <path 
                                fillRule="evenodd" 
                                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" 
                                clipRule="evenodd"
                                className="transition-all duration-300 love-pulse"
                              />
                            ) : (
                              <path 
                                fillRule="evenodd" 
                                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" 
                                clipRule="evenodd"
                                className="transition-all duration-300 group-hover:animate-pulse"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                              />
                            )}
                          </svg>
                        </button>
                      </div>

                      {/* Tags Row */}
                      <div className="flex items-center gap-1 mb-3 flex-wrap">
                        {trader.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className={`px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap ${
                              tag === "Crypto" ? "bg-orange-100 text-orange-700" :
                              tag === "Sports" ? "bg-green-100 text-green-700" :
                              tag === "Politics" ? "bg-blue-100 text-blue-700" :
                              "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {tag === "Crypto" && "💰 "}
                            {tag === "Sports" && "⚽ "}
                            {tag === "Politics" && "🏛️ "}
                            {translateTag(tag)}
                          </span>
                        ))}
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="bg-gray-50 rounded p-2">
                          <div className="text-gray-500 mb-1">{t.holdingValue}</div>
                          <div className="font-semibold text-gray-900">{trader.holdingValue}</div>
                        </div>
                        <div className="bg-gray-50 rounded p-2">
                          <div className="text-gray-500 mb-1">{t.volume}</div>
                          <div className="font-semibold text-gray-900">{trader.volume}</div>
                        </div>
                        <div className="bg-gray-50 rounded p-2">
                          <div className="text-gray-500 mb-1">{t.pnl}</div>
                          <div className={`font-semibold ${getValueStyle(trader.pnl)}`}>{trader.pnl}</div>
                        </div>
                        <div className="bg-gray-50 rounded p-2">
                          <div className="text-gray-500 mb-1">{t.returnPercent}</div>
                          <div className={`font-bold ${getValueStyle(trader.return)}`}>{trader.return}</div>
                        </div>
                      </div>

                      {/* Bottom Info */}
                      <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                        <div className="text-xs text-gray-500">
                          {t.joinedOn}: {trader.joinedOn}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Layout */}
              <div className="hidden lg:block">
                {/* Table Header */}
                <div className="mb-4">
                  <div className="grid grid-cols-18 gap-4 px-6 py-4 text-sm font-medium text-gray-600">
                    <div className="col-span-4">{t.topHeader}</div>
                    <div className="col-span-2">{t.tag}</div>
                    <div className="col-span-2 text-right flex items-center justify-end">
                      {t.joinedOn}
                      <SortIcon field="joinedOn" />
                    </div>
                    <div className="col-span-2 text-right flex items-center justify-end">
                      {t.holdingValue}
                      <SortIcon field="holdingValue" />
                    </div>
                    <div className="col-span-2 text-right flex items-center justify-end">
                      {t.volume}
                      <SortIcon field="volume" />
                    </div>
                    <div className="col-span-2 text-right flex items-center justify-end">
                      {t.pnl}
                      <SortIcon field="pnl" />
                    </div>
                    <div className="col-span-2 text-right flex items-center justify-end whitespace-nowrap">
                      {t.returnPercent}
                      <SortIcon field="return" />
                    </div>
                    <div className="col-span-2 text-right">{t.follow}</div>
                  </div>
                </div>

                {/* Table Body - Individual Cards */}
                <div className="space-y-3">
                  {sortedTraders.map((trader, index) => (
                    <div key={trader.id} className="bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors" style={{borderColor: '#F2F2F2'}}>
                      <div className="grid grid-cols-18 gap-4 px-6 py-4">
                        {/* Rank and Avatar and Name */}
                        <div className="col-span-4 flex items-center">
                          <div className="text-gray-500 text-sm font-medium mr-4 w-6 ml-2">{index + 1}</div>
                          <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
                            <Image
                              src={trader.avatar}
                              alt={trader.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-semibold text-black text-sm">{trader.name}</div>
                            <div className="text-xs text-gray-500">{trader.address}</div>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="col-span-2 flex items-center">
                          <div className="flex flex-col gap-1 min-h-[40px] justify-center">
                            {/* First row - up to 2 tags */}
                            <div className="flex gap-1">
                              {trader.tags.slice(0, 2).map((tag, tagIndex) => (
                                <span
                                  key={tagIndex}
                                  className={`px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap ${
                                    tag === "Crypto" ? "bg-orange-100 text-orange-700" :
                                    tag === "Sports" ? "bg-green-100 text-green-700" :
                                    tag === "Politics" ? "bg-blue-100 text-blue-700" :
                                    "bg-gray-100 text-gray-700"
                                  }`}
                                >
                                  {tag === "Crypto" && "💰 "}
                                  {tag === "Sports" && "⚽ "}
                                  {tag === "Politics" && "🏛️ "}
                                  {translateTag(tag)}
                                </span>
                              ))}
                            </div>
                            {/* Second row - next tags if they exist */}
                            {trader.tags.length > 2 && (
                              <div className="flex gap-1">
                                {trader.tags.slice(2, 4).map((tag, tagIndex) => (
                                  <span
                                    key={tagIndex + 2}
                                    className={`px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap ${
                                      tag === "Crypto" ? "bg-orange-100 text-orange-700" :
                                      tag === "Sports" ? "bg-green-100 text-green-700" :
                                      tag === "Politics" ? "bg-blue-100 text-blue-700" :
                                      "bg-gray-100 text-gray-700"
                                    }`}
                                  >
                                    {tag === "Crypto" && "💰 "}
                                    {tag === "Sports" && "⚽ "}
                                    {tag === "Politics" && "🏛️ "}
                                    {translateTag(tag)}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Joined On */}
                        <div className="col-span-2 flex items-center justify-end">
                          <span className="text-sm text-gray-900">{trader.joinedOn}</span>
                        </div>

                        {/* Holding Value */}
                        <div className="col-span-2 flex items-center justify-end">
                          <span className="text-sm font-medium text-gray-900">{trader.holdingValue}</span>
                        </div>

                        {/* Volume */}
                        <div className="col-span-2 flex items-center justify-end">
                          <span className="text-sm font-medium text-gray-900">{trader.volume}</span>
                        </div>

                        {/* P&L */}
                        <div className="col-span-2 flex items-center justify-end">
                          <span className={`text-sm font-medium ${getValueStyle(trader.pnl)}`}>{trader.pnl}</span>
                        </div>

                        {/* Return */}
                        <div className="col-span-2 flex items-center justify-end">
                          <span className={`text-sm font-bold ${getValueStyle(trader.return)}`}>{trader.return}</span>
                        </div>

                        {/* Follow Button */}
                        <div className="col-span-2 flex items-center justify-end">
                          <div className="mr-2">
                            <button 
                              onClick={() => handleFollowToggle(trader.id)}
                              data-trader-id={trader.id}
                              className={`group p-1 transition-all duration-300 ease-out transform hover:scale-110 active:scale-95 ${
                                trader.isFollowing 
                                  ? "text-purple-600 hover:text-purple-700" 
                                  : "text-gray-400 hover:text-purple-600"
                              }`}
                            >
                              <svg 
                                className={`w-5 h-5 transition-all duration-300 ${
                                  trader.isFollowing 
                                    ? "drop-shadow-md" 
                                    : "group-hover:drop-shadow-md"
                                }`} 
                                style={{
                                  filter: trader.isFollowing 
                                    ? 'drop-shadow(0 2px 4px rgba(147, 51, 234, 0.3))' 
                                    : undefined
                                }}
                                fill="currentColor" 
                                viewBox="0 0 20 20"
                              >
                                {trader.isFollowing ? (
                                  // 已关注状态 - 实心爱心
                                  <path 
                                    fillRule="evenodd" 
                                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" 
                                    clipRule="evenodd"
                                    className="transition-all duration-300 love-pulse"
                                  />
                                ) : (
                                  // 未关注状态 - 空心爱心
                                  <path 
                                    fillRule="evenodd" 
                                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" 
                                    clipRule="evenodd"
                                    className="transition-all duration-300 group-hover:animate-pulse"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                  />
                                )}
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AppPage; 