const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-900 text-white">
      <div className="p-6">
        <h1 className="text-xl font-bold">بلقيس ميديا</h1>
      </div>
      <nav className="mt-6">
        <a href="/" className="block px-6 py-3 hover:bg-gray-800">
          الرئيسية
        </a>
        <a href="/pages" className="block px-6 py-3 hover:bg-gray-800">
          الصفحات
        </a>
        <a href="/services" className="block px-6 py-3 hover:bg-gray-800">
          الخدمات
        </a>
        <a href="/portfolio" className="block px-6 py-3 hover:bg-gray-800">
          المشاريع
        </a>
        <a href="/events" className="block px-6 py-3 hover:bg-gray-800">
          الفعاليات
        </a>
        <a href="/blog" className="block px-6 py-3 hover:bg-gray-800">
          المدونة
        </a>
        <a href="/media" className="block px-6 py-3 hover:bg-gray-800">
          الملفات
        </a>
      </nav>
    </aside>
  );
};

export default Sidebar;

