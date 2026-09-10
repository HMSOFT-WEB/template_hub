import { chromium, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
const base = process.env.HUB_TEST_URL || 'http://127.0.0.1:5190';
const output = new URL('../../audit/revision/', import.meta.url);
await mkdir(output, { recursive: true });
const file = name => new URL(name, output).pathname.replace(/^\/([A-Z]:)/, '$1');
const browser = await chromium.launch({ channel: 'msedge', headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto(base);
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator('.project-card')).toHaveCount(13);
  await expect(page.locator('.reel')).toHaveCount(1);
  await expect(page.locator('.site-header img[alt="HM SOFT"]')).toHaveCount(1);
  await page.screenshot({ path: file('hub-desktop.png') });
  await page.locator('.site-footer').scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await page.evaluate(() => scrollTo(0, 0));
  await page.screenshot({ path: file('hub-full.png'), fullPage: true });
  await page.getByRole('button', { name: '공간·숙박', exact: true }).click();
  await expect(page.locator('.project-card')).toHaveCount(3);
  await page.getByRole('searchbox').fill('호텔');
  await expect(page.locator('.project-card')).toHaveCount(1);
  await page.getByRole('searchbox').fill('no-matching-site');
  await expect(page.locator('.empty-state')).toBeVisible();
  await page.getByRole('button', { name: '전체 템플릿 보기', exact: true }).click();
  await expect(page.locator('.project-card')).toHaveCount(13);
  const preview = page.locator('.project-card .project-image').first();
  await preview.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Shift+Tab');
  expect(await page.evaluate(() => document.activeElement.closest('[role=dialog]') !== null)).toBe(true);
  await page.getByRole('dialog').getByRole('button', { name: 'ONYU 저장', exact: true }).click();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(preview).toBeFocused();
  await page.locator('.nav-saved').click();
  await expect(page.locator('.project-card')).toHaveCount(1);
  await page.reload();
  await expect(page.locator('.project-card')).toHaveCount(1);
  await expect(page.locator('.nav-saved')).toHaveAttribute('aria-pressed', 'true');
  await page.locator('.nav-saved').click();
  await expect(page.locator('.project-card')).toHaveCount(13);
  for (const width of [768, 390, 320]) {
    await page.setViewportSize({ width, height: 844 });
    await page.evaluate(() => scrollTo(0, 0));
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    if (width === 390) await page.screenshot({ path: file('hub-mobile.png') });
    await preview.click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    expect(await dialog.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
    await page.keyboard.press('Escape');
  }
  for (const link of await page.locator('a[target=_blank]').all()) {
    expect(await link.getAttribute('rel')).toContain('noopener');
  }
  expect(await page.locator('a[href^="mailto:"]').evaluateAll(links => links.every(a => a.href === 'mailto:ceo@hmsoft.it.kr'))).toBe(true);
  await page.evaluate(() => localStorage.setItem('hmsoft-hub:saved:v1', '{broken-json'));
  await page.reload();
  await expect(page.locator('.project-card')).toHaveCount(13);
  expect(errors).toEqual([]);
  console.log('PASS: layout 320–1440px, filters, Korean search, empty state, URL state, saved persistence, corrupted storage, dialog keyboard/focus, email, external links, no page errors.');
} finally { await browser.close(); }
