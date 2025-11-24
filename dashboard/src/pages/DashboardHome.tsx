const DashboardHome = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">لوحة التحكم</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">الصفحات</h2>
          <p className="text-gray-600">إدارة صفحات الموقع</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">الخدمات</h2>
          <p className="text-gray-600">إدارة الخدمات</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">المشاريع</h2>
          <p className="text-gray-600">إدارة المشاريع</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;

