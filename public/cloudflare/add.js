import fs from 'fs/promises';
import fetch from 'node-fetch';

// 配置区：根据你的需求修改
const CLOUDFLARE_API_TOKEN = '令牌'; // 你的 Cloudflare API 令牌
const ZONE_ID = '区域ID'; // 你的 Cloudflare 区域 ID
const RECORD_TYPE = 'A'; // 或 AAAA
const DOMAIN = 'sub.mot.ip-ddns.com'; // 要添加的完整子域名
const FILE_PATH = './dns.txt'; // 数据文件路径，格式为 IP 地址列表，每行一个 IP，支持注释（#开头）和端口（:后面）
// 例如：ip1:port1#注释

// Cloudflare API base
const CF_API_BASE = 'https://api.cloudflare.com/client/v4';

// 读取并处理 IP 地址
async function readIPsFromFile(path) {
  const data = await fs.readFile(path, 'utf-8');
  const lines = data.split('\n').map(line => line.trim()).filter(Boolean);

  const ips = lines.map(line => {
    const [ipPort] = line.split('#');
    const [ip] = ipPort.split(':');
    return ip;
  });

  return [...new Set(ips)]; // 去重
}

// 添加 DNS 记录
async function addDNSRecord(ip) {
  const response = await fetch(`${CF_API_BASE}/zones/${ZONE_ID}/dns_records`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      type: RECORD_TYPE,
      name: DOMAIN,
      content: ip,
      ttl: 1, // 自动 TTL
      proxied: false // 如果你想用 CF 的代理，改成 true
    })
  });

  const result = await response.json();
  if (result.success) {
    console.log(`✅ 添加成功: ${ip}`);
  } else {
    console.error(`❌ 添加失败: ${ip}`, result.errors);
  }
}

// 主函数
async function main() {
  try {
    const ips = await readIPsFromFile(FILE_PATH);
    console.log(`共读取 ${ips.length} 个 IP，将添加到 ${DOMAIN}`);

    for (const ip of ips) {
      await addDNSRecord(ip);
    }

    console.log('🎉 所有记录处理完毕。');
  } catch (err) {
    console.error('🚨 发生错误:', err);
  }
}

main();
