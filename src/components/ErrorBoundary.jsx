import { clearSession } from "../services/session.js";
import React, { useState, useEffect } from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("Crash:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-screen">
          <h2>Ocorreu um erro!</h2>
          <p>O aplicativo encontrou um problema inesperado.</p>
          <button
            className="btn btn-red"
            onClick={() => {
              clearSession();
              window.location.reload();
            }}
          >
            REINICIAR APLICATIVO
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
