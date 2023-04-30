import { FiGithub, FiLink } from 'react-icons/fi'

const config = {
  name: 'LXH', // 姓名
  title: "LXH's blog", // 博客标题
  desc: 'home page', // 描述
  avatar: '/img.jpg', // 头像
  logo: '/logo.svg', // logo
  socials: [
    //社交媒体
    {
      label: 'Github',
      icon: <FiGithub className="text-lg" aria-hidden />,
      link: 'https://github.com/imzxj',
    },
    { label: '友链', icon: <FiLink className="text-lg" aria-hidden />, link: '/blogroll' },
  ],
  blogroll: [
    // 友情链接
    { name: '赖同学', link: 'https://www.laibh.com' },
    { name: '鯊手', link: 'https://www.cnblogs.com/Scooby' },
    { name: 'mghio', link: 'https://www.mghio.cn' },
  ],
  language: 'zh-CN', //语言 en | zh-CN
  toc: true, //缩略  table of content
  adjacentPosts: true, // prev next links
  markdown: {
    lineNumbers: false, // 是否展示markdown行数
  },
}

export default config
