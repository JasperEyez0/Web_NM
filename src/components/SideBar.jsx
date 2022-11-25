import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { TbMath, TbLayoutGrid, TbInfoCircle } from "react-icons/tb";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";

const routes = [
  {
    path: "/about",
    name: "About",
    icon: <TbInfoCircle />
  },
  {
    path: "/roots-of-equations",
    name: "Roots Of Equation",
    icon: <TbMath />,
    subRoutes: [
      {
        path: "/roots-of-equations/graphical",
        name: "Graphical Method",
      },
      {
        path: "/roots-of-equations/bisection",
        name: "Bisection Method",
      },
      {
        path: "/roots-of-equations/false-position",
        name: "False-Position Method",
      },
      {
        path: "/roots-of-equations/one-point_iteration",
        name: "One-Point Iteration Method",
      },
      {
        path: "/roots-of-equations/newton-raphson",
        name: "Newton-Raphson Method",
      },
      {
        path: "/roots-of-equations/secant",
        name: "Secant Method",
      },
    ],
  },
  {
    path: "/linear-algebraic-equation",
    name: "Linear Algebraic Equation",
    icon: <TbLayoutGrid />,
    subRoutes: [
      {
        path: "/linear-algebraic-equation/cramers_rule",
        name: "Cramer's Rule",
      },
      {
        path: "/linear-algebraic-equation/gauss_elimination",
        name: "Gauss Elimination Method",
      },
      {
        path: "/linear-algebraic-equation/gauss-jordan",
        name: "Gauss-Jordan Method",
      },
      {
        path: "/linear-algebraic-equation/matrix_inversion",
        name: "Matrix Inversion Method",
      },
      {
        path: "/linear-algebraic-equation/lu",
        name: "LU Decomposition Method",
      },
      {
        path: "/linear-algebraic-equation/cholesky",
        name: "Cholesky Decomposition Method",
      },
      {
        path: "/linear-algebraic-equation/jacobi",
        name: "Jacobi Iteration",
      },
      {
        path: "/linear-algebraic-equation/gauss_seidel",
        name: "Gauss Seidel Iteration Method",
      }
    ],
  },
  {
    path: "/polynomial",
    name: "Polynomial Regression",
    icon: <TbLayoutGrid />,
  },
  {
    path: "/linear",
    name: "Linear Regression",
    icon: <TbLayoutGrid />,
  }
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "275px" : "45px",         //ความกว้างเปิดปิด
            transition: {
              duration: 0.5,
              damping: 10,
            },
          }}
          className={`sidebar `}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  <a href="http://localhost:3000/">Numerical</a>
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>
          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>
        <main>
          {children}
        </main>
      </div>
    </>
  );
};

export default SideBar;