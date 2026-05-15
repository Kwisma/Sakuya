import { defineConfig } from 'unocss'
const safelist = [
    "i-ri-home-line",
    "i-ri-qq-line",
    "i-ri-wechat-pay-line",
    "i-ri-alipay-line",
    "i-marketeq-1st-place",
    "i-marketeq-bag-alt",
    "i-marketeq-cube",
    "i-marketeq-gallery",
    "i-marketeq-marshmallow",
];
const colors = ["purple", "green", "blue", "dark"];
colors.forEach((c) => {
    safelist.push(
        ...[
            `border-${c}-300`,
            `text-${c}-600`,
            `hover:bg-${c}-600`,
            `dark:text-${c}-300`,
            `focus:ring-${c}-300`,
        ],
    );
});
export default defineConfig({
  shortcuts: [
    [
      'custom-uno-btn',
      'px-4 py-1 rounded inline-block bg-teal-700 text-white cursor-pointer !outline-none hover:bg-teal-800 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'
    ],
  ],
  safelist: safelist,
})