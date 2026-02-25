import React, { useState } from "react";

declare const SERIES: string[];
declare const POS: string[];
declare const COMPANY_TYPES: Record<string, any>;
declare function fmt(value: any): string;

export interface LoginProps {
  teams: any[];
  players: any[];
  papers: any[];
  journalists: any[];
  companies: any[];
  coaches: any[];
  config?: any;
  onLogin: (id: string, password: string, type: string) => void;
  onCreateTeam: (
    name: string,
    balance: number,
    serie: string,
    password: string,
    logo?: string | null
  ) => void;
  onCreatePaper: (name: string, password: string, owner: string) => void;
  onCreateJourno: (name: string, password: string, paperId: string) => void;
  onCreateCompany: (company: any) => void;
  onAdmin: () => void;
  onVisitor: () => void;
  onCreateCoach: (data: any) => void;
  onCreatePlayer: (data: any) => void;
}

export const Login: React.FC<LoginProps> = ({
  teams,
  players,
  papers,
  journalists,
  companies,
  coaches,
  onLogin,
  onCreateTeam,
  onCreatePaper,
  onCreateJourno,
  onCreateCompany,
  onAdmin,
  onVisitor,
  onCreateCoach,
  onCreatePlayer,
  config
}) => {
  const [tab, setTab] = useState<"LOGIN" | "CREATE" | "PRESS" | "COMPANY" | "COACH" | "NEW_PLAYER">("LOGIN");
  const [subTab, setSubTab] = useState("TEAM");
  const [f, setF] = useState({ n: "", b: "10000000", s: "A", p: "", l: null as string | null });
  const [fc, setFC] = useState({ n: "", owner: "", p: "", type: "COMERCIO" });
  const [sel, setSel] = useState<any>(null);
  const [selPaper, setSelPaper] = useState<any>(null);
  const [selTeamForPlayer, setSelTeamForPlayer] = useState<any>(null);
  const [lp, setLp] = useState("");
  const [loginSerie, setLoginSerie] = useState<string | null>(null);
  const [coachData, setCoachData] = useState({
    name: "",
    password: "",
    affinity: "ATA",
    role: "COACH",
    face: null as string | null
  });
  const [playerData, setPlayerData] = useState({
    name: "",
    instagram: "",
    position: "ATA",
    password: ""
  });

  const selectedTypeInfo = COMPANY_TYPES[fc.type] || {};

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setF(prev => ({ ...prev, l: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const handleLoginSubmit = () => {
    if (!sel) return;

    if (String(sel.password) !== String(lp)) {
      alert("Senha incorreta!");
      return;
    }

    if (sel.type === "TEAM") {
      if (sel.status === "PENDING") return alert("Aguardando aprovação.");
      onLogin(sel.id, lp, "TEAM");
    } else if (sel.type === "PLAYER") {
      onLogin(sel.id, lp, "PLAYER");
    } else if (["COACH", "DOCTOR", "SCOUT", "ASSISTANT"].includes(sel.type)) {
      if (sel.status === "PENDING") return alert("Licença em análise.");
      onLogin(sel.id, lp, sel.type);
    } else if (sel.type === "COMPANY") {
      if (sel.status === "PENDING") return alert("Empresa em análise.");
      if (sel.status === "BLOCKED") return alert("Empresa bloqueada.");
      onLogin(sel.id, lp, "COMPANY");
    } else if (sel.type === "PAPER") {
      if (sel.status === "PENDING") return alert("Jornal em análise.");
      onLogin(sel.id, lp, "PAPER");
    } else if (sel.type === "JOURNALIST") {
      if (sel.status === "PENDING") return alert("Registro em análise.");
      onLogin(sel.id, lp, "JOURNALIST");
    }
  };

  return (
    <div className="login-wrapper">
      <h1 className="login-title">
        Gerenciador de Times
        <br />
        <span className="login-title-span">de Mato Real</span>
      </h1>
      <div className="dev-credits">
        Desenvolvido por: Nathan Reis | v1.92.3 MEDICOS
      </div>

      {/* Aqui entraria o restante do JSX da LoginScreen,
          que pode ser migrado por partes mantendo a mesma lógica */}
    </div>
  );
};
