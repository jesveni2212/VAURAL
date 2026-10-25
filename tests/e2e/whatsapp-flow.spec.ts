import { expect, test } from "@playwright/test";

test("combina servicios y prepara una consulta de WhatsApp", async ({ page }) => {
  await page.goto("/");
  expect(await page.content()).toContain("VAURAL");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.getByRole("link", { name: "Planes web" })).toHaveAttribute("href", "#planes-web");
  await expect(page.getByRole("link", { name: "Proceso" })).toHaveAttribute("href", "#proceso");
  await expect(page.locator("#planes-web .service-card")).toHaveCount(5);

  const floatingWhatsApp = page.getByRole("link", { name: /abrir whatsapp/i });
  const floatingWhatsAppHref = await floatingWhatsApp.getAttribute("href");
  expect(floatingWhatsAppHref).toContain("wa.me/595992396700");
  expect(decodeURIComponent(floatingWhatsAppHref ?? "")).toContain("Hola, quiero consultar por los servicios de VAURAL");

  await page.getByRole("button", { name: "Seleccionar Web informativa" }).click();
  await expect(page.getByRole("button", { name: "Quitar Web informativa" })).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Seleccionar Catálogo digital" }).click();
  await expect(page.getByRole("button", { name: "Quitar Catálogo digital" })).toHaveAttribute("aria-pressed", "true");
  await page.locator("#contacto").scrollIntoViewIfNeeded();

  await page.getByLabel("Nombre").fill("Ana");
  await page.getByLabel("Objetivo del proyecto").fill("Quiero mejorar la presencia digital de mi negocio.");

  const popupPromise = page.waitForEvent("popup");
  await page.getByRole("button", { name: /continuar por whatsapp/i }).click();
  const popup = await popupPromise;

  await expect(popup).toHaveURL(/(?:wa\.me\/595992396700|api\.whatsapp\.com\/send\/\?phone=595992396700)/);
  const decodedMessage = decodeURIComponent(popup.url().replace(/\+/g, " "));
  expect(decodedMessage).toContain("Web informativa");
  expect(decodedMessage).toContain("Catálogo digital");
  expect(decodedMessage).toContain("Quiero mejorar la presencia digital de mi negocio.");
});

test("mantiene el catálogo legible y sin desborde en móvil", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  await expect(page.locator("#planes-web .service-card")).toHaveCount(5);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
});
