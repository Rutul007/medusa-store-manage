import { Button, Heading, Text } from "@modules/common/components/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SignInPrompt = () => {
  return (
    <div className="cart-signin-prompt">
      <div className="cart-signin-prompt__copy">
        <Heading level="h2">Already part of the studio?</Heading>
        <Text>Sign in to keep your account details close at hand.</Text>
      </div>
      <div className="cart-signin-prompt__action">
        <LocalizedClientLink href="/account">
          <Button variant="secondary" data-testid="sign-in-button">
            Sign in
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default SignInPrompt
