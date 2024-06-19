import React from 'react'

const DiamondPlan = ({ color }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none">
            <path d="M18.5 12C18.5 15.5899 15.5899 18.5 12 18.5C8.41015 18.5 5.5 15.5899 5.5 12C5.5 6.36645 11.2303 2.93685 11.9302 2.53894C11.9741 2.51402 12.0259 2.51402 12.0698 2.53894C12.7697 2.93685 18.5 6.36645 18.5 12Z" stroke={color} stroke-linejoin="round" />
            <path d="M15.4991 11.9216L14.9992 11.9317L14.9993 11.9326L15.4991 11.9216ZM8.5 12.0002L9 12.0001L8.5 12.0002ZM11.9141 6.56397L12.2162 6.96235L11.9141 6.56397ZM12.0859 6.56395L12.388 6.16557L12.0859 6.56395ZM11.6119 6.16559C11.3275 6.38131 10.4392 7.08803 9.61737 8.09976C8.80358 9.10166 7.99995 10.4701 7.99994 12.0001L8.99994 12.0001C8.99995 10.8104 9.63467 9.66457 10.3936 8.73023C11.1445 7.80573 11.9632 7.15425 12.2162 6.96235L11.6119 6.16559ZM15.999 11.9114C15.9684 10.4031 15.1657 9.05682 14.3586 8.0704C13.5437 7.07443 12.6698 6.37926 12.388 6.16557L11.7837 6.96233C12.0342 7.15226 12.8396 7.79311 13.5847 8.70366C14.3375 9.62375 14.9754 10.7545 14.9992 11.9317L15.999 11.9114ZM14.9993 11.9326C14.9998 11.9549 15 11.9774 15 11.9999H16C16 11.9701 15.9997 11.9403 15.999 11.9106L14.9993 11.9326ZM15 11.9999C15 13.6567 13.6569 14.9999 12 14.9999V15.9999C14.2091 15.9999 16 14.209 16 11.9999H15ZM12 14.9999C10.3432 14.9999 9.00014 13.6569 9 12.0001L8 12.0002C8.00019 14.2092 9.79098 15.9999 12 15.9999V14.9999ZM7.99994 12.0001C7.99994 12.2751 8.22267 12.5002 8.49997 12.5002V11.5002C8.77723 11.5002 8.99994 11.7251 8.99994 12.0001L7.99994 12.0001ZM9 12.0001C8.99998 11.7291 8.78117 11.5002 8.49997 11.5002V12.5002C8.2188 12.5002 8.00002 12.2712 8 12.0002L9 12.0001ZM12.2162 6.96235C12.0888 7.05902 11.9114 7.05918 11.7837 6.96233L12.388 6.16557C12.1582 5.99125 11.8415 5.99146 11.6119 6.16559L12.2162 6.96235Z" fill={color} />
            <path d="M12 21V12" stroke={color} />
            <circle cx="12" cy="12" r="1" fill="#222222" />
        </svg>
    )
}

export default DiamondPlan