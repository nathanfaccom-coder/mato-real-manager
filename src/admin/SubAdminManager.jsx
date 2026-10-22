import React, { useEffect, useState } from "react";
import { db } from "../services/firebase.js";
import { ADMIN_PERMISSIONS, isMainAdmin } from "./permissions.js";
import { createSubAdmin, updateSubAdmin, removeSubAdmin } from "./auth.js";
function PermissionList({ value, onChange, disabled }) {
  return (
    <fieldset disabled={disabled} style={{ border: 0, padding: 0 }}>
      {Object.entries(ADMIN_PERMISSIONS).map(([id, label]) => (
        <label key={id} style={{ display: "block", padding: "8px 0" }}>
          <input
            type="checkbox"
            checked={value.includes(id)}
            onChange={(e) =>
              onChange(
                e.target.checked
                  ? [...value, id]
                  : value.filter((p) => p !== id),
              )
            }
          />{" "}
          {label}
        </label>
      ))}
    </fieldset>
  );
}
function Account({ account, run, busy }) {
  const [permissions, setPermissions] = useState(account.permissions);
  useEffect(() => setPermissions(account.permissions), [account]);
  return (
    <div className="card">
      <h3>{account.name}</h3>
      <p>
        Login: <b>{account.login}</b>
      </p>
      <PermissionList
        value={permissions}
        onChange={setPermissions}
        disabled={busy}
      />
      <button
        className="btn btn-green"
        disabled={busy}
        onClick={() =>
          run(
            () => updateSubAdmin(account.id, permissions),
            "Permissões atualizadas.",
          )
        }
      >
        SALVAR PERMISSÕES
      </button>
      <button
        className="btn btn-red"
        disabled={busy}
        onClick={() => {
          if (confirm(`Remover o acesso de ${account.name}?`))
            run(() => removeSubAdmin(account.id), "Acesso removido.");
        }}
      >
        EXCLUIR ACESSO
      </button>
    </div>
  );
}
export function SubAdminManager({ user }) {
  const [accounts, setAccounts] = useState([]),
    [name, setName] = useState(""),
    [login, setLogin] = useState(""),
    [password, setPassword] = useState(""),
    [permissions, setPermissions] = useState([]),
    [busy, setBusy] = useState(false),
    [message, setMessage] = useState("");
  useEffect(() => {
    if (!isMainAdmin(user)) return;
    return db.collection("adminProfiles").onSnapshot(
      (s) => setAccounts(s.docs.map((d) => ({ ...d.data(), id: d.id }))),
      (e) => setMessage("Não foi possível carregar os acessos: " + e.message),
    );
  }, [user?.data?.id]);
  if (!isMainAdmin(user)) return null;
  async function run(action, success) {
    setBusy(true);
    setMessage("");
    try {
      await action();
      setMessage(success);
    } catch (e) {
      setMessage(
        e.code === "auth/email-already-in-use"
          ? "Esse login já existe. Escolha outro ou remova a conta antiga em Firebase Authentication."
          : e.message,
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <section data-testid="subadmin-manager">
      <h3>Gerenciar subADMs</h3>
      <p role="note">
        As permissões limitam as funções deste painel. A proteção completa dos
        dados do jogo ainda depende da migração do login antigo e das regras
        públicas do banco.
      </p>
      <p>
        O principal controla os acessos. Reset e manutenção geral não podem ser
        delegados.
      </p>
      <form
        className="card"
        onSubmit={(e) => {
          e.preventDefault();
          run(async () => {
            await createSubAdmin({ name, login, password, permissions });
            setName("");
            setLogin("");
            setPassword("");
            setPermissions([]);
          }, "SubADM criado. Compartilhe o login e a senha diretamente com a pessoa.");
        }}
      >
        <label>
          Nome
          <input
            className="input-field"
            required
            minLength={2}
            maxLength={80}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Login
          <input
            className="input-field"
            required
            pattern="[a-zA-Z0-9][a-zA-Z0-9._-]{2,31}"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            autoComplete="off"
          />
        </label>
        <label>
          Senha inicial
          <input
            className="input-field"
            type="password"
            required
            minLength={12}
            maxLength={128}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />
        </label>
        <PermissionList
          value={permissions}
          onChange={setPermissions}
          disabled={busy}
        />
        <button className="btn btn-green" disabled={busy}>
          CRIAR SUBADM
        </button>
      </form>
      {message && <p role="status">{message}</p>}
      {accounts.map((a) => (
        <Account key={a.id} account={a} run={run} busy={busy} />
      ))}
      <p>
        Excluir remove o acesso ao painel, inclusive de quem estiver conectado.
        A identidade de login permanece no Authentication; para reutilizar o
        mesmo login, remova também essa identidade pelo console do Firebase.
      </p>
    </section>
  );
}
