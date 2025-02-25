import { getAuth, signOut } from "firebase/auth";
import '../hojas-de-estilo/Navbar.css'
import { Link } from 'react-router-dom';

export const Navbar=({ setUsuario }) =>{
    const auth = getAuth();

    const cerrarSesion = async () => {
        try {
            await signOut(auth);
            setUsuario(null); 
            localStorage.removeItem("usuario"); 
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    return (
        <nav>
            <ul>
                <li><Link to="/">Cartelera</Link></li>
                <li><button onClick={cerrarSesion}>Cerrar sesión</button></li>
            </ul>
        </nav>
    );
}
