import React, { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PaginaPrincipal from "./componentes/PaginaPrincipal.js";
import { Navbar } from './componentes/Navbar.js';
import CargarPeliculas from './componentes/DetallesPelis/CargarPelis.js';
import Detalle from "./componentes/DetallesPelis/Detalle.js"; 
import appfirebase from "./credenciales.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth(appfirebase);

function App() {

  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuarioFirebase) => {
      if (usuarioFirebase) {
        setUsuario(usuarioFirebase);
        localStorage.setItem("usuario", JSON.stringify(usuarioFirebase));
      } else {
        setUsuario(null);
        localStorage.removeItem("usuario");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
      {usuario ? (
        <Router>
          <Navbar
            setUsuario={setUsuario} // ✅ Pasamos setUsuario a Navbar
          />
          <Routes>
            <Route
              path="/"
              element={
                <CargarPeliculas
                  
                />
              }
            />
            <Route path="/detalle/:id" element={<Detalle />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      ) : (
        <PaginaPrincipal setUsuario={setUsuario} /> 
      )}
    </div>
  );
}

export default App;
