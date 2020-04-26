// ##############################
// // // Tasks for TasksCard - see Dashboard view
// #############################

var bugs = [
  'Sign contract for "What are conference organizers afraid of?"',
  "Lines From Great Russian Literature? Or E-mails From My Boss?",
  "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit",
  "Create 4 Invisible User Experiences you Never Knew About"
];
var website = [
  "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit",
  'Sign contract for "What are conference organizers afraid of?"'
];
var server = [
  "Lines From Great Russian Literature? Or E-mails From My Boss?",
  "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit",
  'Sign contract for "What are conference organizers afraid of?"'
];

var localization={
  body: {
    emptyDataSourceMessage: 'No se registran datos cargados'
  },
  toolbar: {
    searchTooltip: 'Buscar',
    searchPlaceholder: 'Buscar' 
  },
  pagination: {
    labelRowsSelect: 'Filas',
    labelDisplayedRows: ' {from}-{to} de {count}',
    firstTooltip: 'Primer página',
    previousTooltip: 'Página anterior',
    nextTooltip: 'Página siguiente',
    lastTooltip: 'Última página'
  }
}

module.exports = {
  // these 3 are used to create the tasks lists in TasksCard - Dashboard view
  bugs,
  website,
  server,
  localization
};
