
function CenterContentLayout({ children }) {
  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center px-4 relative overflow-hidden fade-in">

      {children}

    </main>
  )
}

export default CenterContentLayout
