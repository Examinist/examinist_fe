import axios from "axios";
import { SignInInputs } from "../pages/SignIn/components/SignInForm";


export async function loginAPI(inputs: any){
     const response = await axios.post("/admin_portal/sessions", inputs);
     return response.data;
}
