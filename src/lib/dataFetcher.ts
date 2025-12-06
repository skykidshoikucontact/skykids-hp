import type { NewsItem, StaffMember, Settings } from '@/types';

const USE_GITHUB_RAW = process.env.USE_GITHUB_RAW === 'true';
const GITHUB_OWNER = process.env.GITHUB_OWNER;
const GITHUB_REPO = process.env.GITHUB_REPO;
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';

async function fetchFromGitHub<T>(path: string): Promise<T> {
  const url = `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${GITHUB_BRANCH}/${path}`;
  const response = await fetch(url, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch from GitHub: ${response.status}`);
  }

  return response.json();
}

async function fetchFromLocal<T>(path: string): Promise<T> {
  const data = await import(`@/data/${path}`);
  return data.default as T;
}

export async function getNews(): Promise<NewsItem[]> {
  if (USE_GITHUB_RAW) {
    return fetchFromGitHub<NewsItem[]>('src/data/news.json');
  }
  return fetchFromLocal<NewsItem[]>('news.json');
}

export async function getStaff(): Promise<StaffMember[]> {
  if (USE_GITHUB_RAW) {
    return fetchFromGitHub<StaffMember[]>('src/data/staff.json');
  }
  return fetchFromLocal<StaffMember[]>('staff.json');
}

export async function getSettings(): Promise<Settings> {
  if (USE_GITHUB_RAW) {
    return fetchFromGitHub<Settings>('src/data/settings.json');
  }
  return fetchFromLocal<Settings>('settings.json');
}
