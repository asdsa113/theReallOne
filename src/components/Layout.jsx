import Header from './Header'
import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="p-4 md:p-6 lg:p-8">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Layout

