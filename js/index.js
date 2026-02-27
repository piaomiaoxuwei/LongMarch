let mapScale = 1;
let currentIndex = 0;
// 导航栏滚动效果
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mapContainer = document.getElementById('map-container');
const zoomIn = document.getElementById('zoom-in');
const zoomOut = document.getElementById('zoom-out');
const resetMap = document.getElementById('reset-map');
const testimonialsSlider = document.getElementById('testimonialsSlider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const slideWidth = 400; // 每个卡片的宽度 + 间距
const totalSlides = document.querySelectorAll('#testimonialsSlider > div').length;
const maxIndex = Math.max(0, totalSlides - Math.floor(testimonialsSlider.clientWidth / slideWidth));
const mobileMenuItems = mobileMenu.querySelectorAll('a');
const mapMarkers = document.querySelectorAll('.map-marker');
const locationTitle = document.getElementById('location-title');
const locationDate = document.getElementById('location-date');
const locationDescription = document.getElementById('location-description');
const locationImage = document.getElementById('location-image');
const locationLink = document.getElementById('location-link');

// 定义地点数据
const locations = {
    ruijin: {
        title: "瑞金 - 长征出发地",
        date: "1934年10月",
        description: `
            <p class="mb-4">瑞金是中华苏维埃共和国临时中央政府所在地，1934年10月，中央红军主力被迫实行战略转移，从瑞金等地出发，开始长征。</p>
            <p>中央红军主力五个军团及中央、军委机关和部队共8.6万余人，分别从瑞金地区出发，被迫实行战略性转移，从而开始进行红军打败国民党的转折点。</p>
        `,
        image: "img/map-point-01.jpg",
        link: "https://map.baidu.com/search/%E4%B8%AD%E5%A4%AE%E7%BA%A2%E5%86%9B%E9%95%BF%E5%BE%81%E5%87%BA%E5%8F%91%E5%9C%B0%E7%BA%AA%E5%BF%B5%E5%9B%AD/@12850575.07,2975845.78,21z,87t,-65.86h#panoid=2500980012231212110221269OI&panotype=street&heading=73.18&pitch=0&l=13&tn=B_NORMAL_MAP&sc=0&newmap=1&shareurl=1&pid=2500980012231212110221269OI&psp=%7B%22PanoModule%22%3A%7B%22markerUid%22%3A%22e30d214ea0fae7aa2bd7ab4d%22%7D%7D"
    },
    zunyi: {
        title: "遵义 - 遵义会议召开地",
        date: "1935年1月",
        description: `
            <p class="mb-4">遵义会议是指1935年1月中共中央政治局在贵州遵义召开的独立自主地解决中国革命问题的一次极其重要的扩大会议。</p>
            <p>这次会议是中国共产党第一次独立自主地运用马克思列宁主义基本原理解决自己的路线、方针和政策方面问题的会议。这次会议，在极端危急的历史关头，挽救了党，挽救了红军，挽救了中国革命，在中国共产党和红军的历史上，是一个生死攸关的转折点。</p>
        `,
        image: "img/map-point-02.jpg",
        link: "https://map.baidu.com/search/%E4%B8%AD%E5%A4%AE%E7%BA%A2%E5%86%9B%E9%95%BF%E5%BE%81%E5%87%BA%E5%8F%91%E5%9C%B0%E7%BA%AA%E5%BF%B5%E5%9B%AD/@12850575.07,2975845.78,21z,87t,-65.86h#panoid=2500900012231124153119223OI&panotype=street&heading=180&pitch=0&l=13&tn=B_NORMAL_MAP&sc=0&newmap=1&shareurl=1&pid=2500900012231124153119223OI&psp=%7B%22PanoModule%22%3A%7B%22markerUid%22%3A%221eeed5462c050bf3b5147fe6%22%7D%7D"
    },
    jinsha: {
        title: "金沙江 - 巧渡金沙江",
        date: "1935年5月",
        description: `
            <p class="mb-4">1935年5月，中央红军主力利用7条木船，在7天7夜的时间里，全部渡过金沙江，摆脱了几十万国民党军的围追堵截。</p>
            <p>红军巧渡金沙江是中国工农红军战争史上以少胜多、灵活机动的著名战例。金沙江位于长江的上游，穿行在川滇边界的深山狭谷间，江面宽阔，水急浪大。红军主力渡过金沙江，彻底跳出了国民党军队的包围圈，取得了战略转移中具有决定意义的胜利。</p>
        `,
        image: "img/map-point-03.jpg",
        link: "https://map.baidu.com/search/%E4%B8%AD%E5%A4%AE%E7%BA%A2%E5%86%9B%E9%95%BF%E5%BE%81%E5%87%BA%E5%8F%91%E5%9C%B0%E7%BA%AA%E5%BF%B5%E5%9B%AD/@12850575.07,2975845.78,21z,87t,-65.86h#panoid=2402100012221117183345428OI&panotype=street&heading=106.67&pitch=0&l=13&tn=B_NORMAL_MAP&sc=0&newmap=1&shareurl=1&pid=2402100012221117183345428OI&psp=%7B%22PanoModule%22%3A%7B%22markerUid%22%3A%2208fc93dfc309fe929b68b4d4%22%7D%7D"
    },
    luding: {
        title: "泸定桥 - 飞夺泸定桥",
        date: "1935年5月",
        description: `
            <p class="mb-4">飞夺泸定桥，是中国工农红军长征中的一场重要战役，发生于1935年5月。</p>
            <p>中央红军部队在四川省中西部强渡大渡河成功，沿大渡河东岸北上，主力由安顺场沿大渡河西岸北上，红四团官兵在天下大雨的情况下，在崎岖陡峭的山路上跑步前进，一昼夜奔袭竟达240里，终于在5月29日凌晨6时许按时到达泸定桥西岸。第2连连长和22名突击队员沿着枪林弹雨和火墙密布的铁索踩着铁链夺下桥头，并与东岸部队合围占领了泸定桥。</p>
        `,
        image: "img/map-point-04.jpg",
        link: "https://map.baidu.com/search/%E4%B8%AD%E5%A4%AE%E7%BA%A2%E5%86%9B%E9%95%BF%E5%BE%81%E5%87%BA%E5%8F%91%E5%9C%B0%E7%BA%AA%E5%BF%B5%E5%9B%AD/@12850575.07,2975845.78,21z,87t,-65.86h#panoid=2500590012231023151623169OI&panotype=street&heading=313.11&pitch=0&l=13&tn=B_NORMAL_MAP&sc=0&newmap=1&shareurl=1&pid=2500590012231023151623169OI&psp=%7B%22PanoModule%22%3A%7B%22markerUid%22%3A%228ee8432106b67e112cb96d2b%22%7D%7D"
    },
    snowmountain: {
        title: "夹金山 - 翻越雪山",
        date: "1935年6月",
        description: `
            <p class="mb-4">夹金山位于四川省阿坝藏族羌族自治州小金县与宝兴县交界处，海拔4114米，是红军长征中翻越的第一座大雪山。</p>
            <p>1935年6月，中央红军先头部队翻越第一座大雪山——夹金山。夹金山终年积雪，空气稀薄，气候恶劣，没有道路，没有人烟。红军战士穿着单衣，踏着积雪，顶着寒风，向上攀登。许多战士因为缺氧和寒冷永远留在了雪山上，但红军官兵以坚定的信念和顽强的意志，终于征服了这座雪山。</p>
        `,
        image: "img/map-point-05.jpg",
        link: "https://map.baidu.com/search/%E4%B8%AD%E5%A4%AE%E7%BA%A2%E5%86%9B%E9%95%BF%E5%BE%81%E5%87%BA%E5%8F%91%E5%9C%B0%E7%BA%AA%E5%BF%B5%E5%9B%AD/@12850575.07,2975845.78,21z,87t,-65.86h#panoid=2500660012231022135920228OI&panotype=street&heading=154.9&pitch=0&l=13&tn=B_NORMAL_MAP&sc=0&newmap=1&shareurl=1&pid=2500660012231022135920228OI&psp=%7B%22PanoModule%22%3A%7B%22markerUid%22%3A%227388dffd729c0df2d3ff2378%22%7D%7D"
    },
    grassland: {
        title: "松潘草地 - 过草地",
        date: "1935年8月",
        description: `
            <p class="mb-4">松潘草地位于四川省阿坝藏族羌族自治州北部，是青藏高原与四川盆地的过渡地带，海拔3500米以上，地势低洼，积水严重，水草盘根错节，形成大片沼泽。</p>
            <p>1935年8月，红军开始过草地。草地气候恶劣，昼夜温差大，荒无人烟，没有道路。红军战士们踩着草甸，深一脚浅一脚地前进，许多人陷入沼泽牺牲。粮食极度缺乏，战士们不得不煮皮带、吃草根充饥。经过十几天的艰苦跋涉，红军终于走出了草地，创造了人类历史上的又一个奇迹。</p>
        `,
        image: "img/map-point-06.jpg",
        link: "https://map.baidu.com/search/%E6%9D%BE%E6%BD%98%E8%8D%89%E5%9C%B0"
    },
    wuqi: {
        title: "吴起镇 - 中央红军长征胜利终点",
        date: "1935年10月",
        description: `
            <p class="mb-4">吴起镇位于陕西省延安市吴起县，1935年10月，中央红军到达这里，与陕北红军胜利会师。</p>
            <p>1935年10月19日，中共中央率领中央红军经过二万五千里长征，到达陕北吴起镇，进入西北苏区，从而胜利地结束了中央红军的长征。随后，中央红军在吴起镇击退了国民党军队的追兵，取得了"切尾巴"战斗的胜利。吴起镇会师标志着中央红军长征的结束，为中国革命保留了珍贵的火种。</p>
        `,
        image: "img/map-point-07.jpg",
        link: "https://map.baidu.com/search/%E5%90%B4%E8%B5%B7%E9%95%87"
    }
};

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化第一个地点的链接
    const firstLocation = locations.ruijin;
    if (locationLink && firstLocation.link) {
        locationLink.href = firstLocation.link;
        locationLink.target = "_blank";
        locationLink.title = `查看${firstLocation.title}地图位置`;
    }
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('py-2');
        navbar.classList.remove('py-3');
        backToTop.classList.remove('opacity-0', 'invisible');
        backToTop.classList.add('opacity-100', 'visible');
    } else {
        navbar.classList.add('py-3');
        navbar.classList.remove('py-2');
        backToTop.classList.add('opacity-0', 'invisible');
        backToTop.classList.remove('opacity-100', 'visible');
    }
    // 滚动动画
    const fadeElements = document.querySelectorAll('.timeline-item, .fade-in');
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('fade-in');
        }
    });
});

// 返回顶部功能
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// 平滑滚动 - 修复后的代码
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // 检查href是否是一个有效的页面锚点（不是URL）
        const href = this.getAttribute('href');
        
        // 排除包含特殊字符或看起来像URL的链接
        if (href.includes('/') || href.includes('?')) {
            return; // 不处理这类链接，让浏览器正常跳转
        }

        e.preventDefault();

        // 关闭移动菜单（如果打开）
        mobileMenu.classList.add('hidden');

        const targetElement = document.querySelector(href);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

menuBtn.addEventListener('click', () => {
    if (mobileMenu.classList.contains('-translate-y-full')) {
        mobileMenu.classList.remove('-translate-y-full');
        mobileMenu.classList.add('translate-y-0');
        menuBtn.innerHTML = '<i class="fa fa-times"></i>';
    } else {
        mobileMenu.classList.add('-translate-y-full');
        mobileMenu.classList.remove('translate-y-0');
        menuBtn.innerHTML = '<i class="fa fa-bars"></i>';
    }
});

// 关闭移动端菜单（点击菜单项时）
mobileMenuItems.forEach(item => {
    item.addEventListener('click', () => {
        mobileMenu.classList.add('-translate-y-full');
        mobileMenu.classList.remove('translate-y-0');
        menuBtn.innerHTML = '<i class="fa fa-bars"></i>';
    });
});

// 轮播图
prevBtn.addEventListener('click', () => {
    currentIndex = Math.max(0, currentIndex - 1);
    updateSliderPosition();
});

nextBtn.addEventListener('click', () => {
    currentIndex = Math.min(maxIndex, currentIndex + 1);
    updateSliderPosition();
});

function updateSliderPosition() {
    testimonialsSlider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

// 响应式调整
window.addEventListener('resize', () => {
    const newMaxIndex = Math.max(0, totalSlides - Math.floor(testimonialsSlider.clientWidth / slideWidth));
    currentIndex = Math.min(currentIndex, newMaxIndex);
    updateSliderPosition();
});

// 图表
window.addEventListener('load', () => {
    // 参与红色教育活动学生人数图表
    const activityCtx = document.getElementById('activityChart').getContext('2d');
    new Chart(activityCtx, {
        type: 'bar',
        data: {
            labels: ['2021年', '2022年', '2023年', '2024年', '2025年'],
            datasets: [{
                label: '参与人数',
                data: [1200, 1800, 2500, 3200, 4500],
                backgroundColor: [
                    'rgba(196, 30, 58, 0.6)',
                    'rgba(196, 30, 58, 0.6)',
                    'rgba(196, 30, 58, 0.6)',
                    'rgba(196, 30, 58, 0.6)',
                    'rgba(196, 30, 58, 0.6)'
                ],
                borderColor: [
                    'rgba(196, 30, 58, 1)',
                    'rgba(196, 30, 58, 1)',
                    'rgba(196, 30, 58, 1)',
                    'rgba(196, 30, 58, 1)',
                    'rgba(196, 30, 58, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // 红色教育成果分类图表
    const achievementCtx = document.getElementById('achievementChart').getContext('2d');
    new Chart(achievementCtx, {
        type: 'doughnut',
        data: {
            labels: ['实践活动', '学术研究', '文化作品', '志愿服务'],
            datasets: [{
                data: [40, 25, 20, 15],
                backgroundColor: [
                    'rgba(196, 30, 58, 0.8)',
                    'rgba(255, 215, 0, 0.8)',
                    'rgba(26, 26, 46, 0.8)',
                    'rgba(128, 128, 128, 0.8)'
                ],
                borderColor: [
                    'rgba(196, 30, 58, 1)',
                    'rgba(255, 215, 0, 1)',
                    'rgba(26, 26, 46, 1)',
                    'rgba(128, 128, 128, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
});

// 地图交互
zoomIn.addEventListener('click', function () {
    if (mapScale < 1.5) {
        mapScale += 0.1;
        mapContainer.style.transform = `scale(${mapScale})`;
    }
});

zoomOut.addEventListener('click', function () {
    if (mapScale > 0.7) {
        mapScale -= 0.1;
        mapContainer.style.transform = `scale(${mapScale})`;
    }
});

resetMap.addEventListener('click', function () {
    mapScale = 1;
    mapContainer.style.transform = `scale(${mapScale})`;
    mapContainer.scrollTo(mapContainer.offsetWidth / 2, mapContainer.offsetHeight / 2);
});

// 地图标记点击事件
mapMarkers.forEach(marker => {
    marker.addEventListener('click', function () {
        const locationId = this.getAttribute('data-location');
        const location = locations[locationId];

        if (location) {
            // 更新a标签的href属性
            if (locationLink && location.link) {
                locationLink.href = location.link;
                locationLink.target = "_blank";
                locationLink.title = `查看${location.title}地图位置`;
            }

            // 更新详情内容
            locationTitle.textContent = location.title;
            locationDate.innerHTML = `<i class="fa fa-calendar mr-2"></i>${location.date}`;
            locationDescription.innerHTML = location.description;
            locationImage.src = location.image;
            locationImage.alt = location.title;

            // 添加动画效果
            locationTitle.classList.add('scale-in');
            locationDescription.classList.add('scale-in');
            locationImage.classList.add('scale-in');

            setTimeout(() => {
                locationTitle.classList.remove('scale-in');
                locationDescription.classList.remove('scale-in');
                locationImage.classList.remove('scale-in');
            }, 500);

            // 滚动到详情区域（移动端）
            if (window.innerWidth < 768) {
                const detailsElement = document.getElementById('location-details');
                detailsElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// 图表初始化
window.addEventListener('load', function () {
    // // 战斗统计图表
    // const battlesCtx = document.getElementById('battles-chart').getContext('2d');
    // new Chart(battlesCtx, {
    //     type: 'bar',
    //     data: {
    //         labels: ['1934年', '1935年', '1936年'],
    //         datasets: [{
    //             label: '主要战斗次数',
    //             data: [30, 280, 70],
    //             backgroundColor: [
    //                 'rgba(196, 30, 58, 0.7)',
    //                 'rgba(196, 30, 58, 0.7)',
    //                 'rgba(196, 30, 58, 0.7)'
    //             ],
    //             borderColor: [
    //                 'rgba(196, 30, 58, 1)',
    //                 'rgba(196, 30, 58, 1)',
    //                 'rgba(196, 30, 58, 1)'
    //             ],
    //             borderWidth: 1
    //         }]
    //     },
    //     options: {
    //         responsive: true,
    //         maintainAspectRatio: false,
    //         scales: {
    //             y: {
    //                 beginAtZero: true,
    //                 title: {
    //                     display: true,
    //                     text: '战斗次数'
    //                 }
    //             }
    //         }
    //     }
    // });

    // // 红军兵力变化图表
    // const troopsCtx = document.getElementById('troops-chart').getContext('2d');
    // new Chart(troopsCtx, {
    //     type: 'line',
    //     data: {
    //         labels: ['1934年10月', '1935年1月', '1935年6月', '1935年10月', '1936年10月'],
    //         datasets: [{
    //             label: '中央红军兵力（万人）',
    //             data: [8.6, 3, 2.5, 0.75, 0.75],
    //             fill: false,
    //             borderColor: 'rgba(196, 30, 58, 1)',
    //             tension: 0.1,
    //             pointBackgroundColor: 'rgba(196, 30, 58, 1)'
    //         }, {
    //             label: '红二方面军兵力（万人）',
    //             data: [0, 1.7, 1.7, 1.1, 1.1],
    //             fill: false,
    //             borderColor: 'rgba(212, 175, 55, 1)',
    //             tension: 0.1,
    //             pointBackgroundColor: 'rgba(212, 175, 55, 1)'
    //         }, {
    //             label: '红四方面军兵力（万人）',
    //             data: [0, 8, 8, 3.3, 3.3],
    //             fill: false,
    //             borderColor: 'rgba(46, 125, 50, 1)',
    //             tension: 0.1,
    //             pointBackgroundColor: 'rgba(46, 125, 50, 1)'
    //         }]
    //     },
    //     options: {
    //         responsive: true,
    //         maintainAspectRatio: false,
    //         scales: {
    //             y: {
    //                 beginAtZero: true,
    //                 title: {
    //                     display: true,
    //                     text: '兵力（万人）'
    //                 }
    //             }
    //         }
    //     }
    // });
});