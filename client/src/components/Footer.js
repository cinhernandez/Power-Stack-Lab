import { useLocation } from 'react-router-dom';

const Footer = () => {

    const location = useLocation();
    if (location.pathname === '/') {
        return null;
    }
    
    return (
        <div>
        <header>
          {/* Your header here */}
        </header>
        <main className="flex-grow">
          {/* Your main content here */}
        </main>
        <footer className="bg-black p-4 text-center text-white">
          © 2023 PWR Stack Lab. All rights reserved.
        </footer>
      </div>
      

    )
}

export default Footer