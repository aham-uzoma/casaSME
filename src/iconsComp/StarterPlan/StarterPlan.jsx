import React from 'react'

const StarterPlan = ({ color }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none">
            <path d="M19.5 9.5V8.7C19.5 7.57989 19.5 7.01984 19.282 6.59202C19.0903 6.21569 18.7843 5.90973 18.408 5.71799C17.9802 5.5 17.4201 5.5 16.3 5.5H7.7C6.5799 5.5 6.01984 5.5 5.59202 5.71799C5.21569 5.90973 4.90973 6.21569 4.71799 6.59202C4.5 7.01984 4.5 7.57989 4.5 8.7V9.5M19.5 9.5V16.3C19.5 17.4201 19.5 17.9802 19.282 18.408C19.0903 18.7843 18.7843 19.0903 18.408 19.282C17.9802 19.5 17.4201 19.5 16.3 19.5H7.7C6.57989 19.5 6.01984 19.5 5.59202 19.282C5.21569 19.0903 4.90973 18.7843 4.71799 18.408C4.5 17.9802 4.5 17.4201 4.5 16.3V9.5M19.5 9.5H4.5" stroke={color} />
            <path d="M8.5 3.5L8.5 7.5M15.5 3.5L15.5 7.5" stroke={color} stroke-linecap="round" />
            <path d="M12 17L12 12" stroke={color} stroke-linecap="round" />
            <path d="M14.5 14.5L9.5 14.5" stroke={color} stroke-linecap="round" />
        </svg>
    )
}

export default StarterPlan