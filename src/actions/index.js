import { guardAdminActions } from "../admin/permissions.js";
import { createAccountsActions } from "./accounts.js";
import { createAdministrationActions } from "./administration.js";
import { createCompetitionActions } from "./competition.js";
import { createMarketActions } from "./market.js";
import { createPlayersActions } from "./players.js";
import { createSocialActions } from "./social.js";
import { createFinanceActions } from "./finance.js";
export function createGameActions(context) {
  const actions = {};
  Object.assign(actions, createAccountsActions(context, actions));
  Object.assign(actions, createAdministrationActions(context, actions));
  Object.assign(actions, createCompetitionActions(context, actions));
  Object.assign(actions, createMarketActions(context, actions));
  Object.assign(actions, createPlayersActions(context, actions));
  Object.assign(actions, createSocialActions(context, actions));
  Object.assign(actions, createFinanceActions(context, actions));
  return guardAdminActions(actions, context.user, undefined, {automaticMatches:context.automaticMatches===true});
}
