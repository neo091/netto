import { Link } from "react-router-dom"
import { useAuth } from "../context/auth/useAuth"
import PageTitle from "../components/PageTitle"
import LoggedSection from "../components/features/LoggedSection"
import LoginFormSection from "../components/features/LoginFormSection"
import CenterContentLayout from "../layouts/CenterContentLayout"


const Login = () => {

  const { user } = useAuth()
  if (user) {
    return (<LoggedSection />)
  }

  return (
    <CenterContentLayout>
      <div className="absolute top-0 w-72 h-72 bg-green-500/10 blur-[120px] rounded-full z-0"></div>

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-10">
          <PageTitle />
          <p className="text-gray-400 mt-2">Bienvenido de nuevo, compañero.</p>
        </div>

        <LoginFormSection />

        <p className="text-center text-gray-500 mt-8 text-sm">
          ¿No tienes cuenta?{" "}
          <Link to={"/SignUp"} >

            <span className="text-green-500 font-bold cursor-pointer">
              Contacta con soporte
            </span></Link>
        </p>
      </div>
    </CenterContentLayout>
  )
}
export default Login