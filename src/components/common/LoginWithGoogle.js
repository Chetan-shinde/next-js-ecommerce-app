export default function LoginWithGoogle() {
  return (
    <>
      <script src="https://accounts.google.com/gsi/client" async></script>
      <div
        id="g_id_onload"
        data-client_id="190722337740-dg2uffe3gk0o2r7rqql0o0ubupmku2ge.apps.googleusercontent.com"
        data-context="signin"
        data-ux_mode="popup"
        data-login_uri="http://13.201.167.190:3000/api/login-with-google"
        data-nonce=""
        data-auto_prompt="false"
      ></div>
      <div
        className="g_id_signin"
        data-type="icon"
        data-shape="circle"
        data-theme="outline"
        data-text="signin_with"
        data-size="large"
      ></div>
    </>
  );
}
