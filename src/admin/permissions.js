export const OWNER_UID = "NEXLYzsJfLPsTxzp3LKHKwaPhEZ2";
export const ADMIN_PERMISSIONS = Object.freeze({
  teams: "Times e jogadores (cadastros, elencos e configurações)",
  finance: "Finanças e premiações",
  press: "Imprensa e jornalistas",
  companies: "Empresas",
  staff: "Comissão técnica",
  calendar: "Calendário",
  competitions: "Campeonatos, partidas e súmulas",
  nationalTeams: "Seleções, técnicos e convocações",
});
export const isMainAdmin = (user) =>
  user?.type === "ADMIN" && user.data?.id === OWNER_UID;
export const isSubAdmin = (user) =>
  user?.type === "ADMIN" && !isMainAdmin(user);
export function canAdmin(user, permission) {
  return (
    isMainAdmin(user) ||
    (isSubAdmin(user) &&
      Object.hasOwn(ADMIN_PERMISSIONS, permission) &&
      user.data?.permissions?.includes(permission))
  );
}
export function validatePermissions(value) {
  if (
    !Array.isArray(value) ||
    value.some((p) => !Object.hasOwn(ADMIN_PERMISSIONS, p))
  )
    throw Error("Permissão inválida.");
  return [...new Set(value)];
}
export const MODAL_PERMISSIONS = {
  TEAM_TABLE: "competitions",
  POST_NEWS: "press",
  EDIT_PRIZES: "finance",
  STATS_SEARCH: "competitions",
  MATCH_REPORT: "competitions",
  ADMIN_PLAYER: "teams",
  PLAYER: "teams",
  SETTINGS: "teams",
  STATS: "competitions",
  TEAM_STANDINGS: "competitions",
  TOURN_MANAGER: "competitions",
  MATCH_MANAGER: "competitions",
  MATCH_PERFORMANCE: "competitions",
  AWARDS_MANAGER: "finance",
  PRIZES: "finance",
};
export function allowAdminModal(user, modal) {
  if (!modal) return true;
  if (['MATCH_PERFORMANCE','MATCH_REPORT','TEAM_TABLE','STATS','TEAM_STANDINGS'].includes(modal.type))
    return canAdmin(user, 'competitions');
  if (!isSubAdmin(user)) return true;
  if (["VIEW_LINEUP", "VIEW_PLAYER"].includes(modal.type)) return true;
  return canAdmin(user, MODAL_PERMISSIONS[modal.type]);
}
export const ACTION_PERMISSIONS = {
  approveTeam: "teams",
  deleteTeam: "teams",
  savePlayer: "teams",
  deletePaper: "press",
  deleteJournalist: "press",
  postNews: "press",
  handleFinanceApprove: "finance",
  updateBalance: "finance",
  handleSaveMatch: "competitions",
  handleDeleteMatch: "competitions",
  generateFixtures: "competitions",
  saveMatchStats: "competitions",
  updateTeamStats: "competitions",
  handleSocialDelete: "press",
};
export function guardAdminActions(
  actions,
  user,
  notify = (message) => alert(message),
  { automaticMatches = false } = {},
) {
  const protectedActions = new Set(['saveMatchStats','updateTeamStats','handleSaveMatch','handleDeleteMatch','generateFixtures']);
  return Object.fromEntries(
    Object.entries(actions).map(([name, fn]) => [
      name,
      (...args) => {
        // Rollout safeguard, not database authorization. These legacy writers
        // bypass the server result ledger and must never run in automatic mode.
        if (automaticMatches && ['saveMatchStats','updateTeamStats'].includes(name)) {
          notify('Use a súmula registrada na Central de Jogos para corrigir resultados. O jogo atualiza XP e classificação pelo servidor.');
          return;
        }
        if ((isSubAdmin(user) || protectedActions.has(name)) && !canAdmin(user, ACTION_PERMISSIONS[name])) {
          notify("Você não tem permissão para esta função.");
          return;
        }
        return fn(...args);
      },
    ]),
  );
}
