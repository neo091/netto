function Loader({ secondary }) {


  if (secondary) return (<div className="min-h-screen bg-gray-900 flex justify-center items-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
  </div>)


  return (
    <div className="w-full h-full min-h-svh min-w-full flex items-center justify-center bg-gray-900 text-white">
      <img
        src="/cabstatusIcon.png"
        className="animate-bounce w-16"
        alt="cab status icon"
      />
    </div>
  )
}

export default Loader
