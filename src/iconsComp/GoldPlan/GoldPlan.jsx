import React from 'react'

const GoldPlan = ({ color }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="6" width="18" height="12" rx="2" stroke={color} />
            <path d="M5 9H8" stroke={color} stroke-linecap="round" />
            <path d="M16 15H19" stroke={color} stroke-linecap="round" />
            <circle cx="12" cy="12" r="2" stroke={color} />
        </svg>
    )
}

export default GoldPlan