import "./App.css";
import React from "react";
import SideBar from "./components/SideBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import About from "./pages/About";
import Graphical from "./pages/roots-of-equations/Graphical";
import Bisection from "./pages/roots-of-equations/Bisection";
import FalsePosition from "./pages/roots-of-equations/False_Position";
import OnePoint from "./pages/roots-of-equations/One_Point";
import NewtonRaphson from "./pages/roots-of-equations/Newton_Raphson";
import Secant from "./pages/roots-of-equations/Secant";
import Cholesky from "./pages/linear-algebraic-equation/Cholesky";
import CramerRule from "./pages/linear-algebraic-equation/Cramer_Rule";
import GaussElimination from "./pages/linear-algebraic-equation/Gauss_Elimination";
import GaussJordan from "./pages/linear-algebraic-equation/Gauss_Jordan";
import GaussSeidel from "./pages/linear-algebraic-equation/Gauss_Seidel";
import Jacobi from "./pages/linear-algebraic-equation/Jacobi";
import LUDecomposition from "./pages/linear-algebraic-equation/LU_Decomposition";
import MatrixInversion from "./pages/linear-algebraic-equation/Matrix_Inversion";
import Polynomial from "./pages/polynomial";
import Linear from "./pages/linear";

function App() {
  return (
    <Router>
      <SideBar>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/roots-of-equations/graphical" element={<Graphical />} />
          <Route path="/roots-of-equations/bisection" element={<Bisection />} />
          <Route path="/roots-of-equations/false-position" element={<FalsePosition />} />
          <Route path="/roots-of-equations/one-point_iteration" element={<OnePoint />} />
          <Route path="/roots-of-equations/newton-raphson" element={<NewtonRaphson />} />
          <Route path="/roots-of-equations/secant" element={<Secant />} />
          <Route path="/linear-algebraic-equation/cholesky" element={<Cholesky />} />
          <Route path="/linear-algebraic-equation/cramers_rule" element={<CramerRule />} />
          <Route path="/linear-algebraic-equation/gauss_elimination" element={<GaussElimination />} />
          <Route path="/linear-algebraic-equation/gauss-jordan" element={<GaussJordan />} />
          <Route path="/linear-algebraic-equation/gauss_seidel" element={<GaussSeidel />} />
          <Route path="/linear-algebraic-equation/lu" element={<LUDecomposition />} />
          <Route path="/linear-algebraic-equation/jacobi" element={<Jacobi />} />
          <Route path="/linear-algebraic-equation/matrix_inversion" element={<MatrixInversion />} />
          <Route path="/polynomial" element={<Polynomial />} />
          <Route path="/linear" element={<Linear />} />
        </Routes>
      </SideBar>
    </Router>
  );
}

export default App;
