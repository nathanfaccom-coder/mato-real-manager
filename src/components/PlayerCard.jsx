import React, { useState, useEffect } from "react";

export const PlayerCard = ({ player, teamName, teamLogo, onFaceUpload }) => {
  if (!player) return null;

  const attrs = player.attributes || {};
  const ovr = player.overall || 50;
  const pos = player.position || "ATA";

  // Função interna para calcular a média dos atributos
  const getAvg = (keys) => {
    let sum = 0;
    let count = 0;
    keys.forEach((k) => {
      if (attrs[k] !== undefined) {
        sum += attrs[k];
        count++;
      }
    });
    return count ? Math.round(sum / count) : 50;
  };

  // Mapeamento dos 6 status principais
  let stats = [];
  if (pos === "GOL") {
    stats = [
      { l: "DIV", v: getAvg(["gk", "jump"]) },
      { l: "HAN", v: getAvg(["gk", "balance"]) },
      { l: "KIC", v: getAvg(["longPass", "gk"]) },
      { l: "REF", v: getAvg(["response", "gk"]) },
      { l: "SPD", v: getAvg(["speed", "accel"]) },
      { l: "POS", v: getAvg(["mentality", "gk"]) },
    ];
  } else {
    stats = [
      { l: "RIT", v: getAvg(["speed", "accel"]) },
      { l: "FIN", v: getAvg(["shot", "shotPower", "shotTech"]) },
      { l: "PAS", v: getAvg(["shortPass", "longPass", "curve"]) },
      { l: "DRI", v: getAvg(["dribble", "agility", "tech"]) },
      { l: "DEF", v: getAvg(["defense", "aggression"]) },
      { l: "FÍS", v: getAvg(["stamina", "balance", "jump"]) },
    ];
  }

  // Definindo a Raridade (Cor do Fundo)
  let tierClass = "fut-bronze";
  if (ovr >= 80) tierClass = "fut-gold";
  else if (ovr >= 65) tierClass = "fut-silver";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "15px",
      }}
    >
      <style>{`
                .fut-card {
                    width: 220px; height: 320px; position: relative;
                    border-radius: 10px 10px 40px 40px; padding: 15px; color: #333;
                    font-family: 'Arial', sans-serif; box-shadow: 0 10px 25px rgba(0,0,0,0.8);
                    overflow: hidden; text-transform: uppercase;
                }
                .fut-card::after {
                    content: ''; position: absolute; top:0; left:0; right:0; bottom:0;
                    background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.2) 100%);
                    pointer-events: none;
                }
                .fut-gold { background: linear-gradient(135deg, #f9d976 0%, #e9b646 50%, #c4952d 100%); color: #4a3600; border: 2px solid #ffe699; }
                .fut-silver { background: linear-gradient(135deg, #e0e0e0 0%, #bdbdbd 50%, #9e9e9e 100%); color: #222; border: 2px solid #f5f5f5; }
                .fut-bronze { background: linear-gradient(135deg, #d29d71 0%, #b87333 50%, #8c531b 100%); color: #3e2004; border: 2px solid #eab890; }
                
                .fut-top { display: flex; justify-content: space-between; align-items: flex-start; }
                .fut-top-left { text-align: center; }
                .fut-ovr { font-size: 32px; font-weight: 900; line-height: 1; }
                .fut-pos { font-size: 14px; font-weight: bold; }
                .fut-logo { width: 30px; height: 30px; object-fit: contain; }
                
                .fut-img-container { text-align: center; margin-top: -10px; position: relative; z-index: 2; }
                .fut-img { width: 120px; height: 120px; border-radius: 50%; object-fit: cover; border: 3px solid rgba(255,255,255,0.5); box-shadow: 0 5px 15px rgba(0,0,0,0.4); background: #333; }
                
                .fut-name { text-align: center; font-size: 18px; font-weight: 900; margin-top: 10px; border-bottom: 1px solid rgba(0,0,0,0.1); padding-bottom: 5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; letter-spacing: 1px; }
                
                .fut-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 4px 15px; font-size: 13px; margin-top: 12px; padding: 0 20px; }
                .fut-stat-row { display: flex; justify-content: center; align-items: center; font-weight: bold; }
                .fut-stat-val { font-weight: 900; font-size: 16px; width: 28px; text-align: right; margin-right: 6px; }
                .fut-stat-row span:last-child { width: 30px; text-align: left; }
            `}</style>

      <div className={`fut-card ${tierClass}`}>
        <div className="fut-top">
          <div className="fut-top-left">
            <div className="fut-ovr">{ovr}</div>
            <div className="fut-pos">{pos}</div>
          </div>
          {teamLogo && <img src={teamLogo} className="fut-logo" />}
        </div>

        <div className="fut-img-container">
          {player.face ? (
            <img src={player.face} className="fut-img" />
          ) : (
            <div
              className="fut-img"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 40,
                color: "#fff",
              }}
            >
              👤
            </div>
          )}
          {/* Botão de Upload Embutido */}
          {onFaceUpload && (
            <label
              style={{
                position: "absolute",
                bottom: 5,
                right: 25,
                background: "var(--blue)",
                color: "white",
                borderRadius: "50%",
                width: 25,
                height: 25,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: 12,
                border: "2px solid #121212",
                zIndex: 10,
              }}
            >
              📷{" "}
              <input
                type="file"
                style={{ display: "none" }}
                accept="image/*"
                onChange={onFaceUpload}
              />
            </label>
          )}
        </div>

        <div className="fut-name">{player.name}</div>

        <div className="fut-stats">
          <div>
            <div className="fut-stat-row">
              <span className="fut-stat-val">{stats[0].v}</span>
              <span>{stats[0].l}</span>
            </div>
            <div className="fut-stat-row">
              <span className="fut-stat-val">{stats[1].v}</span>
              <span>{stats[1].l}</span>
            </div>
            <div className="fut-stat-row">
              <span className="fut-stat-val">{stats[2].v}</span>
              <span>{stats[2].l}</span>
            </div>
          </div>
          <div>
            <div className="fut-stat-row">
              <span className="fut-stat-val">{stats[3].v}</span>
              <span>{stats[3].l}</span>
            </div>
            <div className="fut-stat-row">
              <span className="fut-stat-val">{stats[4].v}</span>
              <span>{stats[4].l}</span>
            </div>
            <div className="fut-stat-row">
              <span className="fut-stat-val">{stats[5].v}</span>
              <span>{stats[5].l}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
