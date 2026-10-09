const PRODUCT_FIELD_ALIASES = {
  row: ['row', '产品ID', '商品ID', '商品 ID'],
  product_name: ['product_name', '产品介绍', '商品名称'],
  price: ['price', '价格', '售价'],
  shop: ['shop', '商家', '店铺名称'],
  sheet_name: ['sheet_name', '商家', '店铺名称'],
  link: ['link', '商品链接'],
  agency_link: ['agency_link', '机构链接'],
  image_url: ['image_url', '图片链接'],
  image_token: ['image_token', '图片'],
  commission: ['commission', '创作者佣金率'],
  category_level_1: ['category_level_1', '一级类目', '类目'],
  category_level_2: ['category_level_2', '二级类目'],
  category_level_3: ['category_level_3', '三级类目'],
  rating: ['rating', '评分'],
  sales: ['sales', '销量'],
  merchant_reviewed: ['merchant_reviewed', '商家是否审核'],
  colors: ['colors', '颜色'],
  sizes: ['sizes', '尺码']
};

function parseProductsCsv(text, options = {}) {
  const records = [];
  let record = [];
  let field = '';
  let quoted = false;
  let afterQuote = false;
  const input = text.replace(/^\uFEFF/, '');

  for (let index = 0; index < input.length; index++) {
    const char = input[index];
    if (quoted) {
      if (char === '"' && input[index + 1] === '"') {
        field += '"';
        index++;
      } else if (char === '"') {
        quoted = false;
        afterQuote = true;
      } else {
        field += char;
      }
    } else if (char === ',') {
      record.push(field);
      field = '';
      afterQuote = false;
    } else if (char === '\r' || char === '\n') {
      if (char === '\r' && input[index + 1] === '\n') index++;
      record.push(field);
      if (record.some(value => value.trim() !== '')) records.push(record);
      record = [];
      field = '';
      afterQuote = false;
    } else if (char === '"' && field === '' && !afterQuote) {
      quoted = true;
    } else if (afterQuote || char === '"') {
      throw new Error('CSV quote format is invalid');
    } else {
      field += char;
    }
  }

  if (quoted) throw new Error('CSV contains an unclosed quote');
  if (record.length || field !== '' || afterQuote) {
    record.push(field);
    if (record.some(value => value.trim() !== '')) records.push(record);
  }

  const [headerRow, ...rows] = records;
  if (!headerRow) return [];

  const headers = headerRow.map(header => header.trim());
  const namedHeaders = headers.filter(Boolean);
  if (new Set(namedHeaders).size !== namedHeaders.length) {
    throw new Error('CSV contains duplicate column names');
  }

  const getValue = (raw, aliases) => {
    const name = aliases.find(alias => Object.hasOwn(raw, alias));
    return name ? String(raw[name] ?? '').trim() : '';
  };

  return rows.map((values, index) => {
    const raw = {};
    headers.forEach((name, column) => {
      if (name) raw[name] = values[column] ?? '';
    });

    const product = Object.fromEntries(
      Object.entries(PRODUCT_FIELD_ALIASES).map(([fieldName, aliases]) => [fieldName, getValue(raw, aliases)])
    );
    product.source = options.source || '';
    product.row = product.row || `${product.source || 'product'}-${index + 1}`;
    return product;
  }).filter(product => product.product_name || product.image_url || product.shop || product.price);
}
