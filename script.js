const WHATSAPP = "5492215453795";

const services = {
  unas: [
    {
      id: "semipermanente",
      name: "Semipermanente",
      description: "Esmaltado sobre la uña natural. Diseño opcional.",
      duration: 45
    },
    {
      id: "capping",
      name: "Capping en gel",
      description: "Refuerzo sobre el largo natural. Diseño opcional.",
      duration: 60
    },
    {
      id: "softgel",
      name: "Soft Gel",
      description: "Extensiones con tips. Diseño opcional.",
      duration: 60
    }
  ],

  pestanas: [
    {
      id: "perfilado-laminado",
      name: "Perfilado + laminado de cejas",
      description: "Servicio combinado para cejas.",
      duration: 30
    },
    {
      id: "lifting",
      name: "Lifting de pestañas",
      description: "Curvatura y definición de pestañas.",
      duration: 80
    },
    {
      id: "extension-clasicas",
      name: "Clásicas",
      description: "Extensiones de pestañas.",
      duration: 90
    },
    {
      id: "extension-rimel",
      name: "Efecto Rímel",
      description: "Extensiones de pestañas.",
      duration: 90
    },
    {
      id: "extension-brasileño-2d",
      name: "Volumen Brasileño 2D",
      description: "Extensiones de pestañas.",
      duration: 90
    },
    {
      id: "extension-tecnologicas-3d",
      name: "Tecnológicas 3D",
      description: "Extensiones de pestañas.",
      duration: 90
    },
    {
      id: "extension-tecnologicas-4d",
      name: "Tecnológicas 4D",
      description: "Extensiones de pestañas.",
      duration: 90
    },
    {
      id: "extension-5d-6d",
      name: "Volumen 5D / 6D",
      description: "Extensiones de pestañas.",
      duration: 90
    },
    {
      id: "extension-7d-8d",
      name: "Volumen 7D / 8D",
      description: "Extensiones de pestañas.",
      duration: 90
    },
    {
      id: "extension-foxy-2d",
      name: "Foxy 2D",
      description: "Extensiones de pestañas.",
      duration: 90
    },
    {
      id: "extension-foxy-3d",
      name: "Foxy 3D",
      description: "Extensiones de pestañas.",
      duration: 90
    },
    {
      id: "extension-anime",
      name: "Efecto Anime",
      description: "Extensiones de pestañas.",
      duration: 90
    },
    {
      id: "extension-whispie",
      name: "Whispie",
      description: "Extensiones de pestañas.",
      duration: 90
    }
  ],

  masajes: [
    {
      id: "masaje",
      name: "Masaje",
      description: "Duración estimada para agenda: 1 hora.",
      duration: 60
    }
  ]
};

const removalDurations = {
  semipermanente: 90,
  capping: 105,
  softgel: 120
};

const days = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes"
];

const times = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00"
];

const selected = new Map();

function formatDuration(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) {
    return `${mins} min`;
  }

  if (mins === 0) {
    return `${hours} h`;
  }

  return `${hours} h ${mins} min`;
}

function renderServices(containerId, list) {
  const container = document.getElementById(containerId);

  if (!container) return;

  list.forEach((service) => {
    const label = document.createElement("label");

    label.className = "service-card";
    label.dataset.id = service.id;

    label.innerHTML = `
      <input type="checkbox" value="${service.id}">
      <span>
        <span class="service-name">${service.name}</span>
        <span class="service-description">${service.description}</span>
        <span class="service-time">${formatDuration(service.duration)}</span>
      </span>
    `;

    const checkbox = label.querySelector("input");

    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        selected.set(service.id, service);
        label.classList.add("selected");
      } else {
        selected.delete(service.id);
        label.classList.remove("selected");
      }

      updateSummary();
    });

    container.appendChild(label);
  });
}

function populateSchedule() {
  const daySelect = document.getElementById("dia");
  const timeSelect = document.getElementById("hora");

  if (!daySelect || !timeSelect) return;

  days.forEach((day) => {
    const option = document.createElement("option");

    option.value = day;
    option.textContent = day;

    daySelect.appendChild(option);
  });

  times.forEach((time) => {
    const option = document.createElement("option");

    option.value = time;
    option.textContent = time;

    timeSelect.appendChild(option);
  });
}

function getRemoval() {
  const selectedRemoval = document.querySelector(
    'input[name="retiro"]:checked'
  );

  return selectedRemoval ? selectedRemoval.value : "no";
}

function getDuration() {
  let total = [...selected.values()].reduce(
    (sum, service) => sum + service.duration,
    0
  );

  const removal = getRemoval();

  if (removal !== "no" && removalDurations[removal]) {
    const hasNailService = [...selected.keys()].some((id) =>
      ["semipermanente", "capping", "softgel"].includes(id)
    );

    if (hasNailService) {
      total += removalDurations[removal];
    }
  }

  return total;
}

function updateSummary() {
  const summary = document.getElementById("summaryContent");
  const duration = document.getElementById("duration");

  if (!summary || !duration) return;

  const selectedServices = [...selected.values()];

  if (selectedServices.length === 0) {
    summary.innerHTML =
      '<p class="empty">Todavía no seleccionaste servicios.</p>';
  } else {
    summary.innerHTML = `
      <div class="summary-list">
        ${selectedServices
          .map(
            (service) => `
          <div class="summary-item">
            <span>${service.name}</span>
            <span>${formatDuration(service.duration)}</span>
          </div>
        `
          )
          .join("")}

        ${
          getRemoval() !== "no"
            ? `
          <div class="summary-item">
            <span>Retiro de servicio anterior</span>
            <span>+${formatDuration(
              removalDurations[getRemoval()]
            )}</span>
          </div>
        `
            : ""
        }
      </div>
    `;
  }

  duration.textContent = formatDuration(getDuration());
}

function validate() {
  let valid = true;

  const nombre = document.getElementById("nombre").value.trim();
  const dia = document.getElementById("dia").value;
  const hora = document.getElementById("hora").value;

  document.getElementById("nombreError").textContent = "";
  document.getElementById("serviciosError").textContent = "";
  document.getElementById("fechaError").textContent = "";

  if (!nombre) {
    document.getElementById("nombreError").textContent =
      "Ingresá tu nombre y apellido.";

    valid = false;
  }

  if (selected.size === 0) {
    document.getElementById("serviciosError").textContent =
      "Seleccioná al menos un servicio.";

    valid = false;
  }

  if (!dia || !hora) {
    document.getElementById("fechaError").textContent =
      "Elegí un día y un horario.";

    valid = false;
  }

  return valid;
}

function buildWhatsAppMessage() {
  const nombre = document.getElementById("nombre").value.trim();
  const dia = document.getElementById("dia").value;
  const hora = document.getElementById("hora").value;
  const detalle = document.getElementById("detalle").value.trim();
  const removal = getRemoval();

  const serviceLines = [...selected.values()]
    .map((service) => `- ${service.name}`)
    .join("\n");

  let removalText = "No necesita retiro.";

  if (removal === "semipermanente") {
    removalText = "Necesita retiro de semipermanente.";
  } else if (removal === "capping") {
    removalText = "Necesita retiro de capping en gel.";
  } else if (removal === "softgel") {
    removalText = "Necesita retiro de Soft Gel.";
  }

  const additionalInfo = detalle ? detalle : "No tengo información adicional.";

  // Generamos los emojis directamente desde sus puntos de código hexadecimales
  const emojiCorazon = String.fromCodePoint(0x1F977); // 🩷
  const emojiDestellos = String.fromCodePoint(0x2728); // ✨
  const emojiSobre = String.fromCodePoint(0x1F4E9);    // 📩

  const message = `Hola Lupé Studio! ${emojiCorazon}
Quisiera solicitar un turno ${emojiDestellos}

Nombre: ${nombre}

Día: ${dia}
Horario: ${hora}

Servicios:
${serviceLines}

${removalText}

Duración estimada: ${formatDuration(getDuration())}

Información adicional:
${additionalInfo}

¿Está disponible este turno? ${emojiSobre}.`;

  return message;
}

const whatsappButton = document.getElementById("whatsappButton");

if (whatsappButton) {
  whatsappButton.addEventListener("click", () => {
    if (!validate()) {
      return;
    }

    const rawMessage = buildWhatsAppMessage();
    const encodedMessage = encodeURIComponent(rawMessage);
    const url = `https://api.whatsapp.com/send?phone=${WHATSAPP}&text=${encodedMessage}`;

    window.open(url, "_blank");
  });
}

document
  .querySelectorAll('input[name="retiro"]')
  .forEach((input) => {
    input.addEventListener("change", updateSummary);
  });

renderServices("unasServices", services.unas);
renderServices("pestanasServices", services.pestanas);
renderServices("masajesServices", services.masajes);

populateSchedule();
updateSummary();

const whatsappButton = document.getElementById("whatsappButton");

if (whatsappButton) {
  whatsappButton.addEventListener("click", () => {
    if (!validate()) {
      return;
    }

    const message = encodeURIComponent(buildWhatsAppMessage());

    const url = `https://wa.me/${WHATSAPP}?text=${message}`;

    window.open(url, "_blank");
  });
}

document
  .querySelectorAll('input[name="retiro"]')
  .forEach((input) => {
    input.addEventListener("change", updateSummary);
  });

renderServices("unasServices", services.unas);
renderServices("pestanasServices", services.pestanas);
renderServices("masajesServices", services.masajes);

populateSchedule();
updateSummary();
