import { test, expect } from '@playwright/test';

test.describe('Auth', () => {
  test('allow me to login', async ({ page }) => {
    const EMAIL = 'fake_user@adgent.com';
    const PASSWORD = 'Pa55word!';

    await page.goto('http://localhost:8082/auth/supabase/sign-in/');
  
    // Expect a title "to contain" a substring.
    const title = await page.title();
    expect(title).toContain('Adgent advertiser dashboard');

    await page.locator('input[name="email"]').fill(EMAIL);
    await page.locator('input[name="password"]').fill(PASSWORD);

    await page.locator('button:has-text("Sign in")').click();
    await page.waitForURL('http://localhost:8082/dashboard/');

    const dashboardTitle = await page.title();
    expect(dashboardTitle).toContain('Dashboard');
  });
});