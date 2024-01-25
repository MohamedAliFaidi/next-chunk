import Register from "../../../components/auth/Register"
import Client from "../../../components/ClientWrap";
function page() {
  return (
    <div>
        <Client>
        <Register />
        </Client>
    </div>
  )
}

export default page