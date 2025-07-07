import { NavLink } from "react-router-dom";
import { useState, useEffect, useRef, type Key } from "react";
import {
  dashboardMenuItemsOne,
  dashboardMenuItemsAdmin,
} from "../../constants/dashboard-sidebar-menuitem";
import { cn } from "../../lib/utils";
import { buttonVariants } from "../../components/sidebar-dashboard-button";
import {
  BellIcon,
  ChevronDown,
  Settings,
  X,
  LogOut,
  ChevronUp,
} from "lucide-react";
import FullRoutePath from "../../constants/routes";
import useAuth from "../../hook/useAuth";
import SidebarCard from "../../components/SidebarCard";
import { useGetUser } from "../../api/queries/useGetUser";

interface SideBarProps {
  onClose?: () => void;
  isDisabled?: boolean;
}

const SideBar = ({ onClose, isDisabled = false }: SideBarProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { clearAuth } = useAuth();
  const { data: user } = useGetUser();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Check if user is admin
  const isAdmin = user?.role === 'admin';

  // Handle clicking outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleLogout = () => {
    clearAuth();
    setIsDropdownOpen(false);
    if (onClose) onClose(); // Close mobile sidebar if open
    // Navigation to login page will be handled by ProtectedRoute
  };

  const renderMenuItem = (link: any, isGreen = false) => {
    if (isDisabled) {
      return (
        <div
          className={cn(
            buttonVariants({
              variant: "ghost",
              size: "sm",
              className:
                "w-full justify-start h-full p-1 font-medium opacity-50 cursor-not-allowed",
            })
          )}
        >
          <span 
            className={cn(
              "p-2 rounded-full",
              isGreen ? "border-2 border-[#ffffff]/20 bg-transparent" : "bg-[#414E60]"
            )}
          >
            <img
              src={`${link.Icon}`}
              className="size-5"
              alt={link.title}
            />
          </span>
          <span>{link.title}</span>
        </div>
      );
    }

    return (
      <NavLink
        end
        to={link.link}
        onClick={() => onClose && onClose()}
        className={({ isActive }) =>
          cn(
            buttonVariants({
              variant: isActive
                ? "default-sidebar-button"
                : "ghost",
              size: "sm",
              className:
                "w-full justify-start h-full p-1 font-medium",
            })
          )
        }
      >
        {({ isActive }) => (
          <>
            <span
              className={cn(
                "p-2 rounded-full",
                isGreen 
                  ? "border-2 border-[#ffffff]/20 bg-transparent"
                  : isActive ? "bg-[#818A94]" : "bg-[#414E60]"
              )}
            >
              <img
                src={`${link.Icon}`}
                className="size-5"
                alt={link.title}
              />
            </span>
            <span>{link.title}</span>
          </>
        )}
      </NavLink>
    );
  };

  return (
    <div
      className="flex flex-col h-full justify-between space-y-4 "
      style={{
        scrollbarWidth: "none" /* Firefox */,
        msOverflowStyle: "none" /* Internet Explorer 10+ */,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.scrollbarWidth = "thin";
        e.currentTarget.style.scrollbarColor = "#08B882 transparent";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.scrollbarWidth = "none";
      }}
    >
      <div className="flex flex-col space-y-4">
        {/* first card */}
        <SidebarCard>
          <div className="flex items-center justify-between px-4 mb-8">
            <span className="mr-1">
              <img src="/assets/icons/icon_1.svg" alt="Logo" />
            </span>
            <div className="flex items-center justify-between relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-between cursor-pointer hover:opacity-80 transition-opacity"
              >
                <div className="flex flex-col mr-2">
                  <span className="text-[16px] text-white">Dappomatics</span>
                  <span className="text-[12px] text-[#737373] text-start">
                    {isDisabled ? "Pending Approval" : "Merchant"}
                  </span>
                </div>
                <div className="flex items-center justify-center">
                  {isDropdownOpen ? (
                    <ChevronUp size={18} color="#737373" />
                  ) : (
                    <ChevronDown size={18} color="#737373" />
                  )}
                </div>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div
                  className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50"
                  ref={dropdownRef}
                >
                  <div className="py-1">
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-full border-2 border-[#08B882] text-right">
                <BellIcon className="text-[#08B882]" size="18px" />
              </span>
              {/* Mobile close button */}
              {onClose && (
                <button
                  onClick={onClose}
                  className="lg:hidden p-2 rounded-full hover:bg-gray-700 transition-colors"
                >
                  <X size={18} className="text-white" />
                </button>
              )}
            </div>
          </div>
          <div className="flex flex-col px-4">
            <nav>
              <ul className="space-y-2 font-dashboardmenu">
                {dashboardMenuItemsOne.map((link) => (
                  <li key={link.link}>
                    {renderMenuItem(link)}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </SidebarCard>

       
      

        {/* Admin menu card - only show for admin users */}
        {isAdmin && (
          <SidebarCard>
            <div className="flex flex-col px-4">
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wide">
                  Admin Panel
                </h3>
              </div>
              <nav>
                <ul className="space-y-2 font-dashboardmenu">
                  {dashboardMenuItemsAdmin.map((link) => (
                    <li key={link.link}>
                      {renderMenuItem(link)}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </SidebarCard>
        )}

        <SidebarCard>
          {isDisabled ? (
            <div className="flex items-center px-4 py-2 opacity-50 cursor-not-allowed">
              <div className="w-10 h-10 rounded-full bg-[#08B882] text-white flex items-center justify-center mr-3">
                <span className="text-lg font-semibold">SK</span>
              </div>
              <div className="flex-1">
                <p className="text-white text-sm font-medium">Saqib Kamal</p>
                <p className="text-[#737373] text-xs">saqibkamal@gmail.com</p>
              </div>
              <Settings size={18} className="text-[#737373]" />
            </div>
          ) : (
            <NavLink
              to={FullRoutePath.USER_PROFILE}
              className="flex items-center px-4 py-2"
              onClick={() => onClose && onClose()}
            >
              <div className="w-10 h-10 rounded-full bg-[#08B882] text-white flex items-center justify-center mr-3">
                <span className="text-lg font-semibold">SK</span>
              </div>
              <div className="flex-1">
                <p className="text-white text-sm font-medium">Saqib Kamal</p>
                <p className="text-[#737373] text-xs">saqibkamal@gmail.com</p>
              </div>
              <Settings size={18} className="text-[#737373]" />
            </NavLink>
          )}
        </SidebarCard>
      </div>
    </div>
  );
};

export default SideBar;
