import fs from 'fs';
import path from 'path';

// Authoritative lesson order lists for each level
export const lessonOrder: Record<string, string[]> = {
  beginner: [
    'what-is-pega-bpm',
    'prpc-overview',
    'installation-setup',
    'app-vs-dev-studio',
    'case-types-stages',
    'data-modeling',
    'ui-design-fundamentals',
    'first-case-app',
    'basic-validations',
    'simple-reporting',
    'testing-your-app',
    'deployment-basics'
  ],
  intermediate: [
    'rules-resolution',
    'declarative-rules',
    'data-pages-sources',
    'integration-basics',
    'advanced-data-modeling',
    'flow-rules-actions',
    'user-interface-advanced-concepts',
    'security-access-control',
    'case-management-advanced',
    'performance-optimization',
    'reporting-analytics',
    'decisioning-next-best-action',
    'testing-debugging',
    'background-processing',
    'mobile-offline-apps',
    'devops-deployment-pipelines',
    'localization-globalization',
    'governance-center-excellence'
  ],
  advanced: [
    'enterprise-architecture-patterns',
    'advanced-performance-tuning',
    'database-trace-analysis',
    'circumstancing-specialization',
    'product-rules-deployment',
    'deployment-manager',
    'pega-devops-cicd',
    'pal-performance-alerts',
    'production-support-strategies',
    'advanced-integration-patterns',
    'microservices-pega',
    'advanced-security-patterns',
    'pega-platform-apis',
    'advanced-testing-strategies',
    'cloud-native-pega',
    'pega-constellation-ui'
  ]
};

export function getExistingLessons(level: string): string[] {
  const baseDir = path.join(process.cwd(), 'data', 'tutorials', level);
  if (!fs.existsSync(baseDir)) return [];
  return lessonOrder[level]?.filter(slug => fs.existsSync(path.join(baseDir, `${slug}.json`))) || [];
}

export function buildStaticPaths() {
  const levels = Object.keys(lessonOrder);
  const paths: { params: { slug: string[] } }[] = [];
  levels.forEach(level => {
    const lessons = getExistingLessons(level);
    lessons.forEach(slug => {
      paths.push({ params: { slug: [level, slug] } });
    });
  });
  return paths;
}

export function getNextLesson(level: string, lesson: string) {
  const order = lessonOrder[level] || [];
  const idx = order.indexOf(lesson);
  if (idx === -1 || idx === order.length - 1) return null;
  const nextSlug = order[idx + 1];
  return { title: formatTitle(nextSlug), slug: `/tutorials/${level}/${nextSlug}` };
}

export function getPrevLesson(level: string, lesson: string) {
  const order = lessonOrder[level] || [];
  const idx = order.indexOf(lesson);
  if (idx <= 0) return null;
  const prevSlug = order[idx - 1];
  return { title: formatTitle(prevSlug), slug: `/tutorials/${level}/${prevSlug}` };
}

export function formatTitle(slug: string) {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
