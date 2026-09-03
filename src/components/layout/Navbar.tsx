import React, { useState } from "react";
import {
  FileText,
  Home,
  Download,
  Smartphone,
  Shield,
  Info,
  Moon,
  Sun,
  HelpCircle,
  Menu,
  X,
  Plus,
  ChevronDown,
} from "lucide-react";
import { Button } from "../common/Button";

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  onNewForm?: () => void;
  onReplayTour: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  onNewForm,
  onReplayTour,
  isDark,
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formsDropdownOpen, setFormsDropdownOpen] = useState(false);

  // Updated array (PDS Builder removed from here, handled separately)
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: <Home className="w-4 h-4" /> },
    {
      id: "export-import",
      label: "Export / Import",
      icon: <Download className="w-4 h-4" />,
    },
    {
      id: "install",
      label: "Install App",
      icon: <Smartphone className="w-4 h-4" />,
    },
    { id: "privacy", label: "Privacy", icon: <Shield className="w-4 h-4" /> },
    { id: "about", label: "About", icon: <Info className="w-4 h-4" /> },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-3 z-40 px-3 sm:px-6 mb-6">
      <div className="max-w-7xl mx-auto bg-surface-light/90 dark:bg-surface-dark/90 backdrop-blur-md border border-border-light dark:border-border-dark rounded-2xl shadow-sm px-4 py-2.5 flex items-center justify-between transition-colors duration-200">
        {/* Brand / Logo */}
        <div
          onClick={() => handleNavClick("dashboard")}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <div className="w-8 h-8 rounded-lg bg-teal-600 dark:bg-teal-500 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform duration-150">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-base tracking-tight text-slate-900 dark:text-slate-100">
                GovForms
                <span className="text-teal-600 dark:text-teal-400">PH</span>
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {/* Dashboard */}
          <button
            onClick={() => handleNavClick("dashboard")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              currentTab === "dashboard"
                ? "bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200/60 dark:border-teal-800/60"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/80"
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          {/* Forms Dropdown */}
          <div className="relative">
            <button
              onClick={() => setFormsDropdownOpen(!formsDropdownOpen)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                currentTab === "editor"
                  ? "bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200/60 dark:border-teal-800/60"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/80"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Forms</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>

            {formsDropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl shadow-lg py-1.5 z-50">
                <button
                  onClick={() => {
                    handleNavClick("editor");
                    setFormsDropdownOpen(false);
                  }}
                  className="w-full text-left px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-teal-50 dark:hover:bg-teal-950/50 hover:text-teal-600 dark:hover:text-teal-300 cursor-pointer flex items-center justify-between"
                >
                  <span>PDS</span>
                </button>
                <div className="w-full text-left px-3.5 py-2 text-xs font-medium text-slate-400 dark:text-slate-500 cursor-not-allowed flex items-center justify-between">
                  <span>Work Experience Sheet</span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-600 italic">
                    Coming soon
                  </span>
                </div>
                <div className="w-full text-left px-3.5 py-2 text-xs font-medium text-slate-400 dark:text-slate-500 cursor-not-allowed flex items-center justify-between">
                  <span>SALN</span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-600 italic">
                    Coming soon
                  </span>
                </div>
                <div className="w-full text-left px-3.5 py-2 text-xs font-medium text-slate-400 dark:text-slate-500 cursor-not-allowed flex items-center justify-between">
                  <span>Service Record</span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-600 italic">
                    Coming soon
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Remaining Nav Items */}
          {navItems.slice(1).map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  isActive
                    ? "bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200/60 dark:border-teal-800/60"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/80"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {onNewForm && (
            <Button
              variant="primary"
              size="sm"
              icon={<Plus className="w-4 h-4" />}
              onClick={onNewForm}
              className="hidden sm:inline-flex"
            >
              New PDS Form
            </Button>
          )}

          {/* Quick Tour Button */}
          <button
            onClick={onReplayTour}
            title="Replay Quick Tour"
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Replay Tour"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={onToggleTheme}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Toggle Theme"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 p-3 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-2xl shadow-xl space-y-1 animate-in fade-in slide-in-from-top-2 duration-150">
          {onNewForm && (
            <div className="pb-2 border-b border-border-light dark:border-border-dark mb-2">
              <Button
                variant="primary"
                size="sm"
                icon={<Plus className="w-4 h-4" />}
                onClick={() => {
                  onNewForm();
                  setMobileMenuOpen(false);
                }}
                className="w-full justify-center"
              >
                New PDS Form
              </Button>
            </div>
          )}

          {/* Dashboard Mobile Link */}
          <button
            onClick={() => handleNavClick("dashboard")}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
              currentTab === "dashboard"
                ? "bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 font-semibold"
                : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          {/* Forms Section Mobile */}
          <div className="pt-1 pb-1">
            <div className="px-3.5 py-1 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              Forms
            </div>
            <div className="ml-3 pl-2 border-l border-slate-200 dark:border-slate-800 space-y-1 mt-1">
              <button
                onClick={() => handleNavClick("editor")}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  currentTab === "editor"
                    ? "bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 font-semibold"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <span>PDS</span>
              </button>
              <div className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-slate-400 dark:text-slate-500 cursor-not-allowed">
                <span>Work Experience Sheet</span>
                <span className="text-[10px] text-slate-400 dark:text-slate-600 italic">
                  Coming soon
                </span>
              </div>
              <div className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-slate-400 dark:text-slate-500 cursor-not-allowed">
                <span>SALN</span>
                <span className="text-[10px] text-slate-400 dark:text-slate-600 italic">
                  Coming soon
                </span>
              </div>
              <div className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-slate-400 dark:text-slate-500 cursor-not-allowed">
                <span>Service Record</span>
                <span className="text-[10px] text-slate-400 dark:text-slate-600 italic">
                  Coming soon
                </span>
              </div>
            </div>
          </div>

          {/* Remaining Nav Items Mobile */}
          {navItems.slice(1).map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? "bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 font-semibold"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
