import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ClientTierLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      {/* If you want the Amazon look, you can comment out the Sidebar */}
      <div className="flex flex-1">
        {/* <Sidebar /> */} 
        <main className="flex-1">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default ClientTierLayout;