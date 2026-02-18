import { Link, useLocation } from 'react-router-dom';
// Optional: Install icons with `npm install lucide-react`
import { 
  LayoutDashboard, 
  ShoppingBag, 
  BarChart3, 
  ClipboardList, 
  CreditCard, 
  Settings 
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  // Define your navigation items based on your file structure
  const menuItems = [
    { name: 'Storefront', path: '/', icon: ShoppingBag },
    { name: 'POS Dashboard', path: '/pos', icon: LayoutDashboard },
    { name: 'Analytics (EOQ)', path: '/analytics', icon: BarChart3 },
    { name: 'Inventory/BOM', path: '/inventory', icon: ClipboardList },
    { name: 'Transactions', path: '/transactions', icon: CreditCard },
  ];

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col sticky top-0">
      {/* Branding Area */}
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
          ShopAdmin Pro
        </h2>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-indigo-50 text-indigo-700' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon size={20} className={isActive ? 'text-indigo-600' : 'text-gray-400'} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Footer Section */}
      <div className="p-4 border-t border-gray-100">
        <button className="flex items-center gap-3 px-4 py-3 w-full text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg">
          <Settings size={20} />
          Settings
        </button>
      </div>
    </div>
  );
};

export default Sidebar;