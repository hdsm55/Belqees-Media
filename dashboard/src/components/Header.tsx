const Header = () => {
  return (
    <header className="bg-white shadow-sm px-6 py-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">لوحة التحكم</h2>
        <div className="flex items-center gap-4">
          <button className="text-gray-600 hover:text-gray-900">الإعدادات</button>
          <button className="text-gray-600 hover:text-gray-900">تسجيل الخروج</button>
        </div>
      </div>
    </header>
  );
};

export default Header;

