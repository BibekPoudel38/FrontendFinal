import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GoogleLoginButton = () => {
    const navigate = useNavigate();

    const handleSuccess = async (credentialResponse) => {
        try {
            const { credential } = credentialResponse;

            // Send the token to your backend
            const res = await axios.post("http://127.0.0.1:8000/api/auth/google/", {
                token: credential,
            });

            console.log(JSON.stringify(res));

            if (res.status !== 200) {
                throw new Error("Google login failed.");
            }

            // Save the returned access and refresh tokens
            localStorage.setItem("accessToken", res.data.access);
            localStorage.setItem("refreshToken", res.data.refresh);

            navigate("/dashboard"); // redirect to home or dashboard
        } catch (err) {
            console.error(err);
            alert("Google login failed.");
        }
    };

    const handleError = () => {
        alert("Google login error. Try again!");
    };

    return (
        <div className="flex justify-center mt-4">
            <GoogleLogin
                size="large"
                onSuccess={handleSuccess}
                onError={handleError}
                useOneTap
            />
        </div>
    );
};

export default GoogleLoginButton;
