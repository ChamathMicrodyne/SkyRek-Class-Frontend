import { NavLink } from "react-router-dom";
import { FaBox, FaUser, FaShoppingCart, FaStar } from "react-icons/fa";

const linkClasses ="flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-colors";
const activeClass = "bg-green-300 text-admin-accent";
const inactiveClass = "text-admin-accent hover:bg-green-200";

function AdminSidebar() {
  return (
    <div className="w-[300px] h-full bg-admin-secondary border-rshadow-md p-6 flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-admin-accent mb-6">Admin Panel</h2>

      <NavLink
        to="/admin/products"
        className={({ isActive }) =>
          `${linkClasses} ${isActive ? activeClass : inactiveClass}`
        }
      >
        <FaBox /> Products
      </NavLink>

      <NavLink
        to="/admin/users"
        className={({ isActive }) =>
          `${linkClasses} ${isActive ? activeClass : inactiveClass}`
        }
      >
        <FaUser /> Users
      </NavLink>

      <NavLink
        to="/admin/orders"
        className={({ isActive }) =>
          `${linkClasses} ${isActive ? activeClass : inactiveClass}`
        }
      >
        <FaShoppingCart /> Orders
      </NavLink>

      <NavLink
        to="/admin/reviews"
        className={({ isActive }) =>
          `${linkClasses} ${isActive ? activeClass : inactiveClass}`
        }
      >
        <FaStar /> Reviews
      </NavLink>
    </div>
  );
}

export default AdminSidebar;
