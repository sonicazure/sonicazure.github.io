#!/usr/bin/env node

/**
 * 豆瓣书籍信息批量获取工具
 * 
 * 使用方法:
 * 1. 确保已安装 Node.js
 * 2. 在 package.json 的同级目录下运行:
 *    node scripts/fetch-douban.js <豆瓣URL/ISBN列表>
 * 
 * 示例:
 *    node scripts/fetch-douban.js https://book.douban.com/subject/35222540/ https://book.douban.com/subject/35778213/
 * 
 * 或从文件读取:
 *    node scripts/fetch-douban.js --file urls.txt
 * 
 * 输出格式: JSON，可直接复制到数据文件中
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

/**
 * 从豆瓣网页抓取书籍信息
 * 注：豆瓣API现在需要API Key，这里通过解析网页HTML获取
 */
function fetchBookInfo(doubanUrl) {
  return new Promise((resolve, reject) => {
    const url = new URL(doubanUrl);
    const options = {
      hostname: url.hostname,
      path: url.pathname,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
      },
      timeout: 10000,
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const info = parseBookHtml(data, doubanUrl);
          resolve(info);
        } catch (err) {
          reject(new Error(`解析失败: ${err.message}`));
        }
      });
    });

    req.on('error', (err) => reject(err));
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('请求超时'));
    });
    req.end();
  });
}

/**
 * 解析豆瓣书籍页面HTML
 */
function parseBookHtml(html, url) {
  // 提取标题（主标题，去掉副标题）
  const titleMatch = html.match(/<span property="v:itemreviewed">([^<]+)<\/span>/);
  let title = titleMatch ? titleMatch[1].trim() : '';
  
  // 去掉副标题（冒号、破折号、空格后的内容）
  const subtitleDelimiters = [':', '：', '——', '—', ' - '];
  for (const delim of subtitleDelimiters) {
    const idx = title.indexOf(delim);
    if (idx > 0) {
      title = title.substring(0, idx).trim();
      break;
    }
  }

  // 提取作者
  const authorMatch = html.match(/作者[：:]\s*<a[^>]*>([^<]+)<\/a>/);
  let author = authorMatch ? authorMatch[1].trim() : '';
  if (!author) {
    const authorMatch2 = html.match(/作者[：:]\s*([^<\n]+)/);
    author = authorMatch2 ? authorMatch2[1].trim() : '未知作者';
  }

  // 提取出版社
  const publisherMatch = html.match(/出版社[：:]\s*([^<\n]+)/);
  const publisher = publisherMatch ? publisherMatch[1].trim() : '';

  // 提取出版年份
  const yearMatch = html.match(/出版年[：:]\s*(\d{4})/);
  const year = yearMatch ? parseInt(yearMatch[1]) : new Date().getFullYear();

  // 提取ISBN
  const isbnMatch = html.match(/ISBN[：:]\s*(\d+)/);
  const isbn = isbnMatch ? isbnMatch[1] : '';

  // 提取豆瓣ID
  const idMatch = url.match(/subject\/(\d+)/);
  const doubanId = idMatch ? idMatch[1] : '';

  // 提取封面图
  const coverMatch = html.match(/<img src="(https:\/\/img\d+\.doubanio\.com\/view\/subject\/l\/public\/s\d+\.jpg)"/);
  let cover = '';
  if (coverMatch) {
    cover = coverMatch[1];
  } else if (doubanId) {
    cover = `https://img9.doubanio.com/view/subject/l/public/s${doubanId}.jpg`;
  }

  return {
    title,
    author,
    publisher,
    year,
    isbn,
    doubanId,
    doubanUrl: url,
    cover,
  };
}

/**
 * 生成书籍数据条目
 */
function generateBookEntry(info) {
  const id = `book_${info.doubanId}`;
  return {
    id,
    title: info.title,
    author: info.author,
    publisher: info.publisher,
    year: info.year,
    cover: info.cover || '/images/book-placeholder.jpg',
    doubanUrl: info.doubanUrl,
    isbn: info.isbn,
    rating: undefined,
    tags: [],
    notes: '',
    addedDate: new Date().toISOString().split('T')[0],
  };
}

/**
 * 主函数
 */
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    console.log(`
豆瓣书籍信息批量获取工具

用法:
  node scripts/fetch-douban.js <豆瓣URL1> [豆瓣URL2] [...]
  node scripts/fetch-douban.js --file <URL列表文件>

示例:
  node scripts/fetch-douban.js https://book.douban.com/subject/35222540/
  node scripts/fetch-douban.js --file my-books.txt

输出:
  在控制台打印 JSON 格式的书籍数据，可直接复制到 src/data/books.ts
`);
    process.exit(0);
  }

  let urls = [];

  if (args[0] === '--file') {
    const filePath = args[1];
    if (!filePath) {
      console.error('请提供文件路径');
      process.exit(1);
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    urls = content.split('\n').map(l => l.trim()).filter(l => l && l.startsWith('http'));
  } else {
    urls = args.filter(a => a.startsWith('http'));
  }

  if (urls.length === 0) {
    console.error('未提供有效的豆瓣URL');
    process.exit(1);
  }

  console.log(`准备获取 ${urls.length} 本书的信息...\n`);

  const results = [];
  const errors = [];

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    console.log(`[${i + 1}/${urls.length}] 获取: ${url}`);
    try {
      const info = await fetchBookInfo(url);
      const entry = generateBookEntry(info);
      results.push(entry);
      console.log(`  ✓ ${entry.title} — ${entry.author}`);
    } catch (err) {
      console.error(`  ✗ 失败: ${err.message}`);
      errors.push({ url, error: err.message });
    }
    //  polite delay
    if (i < urls.length - 1) {
      await new Promise(r => setTimeout(r, 1500));
    }
  }

  console.log(`\n========== 结果 ==========`);
  console.log(`成功: ${results.length} 本`);
  if (errors.length > 0) {
    console.log(`失败: ${errors.length} 本`);
    errors.forEach(e => console.log(`  - ${e.url}: ${e.error}`));
  }

  if (results.length > 0) {
    console.log(`\n========== 书籍数据 (JSON) ==========\n`);
    console.log(JSON.stringify(results, null, 2));

    // Save to file
    const outputFile = path.join(process.cwd(), 'douban-books-output.json');
    fs.writeFileSync(outputFile, JSON.stringify(results, null, 2), 'utf-8');
    console.log(`\n已保存到: ${outputFile}`);
    console.log(`\n使用说明:`);
    console.log(`1. 打开 douban-books-output.json`);
    console.log(`2. 复制 JSON 内容`);
    console.log(`3. 粘贴到 src/data/books.ts 的 books 数组中`);
    console.log(`4. 补充 tags 和 notes 字段`);
  }
}

main().catch(console.error);
