// ============================================================
// C-MOVIL · Módulo Mesa de Control
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------
     1. DATOS DE PAGOS (para vista parcial en Registro de Clientes)
  --------------------------------------------------------- */
  const PAGOS_DATA = [
    { id: 1, nombre: 'Enganche', archivo: './ENGANCHE_ANA_GLORIA.pdf', estatus: 'aplicado' },
    { id: 2, nombre: 'Garantía Líquida', archivo: '', estatus: 'pendiente' },
    { id: 3, nombre: 'Comisión por Apertura', archivo: './COMISION_ANA_GLORIA.pdf', estatus: 'aplicado' },
    { id: 4, nombre: 'Co Financiamiento', archivo: '', estatus: 'pendiente' },
    { id: 5, nombre: 'Complemento de Enganche', archivo: '', estatus: 'pendiente' },
    { id: 6, nombre: 'Enganche GPS', archivo: '', estatus: 'pendiente' },
    { id: 7, nombre: 'Garantía Líquida Enganche Diferido', archivo: '', estatus: 'pendiente' }
  ];

  /* ---------------------------------------------------------
     2. RENDER: Aplicación de Pagos (Vista Parcial — solo 4 columnas)
  --------------------------------------------------------- */
  function renderPagosParcial() {
    const tbody = document.getElementById('pagosParcialTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';

    PAGOS_DATA.forEach(pago => {
      const tr = document.createElement('tr');

      const estatusMap = {
        pendiente: { label: 'Pendiente', cls: 'estatus-pill estatus-pendiente' },
        aplicado: { label: 'Aplicado', cls: 'estatus-pill estatus-aplicado' },
        cancelado: { label: 'Cancelado', cls: 'estatus-pill estatus-cancelado' },
        revision: { label: 'En Revisión', cls: 'estatus-pill estatus-revision' }
      };
      const est = estatusMap[pago.estatus] || { label: pago.estatus, cls: 'estatus-pill' };

      tr.innerHTML = `
        <td style="text-align:left;"><strong>${pago.nombre}</strong></td>
        <td style="text-align:left; color: var(--text-dim); font-size:12.5px;">
          ${pago.archivo ? pago.archivo : '<em>Sin archivo</em>'}
        </td>
        <td style="text-align:center;">
          <button class="btn-icon" title="Ver documento" onclick="alert('Ver: ${pago.nombre}')">👁️</button>
        </td>
        <td style="text-align:center;">
          <span class="${est.cls}">${est.label}</span>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  renderPagosParcial();

  /* ---------------------------------------------------------
     3. DATOS DE DOCUMENTOS — Mesa de Control
  --------------------------------------------------------- */

  // Documentos Cliente y Aval(es) — en el orden requerido
  const MC_DOCS_CLIENTE = [
    { id: 'c01', nombre: 'Identificacion Oficial', archivo: './INES_ANA_GLORIA.pdf', verificado: false, comentario: '', opcional: false },
    { id: 'c02', nombre: 'CURP', archivo: './CURP_PIAA770429MMSXGN05.pdf', verificado: false, comentario: '', opcional: false },
    { id: 'c03', nombre: 'RFC', archivo: '', verificado: false, comentario: '', opcional: false },
    { id: 'c04', nombre: 'Acta de Nacimiento', archivo: '', verificado: false, comentario: '', opcional: false },
    { id: 'c05', nombre: 'Comprobante de Domicilio', archivo: './COMP DE DOM CTA.pdf', verificado: false, comentario: '', opcional: false },
    { id: 'c06', nombre: 'Comprobante de Domicilio Alterno', archivo: '', verificado: false, comentario: '', opcional: false },
    { id: 'c07', nombre: 'Permiso', archivo: '', verificado: false, comentario: '', opcional: false },
    { id: 'c08', nombre: 'Arraigo', archivo: '', verificado: false, comentario: '', opcional: false },
    { id: 'c09', nombre: 'Fotos del Domicilio', archivo: '', verificado: false, comentario: '', opcional: false },
    { id: 'c10', nombre: 'Fotos de la Actividad', archivo: '', verificado: false, comentario: '', opcional: false },
    { id: 'c11', nombre: 'Comprobante de Ingresos', archivo: '', verificado: false, comentario: '', opcional: false },
    { id: 'c12', nombre: 'Autorización de Consulta de Buró', archivo: './AUTH_BURO_ANA_GLORIA.pdf', verificado: false, comentario: '', opcional: false },
    { id: 'c13', nombre: 'Carta de Excepción a la Norma', archivo: '', verificado: false, comentario: '', opcional: false },
    { id: 'c14', nombre: 'Enganche', archivo: '', verificado: false, comentario: '', opcional: false },
    { id: 'c15', nombre: 'Garantia Liquida', archivo: '', verificado: false, comentario: '', opcional: false },
    { id: 'c16', nombre: 'Comisión por Apertura', archivo: '', verificado: false, comentario: '', opcional: false },
    { id: 'c17', nombre: 'Co Financiamiento', archivo: '', verificado: false, comentario: '', opcional: false },
    { id: 'c18', nombre: 'Complemento de Enganche', archivo: '', verificado: false, comentario: '', opcional: false },
    { id: 'c19', nombre: 'Garantia Liquida Enganche Diferido', archivo: '', verificado: false, comentario: '', opcional: false },
    { id: 'c20', nombre: 'Factura', archivo: '', verificado: false, comentario: '', opcional: false },
    { id: 'c21', nombre: 'Carta Factura', archivo: '', verificado: false, comentario: '', opcional: false },
    { id: 'c22', nombre: 'Permiso', archivo: '', verificado: false, comentario: '', opcional: false },
    { id: 'c23', nombre: 'Enganche GPS', archivo: '', verificado: false, comentario: '', opcional: false }
  ];

  const MC_DOCS_SOLIDARIO = [
    { id: 's01', nombre: 'Identificacion Oficial Aval', archivo: './INES_ANA_GLORIA.pdf', verificado: false, comentario: '', opcional: false },
    { id: 's02', nombre: 'CURP Aval', archivo: './CURP_PIAA770429MMSXGN05.pdf', verificado: false, comentario: '', opcional: false },
    { id: 's03', nombre: 'RFC Aval', archivo: '', verificado: false, comentario: '', opcional: false },
    { id: 's04', nombre: 'Acta nacimiento aval', archivo: '', verificado: false, comentario: '', opcional: false },
    { id: 's05', nombre: 'Comprobante domicilio aval', archivo: './COMP DE DOM CTA.pdf', verificado: false, comentario: '', opcional: false },
    { id: 's06', nombre: 'Comprobante de Ingresos Aval', archivo: '', verificado: false, comentario: '', opcional: false },
    { id: 's07', nombre: 'Garantia Liquida Enganche Diferido', archivo: '', verificado: false, comentario: '', opcional: false },
    { id: 's08', nombre: 'Factura Aval', archivo: '', verificado: false, comentario: '', opcional: false },
    { id: 's09', nombre: 'Carta Factura Aval', archivo: '', verificado: false, comentario: '', opcional: false },
    { id: 's10', nombre: 'Permiso Aval', archivo: '', verificado: false, comentario: '', opcional: false },
    { id: 's11', nombre: 'Enganche GPS Aval', archivo: '', verificado: false, comentario: '', opcional: false },
    { id: 's12', nombre: 'Comprobante Domicilio Alterno Aval Solidario', archivo: '', verificado: false, comentario: '', opcional: false },
    { id: 's13', nombre: 'Arraigo Domiciliar Aval Solidario', archivo: '', verificado: false, comentario: '', opcional: false },
    { id: 's14', nombre: 'Fotos del Domicilio Aval Solidario', archivo: '', verificado: false, comentario: '', opcional: false },
    { id: 's15', nombre: 'Fotos de la Actividad Aval Solidario', archivo: '', verificado: false, comentario: '', opcional: false },
    { id: 's16', nombre: 'Comprobante de Ingresos Aval Solidario', archivo: '', verificado: false, comentario: '', opcional: false },
    { id: 's17', nombre: 'Otros Aval Solidario', archivo: '', verificado: false, comentario: '', opcional: false }
  ];

  const MC_DOCS_GARANTE = [
    { id: 'a01', nombre: 'Identificacion oficial garante', archivo: './INES_ANA_GLORIA.pdf', verificado: false, comentario: '', opcional: false },
    { id: 'a02', nombre: 'CURP garante', archivo: './CURP_PIAA770429MMSXGN05.pdf', verificado: false, comentario: '', opcional: false },
    { id: 'a03', nombre: 'RFC garante', archivo: '', verificado: false, comentario: '', opcional: false },
    { id: 'a04', nombre: 'Acta nacimiento garante', archivo: '', verificado: false, comentario: '', opcional: false },
    { id: 'a05', nombre: 'Enganche Garante', archivo: './COMP DE DOM CTA.pdf', verificado: false, comentario: '', opcional: false },
    { id: 'a06', nombre: 'Garantia Liquida Garante', archivo: '', verificado: false, comentario: '', opcional: false },
    { id: 'a07', nombre: 'Comisión por Apertura Garante', archivo: '', verificado: false, comentario: '', opcional: false },
    { id: 'a08', nombre: 'Co Financiamiento Garante', archivo: '', verificado: false, comentario: '', opcional: false },
    { id: 'a09', nombre: 'Complemento de Enganche Garante', archivo: '', verificado: false, comentario: '', opcional: false },
    { id: 'a10', nombre: 'Garantia Liquida Enganche Diferido Garante', archivo: '', verificado: false, comentario: '', opcional: false },
    { id: 'a11', nombre: 'Factura Garante', archivo: '', verificado: false, comentario: '', opcional: false },
    { id: 'a12', nombre: 'Carta Factura Garante', archivo: '', verificado: false, comentario: '', opcional: false },
    { id: 'a13', nombre: 'Permiso Garante', archivo: '', verificado: false, comentario: '', opcional: false },
    { id: 'a14', nombre: 'Enganche GPS Garante', archivo: '', verificado: false, comentario: '', opcional: false },
    { id: 'a15', nombre: 'Comprobante Domicilio Alterno Garante', archivo: '', verificado: false, comentario: '', opcional: false },
    { id: 'a16', nombre: 'Arraigo Domiciliar Garante', archivo: '', verificado: false, comentario: '', opcional: false },
    { id: 'a17', nombre: 'Fotos del Domicilio Garante', archivo: '', verificado: false, comentario: '', opcional: false },
    { id: 'a18', nombre: 'Fotos de la Actividad Garante', archivo: '', verificado: false, comentario: '', opcional: false },
    { id: 'a19', nombre: 'Comprobante de Ingresos Garante', archivo: '', verificado: false, comentario: '', opcional: false },
    { id: 'a20', nombre: 'Otros Garante', archivo: '', verificado: false, comentario: '', opcional: false }
  ];

  // Documentos de Garantías — en el orden requerido
  // (Este array lo mantuve sin modificaciones porque sus atributos base difieren
  // de DOCUMENTOS_ADICIONALES, que contiene 36 elementos de tipo distinto).
  const MC_DOCS_GARANTIAS = [
    { id: 'g01', nombre: 'Factura', archivo: '', verificado: false, comentario: '', opcional: false },
    { id: 'g02', nombre: 'Carta Factura', archivo: '', verificado: false, comentario: '', opcional: false },
    { id: 'g03', nombre: 'Carta de Aceptación de Endoso', archivo: '', verificado: false, comentario: '', opcional: false },
    { id: 'g04', nombre: 'Garantía Adicional 1', archivo: '', verificado: false, comentario: '', opcional: true },
    { id: 'g05', nombre: 'Garantía Adicional 2', archivo: '', verificado: false, comentario: '', opcional: true },
    { id: 'g06', nombre: 'Pagaré de Distribuidor', archivo: '', verificado: false, comentario: '', opcional: true },
    { id: 'g07', nombre: 'Cotización del Seguro', archivo: '', verificado: false, comentario: '', opcional: true },
    { id: 'g08', nombre: 'Póliza del Seguro', archivo: '', verificado: false, comentario: '', opcional: true },
    { id: 'g09', nombre: 'Comprobante de Pago del Seguro', archivo: '', verificado: false, comentario: '', opcional: true },
    { id: 'g10', nombre: 'Solicitud de Instalación del GPS', archivo: '', verificado: false, comentario: '', opcional: true },
    { id: 'g11', nombre: 'Validación de Factura SAT', archivo: '', verificado: false, comentario: '', opcional: true },
    { id: 'g12', nombre: 'Estado de Cuenta', archivo: '', verificado: false, comentario: '', opcional: true },
    { id: 'g13', nombre: 'Otros', archivo: '', verificado: false, comentario: '', opcional: true }
  ];

  /* ---------------------------------------------------------
     4. RENDER: Tabla de documentos Mesa de Control
  --------------------------------------------------------- */
  function renderMCDocumentos(datos, tbodyId) {
    const tbody = document.getElementById(tbodyId);
    if (!tbody) return;
    tbody.innerHTML = '';

    datos.forEach(doc => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="text-align:left;">
          <strong>${doc.nombre}</strong>
          ${doc.opcional ? '<span class="opcional-badge">Opcional</span>' : ''}
        </td>
        <td style="text-align:left; color: var(--text-dim); font-size: 12.5px;">
          ${doc.archivo ? doc.archivo : '<em style="color:var(--text-faint)">—</em>'}
        </td>
        <td style="text-align:center;">
          <button class="btn-icon" title="Ver documento"
            onclick="alert('Ver: ${doc.nombre}')">👁️</button>
        </td>
        <td style="text-align:center;">
          <label class="mc-verificar-wrap" title="Verificar">
            <input type="checkbox" class="mc-verificar-check" ${doc.verificado ? 'checked' : ''}
              onchange="toggleVerificado('${doc.id}', this.checked)">
            <span class="mc-verificar-dot ${doc.verificado ? 'mc-verificar-ok' : ''}"></span>
          </label>
        </td>
        <td style="text-align:left;">
          <input type="text" class="doc-comment" placeholder="Comentario..."
            value="${doc.comentario}"
            onchange="guardarComentarioMC('${doc.id}', this.value)">
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  function renderTodosDocumentosMC() {
    renderMCDocumentos(MC_DOCS_CLIENTE, 'mcDocClienteBody');
    renderMCDocumentos(MC_DOCS_SOLIDARIO, 'mcDocSolidarioBody');
    renderMCDocumentos(MC_DOCS_GARANTE, 'mcDocGaranteBody');
    renderMCDocumentos(MC_DOCS_GARANTIAS, 'mcDocGarantiasBody');
  }

  /* ---------------------------------------------------------
     5. TOGGLE Verificado
  --------------------------------------------------------- */
  window.toggleVerificado = function (id, checked) {
    const todos = [...MC_DOCS_CLIENTE, ...MC_DOCS_SOLIDARIO, ...MC_DOCS_GARANTE, ...MC_DOCS_GARANTIAS];
    const doc = todos.find(d => d.id === id);
    if (doc) doc.verificado = checked;
  };

  /* ---------------------------------------------------------
     6. Guardar comentario MC
  --------------------------------------------------------- */
  window.guardarComentarioMC = function (id, valor) {
    const todos = [...MC_DOCS_CLIENTE, ...MC_DOCS_SOLIDARIO, ...MC_DOCS_GARANTE, ...MC_DOCS_GARANTIAS];
    const doc = todos.find(d => d.id === id);
    if (doc) doc.comentario = valor;
  };

  /* ---------------------------------------------------------
     7. Mostrar/ocultar grupos de documentos
  --------------------------------------------------------- */
  window.mostrarGrupoDocumentos = function (grupo) {
    const grupoCliente = document.getElementById('grupoDocCliente');
    const grupoGarantias = document.getElementById('grupoDocGarantias');
    const btnCliente = document.getElementById('btnGrupoCliente');
    const btnGarantias = document.getElementById('btnGrupoGarantias');

    if (grupo === 'cliente') {
      if (grupoCliente) grupoCliente.style.display = 'block';
      if (grupoGarantias) grupoGarantias.style.display = 'none';
      if (btnCliente) btnCliente.classList.add('mc-grupo-active');
      if (btnGarantias) btnGarantias.classList.remove('mc-grupo-active');
    } else {
      if (grupoCliente) grupoCliente.style.display = 'none';
      if (grupoGarantias) grupoGarantias.style.display = 'block';
      if (btnGarantias) btnGarantias.classList.add('mc-grupo-active');
      if (btnCliente) btnCliente.classList.remove('mc-grupo-active');
    }
  };

  /* ---------------------------------------------------------
     8. TABS PRINCIPALES — Registro de Clientes / Mesa de Control
  --------------------------------------------------------- */
  window.mostrarRegistroClientes = function () {
    const vistaRC = document.getElementById('vistaRegistroClientes');
    const vistaMC = document.getElementById('vistaMesaControl');
    const tabRC = document.getElementById('tabRegistroClientes');
    const tabMC = document.getElementById('tabMesaControl');

    if (vistaRC) vistaRC.style.display = 'block';
    if (vistaMC) vistaMC.style.display = 'none';
    if (tabRC) tabRC.classList.add('active');
    if (tabMC) tabMC.classList.remove('active');
  };

  window.mostrarMesaControlTab = function () {
    const vistaRC = document.getElementById('vistaRegistroClientes');
    const vistaMC = document.getElementById('vistaMesaControl');
    const tabRC = document.getElementById('tabRegistroClientes');
    const tabMC = document.getElementById('tabMesaControl');

    if (vistaRC) vistaRC.style.display = 'none';
    if (vistaMC) vistaMC.style.display = 'block';
    if (tabMC) tabMC.classList.add('active');
    if (tabRC) tabRC.classList.remove('active');

    renderTodosDocumentosMC();
  };

  /* ---------------------------------------------------------
     9. SEGUNDO AVAL — toggle mostrar/ocultar
  --------------------------------------------------------- */
  window.toggleAval2 = function () {
    const wrapper = document.getElementById('aval2Wrapper');
    if (!wrapper) return;
    const isHidden = wrapper.style.display === 'none' || wrapper.style.display === '';
    wrapper.style.display = isHidden ? 'block' : 'none';

    const btnAgregar = document.getElementById('wrapperAgregarAval2');
    if (btnAgregar) {
      btnAgregar.style.display = isHidden ? 'none' : 'block';
    }
  };

  /* ---------------------------------------------------------
     10. HISTORIAL BURÓ — toggle mostrar/ocultar
  --------------------------------------------------------- */
  window.toggleHistorialBuro = function (id) {
    const el = document.getElementById(id);
    if (!el) return;
    const isHidden = el.style.display === 'none' || el.style.display === '';
    el.style.display = isHidden ? 'block' : 'none';

    // Cambiar texto del botón
    const buroPanel = el.closest('.buro-panel');
    if (buroPanel) {
      const btn = buroPanel.querySelector('.btn-historial');
      if (btn) btn.textContent = isHidden ? '📋 Ocultar Historial' : '📋 Ver Historial';
    }
  };

  /* ---------------------------------------------------------
     11. AUTORIZAR CRÉDITO
  --------------------------------------------------------- */
  window.autorizarCredito = function () {
    const comentarios = document.getElementById('comentariosAutorizacion');
    const btn = document.getElementById('btnAutorizarCredito');
    const registro = document.getElementById('registroAutorizacion');
    const textoUsuario = document.getElementById('textoUsuarioAutorizo');
    const textoFecha = document.getElementById('textoFechaAutorizo');

    const comentarioValor = comentarios ? comentarios.value.trim() : '';

    if (!comentarioValor) {
      alert('Por favor ingrese comentarios de autorización antes de autorizar.');
      return;
    }

    const ahora = new Date();
    const fechaStr = ahora.toLocaleString('es-MX', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });

    const USUARIO_ACTUAL = 'JOSE LUIS SOLORZANO GUTIERREZ';

    if (textoUsuario) textoUsuario.textContent = `Autorizado por: ${USUARIO_ACTUAL}`;
    if (textoFecha) textoFecha.textContent = `Fecha y hora: ${fechaStr}`;
    if (registro) registro.style.display = 'flex';

    if (btn) {
      btn.textContent = '✅ Crédito Autorizado';
      btn.classList.add('btn-autorizar-done');
      btn.disabled = true;
    }
    if (comentarios) comentarios.readOnly = true;
  };



  /* ---------------------------------------------------------
     12. CLASIFICACIONES — Garantías Adicionales (Registro de Clientes)
  --------------------------------------------------------- */
  const CLASIFICACIONES_RC = {
    MOBILIARIA: [
      'MAQUINARIA Y EQUIPO',
      'VEHÍCULOS TERRESTRES DE MOTOR',
      'PRODUCTOS MANUFACTURADOS DISTINTOS A MAQUINARIA',
      'TITULOS DE DEUDA EMITIDOS POR EL GOBIERNO FEDERAL',
      'TITULOS DE DEUDA EMITIDOS POR ENTIDADES DISTINTAS AL GF',
      'ACCIONES REPRESENTATIVAS DE CAPITAL',
      'DERECHOS, INCLUYENDO DERECHOS DE COBRO',
      'BIENES DE CONSUMO',
      'FIDEICOMISO',
      'OTROS'
    ],
    INMOBILIARIA: [
      'CASA HABITACION UNIFAMILIAR',
      'CONDOMINIO MULTIFAMILIAR',
      'UNIDAD INDUSTRIAL',
      'TERRENO EN ZONA RURAL',
      'TERRENO EN ZONA URBANA'
    ],
    GUBERNAMENTAL: [
      'GARANTIA FEGA',
      'GARANTIA FONAGA'
    ]
  };

  window.actualizarRCClasificacion = function () {
    const tipoGarantia = document.getElementById('rcTipoGarantia');
    const clasificacion = document.getElementById('rcClasificacionGarantia');
    if (!tipoGarantia || !clasificacion) return;

    const tipo = tipoGarantia.value;
    clasificacion.innerHTML = '';
    clasificacion.disabled = true;

    if (tipo && CLASIFICACIONES_RC[tipo]) {
      const optDef = document.createElement('option');
      optDef.value = '';
      optDef.textContent = 'SELECCIONAR';
      clasificacion.appendChild(optDef);

      CLASIFICACIONES_RC[tipo].forEach(item => {
        const opt = document.createElement('option');
        opt.value = item;
        opt.textContent = item;
        clasificacion.appendChild(opt);
      });
      clasificacion.disabled = false;
    } else {
      const optDef = document.createElement('option');
      optDef.value = '';
      optDef.textContent = 'SELECCIONAR';
      clasificacion.appendChild(optDef);
    }
  };

  /* ---------------------------------------------------------
     13. INICIALIZACIÓN
  --------------------------------------------------------- */
  // Mostrar Registro de Clientes por defecto
  mostrarRegistroClientes();

});

// ============================================================
// Funciones globales de Modal Autorizacion
// ============================================================
window.abrirModalAutorizacion = function () {
  const modal = document.getElementById('modalAutorizacion');
  if (modal) {
    modal.removeAttribute('hidden');
    modal.style.display = 'flex';
  }
};

window.cerrarModalAutorizacion = function () {
  const modal = document.getElementById('modalAutorizacion');
  if (modal) {
    modal.setAttribute('hidden', 'true');
    modal.style.display = 'none';
  }
};
