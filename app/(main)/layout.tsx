import Footer from '@/components/organisms/Footer';
import Header from '@/components/organisms/Header';
import PageTransition from '@/components/animations/PageTransition';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Header />
      <main className="flex-1 relative" style={{ zIndex: 1, position: 'relative' }}>
        <PageTransition>
          {children}
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
}

