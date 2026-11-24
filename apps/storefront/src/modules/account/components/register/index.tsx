"use client"

import { signup } from "@lib/data/customer"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import Input from "@modules/common/components/input"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useActionState } from "react"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(signup, null)

  return (
    <div
      className="max-w-sm w-full flex flex-col items-center"
      data-testid="register-page"
    >
      <span className="px-3 py-1 border-[1.5px] border-creata-ink bg-creata-mint text-creata-ink font-mono text-[10px] font-bold uppercase tracking-widest rotate-1 shadow-zine-sm mb-4">
        STUDIO ACCOUNT
      </span>
      <h1 className="font-display font-extrabold text-3xl uppercase text-creata-ink mb-2 text-center">
        JOIN CREATA 3D
      </h1>
      <p className="text-center text-sm text-creata-muted mb-6">
        Create your CREATA 3D profile to track orders and save addresses.
      </p>
      {message?.state === "verification_required" && (
        <div
          className="w-full mb-4 text-center text-sm text-creata-ink bg-creata-mint border-2 border-creata-ink shadow-zine-sm p-4"
          data-testid="register-verification-message"
        >
          We sent a verification link to <strong>{message.email}</strong>.
          Please check your inbox to verify your email, then sign in.
        </div>
      )}
      <form className="w-full flex flex-col" action={formAction}>
        <div className="flex flex-col w-full gap-y-3">
          <Input
            label="First name"
            name="first_name"
            required
            autoComplete="given-name"
            data-testid="first-name-input"
          />
          <Input
            label="Last name"
            name="last_name"
            required
            autoComplete="family-name"
            data-testid="last-name-input"
          />
          <Input
            label="Email"
            name="email"
            required
            type="email"
            autoComplete="email"
            data-testid="email-input"
          />
          <Input
            label="Phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            data-testid="phone-input"
          />
          <Input
            label="Password"
            name="password"
            required
            type="password"
            autoComplete="new-password"
            data-testid="password-input"
          />
        </div>
        <ErrorMessage
          error={message?.state === "error" ? message.error : null}
          data-testid="register-error"
        />
        <span className="text-center text-creata-muted text-xs mt-5 leading-relaxed">
          By creating an account, you agree to CREATA 3D&apos;s{" "}
          <LocalizedClientLink
            href="/privacy"
            className="underline font-semibold text-creata-ink hover:bg-creata-yellow px-0.5"
          >
            Privacy Policy
          </LocalizedClientLink>{" "}
          and{" "}
          <LocalizedClientLink
            href="/terms"
            className="underline font-semibold text-creata-ink hover:bg-creata-yellow px-0.5"
          >
            Terms of Use
          </LocalizedClientLink>
          .
        </span>
        <SubmitButton className="w-full mt-6" data-testid="register-button">
          JOIN CREATA 3D
        </SubmitButton>
      </form>
      <span className="text-center text-creata-muted text-xs mt-6">
        Already a member?{" "}
        <button
          type="button"
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="font-mono font-bold uppercase text-creata-ink underline underline-offset-2 hover:bg-creata-yellow px-1"
        >
          SIGN IN
        </button>
        .
      </span>
    </div>
  )
}

export default Register
