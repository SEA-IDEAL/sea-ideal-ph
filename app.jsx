const { useState, useEffect, useMemo, useCallback } = React;

const DATASETS = [
  { key: 'new', path: 'assets/网站数据 - 新品.csv', labelKey: 'newProducts' },
  { key: 'hot', path: 'assets/网站数据 - 爆品.csv', labelKey: 'hotProducts' },
  { key: 'library', path: 'assets/网站数据 - 商品库.csv', labelKey: 'productLibrary' }
];

const secondaryCategoryNames = {
  fil: {
    '保健食品': 'Mga suplementong pangkalusugan', '鼻子口腔护理': 'Pangangalaga sa ilong at bibig',
    '厨房电器': 'Mga appliance sa kusina', '厨房用具': 'Mga gamit sa kusina', '床上用品': 'Kagamitan sa kama',
    '电气设备': 'Kagamitang elektrikal', '非处方药品': 'Gamot na walang reseta', '功能包袋': 'Mga functional bag',
    '护发造型': 'Pangangalaga at pag-istilo ng buhok', '护肤': 'Pangangalaga sa balat', '花园用品': 'Mga gamit sa hardin',
    '即食食品': 'Handang kainin', '家居收纳': 'Imbakan sa bahay', '家居织物': 'Tela para sa bahay',
    '家庭护理用品': 'Mga gamit sa pangangalaga ng bahay', '家庭清洁用品': 'Mga panlinis ng bahay',
    '建筑用品': 'Mga materyales sa gusali', '健身设备': 'Kagamitang pang-fitness', '节日派对用品': 'Mga gamit sa pista at party',
    '口腔鼻腔护理': 'Pangangalaga sa bibig at ilong', '零食': 'Meryenda', '露营徒步装备': 'Kagamitan sa camping at hiking',
    '旅行箱': 'Maleta', '猫狗保健': 'Kalusugan ng pusa at aso', '猫狗美容': 'Grooming ng pusa at aso',
    '猫狗配饰': 'Accessories ng pusa at aso', '猫狗食品': 'Pagkain ng pusa at aso', '猫砂除便': 'Cat litter at paglilinis',
    '美容': 'Pampaganda', '美容、个护电器': 'Beauty at personal care appliances', '美容电器': 'Beauty appliances',
    '美容护肤': 'Beauty at skin care', '美妆': 'Makeup', '沐浴身体护理': 'Paligo at pangangalaga sa katawan',
    '男士上衣': 'Pantaas ng lalaki', '男童服饰': 'Damit ng batang lalaki', '男童服装': 'Kasuotan ng batang lalaki',
    '男鞋': 'Sapatos ng lalaki', '内部配件': 'Mga piyesang panloob', '女包': 'Bag ng babae',
    '女士内衣': 'Underwear ng babae', '女士睡衣家居服': 'Pambabaeng pantulog at pambahay', '女童鞋': 'Sapatos ng batang babae',
    '女鞋': 'Sapatos ng babae', '女性私密处护理': 'Intimate care ng babae', '女性卫生': 'Kalinisan ng babae',
    '平板配件': 'Tablet accessories', '日常家居': 'Pang-araw-araw na gamit sa bahay', '生活电器': 'Mga appliance sa bahay',
    '室内家具': 'Muwebles sa loob ng bahay', '室内配饰': 'Dekorasyon sa loob ng bahay', '收纳整理': 'Imbakan at pag-aayos',
    '手机配件': 'Mobile phone accessories', '手足指甲护理': 'Pangangalaga sa kamay, paa at kuko',
    '通用配饰': 'Pangkalahatang accessories', '头部护理与造型': 'Pangangalaga at pag-istilo ng buhok',
    '五金工具': 'Hardware at tools', '洗车保养': 'Paglilinis at pag-aalaga ng sasakyan',
    '洗浴与身体护理': 'Paligo at pangangalaga sa katawan', '相机摄影': 'Camera at photography',
    '香水': 'Pabango', '香水香氛': 'Pabango at fragrance', '鞋配件': 'Accessories ng sapatos',
    '休闲户外': 'Libangan sa labas', '眼耳护理': 'Pangangalaga sa mata at tainga',
    '眼镜耳朵护理': 'Salamin at pangangalaga sa tainga', '音视频设备': 'Audio at video equipment',
    '饮料': 'Inumin', '婴儿护理': 'Pangangalaga sa sanggol', '营养保健': 'Nutrisyon at wellness',
    '运动服饰': 'Kasuotang pang-sports', '运动户外配件': 'Sports at outdoor accessories', '照明灯具': 'Mga ilaw',
    '智能穿戴': 'Smart wearables', '主食调料': 'Pangunahing pagkain at pampalasa',
    '主食与烹饪调味': 'Pangunahing pagkain at panimpla', '装饰': 'Dekorasyon', '装饰摆件': 'Mga dekorasyong display'
  },
  en: {
    '保健食品': 'Health Supplements', '鼻子口腔护理': 'Nasal & Oral Care', '厨房电器': 'Kitchen Appliances',
    '厨房用具': 'Kitchenware', '床上用品': 'Bedding', '电气设备': 'Electrical Equipment',
    '非处方药品': 'Over-the-Counter Medicine', '功能包袋': 'Functional Bags', '护发造型': 'Hair Care & Styling',
    '护肤': 'Skin Care', '花园用品': 'Garden Supplies', '即食食品': 'Ready-to-Eat Food',
    '家居收纳': 'Home Storage', '家居织物': 'Home Textiles', '家庭护理用品': 'Household Care Supplies',
    '家庭清洁用品': 'Household Cleaning Supplies', '建筑用品': 'Building Supplies', '健身设备': 'Fitness Equipment',
    '节日派对用品': 'Holiday & Party Supplies', '口腔鼻腔护理': 'Oral & Nasal Care', '零食': 'Snacks',
    '露营徒步装备': 'Camping & Hiking Gear', '旅行箱': 'Luggage', '猫狗保健': 'Cat & Dog Health',
    '猫狗美容': 'Cat & Dog Grooming', '猫狗配饰': 'Cat & Dog Accessories', '猫狗食品': 'Cat & Dog Food',
    '猫砂除便': 'Cat Litter & Waste Care', '美容': 'Beauty', '美容、个护电器': 'Beauty & Personal Care Appliances',
    '美容电器': 'Beauty Appliances', '美容护肤': 'Beauty & Skin Care', '美妆': 'Makeup',
    '沐浴身体护理': 'Bath & Body Care', '男士上衣': "Men's Tops", '男童服饰': "Boys' Apparel",
    '男童服装': "Boys' Clothing", '男鞋': "Men's Shoes", '内部配件': 'Internal Accessories',
    '女包': "Women's Bags", '女士内衣': "Women's Underwear", '女士睡衣家居服': "Women's Sleepwear & Loungewear",
    '女童鞋': "Girls' Shoes", '女鞋': "Women's Shoes", '女性私密处护理': "Women's Intimate Care",
    '女性卫生': "Women's Hygiene", '平板配件': 'Tablet Accessories', '日常家居': 'Everyday Home Supplies',
    '生活电器': 'Home Appliances', '室内家具': 'Indoor Furniture', '室内配饰': 'Interior Accessories',
    '收纳整理': 'Storage & Organization', '手机配件': 'Mobile Phone Accessories',
    '手足指甲护理': 'Hand, Foot & Nail Care', '通用配饰': 'General Accessories',
    '头部护理与造型': 'Hair Care & Styling', '五金工具': 'Hardware & Tools', '洗车保养': 'Car Cleaning & Care',
    '洗浴与身体护理': 'Bath & Body Care', '相机摄影': 'Cameras & Photography', '香水': 'Perfume',
    '香水香氛': 'Perfume & Fragrance', '鞋配件': 'Shoe Accessories', '休闲户外': 'Outdoor Recreation',
    '眼耳护理': 'Eye & Ear Care', '眼镜耳朵护理': 'Eyewear & Ear Care', '音视频设备': 'Audio & Video Equipment',
    '饮料': 'Beverages', '婴儿护理': 'Baby Care', '营养保健': 'Nutrition & Wellness',
    '运动服饰': 'Sportswear', '运动户外配件': 'Sports & Outdoor Accessories', '照明灯具': 'Lighting',
    '智能穿戴': 'Smart Wearables', '主食调料': 'Staples & Seasonings',
    '主食与烹饪调味': 'Staples & Cooking Seasonings', '装饰': 'Decor', '装饰摆件': 'Decorative Objects'
  }
};

const translations = {
  fil: {
    title: 'Pagpili ng Produkto sa Pilipinas', products: 'produkto', merchants: 'tindahan', fromMerchants: 'Mula sa',
    search: 'Maghanap ng produkto o tindahan...', category: 'Kategorya', subcategory: 'Subcategory', colors: 'Kulay', sizes: 'Sukat',
    price: 'Presyo', productCount: 'produkto', browse: 'Tingnan ang mga produkto', viewAll: 'Tingnan lahat',
    allMerchants: 'Lahat ng tindahan', default: 'Default', priceAsc: 'Presyo ↑', priceDesc: 'Presyo ↓',
    ratingAsc: 'Rating ↑', ratingDesc: 'Rating ↓', salesAsc: 'Benta ↑', salesDesc: 'Benta ↓',
    home: 'Bagong Uso', allProducts: 'Mga patok', pool: 'Katalogo', newProducts: 'Bagong Uso', hotProducts: 'Patok', productLibrary: 'Katalogo',
    loading: 'Nilo-load ang mga produkto...', retry: 'Subukan muli', datasetLoadError: 'Hindi ma-load ang data para sa seksiyong ito.',
    datasetEmpty: 'Walang produkto sa seksiyong ito.', noResults: 'Walang nakitang produkto', tryAgain: 'Subukan ang ibang paghahanap o filter',
    loadMore: 'Magpakita pa', seller: 'Tindahan', row: 'Product ID', allCategories: 'Lahat ng kategorya', allSubcategories: 'Lahat ng subcategory',
    rating: 'Rating', sales: 'Nabenta', easyProduct: 'Madaling kunin ang produkto',
    requestSample: 'Humingi ng sample', addLink: 'Idagdag ang link', linkUnavailable: 'Walang available na link',
    unknownProduct: 'Produktong walang pangalan', unknownShop: 'Hindi tukoy na tindahan', close: 'Isara',
    categoryNames: { '保健': 'Kalusugan', '健康保健': 'Kalusugan', '宠物用品': 'Pet supplies', '厨房餐饮': 'Kusina at kainan', '儿童时尚': 'Moda ng bata', '工具五金': 'Tools at hardware', '家具': 'Muwebles', '家用电器': 'Home appliances', '家用纺织': 'Home textiles', '家装建材': 'Home improvement', '居家日用': 'Mga gamit sa bahay', '美妆个护': 'Beauty at personal care', '美妆与个护': 'Beauty at personal care', '母婴用品': 'Ina at sanggol', '男士内衣': 'Panlalaking underwear', '女士内衣': 'Pambabaeng underwear', '女装与女士内衣': 'Damit at underwear ng babae', '汽车与摩托车': 'Sasakyan at motorsiklo', '食品饮料': 'Pagkain at inumin', '手机数码': 'Mobile at electronics', '手机与数码': 'Mobile at electronics', '箱包': 'Bag', '鞋靴': 'Sapatos', '运动户外': 'Sports at outdoor', '运动与户外': 'Sports at outdoor' },
    secondaryCategoryNames: secondaryCategoryNames.fil
  },
  en: {
    title: 'Philippines Product Selection', products: 'products', merchants: 'stores', fromMerchants: 'From',
    search: 'Search products or stores...', category: 'Category', subcategory: 'Subcategory', colors: 'Colors', sizes: 'Sizes',
    price: 'Price', productCount: 'products', browse: 'Browse products',
    viewAll: 'View all', allMerchants: 'All stores', default: 'Default', priceAsc: 'Price ↑', priceDesc: 'Price ↓',
    ratingAsc: 'Rating ↑', ratingDesc: 'Rating ↓', salesAsc: 'Sales ↑', salesDesc: 'Sales ↓',
    home: 'New Trends', allProducts: 'Trending', pool: 'Catalog', newProducts: 'New Trends', hotProducts: 'Trending', productLibrary: 'Catalog',
    loading: 'Loading products...', retry: 'Retry', datasetLoadError: 'This section could not be loaded.',
    datasetEmpty: 'There are no products in this section.', noResults: 'No products found', tryAgain: 'Try another search or filter',
    loadMore: 'Show more', seller: 'Store', row: 'Product ID', allCategories: 'All categories', allSubcategories: 'All subcategories',
    rating: 'Rating', sales: 'Sold', easyProduct: 'Easy product access', requestSample: 'Request sample', addLink: 'Add link',
    linkUnavailable: 'Link unavailable', unknownProduct: 'Unnamed product', unknownShop: 'Unknown store', close: 'Close',
    categoryNames: { '保健': 'Health', '健康保健': 'Health', '宠物用品': 'Pet Supplies', '厨房餐饮': 'Kitchen & Dining', '儿童时尚': 'Kids Fashion', '工具五金': 'Tools & Hardware', '家具': 'Furniture', '家用电器': 'Home Appliances', '家用纺织': 'Home Textiles', '家装建材': 'Home Improvement', '居家日用': 'Home & Daily Essentials', '美妆个护': 'Beauty & Personal Care', '美妆与个护': 'Beauty & Personal Care', '母婴用品': 'Mother & Baby', '男士内衣': "Men's Underwear", '女士内衣': "Women's Underwear", '女装与女士内衣': "Women's Fashion & Underwear", '汽车与摩托车': 'Automotive & Motorcycle', '食品饮料': 'Food & Beverages', '手机数码': 'Mobile & Electronics', '手机与数码': 'Mobile & Electronics', '箱包': 'Bags', '鞋靴': 'Shoes', '运动户外': 'Sports & Outdoors', '运动与户外': 'Sports & Outdoors' },
    secondaryCategoryNames: secondaryCategoryNames.en
  },
  zh: {
    title: '菲律宾选品', products: '款商品', merchants: '个商家', fromMerchants: '来自',
    search: '搜索商品或店铺...', category: '一级类目', subcategory: '二级类目', colors: '颜色', sizes: '尺码',
    price: '售价', productCount: '款商品', browse: '进入选品',
    viewAll: '查看全部', allMerchants: '全部商家', default: '默认', priceAsc: '价格↑', priceDesc: '价格↓',
    ratingAsc: '评分↑', ratingDesc: '评分↓', salesAsc: '销量↑', salesDesc: '销量↓',
    home: '趋势新品', allProducts: '爆品', pool: '商品库', newProducts: '趋势新品', hotProducts: '爆品', productLibrary: '商品库',
    loading: '正在加载商品...', retry: '重试', datasetLoadError: '当前栏目数据加载失败。', datasetEmpty: '当前栏目暂无商品。',
    noResults: '没有找到相关商品', tryAgain: '试试其他关键词或筛选条件', loadMore: '加载更多', seller: '所属商家',
    row: '商品 ID', allCategories: '全部一级类目', allSubcategories: '全部二级类目', rating: '评分', sales: '销量', easyProduct: '轻松获取商品',
    requestSample: '申请样品', addLink: '添加链接', linkUnavailable: '机构链接暂不可用', unknownProduct: '未命名商品',
    unknownShop: '未知商家', close: '关闭',
    categoryNames: { '保健': '保健', '健康保健': '健康保健', '宠物用品': '宠物用品', '厨房餐饮': '厨房餐饮', '儿童时尚': '儿童时尚', '工具五金': '工具五金', '家具': '家具', '家用电器': '家用电器', '家用纺织': '家用纺织', '家装建材': '家装建材', '居家日用': '居家日用', '美妆个护': '美妆个护', '美妆与个护': '美妆与个护', '母婴用品': '母婴用品', '男士内衣': '男士内衣', '女士内衣': '女士内衣', '女装与女士内衣': '女装与女士内衣', '汽车与摩托车': '汽车与摩托车', '食品饮料': '食品饮料', '手机数码': '手机数码', '手机与数码': '手机与数码', '箱包': '箱包', '鞋靴': '鞋靴', '运动户外': '运动户外', '运动与户外': '运动与户外' }
  }
};

// ========== Utility Functions ==========
function parsePrice(priceStr) {
  if (!priceStr) return 0;
  const match = priceStr.match(/\d[\d,]*(?:\.\d+)?/);
  return match ? parseFloat(match[0].replace(/,/g, '')) : 0;
}

function parseMetric(value) {
  if (!value) return null;
  const match = String(value).match(/\d[\d,]*(?:\.\d+)?/);
  if (!match) return null;
  const parsed = Number(match[0].replace(/,/g, ''));
  return Number.isFinite(parsed) ? parsed : null;
}

function compareMetrics(left, right, direction) {
  const leftValue = parseMetric(left);
  const rightValue = parseMetric(right);
  if (leftValue === null && rightValue === null) return 0;
  if (leftValue === null) return 1;
  if (rightValue === null) return -1;
  return direction === 'asc' ? leftValue - rightValue : rightValue - leftValue;
}

function parseCommission(commStr) {
  if (!commStr) return 0;
  const match = commStr.match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 0;
}

function localizedCategory(value, t) {
  if (!value) return '';
  return t.categoryNames?.[value] || t.secondaryCategoryNames?.[value] || value;
}

function isEasyProduct(product) {
  return product?.merchant_reviewed?.trim() === '否';
}

function getAgencyLink(value) {
  if (!value) return '';
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.href : '';
  } catch {
    return '';
  }
}

function useProductImage(product) {
  const [imageIndex, setImageIndex] = useState(0);
  const sources = [];
  if (product?.image_url?.trim().startsWith('https://')) {
    sources.push(product.image_url.trim());
  }
  if (product?.image_token?.trim()) {
    sources.push(`assets/images/${product.image_token.trim()}.jpg`);
  }
  const imgSrc = sources[imageIndex];
  return {
    imgSrc,
    imgError: !imgSrc,
    handleImageError: () => setImageIndex(index => index + 1)
  };
}

// ========== Icons ==========
const IconSearch = () => (
  <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const BrandLogo = () => (
  <img className="brand-logo" src="assets/logo.png" alt="SEA IDEAL" />
);

const IconHome = ({ active }) => (
  <svg className="nav-icon" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const IconGrid = ({ active }) => (
  <svg className="nav-icon" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
  </svg>
);

const IconFlame = ({ active }) => (
  <svg className="nav-icon" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22c4.4 0 8-3.6 8-8 0-5-4-8.5-7-12 .2 4-2 6-3.5 7.5C8.2 8.2 7.5 7 7.5 5.5 5.2 7.8 4 10.5 4 14c0 4.4 3.6 8 8 8z"></path>
    <path d="M9 17c0-2 1.5-3.2 3-5 1 1.5 3 3 3 5a3 3 0 0 1-6 0z"></path>
  </svg>
);

const IconStore = ({ active }) => (
  <svg className="nav-icon" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <line x1="9" y1="22" x2="9" y2="12"></line>
    <line x1="15" y1="22" x2="15" y2="12"></line>
  </svg>
);

const IconCommission = ({ active }) => (
  <svg className="nav-icon" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
);

const IconArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

const IconClose = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const IconExternal = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

const IconBack = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);

const IconPool = ({ active }) => (
  <svg className="nav-icon" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 7V5a6 6 0 0 1 12 0v2"></path>
    <path d="M3 7h18l-1 14H4L3 7z"></path>
  </svg>
);

const IconPlus = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const IconCheck = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const IconCopy = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
);

// ========== Product Card ==========
function ProductCard({ product, onClick, index, t, showRow = false }) {
  const { imgSrc, imgError, handleImageError } = useProductImage(product);
  const style = { animationDelay: `${Math.min(index * 0.03, 0.6)}s` };

  return (
    <div className="product-card" onClick={onClick} style={style}>
      <div className={`product-image-wrap ${imgError ? 'img-error' : ''}`}>
        {!imgError && (
          <img
            className="product-image"
            src={imgSrc}
            alt={product.product_name}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={handleImageError}
          />
        )}
        {product.commission?.trim() && <div className="commission-badge">{product.commission}</div>}
      </div>
      <div className="product-info">
        <div className="product-name" dir="auto">{product.product_name || t.unknownProduct}</div>
        <div className="product-shop">{product.shop || t.unknownShop}</div>
        <ProductMeta product={product} t={t} />
        {showRow && <div className="product-row"><span>{t.row}</span> <strong>{product.row}</strong></div>}
        <ProductAttributes product={product} compact t={t} />
        <div className="product-bottom">
          <div className="product-price">{product.price}</div>
          <div className="go-btn">
            <IconArrowRight />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductMeta({ product, t, compact = false }) {
  const hasRating = Boolean(product.rating?.trim());
  const hasSales = Boolean(product.sales?.trim());
  if (!hasRating && !hasSales && !isEasyProduct(product)) return null;

  return (
    <div className={`product-meta ${compact ? 'compact' : ''}`}>
      <div className="product-metrics">
        {hasRating && <span><strong>★ {product.rating}</strong> {t.rating}</span>}
        {hasSales && <span><strong>{product.sales}</strong> {t.sales}</span>}
      </div>
      {isEasyProduct(product) && <span className="easy-product-badge">{t.easyProduct}</span>}
    </div>
  );
}

function ProductAttributes({ product, compact = false, t }) {
  const categories = [product.category_level_1, product.category_level_2, product.category_level_3]
    .filter(value => value?.trim())
    .map(value => localizedCategory(value, t));
  if (!categories.length && !product.colors?.trim() && !product.sizes?.trim()) return null;

  return (
    <div className={compact ? 'product-attributes compact' : 'product-attributes'}>
      {categories.length > 0 && (
        <div className="attribute-row">
          <span className="attribute-label">{t.category}</span>
          <span className="attribute-value" dir="auto">{compact ? categories[0] : categories.join(' / ')}</span>
        </div>
      )}
      {product.colors?.trim() && (
        <div className="attribute-row">
          <span className="attribute-label">{t.colors}</span>
          <span className="attribute-value" dir="auto">{product.colors}</span>
        </div>
      )}
      {product.sizes?.trim() && (
        <div className="attribute-row">
          <span className="attribute-label">{t.sizes}</span>
          <span className="attribute-value" dir="auto">{product.sizes}</span>
        </div>
      )}
    </div>
  );
}

// ========== Mini Product Card ==========
function MiniProductCard({ product, onClick, index, t }) {
  const { imgSrc, imgError, handleImageError } = useProductImage(product);
  const style = { animationDelay: `${Math.min(index * 0.03, 0.6)}s` };

  return (
    <div className="mini-card" onClick={onClick} style={style}>
      <div style={{
        width: '130px',
        height: '130px',
        background: imgError ? 'linear-gradient(135deg, #F5F0EB 0%, #EDE8E2 100%)' : 'transparent',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {!imgError && (
          <img
            className="mini-card-image"
            src={imgSrc}
            alt={product.product_name}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={handleImageError}
            style={{ position: 'absolute', top: 0, left: 0 }}
          />
        )}
        {imgError && (
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FF4D6D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4 }}>
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
        )}
      </div>
      <div className="mini-card-info">
        <div className="mini-card-name" dir="auto">{product.product_name || t.unknownProduct}</div>
        <ProductMeta product={product} t={t} compact />
        <ProductAttributes product={product} compact t={t} />
        <div className="mini-card-bottom">
          <div className="mini-card-price">{product.price}</div>
          {product.commission?.trim() && <div className="mini-commission">{product.commission}</div>}
        </div>
      </div>
    </div>
  );
}

// ========== Product Detail Modal ==========
function ProductModal({ product, onClose, t }) {
  const { imgSrc, imgError, handleImageError } = useProductImage(product);
  if (!product) return null;
  const agencyLink = getAgencyLink(product.agency_link);

  const renderAgencyAction = (label, className) => agencyLink ? (
    <a className={className} href={agencyLink} target="_blank" rel="noopener noreferrer">
      <IconExternal />
      {label}
    </a>
  ) : (
    <button className={className} type="button" disabled title={t.linkUnavailable}>
      {label}
    </button>
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-scroll">
          <div className="modal-handle"></div>
          <div className="modal-image-wrap" style={{
            background: imgError ? 'linear-gradient(135deg, #F5F0EB 0%, #EDE8E2 100%)' : 'var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {!imgError ? (
              <img className="modal-image" src={imgSrc} alt={product.product_name || t.unknownProduct} referrerPolicy="no-referrer" onError={handleImageError} />
            ) : (
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#FF4D6D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4 }}>
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
            )}
            <button className="modal-close" onClick={onClose} aria-label={t.close}>
              <IconClose />
            </button>
          </div>
          <div className="modal-body">
            <div className="modal-shop">{product.shop || t.unknownShop}</div>
            <div className="modal-name" dir="auto">{product.product_name || t.unknownProduct}</div>
            <ProductMeta product={product} t={t} />
            <div className="modal-price-row">
              <div className="modal-price">{product.price || '—'}</div>
              <div className="modal-price-note">{t.price}</div>
            </div>
            <ProductAttributes product={product} t={t} />
            <div className="modal-stats">
              <div className="stat-item">
                <div className="stat-label">{t.rating}</div>
                <div className="stat-value">{product.rating || '—'}</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">{t.sales}</div>
                <div className="stat-value">{product.sales || '—'}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-actions">
          {renderAgencyAction(t.requestSample, 'modal-cta')}
          {renderAgencyAction(t.addLink, 'pool-toggle')}
          {!agencyLink && <div className="modal-link-note">{t.linkUnavailable}</div>}
        </div>
      </div>
    </div>
  );
}

// ========== Merchant Card ==========
function MerchantCard({ merchant, onClick, index, t }) {
  const firstProduct = merchant.products[0];
  const { imgSrc, imgError, handleImageError } = useProductImage(firstProduct);
  const style = { animationDelay: `${Math.min(index * 0.03, 0.6)}s` };

  return (
    <div className="product-card" onClick={onClick} style={style}>
      <div className={`product-image-wrap ${imgError ? 'img-error' : ''}`}>
        {firstProduct && !imgError && (
          <img
            className="product-image"
            src={imgSrc}
            alt={merchant.name}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={handleImageError}
          />
        )}
        <div className="commission-badge">{merchant.count} {t.productCount}</div>
      </div>
      <div className="product-info">
        <div className="product-name" style={{ fontWeight: '600' }}>
          {merchant.name}
        </div>
        <div className="product-shop">
          {firstProduct && firstProduct.shop}
        </div>
        <div className="product-bottom">
          <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
            {t.browse}
          </div>
          <div className="go-btn">
            <IconArrowRight />
          </div>
        </div>
      </div>
    </div>
  );
}

// ========== Main App ==========
function App() {
  const [locale, setLocale] = useState(() => {
    try {
      const saved = localStorage.getItem('sea-ideal-ph-language');
      return translations[saved] ? saved : 'fil';
    } catch {
      return 'fil';
    }
  });
  const t = translations[locale];
  const [datasetData, setDatasetData] = useState(() => Object.fromEntries(
    DATASETS.map(dataset => [dataset.key, { products: [], error: '' }])
  ));
  const [activeDataset, setActiveDataset] = useState('hot');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [visibleProducts, setVisibleProducts] = useState(48);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const activeData = datasetData[activeDataset] || { products: [], error: '' };
  const products = activeData.products;

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = 'ltr';
    document.title = `PH | ${t.title}`;
    try {
      localStorage.setItem('sea-ideal-ph-language', locale);
    } catch {
      // The interface still works when browser storage is unavailable.
    }
  }, [locale]);

  useEffect(() => { setVisibleProducts(48); }, [activeDataset, searchQuery, sortBy, selectedCategory, selectedSubcategory]);

  const loadProducts = useCallback(() => {
    setLoading(true);
    Promise.all(DATASETS.map(async dataset => {
      try {
        const response = await fetch(dataset.path);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const csv = await response.text();
        return [dataset.key, { products: parseProductsCsv(csv, { source: dataset.key }), error: '' }];
      } catch (error) {
        console.error(`Failed to load ${dataset.key} products:`, error);
        return [dataset.key, { products: [], error: 'load' }];
      }
    }))
      .then(entries => setDatasetData(Object.fromEntries(entries)))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { loadProducts(); }, [loadProducts]);

  const categoryOptions = useMemo(() => (
    [...new Set(products.map(product => product.category_level_1).filter(Boolean))]
      .sort((a, b) => localizedCategory(a, t).localeCompare(localizedCategory(b, t), locale))
  ), [products, locale]);

  const subcategoryOptions = useMemo(() => {
    if (!selectedCategory) return [];
    return [...new Set(products
      .filter(product => product.category_level_1 === selectedCategory)
      .map(product => product.category_level_2)
      .filter(Boolean))]
      .sort((a, b) => localizedCategory(a, t).localeCompare(localizedCategory(b, t), locale));
  }, [products, selectedCategory, locale]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(p =>
        p.row.toLowerCase().includes(q) ||
        p.product_name.toLowerCase().includes(q) ||
        p.shop.toLowerCase().includes(q) ||
        p.sheet_name.toLowerCase().includes(q) ||
        p.category_level_1?.toLowerCase().includes(q) ||
        p.category_level_2?.toLowerCase().includes(q) ||
        localizedCategory(p.category_level_1, t).toLowerCase().includes(q) ||
        localizedCategory(p.category_level_2, t).toLowerCase().includes(q)
      );
    }

    if (selectedCategory) {
      result = result.filter(p => p.category_level_1 === selectedCategory);
    }

    if (selectedSubcategory) {
      result = result.filter(p => p.category_level_2 === selectedSubcategory);
    }

    if (sortBy === 'price-asc') {
      result.sort((a, b) => compareMetrics(a.price, b.price, 'asc'));
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => compareMetrics(a.price, b.price, 'desc'));
    } else if (sortBy === 'rating-asc') {
      result.sort((a, b) => compareMetrics(a.rating, b.rating, 'asc'));
    } else if (sortBy === 'rating-desc') {
      result.sort((a, b) => compareMetrics(a.rating, b.rating, 'desc'));
    } else if (sortBy === 'sales-asc') {
      result.sort((a, b) => compareMetrics(a.sales, b.sales, 'asc'));
    } else if (sortBy === 'sales-desc') {
      result.sort((a, b) => compareMetrics(a.sales, b.sales, 'desc'));
    }

    return result;
  }, [products, searchQuery, sortBy, selectedCategory, selectedSubcategory, locale]);

  const handleProductClick = useCallback((product) => {
    setSelectedProduct(product);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProduct(null);
  }, []);

  const handleSort = useCallback((value) => {
    setSortBy(value);
    window.scrollTo(0, 0);
  }, []);

  const handlePriceSort = useCallback(() => {
    setSortBy(current => current === 'price-asc' ? 'price-desc' : 'price-asc');
    window.scrollTo(0, 0);
  }, []);

  const handleMetricSort = useCallback((metric) => {
    setSortBy(current => current === `${metric}-desc` ? `${metric}-asc` : `${metric}-desc`);
    window.scrollTo(0, 0);
  }, []);

  const handleCategoryChange = useCallback((value) => {
    setSelectedCategory(value);
    setSelectedSubcategory('');
    window.scrollTo(0, 0);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  const handleDatasetChange = useCallback((datasetKey) => {
    setActiveDataset(datasetKey);
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedSubcategory('');
    setSortBy('default');
    setSelectedProduct(null);
    window.scrollTo(0, 0);
  }, []);

  const displayedCount = filteredProducts.length;

  // Loading state
  if (loading) {
    return (
      <div className="app">
        <div className="loading">
          <div className="loading-spinner"></div>
          {t.loading}
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      {/* Header */}
      <div className="header">
        <div className="header-top">
          <BrandLogo />
          <div className="header-actions">
            <select className="language-select" aria-label="Language" value={locale} onChange={event => setLocale(event.target.value)}>
              <option value="fil">Filipino</option>
              <option value="en">English</option>
              <option value="zh">中文</option>
            </select>
            <div className="header-stats">
              <strong>{displayedCount}</strong> {t.products}
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="search-box">
          <IconSearch />
          <input
            className="search-input"
            type="text"
            placeholder={t.search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <div className="search-clear" onClick={handleClearSearch}>
              <IconClose />
            </div>
          )}
        </div>
      </div>

      {categoryOptions.length > 0 && (
        <div className="category-filters">
          <div className="category-filter">
            <label htmlFor="category-select">{t.category}</label>
            <select id="category-select" value={selectedCategory} onChange={event => handleCategoryChange(event.target.value)}>
              <option value="">{t.allCategories}</option>
              {categoryOptions.map(value => <option key={value} value={value}>{localizedCategory(value, t)}</option>)}
            </select>
          </div>
          <div className="category-filter">
            <label htmlFor="subcategory-select">{t.subcategory}</label>
            <select
              id="subcategory-select"
              value={selectedSubcategory}
              disabled={!selectedCategory || subcategoryOptions.length === 0}
              onChange={event => setSelectedSubcategory(event.target.value)}
            >
              <option value="">{t.allSubcategories}</option>
              {subcategoryOptions.map(value => <option key={value} value={value}>{localizedCategory(value, t)}</option>)}
            </select>
          </div>
        </div>
      )}

      {/* Sort Bar */}
      <div className="sort-bar">
        <span className="sort-label">{filteredProducts.length} {t.products}</span>
        <div className="sort-options">
          <button
            className={`sort-btn ${sortBy === 'default' ? 'active' : ''}`}
            onClick={() => handleSort('default')}
          >
            {t.default}
          </button>
          <button
            className={`sort-btn ${sortBy === 'price-asc' || sortBy === 'price-desc' ? 'active' : ''}`}
            onClick={handlePriceSort}
          >
            {sortBy === 'price-desc' ? t.priceDesc : t.priceAsc}
          </button>
          <button
            className={`sort-btn ${sortBy === 'rating-asc' || sortBy === 'rating-desc' ? 'active' : ''}`}
            onClick={() => handleMetricSort('rating')}
          >
            {sortBy === 'rating-asc' ? t.ratingAsc : t.ratingDesc}
          </button>
          <button
            className={`sort-btn ${sortBy === 'sales-asc' || sortBy === 'sales-desc' ? 'active' : ''}`}
            onClick={() => handleMetricSort('sales')}
          >
            {sortBy === 'sales-asc' ? t.salesAsc : t.salesDesc}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="products-section">
        {filteredProducts.length === 0 ? (
          <div className="empty-state" role={activeData.error ? 'alert' : undefined}>
            <div className="empty-title">
              {activeData.error ? t.datasetLoadError : products.length === 0 ? t.datasetEmpty : t.noResults}
            </div>
            <div className="empty-desc">{products.length > 0 ? t.tryAgain : ''}</div>
            {activeData.error && <button className="load-more retry-button" onClick={loadProducts}>{t.retry}</button>}
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.slice(0, visibleProducts).map((product, idx) => (
              <ProductCard
                key={`${activeDataset}-${product.row}`}
                product={product}
                onClick={() => handleProductClick(product)}
                index={idx}
                t={t}
              />
            ))}
          </div>
        )}
        {visibleProducts < filteredProducts.length && (
          <button className="load-more" onClick={() => setVisibleProducts(count => count + 48)}>{t.loadMore}</button>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        {DATASETS.map((dataset, index) => {
          const active = activeDataset === dataset.key;
          const Icon = index === 0 ? IconPlus : index === 1 ? IconFlame : IconGrid;
          return (
            <button
              type="button"
              className={`nav-item ${active ? 'active' : ''}`}
              onClick={() => handleDatasetChange(dataset.key)}
              key={dataset.key}
            >
              <Icon active={active} />
              <span className="nav-label">{t[dataset.labelKey]}</span>
            </button>
          );
        })}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={handleCloseModal}
          t={t}
        />
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
