import React from 'react';
import Image from 'next/image';

const HomePage: React.FC = () => {
  const experts = [
    {
      id: 1,
      title: "Political Expert",
      percentage: "+6527%",
      address: "0×3423...3552",
      amount: "$381242",
      avatar: "/images/expert1.png"
    },
    {
      id: 2,
      title: "Political Expert", 
      percentage: "+6527%",
      address: "0×3423...3552",
      amount: "$381242",
      avatar: "/images/expert2.png"
    },
    {
      id: 3,
      title: "Political Expert",
      percentage: "+6527%", 
      address: "0×3423...3552",
      amount: "$381242",
      avatar: "/images/expert3.png"
    },
    {
      id: 4,
      title: "Political Expert",
      percentage: "+6527%",
      address: "0×3423...3552",
      amount: "$381242",
      avatar: "/images/expert4.png"
    },
    {
      id: 5,
      title: "Political Expert",
      percentage: "+6527%",
      address: "0×3423...3552", 
      amount: "$381242",
      avatar: "/images/expert5.png"
    },
    {
      id: 6,
      title: "Political Expert",
      percentage: "+6527%",
      address: "0×3423...3552",
      amount: "$381242",
      avatar: "/images/expert6.png"
    },
    {
      id: 7,
      title: "Political Expert",
      percentage: "+6527%",
      address: "0×3423...3552",
      amount: "$381242",
      avatar: "/images/expert7.png"
    },
    {
      id: 8,
      title: "Political Expert",
      percentage: "+6527%",
      address: "0×3423...3552",
      amount: "$381242",
      avatar: "/images/expert8.png"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden" style={{backgroundColor: '#FAFAFA'}}>


      {/* Top Logo Area - 添加Logo图片和渐变文字 */}
      <div className="flex justify-center items-center pt-8 sm:pt-16 mb-8 sm:mb-12 fade-in-up">
        <div className="relative w-12 h-12 sm:w-16 sm:h-16 mr-3 sm:mr-4 float-animation">
          <Image
            src="/images/logo.png"
            alt="PolyAlpha Logo"
            fill
            className="object-contain rounded-lg"
            priority
          />
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold gradient-text-animated">
          PolyAlpha
        </h1>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header section */}
        <div className="text-center mb-12 sm:mb-16 scale-in-animation">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-black mb-4 sm:mb-6 leading-tight px-2">
            Track smart money. Follow Alpha.<br className="hidden sm:block" />
            <span className="sm:hidden"> </span>Trade smarter.
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto fade-in-up px-4 sm:px-0">
            Discover hidden alpha from top Polymarket<br className="hidden sm:block" />
            <span className="sm:hidden"> </span>traders—in real time.
          </p>
          <a 
            href="/app"
            className="inline-block text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium transition-colors custom-go-to-app-btn button-glow pulse-glow-animation"
          >
            Coming soon 👻
          </a>
        </div>

        {/* Large image area - 使用Image组件完全填满 */}
        <div className="relative w-full mb-12 sm:mb-16 banner-shadow banner-hover hover-lift mx-2 sm:mx-0" style={{aspectRatio: '1.727/1'}}>
          <Image
            src="/images/main-banner.png"
            alt="Main Banner"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          />
        </div>

        {/* Experts section */}
        <div className="text-center mb-8 sm:mb-12 fade-in-up">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black px-4 sm:px-0">
            Discover experts across various<br className="hidden sm:block" />
            <span className="sm:hidden"> </span>fields
          </h2>
        </div>

        {/* Expert cards grid - 两排错开排布，循环向右移动，修复阴影圆角问题 */}
        <div className="mb-16 sm:mb-24 carousel-container" style={{paddingBottom: '20px'}}>
          {/* 第一排 */}
          <div className="flex gap-3 sm:gap-4 mb-3 sm:mb-4 animate-scroll-right">
            {[...experts, ...experts, ...experts, ...experts].map((expert, index) => (
              <div key={`row1-${index}`} className="bg-white p-3 sm:p-4 flex-shrink-0 expert-card" style={{aspectRatio: '3.27/1', width: 'clamp(240px, 70vw, 280px)'}}>
                <div className="flex items-center h-full">
                  <div className="relative w-8 h-8 sm:w-10 sm:h-10 mr-3 sm:mr-4 flex-shrink-0">
                    <Image
                      src={expert.avatar}
                      alt={`${expert.title} Avatar`}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                  <div className="flex-1 flex justify-between items-center min-w-0">
                    <div className="flex flex-col justify-center min-w-0 flex-shrink">
                      <div className="text-xs sm:text-sm font-semibold text-black mb-1 leading-tight truncate">{expert.title}</div>
                      <div className="text-2xs sm:text-xs text-gray-500 truncate">{expert.address}</div>
                    </div>
                    <div className="flex flex-col items-end justify-center ml-2 flex-shrink-0">
                      <div className="text-sm sm:text-base font-bold text-green-500 mb-1">{expert.percentage}</div>
                      <div className="text-xs sm:text-sm font-bold text-green-500">{expert.amount}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* 第二排 - 固定错开，向左移动，修复阴影圆角问题 */}
          <div className="flex gap-3 sm:gap-4 animate-scroll-left">
            {/* 固定错开间隔 */}
            <div style={{width: 'clamp(100px, 30vw, 150px)'}} className="flex-shrink-0"></div>
            {[...experts, ...experts, ...experts, ...experts, ...experts].map((expert, index) => (
              <div key={`row2-${index}`} className="bg-white p-3 sm:p-4 flex-shrink-0 expert-card" style={{aspectRatio: '3.27/1', width: 'clamp(240px, 70vw, 280px)'}}>
                <div className="flex items-center h-full">
                  <div className="relative w-8 h-8 sm:w-10 sm:h-10 mr-3 sm:mr-4 flex-shrink-0">
                    <Image
                      src={expert.avatar}
                      alt={`${expert.title} Avatar`}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                  <div className="flex-1 flex justify-between items-center min-w-0">
                    <div className="flex flex-col justify-center min-w-0 flex-shrink">
                      <div className="text-xs sm:text-sm font-semibold text-black mb-1 leading-tight truncate">{expert.title}</div>
                      <div className="text-2xs sm:text-xs text-gray-500 truncate">{expert.address}</div>
                    </div>
                    <div className="flex flex-col items-end justify-center ml-2 flex-shrink-0">
                      <div className="text-sm sm:text-base font-bold text-green-500 mb-1">{expert.percentage}</div>
                      <div className="text-xs sm:text-sm font-bold text-green-500">{expert.amount}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA section */}
        <div className="bg-black rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-center text-white max-w-4xl mb-6 sm:mb-8 hover-lift scale-in-animation mx-2 sm:mx-auto" style={{aspectRatio: 'auto', minHeight: 'auto'}}>
          <div className="mb-4 sm:mb-6">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 mx-auto float-animation">
              <Image
                src="/images/logo2.png"
                alt="Logo2"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <p className="text-lg sm:text-xl mb-4 font-bold fade-in-up leading-relaxed px-2">
            Follow the official polyalpha<br className="hidden sm:block" />
            <span className="sm:hidden"> </span>X. Don't make me beg.😁
          </p>
          <a 
            href="https://x.com/PolyAlpha" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white text-black w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto hover:bg-gray-100 transition-colors button-glow pulse-glow-animation"
          >
            <div className="relative w-6 h-6 sm:w-7 sm:h-7">
              <Image
                src="/images/icon-x.png"
                alt="X Icon"
                fill
                className="object-contain"
              />
            </div>
          </a>
        </div>

        {/* Footer logo */}
        <div className="text-center fade-in-up pb-8 sm:pb-0">
          <div className="inline-flex items-center text-black font-bold text-base sm:text-lg hover-lift">
            <div className="relative w-5 h-5 sm:w-6 sm:h-6 mr-2">
              <Image
                src="/images/logo.png"
                alt="PolyAlpha Logo"
                fill
                className="object-contain"
              />
            </div>
            PolyAlpha
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 