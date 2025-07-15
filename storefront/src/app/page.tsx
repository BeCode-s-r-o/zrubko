import { redirect } from 'next/navigation'

export default function RootPage() {
  // Let middleware handle the regional routing based on IP geolocation
  // This should not be reached due to middleware redirect
  redirect('/sk')
} 