// Traducciones globales reutilizables para MUI DataGrid
export const dataGridLocaleText = {
  noRowsLabel: "No hay filas",
  noResultsOverlayLabel: "No se encontraron resultados.",
  errorOverlayDefaultLabel: "Ha ocurrido un error.",
  toolbarDensity: "Densidad",
  toolbarDensityLabel: "Densidad",
  toolbarDensityCompact: "Compacta",
  toolbarDensityStandard: "Estándar",
  toolbarDensityComfortable: "Cómoda",
  toolbarColumns: "Columnas",
  toolbarColumnsLabel: "Seleccionar columnas",
  toolbarColumnsManageButtonLabel: "Gestionar columnas",
  toolbarFilters: "Filtros",
  toolbarFiltersLabel: "Mostrar filtros",
  toolbarFiltersTooltipHide: "Ocultar filtros",
  toolbarFiltersTooltipShow: "Mostrar filtros",
  toolbarFiltersTooltipActive: (count) =>
    count !== 1 ? `${count} filtros activos` : `${count} filtro activo`,
  toolbarExport: "Exportar",
  toolbarExportLabel: "Exportar",
  toolbarExportCSV: "Descargar como CSV",
  toolbarExportPrint: "Imprimir",
  columnsPanelTextFieldLabel: "Buscar columna",
  columnsPanelTextFieldPlaceholder: "Título de columna",
  columnsPanelDragIconLabel: "Reordenar columna",
  columnsPanelShowAllButton: "Mostrar todas",
  columnsPanelHideAllButton: "Ocultar todas",
  filterPanelAddFilter: "Agregar filtro",
  filterPanelDeleteIconLabel: "Borrar",
  filterPanelOperators: "Operadores",
  filterPanelOperatorAnd: "Y",
  filterPanelOperatorOr: "O",
  filterPanelColumns: "Columnas",
  filterPanelInputLabel: "Valor",
  filterPanelInputPlaceholder: "Valor de filtro",
  filterOperatorContains: "contiene",
  filterOperatorEquals: "es igual a",
  filterOperatorStartsWith: "comienza con",
  filterOperatorEndsWith: "termina con",
  filterOperatorIs: "es",
  filterOperatorNot: "no es",
  filterOperatorAfter: "después de",
  filterOperatorOnOrAfter: "en o después de",
  filterOperatorBefore: "antes de",
  filterOperatorOnOrBefore: "en o antes de",
  filterOperatorIsEmpty: "está vacío",
  filterOperatorIsNotEmpty: "no está vacío",
  columnMenuLabel: "Menú",
  columnMenuShowColumns: "Mostrar columnas",
  columnMenuFilter: "Filtrar",
  columnMenuHideColumn: "Ocultar",
  columnMenuUnsort: "Desordenar",
  columnMenuSortAsc: "Ordenar ascendente",
  columnMenuSortDesc: "Ordenar descendente",
  columnsPanelManageButtonLabel: "Gestionar columnas",
  columnHeaderFiltersTooltipActive: (count) =>
    count !== 1 ? `${count} filtros activos` : `${count} filtro activo`,
  columnHeaderFiltersLabel: "Mostrar filtros",
  columnHeaderSortIconLabel: "Ordenar",
  footerRowSelected: (count) =>
    count !== 1
      ? `${count.toLocaleString()} filas seleccionadas`
      : `${count.toLocaleString()} fila seleccionada`,
  footerTotalRows: "Filas totales:",
  footerTotalVisibleRows: (visibleCount, totalCount) =>
    `${visibleCount.toLocaleString()} de ${totalCount.toLocaleString()}`,
  checkboxSelectionHeaderName: "Selección",
  booleanCellTrueLabel: "sí",
  booleanCellFalseLabel: "no",
  actionsCellMore: "más",
  pinToLeft: "Anclar a la izquierda",
  pinToRight: "Anclar a la derecha",
  unpin: "Desanclar",
  // MuiTablePagination: {
  //   labelRowsPerPage: "Filas por página:",
  //   labelDisplayedRows: ({ from, to, count }) =>
  //     `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`,
  // },
  paginationRowsPerPage: "Filas por página:",
  paginationDisplayedRows: ({ from, to, count, estimated }) => {
    if (!estimated) {
      return `${from}–${to} de ${count !== -1 ? count : `more than ${to}`}`;
    }
    const estimatedLabel =
      estimated && estimated > to ? `around ${estimated}` : `more than ${to}`;
    return `${from}–${to} de ${count !== -1 ? count : estimatedLabel}`;
  },
};
