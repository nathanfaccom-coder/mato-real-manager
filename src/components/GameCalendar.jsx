import React, { useState, useEffect } from "react";

export const GameCalendar = ({ calendar }) => {
  if (!calendar || !calendar.date) return null;

  // Formata a data (Ex: 2026-03-15 vira 15/03/2026)
  const [ano, mes, dia] = calendar.date.split("-");
  const dateBr = `${dia}/${mes}/${ano}`;

  // Pega o nome do mês para ficar bonito
  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  const monthName = monthNames[parseInt(mes) - 1];

  // Filtra os eventos para mostrar apenas os de hoje em diante (e ordena por data)
  const upcomingEvents = (calendar.events || [])
    .filter((e) => e.date >= calendar.date)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div
      className="card"
      style={{
        background: "linear-gradient(45deg, #1a1a1a, #001a00)",
        border: "1px solid var(--primary)",
        marginBottom: 20,
        display: "flex",
        gap: 15,
        alignItems: "stretch",
      }}
    >
      {/* Bloco do Dia Atual */}
      <div
        style={{
          background: "#000",
          padding: "10px",
          borderRadius: 8,
          textAlign: "center",
          minWidth: "80px",
          border: "1px solid #333",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontSize: 10,
            color: "var(--primary)",
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          {monthName}
        </div>
        <div
          style={{
            fontSize: 30,
            fontWeight: "900",
            color: "#fff",
            lineHeight: 1,
          }}
        >
          {dia}
        </div>
        <div style={{ fontSize: 10, color: "#888" }}>{ano}</div>
      </div>

      {/* Bloco de Eventos */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontSize: 11,
            color: "#aaa",
            marginBottom: 5,
            fontWeight: "bold",
          }}
        >
          <i className="fas fa-calendar-alt"></i> PRÓXIMOS EVENTOS:
        </div>
        {upcomingEvents.length === 0 ? (
          <div style={{ fontSize: 12, color: "#666", fontStyle: "italic" }}>
            Nenhum evento agendado.
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              maxHeight: "60px",
              overflowY: "auto",
            }}
          >
            {upcomingEvents.slice(0, 3).map((ev, i) => {
              const isToday = ev.date === calendar.date;
              return (
                <div
                  key={i}
                  style={{
                    fontSize: 11,
                    display: "flex",
                    gap: 5,
                    alignItems: "center",
                    color: isToday ? "gold" : "#ddd",
                  }}
                >
                  <b style={{ color: isToday ? "gold" : "var(--primary)" }}>
                    {isToday
                      ? "HOJE"
                      : `${ev.date.split("-")[2]}/${ev.date.split("-")[1]}`}
                  </b>
                  <span>- {ev.text}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
