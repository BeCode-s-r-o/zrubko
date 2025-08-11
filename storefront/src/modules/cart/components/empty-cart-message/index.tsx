import { Heading, Text } from "@medusajs/ui"

import InteractiveLink from "@modules/common/components/interactive-link"

const EmptyCartMessage = () => {
  return (
    <div className="flex flex-col justify-center items-center px-6 py-48 text-center" data-testid="empty-cart-message">
      <Heading
        level="h1"
        className="flex flex-row gap-x-2 items-baseline mb-6 text-3xl-regular"
      >
        Košík
      </Heading>
      <Text className="text-base-regular mb-8 max-w-[32rem] text-gray-600">
        Nemáte nič vo svojom košíku. Poďme to zmeniť, použite
        odkaz nižšie a začnite prehliadať naše produkty.
      </Text>
      <div>
        <InteractiveLink href="/produkty">Preskúmať produkty</InteractiveLink>
      </div>
    </div>
  )
}

export default EmptyCartMessage
