import React from 'react'

interface PlusIconProps {
    color?: string;
    size?: number;
  }

const PlusIcon = ({ color = 'white', size = 14 }:PlusIconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" style={{color}}>
    <path d="M0.554688 7.35938C0.554688 6.97656 0.875 6.65625 1.25 6.65625H6.30469V1.60938C6.30469 1.23438 6.61719 0.914062 7 0.914062C7.38281 0.914062 7.70312 1.23438 7.70312 1.60938V6.65625H12.75C13.125 6.65625 13.4453 6.97656 13.4453 7.35938C13.4453 7.74219 13.125 8.05469 12.75 8.05469H7.70312V13.1094C7.70312 13.4844 7.38281 13.8047 7 13.8047C6.61719 13.8047 6.30469 13.4844 6.30469 13.1094V8.05469H1.25C0.875 8.05469 0.554688 7.74219 0.554688 7.35938Z" fill="currentColor"/>
    </svg>
  )
}

export default PlusIcon