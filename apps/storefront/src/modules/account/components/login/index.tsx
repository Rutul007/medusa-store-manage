import { login } from "@lib/data/customer"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import Input from "@modules/common/components/input"
import { useActionState } from "react"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Login = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(login, null)

  return (
    <div
      className="max-w-sm w-full flex flex-col items-center"
      data-testid="login-page"
    >
      <span className="px-3 py-1 border-[1.5px] border-creata-ink bg-creata-yellow font-mono text-[10px] font-bold uppercase tracking-widest text-creata-ink -rotate-1 shadow-zine-sm mb-4">
        CREATA 3D // ACCOUNT
      </span>
      <h1 className="font-display font-extrabold text-3xl uppercase text-creata-ink mb-2 text-center">
        WELCOME BACK
      </h1>
      <p className="text-center text-sm text-creata-muted mb-8">
        Sign in to manage your CREATA 3D orders and saved addresses.
      </p>
      {message?.state === "verification_required" && (
        <div
          className="w-full mb-6 text-center text-sm text-creata-ink bg-creata-mint border-2 border-creata-ink shadow-zine-sm p-4"
          data-testid="login-verification-message"
        >
          We sent a verification link to <strong>{message.email}</strong>.
          Please verify your email, then sign in.
        </div>
      )}
      <form className="w-full" action={formAction}>
        <div className="flex flex-col w-full gap-y-3">
          <Input
            label="Email"
            name="email"
            type="email"
            title="Enter a valid email address."
            autoComplete="email"
            required
            data-testid="email-input"
          />
          <Input
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            data-testid="password-input"
          />
        </div>
        <ErrorMessage
          error={message?.state === "error" ? message.error : null}
          data-testid="login-error-message"
        />
        <SubmitButton data-testid="sign-in-button" className="w-full mt-6">
          SIGN IN
        </SubmitButton>
      </form>
      <span className="text-center text-creata-muted text-xs mt-6">
        Not a member?{" "}
        <button
          type="button"
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          className="font-mono font-bold uppercase text-creata-ink underline underline-offset-2 hover:bg-creata-yellow px-1"
          data-testid="register-button"
        >
          JOIN CREATA 3D
        </button>
        .
      </span>
    </div>
  )
}

export default Login
