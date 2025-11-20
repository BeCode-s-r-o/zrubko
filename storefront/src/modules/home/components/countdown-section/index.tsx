'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

interface CountdownSectionProps {
  title: string
  endDate: string
  buttonText: string
  buttonLink: string
  backgroundImage: string
}

export default function CountdownSection({ 
  title, 
  endDate, 
  buttonText, 
  buttonLink,
  backgroundImage 
}: CountdownSectionProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(endDate) - +new Date()
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [endDate])

  return (
    <section 
      className="py-10 py-lg-15 bg-img-cover-center bg-custom-01"
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      <div className="container">
        <div className="row">
          <div className="col-xl-6">
            <h2 className="fs-30 fs-md-60 mb-6 text-center">{title}</h2>
            <div className="countdown d-flex justify-content-center mb-8" data-countdown="true" data-countdown-end={endDate}>
              <div className="countdown-item d-flex flex-column text-center px-2 px-sm-4">
                <span className="fs-30 fs-sm-40 fs-lg-60 lh-1 text-primary day">{String(timeLeft.days).padStart(2, '0')}</span>
                <span className="fs-12 letter-spacing-05 text-uppercase text-primary font-weight-500">days</span>
              </div>
              <div className="separate fs-30">:</div>
              <div className="countdown-item d-flex flex-column text-center px-2 px-sm-4">
                <span className="fs-30 fs-sm-40 fs-lg-60 lh-1 text-primary hour">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="fs-12 letter-spacing-05 text-uppercase text-primary font-weight-500">hours</span>
              </div>
              <div className="separate fs-30">:</div>
              <div className="countdown-item d-flex flex-column text-center px-2 px-sm-4">
                <span className="fs-30 fs-sm-40 fs-lg-60 lh-1 text-primary minute">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="fs-12 letter-spacing-05 text-uppercase text-primary font-weight-500">minutes</span>
              </div>
              <div className="separate fs-30">:</div>
              <div className="countdown-item d-flex flex-column text-center px-2 px-sm-4">
                <span className="fs-30 fs-sm-40 fs-lg-60 lh-1 text-primary second">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="fs-12 letter-spacing-05 text-uppercase text-primary font-weight-500">seconds</span>
              </div>
            </div>
            <div className="text-center mb-3">
              <Link href={buttonLink} className="btn btn-outline-primary text-uppercase letter-spacing-05 px-5">
                {buttonText}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

