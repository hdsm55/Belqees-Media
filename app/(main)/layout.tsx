import Footer from '@/components/organisms/Footer';
import PageTransition from '@/components/animations/PageTransition';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col relative">
      <main className="flex-1 relative" style={{ zIndex: 1, position: 'relative' }}>
        <PageTransition>
          {children}
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
}

