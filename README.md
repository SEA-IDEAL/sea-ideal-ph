# PH 菲律宾选品站点

这是一个无需构建的静态 GitHub Pages 项目，页面从 `assets/` 下的三份 CSV 读取菲律宾商品数据。

页面默认使用菲律宾语，可切换 English 或中文。商品列表支持搜索、一级/二级类目联动筛选，以及价格、评分和销量的升降序排序；底部导航分别展示新品、爆品和商品库。

商品详情提供“申请样品”和“添加链接”入口，均使用 CSV 中的机构链接。界面语言保存在浏览器的 `sea-ideal-ph-language` 中。

## 数据文件

站点读取以下数据文件：

- `assets/网站数据 - 新品.csv`
- `assets/网站数据 - 爆品.csv`
- `assets/网站数据 - 商品库.csv`

实际使用的主要表头为：

- `产品ID` → `row`
- `产品介绍` → `product_name`
- `价格` → `price`
- `商家` → `shop` 和 `sheet_name`
- `图片链接` → `image_url`
- `一级类目` / `二级类目` → `category_level_1` / `category_level_2`
- `评分` → `rating`
- `销量` → `sales`
- `商家是否审核` → `merchant_reviewed`
- `机构链接` → `agency_link`

CSV 必须保持 UTF-8 编码。解析器会忽略表尾多余空列，并对缺失的可选字段做空值降级。当前有效数据为新品 25 条、爆品 124 条、商品库 1330 条。

## 独立部署

1. 新建独立仓库，例如 `SEA-IDEAL/sea-ideal-ph`。
2. 将本目录中的 `index.html`、`app.jsx`、`csv.js`、`.nojekyll`、`assets/` 和 `README.md` 推送到新仓库的 `main` 分支。
3. 在新仓库打开 **Settings → Pages**，选择 **Deploy from a branch**，分支选 `main`，目录选 `/ (root)`。
4. 若仓库名为 `sea-ideal-ph`，默认项目站点地址是 `https://sea-ideal.github.io/sea-ideal-ph/`。只有仓库名为 `SEA-IDEAL.github.io` 时才是组织根站点，且同一组织只能有一个根站点。

本地预览必须通过 HTTP 服务访问，例如在项目根目录运行 `python -m http.server 8000`，再打开 `http://localhost:8000/`。直接双击 `index.html` 时，浏览器可能阻止读取 CSV。

CSV、图片和页面源文件在公开 GitHub Pages 仓库中均可下载，不要放入访问令牌或其他敏感数据。
