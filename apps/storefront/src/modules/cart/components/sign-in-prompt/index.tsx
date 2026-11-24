import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Button, Heading, Text } from "@modules/common/components/ui"

const SignInPrompt = () => {
  return (
    <div className="border-2 border-creata-ink bg-creata-lilac-soft shadow-zine-sm p-5 flex flex-wrap items-center justify-between gap-4">
      <div>
        <Heading level="h2" className="text-base sm:text-lg uppercase">
          ALREADY HAVE A STUDIO ACCOUNT?
        </Heading>
        <Text className="text-xs sm:text-sm text-creata-muted mt-0.5">
          Sign in to keep your saved addresses and orders close at hand.
        </Text>
      </div>
      <LocalizedClientLink href="/account">
        <Button variant="secondary" size="small" data-testid="sign-in-button">
          SIGN IN
        </Button>
      </LocalizedClientLink>
    </div>
  )
}

export default SignInPrompt
