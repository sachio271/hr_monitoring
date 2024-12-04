import { useCookies } from "react-cookie";
import { GetMcuData } from "../../api/vendors/get";
import { useAuthStore } from "../../state/authState";

export const Index = () => {
  const [cookies,] = useCookies(['refreshToken']);
  const token = useAuthStore((state) => state.auth.token)
  console.log(cookies)
  const data = GetMcuData(cookies.refreshToken, '270990', '', '')
  data.isSuccess && console.log(data.data)
  return (
    <div>Index</div>
  )
}

export default Index