import { redirect } from 'next/navigation'

export default function RootPage() {
  // Redirect to default region when accessing root
  redirect('/us')
} 