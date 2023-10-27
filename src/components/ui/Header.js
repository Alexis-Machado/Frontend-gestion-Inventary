import React from 'react';
import { NavLink } from 'react-router-dom'

export const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg  navbar-dark bg-dark ">
            <div className="container-fluid">
                <a className="navbar-brand neon" href="#">INVENTARIO</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link " activeClassName='active' exact aria-current="page" to="/"><strong>Activos</strong></NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link "  activeClassName='active'  exact aria-current="page" to="/user"><strong>Usuarios</strong></NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link " activeClassName='active' exact aria-current="page" to="/Brand"><strong>Marcas</strong></NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link " activeClassName='active' exact aria-current="page" to="/State"><strong>Estados</strong></NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link " activeClassName='active' exact aria-current="page" to="/Type"><strong>Tipos</strong></NavLink>
                        </li>
                    </ul>

                    <div>
                        <img src="https://th.bing.com/th/id/R.76e1e37100b73602df45713eb2045d40?rik=rdFS7DZ3lP9Bcg&pid=ImgRaw&r=0" alt="logo" />
                    </div>
                </div>
            </div>
        </nav>
    )
}