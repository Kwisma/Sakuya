const fs = require("fs");

const inputFile = "repos.txt"; // 你的输入文件
const outputFile = "generated-workflow.yml"; // 输出文件

const lines = fs
  .readFileSync(inputFile, "utf-8")
  .split("\n")
  .map((line) => line.trim())
  .filter((line) => line && line.includes("@"));

const repos = lines.map((line) => {
  const [full, ref] = line.split("@");
  const [owner, repo] = full.split("/");
  return { owner, repo, ref };
});

const indent = (level) => "  ".repeat(level);
const output = [];

output.push("jobs:");
output.push(`${indent(1)}build:`);
output.push(`${indent(2)}runs-on: \${{ matrix.os }}`);
output.push(`${indent(2)}strategy:`);
output.push(`${indent(3)}matrix:`);
output.push(`${indent(4)}node-version: [lts/*]`);
output.push(`${indent(4)}os: [ubuntu-latest]`);
output.push(`${indent(3)}fail-fast: false`);
output.push("");
output.push(`${indent(2)}steps:`);
output.push(`${indent(3)}- uses: actions/checkout@v3`);

repos.forEach(({ owner, repo, ref }) => {
  const pathName = `${repo}@${ref}`;
  const targetPath = `public/gh/${owner}/${pathName}`;
  output.push("");
  output.push(`${indent(3)}- name: Checkout ${owner}/${repo}`);
  output.push(`${indent(4)}uses: actions/checkout@v3`);
  output.push(`${indent(4)}with:`);
  output.push(`${indent(5)}repository: ${owner}/${repo}`);
  output.push(`${indent(5)}ref: ${ref}`);
  output.push(`${indent(5)}token: \${{ secrets.GITHUB_TOKEN }}`);
  output.push(`${indent(5)}path: ${pathName}`);
  output.push("");
  output.push(`${indent(3)}- name: Copy ${owner}/${repo} to public`);
  output.push(`${indent(4)}run: |`);
  output.push(`${indent(5)}mkdir -p ${targetPath}`);
  output.push(`${indent(5)}cp -r ${pathName}/* ${targetPath}`);
});

fs.writeFileSync(outputFile, output.join("\n"));
console.log(`✅ 已生成：${outputFile}`);
