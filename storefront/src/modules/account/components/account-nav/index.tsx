"use client"

import { clx } from "@medusajs/ui"
import { ArrowRightOnRectangle } from "@medusajs/icons"
import { useParams, usePathname } from "next/navigation"

import ChevronDown from "@modules/common/icons/chevron-down"
import User from "@modules/common/icons/user"
import MapPin from "@modules/common/icons/map-pin"
import Package from "@modules/common/icons/package"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import { signout } from "@lib/data/customer"
import { useTranslations } from "next-intl"

const AccountNav = ({
  customer,
}: {
  customer: HttpTypes.StoreCustomer | null
}) => {
  const route = usePathname()
  const { countryCode } = useParams() as { countryCode: string }
  const tAcc = useTranslations("account")
  const tCommon = useTranslations("common")

  const handleLogout = async () => {
    await signout(countryCode)
  }

  const hasCompanyData = customer?.metadata?.company_name || customer?.metadata?.ico || customer?.metadata?.dic || customer?.metadata?.ic_dph

  return (
    <div>
      <div className="small:hidden" data-testid="mobile-account-nav">
        {route !== `/${countryCode}/ucet` ? (
          <LocalizedClientLink
            href="/ucet"
            className="flex items-center gap-x-2 text-small-regular py-2"
            data-testid="account-main-link"
          >
            <>
              <ChevronDown className="transform rotate-90" />
              <span>Account</span>
            </>
          </LocalizedClientLink>
        ) : (
          <>
            <div className="text-xl-semi mb-4 px-8">
              Hello {customer?.first_name}
            </div>
            <div className="text-base-regular">
              <ul>
                <li>
                  <LocalizedClientLink
                    href="/ucet/profile"
                    className="flex items-center justify-between py-4 border-b border-gray-200 px-8"
                    data-testid="profile-link"
                  >
                    <>
                      <div className="flex items-center gap-x-2">
                        <User size={20} />
                        <span>{tAcc.has("profile") ? tAcc("profile") : "Profil"}</span>
                      </div>
                      <ChevronDown className="transform -rotate-90" />
                    </>
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/ucet/adresy"
                    className="flex items-center justify-between py-4 border-b border-gray-200 px-8"
                    data-testid="addresses-link"
                  >
                    <>
                      <div className="flex items-center gap-x-2">
                        <MapPin size={20} />
                        <span>{tAcc.has("addresses") ? tAcc("addresses") : "Adresy"}</span>
                      </div>
                      <ChevronDown className="transform -rotate-90" />
                    </>
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/ucet/orders"
                    className="flex items-center justify-between py-4 border-b border-gray-200 px-8"
                    data-testid="orders-link"
                  >
                    <div className="flex items-center gap-x-2">
                      <Package size={20} />
                      <span>{tAcc.has("orders") ? tAcc("orders") : "Objednávky"}</span>
                    </div>
                    <ChevronDown className="transform -rotate-90" />
                  </LocalizedClientLink>
                </li>
                <li>
                  <button
                    type="button"
                    className="flex items-center justify-between py-4 border-b border-gray-200 px-8 w-full"
                    onClick={handleLogout}
                    data-testid="logout-button"
                  >
                    <div className="flex items-center gap-x-2">
                      <ArrowRightOnRectangle />
                      <span>{tAcc.has("logout") ? tAcc("logout") : "Odhlásiť sa"}</span>
                    </div>
                    <ChevronDown className="transform -rotate-90" />
                  </button>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
      <div className="hidden small:block" data-testid="account-nav">
        <div className="max-w-2xl mx-auto">
          <div className="text-base-regular">
            <ul className="flex mb-4 justify-center text-white bg-secondary items-center flex-row gap-x-6 p-4 rounded-lg">
              <li>
                <AccountNavLink
                  href="/ucet"
                  route={route!}
                  data-testid="overview-link"
                >
                  {tAcc.has("overview") ? tAcc("overview") : "Prehľad"}
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink
                  href="/ucet/profile"
                  route={route!}
                  data-testid="profile-link"
                >
                  {tAcc.has("profile") ? tAcc("profile") : "Profil"}
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink
                  href="/ucet/adresy"
                  route={route!}
                  data-testid="addresses-link"
                >
                  {tAcc.has("addresses") ? tAcc("addresses") : "Adresy"}
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink
                  href="/ucet/orders"
                  route={route!}
                  data-testid="orders-link"
                >
                  {tAcc.has("orders") ? tAcc("orders") : "Objednávky"}
                </AccountNavLink>
              </li>
              <li className="text-grey-700">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-white underline hover:no-underline w-full text-left"
                  data-testid="logout-button"
                >
                  {tAcc.has("logout") ? tAcc("logout") : "Odhlásiť sa"}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

type AccountNavLinkProps = {
  href: string
  route: string
  children: React.ReactNode
  "data-testid"?: string
}

const AccountNavLink = ({
  href,
  route,
  children,
  "data-testid": dataTestId,
}: AccountNavLinkProps) => {
  const { countryCode }: { countryCode: string } = useParams()

  const active = route.split(countryCode)[1] === href
  return (
    <LocalizedClientLink
      href={href}
      className={clx(
        "text-gray-100 hover:text-gray-900 transition-colors duration-200 px-3 py-2 rounded-md hover:bg-gray-100",
        {
          "text-gray-900 font-semibold bg-gray-100": active,
        }
      )}
      data-testid={dataTestId}
    >
      {children}
    </LocalizedClientLink>
  )
}

export default AccountNav
