import { getCustomer } from "@lib/data/customer"
import AccountLayout from "@modules/account/templates/account-layout"

export default async function AccountPageLayout({
  dashboard,
  login,
}: {
  dashboard?: React.ReactNode
  login?: React.ReactNode
}) {
  const customer = await getCustomer().catch(() => null)

  return (
    <AccountLayout 
      customer={customer}
      showBreadcrumbs={!!customer} // Show breadcrumbs only for logged-in users (dashboard)
      currentPage="Môj účet"
    >
      {customer ? dashboard : login}
    </AccountLayout>
  )
}
