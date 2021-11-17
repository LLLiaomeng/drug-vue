import defaultSettings from '@/settings'

const title = defaultSettings.title || '基于医药知识图谱的合理用药系统V1.0'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
