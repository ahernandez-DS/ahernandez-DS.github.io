// ============================================================
// C-MOVIL · Etapa de Decisiones · Firmas de Autorización
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------
     1. Catálogo de comité
     "Jose Luis Solorzano" se agrega 5 veces como titular,
     y los suplentes reales completan la lista desplegable.
  --------------------------------------------------------- */
  // Cada cargo tiene su propio titular; son personas distintas.
  const TITULAR_PRESIDENTE = 'ING. JUAN MORENO DE LA HIGUERA';
  const TITULAR_SECRETARIA = 'LIC. MELISA CRUZ CRUZ';

  const SUPLENTES_PRESIDENTE = [
    'LIC. ELDA AZUCENA LOPEZ MATIAS',
    'LIC. ARNOLDO MONZON ALTUZAR',
    'LIC. JAIR ALEXANDER JIMENEZ LOPEZ',
    'LIC. LUIS ALBERTO ESTRADA CAMACHO'
  ];

  const SUPLENTES_SECRETARIA = [
    'LIC. ELDA AZUCENA LOPEZ MATIAS',
    'LIC. ARNOLDO MONZON ALTUZAR',
    'LIC. JAIR ALEXANDER JIMENEZ LOPEZ',
    'LIC. LUIS ALBERTO ESTRADA CAMACHO'
  ];

  /**
   * Llena un <select> de nombres según el tipo elegido (titular/suplente).
   * Titular -> una sola opción (propia de cada cargo).
   * Suplente -> las 5 opciones precargadas del cargo correspondiente.
   */
  function poblarNombres(selectNombre, tipo, nombreTitular, listaSuplentes) {
    selectNombre.innerHTML = '';

    if (tipo === 'titular') {
      const opt = document.createElement('option');
      opt.value = nombreTitular;
      opt.textContent = nombreTitular;
      selectNombre.appendChild(opt);
      selectNombre.disabled = false;
    } else {
      listaSuplentes.forEach((nombre, idx) => {
        const opt = document.createElement('option');
        opt.value = `${nombre}__${idx + 1}`;
        opt.textContent = `${nombre}`;
        selectNombre.appendChild(opt);
      });
      selectNombre.disabled = false;
    }
  }

  // ---- Presidente ----
  const presidenteTipo = document.getElementById('presidenteTipo');
  const presidenteNombre = document.getElementById('presidenteNombre');

  poblarNombres(presidenteNombre, presidenteTipo.value, TITULAR_PRESIDENTE, SUPLENTES_PRESIDENTE);
  presidenteTipo.addEventListener('change', () => {
    poblarNombres(presidenteNombre, presidenteTipo.value, TITULAR_PRESIDENTE, SUPLENTES_PRESIDENTE);
  });

  // ---- Secretaria ----
  const secretariaTipo = document.getElementById('secretariaTipo');
  const secretariaNombre = document.getElementById('secretariaNombre');

  poblarNombres(secretariaNombre, secretariaTipo.value, TITULAR_SECRETARIA, SUPLENTES_SECRETARIA);
  secretariaTipo.addEventListener('change', () => {
    poblarNombres(secretariaNombre, secretariaTipo.value, TITULAR_SECRETARIA, SUPLENTES_SECRETARIA);
  });

  // ---- Firmas Especial y Extraordinaria (checkboxes independientes) ----
  const chkFirmaEspecial = document.getElementById('requiereFirmaEspecial');
  const chkFirmaExtraordinaria = document.getElementById('requiereFirmaExtraordinaria');
  const wrapperFirmaEspecial = document.getElementById('wrapperFirmaEspecial');
  const wrapperFirmaExtraordinaria = document.getElementById('wrapperFirmaExtraordinaria');
  const wrapperFirmaVacio = document.getElementById('wrapperFirmaVacio');
  const firmaExtraordinaria = document.getElementById('firmaExtraordinaria');

  function actualizarVisibilidadFirmas() {
    const mostrarEspecial = chkFirmaEspecial.checked;
    const mostrarExtraordinaria = chkFirmaExtraordinaria.checked;

    wrapperFirmaEspecial.style.display = mostrarEspecial ? 'flex' : 'none';
    wrapperFirmaExtraordinaria.style.display = mostrarExtraordinaria ? 'flex' : 'none';

    // La celda vacía de alineación solo aparece si alguna firma está activa
    if (mostrarEspecial || mostrarExtraordinaria) {
      wrapperFirmaVacio.style.display = 'block';
    } else {
      wrapperFirmaVacio.style.display = 'none';
    }

    // Si se desmarca la extraordinaria, se limpia su valor
    if (!mostrarExtraordinaria) {
      firmaExtraordinaria.value = '';
    }
  }

  chkFirmaEspecial.addEventListener('change', () => {
    actualizarVisibilidadFirmas();
    marcarUltimaModificacion();
  });

  chkFirmaExtraordinaria.addEventListener('change', () => {
    actualizarVisibilidadFirmas();
    marcarUltimaModificacion();
  });

  /* ---------------------------------------------------------
     2. Fechas automáticas
     - Fecha de Aprobación: se fija al momento en que el usuario
       elige un estatus de autorización por primera vez.
     - Última Modificación: se actualiza cada vez que se cambia
       cualquier campo del dictamen.
  --------------------------------------------------------- */
  const autorizacionSelect = document.getElementById('autorizacion');
  const fechaAprobacionInput = document.getElementById('fechaAprobacion');
  const fechaResolucionInput = document.getElementById('fechaResolucion');
  const wrapperFechaAprobacion = document.getElementById('wrapperFechaAprobacion');
  const ultimaModificacionInput = document.getElementById('ultimaModificacion');

  function formatearFecha(date) {
    const opciones = {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    };
    return date.toLocaleString('es-MX', opciones);
  }

  function marcarUltimaModificacion() {
    ultimaModificacionInput.value = formatearFecha(new Date());
  }

  // Al cargar, dejamos la última modificación con la hora actual
  marcarUltimaModificacion();

  /* ---------------------------------------------------------
     2.1 Plantillas de resoluciones predefinidas (ortografía mejorada)
  --------------------------------------------------------- */
  const PLANTILLAS_RESOLUCION = {
    autorizado: [
      {
        titulo: "1. Previo a solicitud, integrar permiso a nombre del cliente",
        texto: "1.- Previo a la solicitud del contrato, se deberá integrar el permiso a nombre de la cliente."
      },
      {
        titulo: "2. Validar información y declinar por inconsistencias",
        texto: "2.- Durante el desembolso, se deberá validar la información proporcionada por el cliente y, de encontrarse alguna inconsistencia, se podrá declinar el presente crédito."
      },
      {
        titulo: "3. Puntual seguimiento al caso hasta recuperación al 100%",
        texto: "3.- Puntual seguimiento al caso por parte del ejecutivo, gerente y D.C. hasta la recuperación del crédito al 100%."
      },
      {
        titulo: "4. No liberar factura de unidad en garantía hasta liquidación",
        texto: "4.- No liberar la factura de la unidad en garantía hasta la liquidación del presente crédito al 100%."
      },
      {
        titulo: "5. Plan de pago semanal por importes vencidos en buró",
        texto: "5.- Se autoriza plan de pago semanal; esto debido a los importes vencidos que el cliente reporta en su buró de crédito."
      },
      {
        titulo: "6. Autorización por $0.00 descontando cuotas pendientes",
        texto: "6.- El presente caso se autoriza por un monto de $0.00. De este monto, se deberán descontar las cuotas pendientes por cubrir para la liquidación del crédito N.º XXXXXX y la diferencia desembolsarse a la cuenta del cliente."
      },
      {
        titulo: "7. Autorización por argumentos de Gerente (dd/mm/aa)",
        texto: "7.- Para la autorización del presente crédito, se toman en cuenta los argumentos expuestos por la gerente en su correo de fecha dd/mm/aa, asumiendo cualquier responsabilidad en caso de suscitarse problemas en la recuperación y localización del cliente."
      },
      {
        titulo: "8. Coincidencia SAFI en nombre de cliente (sin riesgo)",
        texto: "8.- Con respecto al reporte de coincidencia en SAFI emitido por el área de análisis de crédito, al revisarlo se detecta que la coincidencia radica en el nombre del cliente, mas no en su RFC y fecha de nacimiento, no detectando al momento riesgo alguno."
      },
      {
        titulo: "9. Coincidencia SAFI en nombre de cliente, obligaciones ISR/IVA",
        texto: "9.- Con respecto al reporte de coincidencia en SAFI emitido por el área de análisis de crédito, al revisarlo se detecta que la coincidencia radica en el nombre de la cliente, mas no se pudo corroborar por su RFC y CURP ya que el reporte no emite información alguna, no detectándose al momento de la revisión riesgo alguno. Su constancia de situación fiscal reporta algunas obligaciones tales como declaración anual de ISR, pago de IVA, declaración de proveedores de IVA y pago provisional mensual de ISR por actividades empresariales."
      },
      {
        titulo: "10. Pagaré de Distribuidor por $0.00 como garantía alterna",
        texto: "10.- Como mitigante de riesgo para el presente crédito, se constituirá como garantía alterna la firma de un pagaré por parte del Distribuidor XXXXXX por la cantidad de $0.00; esto previo a la formalización del contrato, puntualizándose que en caso de incumplimiento de pago del cliente, así como de problemas para la adjudicación de la unidad, Asefimex podrá ejecutar como medio de pago del presente crédito el referido pagaré suscrito por el distribuidor. Esto se realizará de manera inmediata y no implicará que se tengan que agotar los procedimientos de cobranza y adjudicación de la unidad en garantía."
      },
      {
        titulo: "11. Participación de Distribuidor y sucursal hasta recuperación",
        texto: "11.- Para el seguimiento puntual del presente crédito, se establece como condición la participación conjunta y activa del Distribuidor y la sucursal de Asefimex hasta la recuperación del crédito al 100%."
      },
      {
        titulo: "12. Integrar reporte fotográfico (actividad/domicilio)",
        texto: "12.- Previo a la solicitud del contrato, se deberá integrar el reporte fotográfico debidamente requisitado con fotos del domicilio y de la actividad económica, ya que se presenta sin fotografías."
      }
    ],
    observado: [
      {
        titulo: "1. Integrar aval del núcleo familiar (papá/mamá)",
        texto: "1.- Deberá integrarse a una persona del núcleo familiar (papá o mamá) como aval y que cumpla acorde a la política, para con ello poder emitir un dictamen (dd/mm/aa)."
      },
      {
        titulo: "2. Visita domiciliar y validación de información",
        texto: "2.- Se solicita al ejecutivo/gerente realizar la visita domiciliaria al cliente y al aval, verificar y validar la información para de ello poder emitir un dictamen."
      },
      {
        titulo: "3. Considerar plan de pago semanal",
        texto: "3.- Se podrá considerar la presente solicitud con plan de pago semanal, esto debido a los importes vencidos que el cliente reporta en su buró de crédito."
      },
      {
        titulo: "4. Integrar al cónyuge como aval",
        texto: "4.- Se solicita integrar al cónyuge como aval, y que cumpla acorde a la política."
      },
      {
        titulo: "5. Presentar evidencia documental de actividad productiva",
        texto: "5.- Se solicita presentar evidencia documental de su actividad productiva y con ello poder emitir un dictamen."
      },
      {
        titulo: "6. No acredita arraigo domiciliario",
        texto: "6.- No acredita arraigo domiciliario."
      },
      {
        titulo: "7. Integrar aval que cumpla con política de crédito",
        texto: "7.- Integrar un aval que cumpla acorde a la política (arraigo, buen historial crediticio y actividad productiva) y con ello poder emitir un dictamen."
      },
      {
        titulo: "8. Acreditar ingresos por actividad declarada",
        texto: "8.- Acreditar los ingresos por su actividad productiva declarada en el cuestionario económico y con ello poder emitir un dictamen."
      }
    ],
    rechazado: [
      {
        titulo: "1. Rechazo por mal historial crediticio en buró",
        texto: "1.- El presente caso se rechaza por el mal historial crediticio que reporta en su buró de crédito."
      },
      {
        titulo: "2. Rechazo por falta de capacidad de pago",
        texto: "2.- Se rechaza por no tener capacidad de pago."
      },
      {
        titulo: "3. Rechazo por avance de crédito vigente (política > 50%)",
        texto: "3.- Por el momento, la presente solicitud se rechaza debido a que, por el avance que el cliente lleva en su crédito vigente con Asefimex, no cumple con lo dispuesto en la política de crédito (más del 50%)."
      },
      {
        titulo: "4. Rechazo por perfil transaccional del cliente",
        texto: "4.- Por el perfil transaccional del cliente, se rechaza el presente caso."
      }
    ]
  };

  window.menuActaComite = function () {
    const firmas = document.getElementById('firmas');
    const dictamen = document.getElementById('dictamen');
    const historial = document.getElementById('historial');
    const tipoActa = document.getElementById('tipoActa');
    const generarActa = document.getElementById('generarActa');

    dictamen.hidden = true;
    historial.hidden = true;
    tipoActa.hidden = false;
    generarActa.hidden = false;

  };

  const wrapperResolucionPredefinida = document.getElementById('wrapperResolucionPredefinida');
  const resolucionPredefinidaSelect = document.getElementById('resolucionPredefinida');
  const resolucionComiteTextarea = document.getElementById('resolucionComite');
  const btnLimpiarResolucion = document.getElementById('btnLimpiarResolucion');

  if (btnLimpiarResolucion) {
    btnLimpiarResolucion.addEventListener('click', () => {
      if (resolucionComiteTextarea.value.trim() !== '') {
        if (confirm('¿Estás seguro de que quieres limpiar el texto de la resolución?')) {
          resolucionComiteTextarea.value = '';
          marcarUltimaModificacion();
        }
      }
    });
  }

  function actualizarDesplegablePredefinido() {
    const estado = autorizacionSelect.value;
    resolucionPredefinidaSelect.innerHTML = '';

    if (estado && PLANTILLAS_RESOLUCION[estado]) {
      const optDefault = document.createElement('option');
      optDefault.value = "";
      optDefault.textContent = "Ninguna (Entrada manual) / Seleccione una plantilla...";
      resolucionPredefinidaSelect.appendChild(optDefault);

      PLANTILLAS_RESOLUCION[estado].forEach((item, index) => {
        const opt = document.createElement('option');
        opt.value = index;
        opt.textContent = item.titulo;
        resolucionPredefinidaSelect.appendChild(opt);
      });

      wrapperResolucionPredefinida.style.display = 'flex';
    } else {
      wrapperResolucionPredefinida.style.display = 'none';
    }
  }

  autorizacionSelect.addEventListener('change', () => {
    const estado = autorizacionSelect.value;

    // Fecha de Aprobación: el campo siempre es visible; solo se rellena cuando el estado es 'autorizado'
    if (estado === 'autorizado') {
      if (!fechaAprobacionInput.value || fechaAprobacionInput.value === '—') {
        fechaAprobacionInput.value = formatearFecha(new Date());
      }
    } else {
      fechaAprobacionInput.value = '';
    }

    // Fecha de Resolución: se registra para cualquier resolución (autorizado, observado, rechazado)
    if (estado) {
      fechaResolucionInput.value = formatearFecha(new Date());
    } else {
      fechaResolucionInput.value = '';
    }

    actualizarDesplegablePredefinido();
    marcarUltimaModificacion();
  });

  resolucionPredefinidaSelect.addEventListener('change', () => {
    const estado = autorizacionSelect.value;
    const indexSelected = resolucionPredefinidaSelect.value;

    if (estado && indexSelected !== "" && PLANTILLAS_RESOLUCION[estado] && PLANTILLAS_RESOLUCION[estado][indexSelected]) {
      const currentText = resolucionComiteTextarea.value.trim();
      const newText = PLANTILLAS_RESOLUCION[estado][indexSelected].texto;

      if (currentText) {
        resolucionComiteTextarea.value = currentText + '\n' + newText;
      } else {
        resolucionComiteTextarea.value = newText;
      }

      resolucionPredefinidaSelect.value = ""; // Reiniciar para poder elegir nuevamente
      marcarUltimaModificacion();
    }
  });

  // Cualquier cambio en los campos del dictamen actualiza "Última Modificación"
  const camposDictamen = [
    'montoAprobado', 'plazo', 'tasa', 'nivelRiesgo', 'resolucionComite'
  ].map(id => document.getElementById(id));

  camposDictamen.forEach(campo => {
    campo.addEventListener('input', marcarUltimaModificacion);
    campo.addEventListener('change', marcarUltimaModificacion);
  });

  [presidenteTipo, presidenteNombre, secretariaTipo, secretariaNombre, firmaExtraordinaria].forEach(campo => {
    campo.addEventListener('change', marcarUltimaModificacion);
  });

  /* ---------------------------------------------------------
     3. Color dinámico del badge de Nivel de Riesgo
  --------------------------------------------------------- */
  // (El badge de score FICO ya viene fijo como "RIESGO MEDIO" desde el dictamen del buró;
  //  el selector de Nivel de Riesgo es la valoración manual del comité.)

  /* ---------------------------------------------------------
     4. Guardar resolución (feedback visual)
  --------------------------------------------------------- */
  const btnGuardar = document.getElementById('guardarResolucion');

  btnGuardar.addEventListener('click', () => {
    marcarUltimaModificacion();

    const textoOriginal = btnGuardar.textContent;
    btnGuardar.textContent = '✓ Resolución Guardada';
    btnGuardar.classList.add('saved');

    setTimeout(() => {
      btnGuardar.textContent = textoOriginal;
      btnGuardar.classList.remove('saved');
    }, 1800);
  });

  /* ---------------------------------------------------------
     5. Tabs superiores (Dictamen / Referencias / Producto / Documentos)
  --------------------------------------------------------- */
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Ocultar botón Generar Acta si salimos de la pestaña Acta de Comite
      if (tab.dataset.tab !== 'receptora') {
        const generarActaBtn = document.getElementById('generarActa');
        if (generarActaBtn) {
          generarActaBtn.hidden = true;
        }
      }
    });
  });

  /* ---------------------------------------------------------
     6. Botones de etapa (sidebar derecho)
  --------------------------------------------------------- */
  document.querySelectorAll('.stage-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.stage-btn').forEach(b => b.classList.remove('stage-active'));
      btn.classList.add('stage-active');
    });
  });

  /* ---------------------------------------------------------
     7. Botones superiores nuevos (Documentos del Cliente,
        Carátula de Comité, Comentarios) — placeholders de acción
  --------------------------------------------------------- */
  document.querySelectorAll('.pill-ghost').forEach(btn => {
    btn.addEventListener('click', () => {
      console.log(`Acción: ${btn.textContent.trim()}`);
    });
  });

  /* ---------------------------------------------------------
     8. Historial de Créditos
  --------------------------------------------------------- */
  const HC_DATOS = [
    { otorgante: 'BANCOS', tipo: 'PP', saldoActual: 0, saldoVencido: 0, pagoActual: 'V', ultimoPago: '2018-06-06', frecuencia: 'Semanal', monto: 0 },
    { otorgante: 'BANCOS', tipo: 'PP', saldoActual: 0, saldoVencido: 0, pagoActual: 'V', ultimoPago: '2018-09-28', frecuencia: 'Semanal', monto: 0 },
    { otorgante: 'ASEFIMEX', tipo: 'PP', saldoActual: 16286, saldoVencido: 0, pagoActual: 'V', ultimoPago: '2026-05-28', frecuencia: 'Pago Mínimo Revolvente', monto: 2975 }
  ];

  function formatMXN(v) {
    return '$' + v.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function renderHistorialCreditos() {
    const tbody = document.getElementById('hcTableBody');
    tbody.innerHTML = '';

    HC_DATOS.forEach(row => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${row.otorgante}</td>
        <td>${row.tipo}</td>
        <td>${formatMXN(row.saldoActual)}</td>
        <td>${formatMXN(row.saldoVencido)}</td>
        <td>${row.pagoActual}</td>
        <td>${row.ultimoPago}</td>
        <td>${row.frecuencia}</td>
        <td>${formatMXN(row.monto)}</td>
      `;
      tbody.appendChild(tr);
    });

    // Totales
    const totalSaldoActual = HC_DATOS.reduce((s, r) => s + r.saldoActual, 0);
    const totalSaldoVencido = HC_DATOS.reduce((s, r) => s + r.saldoVencido, 0);
    document.getElementById('hcTotalSaldoActual').textContent = formatMXN(totalSaldoActual);
    document.getElementById('hcTotalSaldoVencido').textContent = formatMXN(totalSaldoVencido);

    // Totales por frecuencia
    const freqMap = {};
    HC_DATOS.forEach(r => {
      freqMap[r.frecuencia] = (freqMap[r.frecuencia] || 0) + r.monto;
    });
    const freqList = document.getElementById('hcFreqList');
    freqList.innerHTML = '';
    Object.entries(freqMap).forEach(([frec, total]) => {
      const div = document.createElement('div');
      div.className = 'hc-freq-row';
      div.innerHTML = `<span>${frec}</span><span>${formatMXN(total)}</span>`;
      freqList.appendChild(div);
    });
  }

  renderHistorialCreditos();

});
