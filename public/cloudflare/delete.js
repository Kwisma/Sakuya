import fetch from 'node-fetch';

// 替换以下常量为你的实际值
const CLOUDFLARE_API_TOKEN = '令牌'; // 你的 Cloudflare API 令牌
const ZONE_ID = '区域ID'; // 你的 Cloudflare 区域 ID

// 要删除的记录类型和子域名（完整）
const RECORD_TYPE = 'A'; // 比如 'A', 'CNAME', 'TXT'
const TARGET_NAME = 'sub.mot.ip-ddns.com'; // 要删除的完整子域名

// Cloudflare API 基础地址
const CLOUDFLARE_API_BASE = `https://api.cloudflare.com/client/v4`;

async function listDnsRecords(zoneId, type, name) {
  const url = `${CLOUDFLARE_API_BASE}/zones/${zoneId}/dns_records?type=${type}&name=${name}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();
  if (!data.success) {
    throw new Error(`Failed to list DNS records: ${JSON.stringify(data.errors)}`);
  }

  return data.result;
}

async function deleteDnsRecord(zoneId, recordId) {
  const url = `${CLOUDFLARE_API_BASE}/zones/${zoneId}/dns_records/${recordId}`;
  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();
  if (!data.success) {
    throw new Error(`Failed to delete DNS record: ${JSON.stringify(data.errors)}`);
  }

  return data;
}

async function main() {
  try {
    console.log(`查找 ${RECORD_TYPE} 类型的记录，名称为 ${TARGET_NAME}...`);
    const records = await listDnsRecords(ZONE_ID, RECORD_TYPE, TARGET_NAME);

    if (records.length === 0) {
      console.log('没有找到符合条件的 DNS 记录。');
      return;
    }

    console.log(`找到 ${records.length} 条记录，开始删除...`);
    for (const record of records) {
      console.log(`删除记录 ID: ${record.id}, 内容: ${record.content}`);
      await deleteDnsRecord(ZONE_ID, record.id);
    }

    console.log('删除完成 ✅');
  } catch (err) {
    console.error('出错啦 ❌', err.message);
  }
}

main();
