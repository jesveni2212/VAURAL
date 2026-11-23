import { expect, test, type Page } from "@playwright/test";

// Exercise the full motion experience regardless of the machine's accessibility setting.
test.use({ reducedMotion: "no-preference" });

const plans = (page: Page) => page.locator("#planes");
const rootAccent = (page: Page) =>
  page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--accent").trim());

test("combina planes y prepara una consulta de WhatsApp", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.getByRole("navigation", { name: "Principal" }).getByRole("link", { name: "Planes" })).toHaveAttribute("href", "#planes");
  await expect(plans(page).locator("li")).toHaveCount(4);

  const floatingWhatsApp = page.getByRole("link", { name: /abrir whatsapp/i });
  const floatingHref = await floatingWhatsApp.getAttribute("href");
  expect(floatingHref).toContain("wa.me/595992396700");

  await page.getByRole("button", { name: "Elegir este plan (Páginas web)" }).click();
  await expect(page.getByRole("button", { name: "Elegido, tocá para quitar (Páginas web)", exact: true })).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Elegir este plan (Marketing digital)" }).click();
  await expect(page.getByText("Elegiste 2 servicios.")).toBeVisible();

  await page.locator("#contacto").scrollIntoViewIfNeeded();
  await page.getByLabel("Nombre").fill("Ana");
  await page.getByLabel("Objetivo del proyecto").fill("Quiero mejorar la presencia digital de mi negocio.");

  const popupPromise = page.waitForEvent("popup");
  await page.getByRole("button", { name: /continuar por whatsapp/i }).click();
  const popup = await popupPromise;

  await expect(popup).toHaveURL(/(?:wa\.me\/595992396700|api\.whatsapp\.com\/send\/\?phone=595992396700)/);
  const decodedMessage = decodeURIComponent(popup.url().replace(/\+/g, " "));
  expect(decodedMessage).toContain("Páginas web");
  expect(decodedMessage).toContain("Marketing digital");
  expect(decodedMessage).toContain("Quiero mejorar la presencia digital de mi negocio.");
});

test("el recorrido avanza solo y tiñe la página con el color del pilar", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".swiper-slide-active")).toBeVisible();
  await expect.poll(() => rootAccent(page)).toBe("rgb(77, 107, 255)");

  await expect(page.getByText("02 / 04")).toBeVisible({ timeout: 6000 });
  await expect.poll(() => rootAccent(page), { timeout: 3000 }).toBe("rgb(200, 245, 66)");
});

test("señalar un plan rellena la fila y cambia el color de toda la página", async ({ page }) => {
  await page.goto("/");
  const row = plans(page).locator("li").filter({ hasText: "Contenido para redes" });

  await row.hover();

  await expect(row).toHaveAttribute("data-active", "true");
  await expect.poll(() => rootAccent(page), { timeout: 3000 }).toBe("rgb(255, 95, 162)");
});

test("el detalle de un plan se abre y se cierra con Escape devolviendo el foco", async ({ page }) => {
  await page.goto("/");
  const title = plans(page).getByRole("link", { name: "Páginas web" });

  await title.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText("Incluye")).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(title).toBeFocused();
});

test("el detalle de un plan también se cierra con un clic fuera de él", async ({ page }) => {
  await page.goto("/");
  await plans(page).getByRole("link", { name: "Páginas web" }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();

  await page.mouse.click(5, 5);

  await expect(dialog).toBeHidden();
});

test("el menú lleva a Planes con la sección alineada arriba", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("navigation", { name: "Principal" }).getByRole("link", { name: "Planes" }).click();

  await expect.poll(async () => Math.round(await plans(page).evaluate((el) => el.getBoundingClientRect().top))).toBe(0);
});

test("el primer pantallazo muestra la cinta de pilares completa", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const band = page.locator("#recorrido + div");

  await expect.poll(() => band.evaluate((el) => Math.round(el.getBoundingClientRect().bottom - innerHeight))).toBeLessThanOrEqual(0);
});

test("elegir un plan desde el detalle cierra el panel y lleva al resumen de la consulta", async ({ page }) => {
  await page.goto("/");
  await plans(page).getByRole("link", { name: "Páginas web" }).click();
  await page.getByRole("dialog").getByRole("button", { name: "Elegir este plan" }).click();

  await expect(page.getByRole("dialog")).toBeHidden();
  const next = page.getByRole("link", { name: "Continuar con mi consulta" });
  await expect(next).toBeInViewport();
});

test("invierte los colores y lo recuerda al volver", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Invertir colores" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

test("en móvil no hay desborde y el menú abre", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(0);

  await page.getByRole("button", { name: /menú/i }).click();
  await expect(page.getByRole("navigation", { name: "Menú móvil" })).toBeVisible();
});

test("las URLs anteriores redirigen al pilar nuevo", async ({ page }) => {
  await page.goto("/servicios/web-informativa");

  await expect(page).toHaveURL(/\/servicios\/paginas-web$/);
  await expect(page.locator("h1")).toHaveText("Páginas web");
});

test.describe("con movimiento reducido", () => {
  test.use({ reducedMotion: "reduce" });

  test("el titular aparece sin retardos escalonados", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#hero-title")).toBeVisible();
    const delays = () =>
      page.locator("#hero-title [data-word]").evaluateAll((words) => [...new Set(words.map((word) => getComputedStyle(word).animationDelay))]);

    // Polled: under a parallel run the first read can land before styles apply.
    await expect.poll(delays).toEqual(["0s"]);
  });
});
