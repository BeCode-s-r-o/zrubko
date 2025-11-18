"use client"

import { memo, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { Check } from "lucide-react"

function StepIndicatorComponent() {
  const searchParams = useSearchParams()
  const currentStep = searchParams.get("step") || "address"

  const steps = [
    { id: 'address', label: 'Adresa', number: 1 },
    { id: 'delivery', label: 'Doručenie', number: 2 },
    { id: 'payment', label: 'Platba', number: 3 },
  ]

  const getStepStatus = (stepId: string) => {
    const stepIndex = steps.findIndex(step => step.id === stepId)
    const currentIndex = steps.findIndex(step => step.id === currentStep)

    if (stepIndex < currentIndex) return 'completed'
    if (stepIndex === currentIndex) return 'active'
    return 'pending'
  }

  const getStepStyles = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          circle: 'bg-primary border-primary text-white',
          line: 'bg-primary',
          text: 'text-primary'
        }
      case 'active':
        return {
          circle: 'bg-white border-primary text-primary ring-2 ring-primary ring-opacity-50',
          line: 'bg-gray-300',
          text: 'text-primary font-semibold'
        }
      case 'pending':
      default:
        return {
          circle: 'bg-white border-gray-300 text-gray-400',
          line: 'bg-gray-300',
          text: 'text-gray-400'
        }
    }
  }

  return (
    <div className="w-full bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-4 md:gap-8">
          {steps.map((step, index) => {
            const status = getStepStatus(step.id)
            const styles = getStepStyles(status)

            return (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center relative">
                  <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-semibold text-sm transition-all duration-300 ${styles.circle}`}>
                    {status === 'completed' ? (
                      <Check size={18} className="text-white" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <span className={`mt-3 text-xs md:text-sm font-medium uppercase tracking-wide text-center transition-all duration-300 ${styles.text}`}>
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 md:mx-4 transition-all duration-300 ${styles.line}`} />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default memo(StepIndicatorComponent)
