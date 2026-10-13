const API_URL = "/proveedores/";

const form = document.querySelector("#proveedor-form");
const formMessage = document.querySelector("#form-message");
const tableMessage = document.querySelector("#table-message");
const tableBody = document.querySelector("#proveedores-body");
const refreshButton = document.querySelector("#refresh-button");

function setMessage(element, text, type = "") {
  element.textContent = text;
  element.className = `message${type ? ` message--${type}` : ""}`;
}

function getPayload() {
  const data = new FormData(form);
  return {
    codigo: data.get("codigo").trim(),
    razon_social: data.get("razon_social").trim(),
    cuit: data.get("cuit").trim(),
    email: data.get("email").trim(),
    telefono: data.get("telefono").trim(),
    activo: form.elements.activo.checked,
  };
}

function validate(payload) {
  const errors = [];
  if (!payload.codigo) errors.push("El código es obligatorio.");
  if (payload.razon_social.length < 3) errors.push("La razón social debe tener al menos 3 caracteres.");
  if (payload.cuit.length < 11 || payload.cuit.length > 15) errors.push("El CUIT debe tener entre 11 y 15 caracteres.");
  if (payload.email && !form.elements.email.validity.valid) errors.push("Ingresá un correo electrónico válido.");
  return errors;
}

function createCell(text) {
  const cell = document.createElement("td");
  cell.textContent = text || "No informado";
  return cell;
}

function renderProviders(providers) {
  tableBody.replaceChildren();
  if (providers.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 6;
    cell.textContent = "No hay proveedores registrados todavía.";
    row.append(cell);
    tableBody.append(row);
    return;
  }

  providers.forEach((provider) => {
    const row = document.createElement("tr");
    row.append(
      createCell(provider.codigo),
      createCell(provider.razon_social),
      createCell(provider.cuit),
      createCell(provider.email),
      createCell(provider.telefono),
    );
    const status = document.createElement("td");
    const badge = document.createElement("span");
    badge.className = `status-badge status-badge--${provider.activo ? "active" : "inactive"}`;
    badge.textContent = provider.activo ? "Activo" : "Inactivo";
    status.append(badge);
    row.append(status);
    tableBody.append(row);
  });
}

function readApiError(body) {
  if (typeof body.detail === "string") return body.detail;
  if (Array.isArray(body.detail)) return body.detail.map((error) => error.msg).join(" ");
  return "No fue posible guardar el proveedor. Revisá los datos e intentá nuevamente.";
}

async function loadProviders() {
  refreshButton.disabled = true;
  setMessage(tableMessage, "Actualizando listado…");
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("No se pudo obtener el listado.");
    const providers = await response.json();
    renderProviders(providers);
    setMessage(tableMessage, `${providers.length} proveedor(es) cargado(s).`, "success");
  } catch (error) {
    renderProviders([]);
    setMessage(tableMessage, "No se pudo conectar con la API. Verificá que el servidor esté iniciado.", "error");
  } finally {
    refreshButton.disabled = false;
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const payload = getPayload();
  const errors = validate(payload);
  if (errors.length) {
    setMessage(formMessage, errors.join(" "), "error");
    formMessage.focus();
    return;
  }

  const submitButton = form.querySelector("button[type='submit']");
  submitButton.disabled = true;
  setMessage(formMessage, "Guardando proveedor…");
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const body = await response.json();
    if (!response.ok) throw new Error(readApiError(body));
    form.reset();
    form.elements.activo.checked = true;
    setMessage(formMessage, `Proveedor ${body.codigo} registrado correctamente.`, "success");
    await loadProviders();
  } catch (error) {
    setMessage(formMessage, error.message, "error");
    formMessage.focus();
  } finally {
    submitButton.disabled = false;
  }
});

refreshButton.addEventListener("click", loadProviders);
loadProviders();
