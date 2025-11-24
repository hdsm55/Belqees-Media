const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <div className="text-2xl font-bold">بلقيس ميديا</div>
          <div className="flex gap-4">
            <a href="/" className="hover:text-primary-600">الرئيسية</a>
            <a href="/about" className="hover:text-primary-600">من نحن</a>
            <a href="/services" className="hover:text-primary-600">الخدمات</a>
            <a href="/contact" className="hover:text-primary-600">تواصل</a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;

