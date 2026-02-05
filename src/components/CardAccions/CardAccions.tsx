import Link from 'next/link'
import React from 'react'

interface CardAccions {
    text:string;
    link:string;
}

export const CardAccions = ({text, link}:CardAccions) => {
    return (
        <Link href={link}>
            <div className='w-100 h-60 bg-white flex justify-center items-center rounded-xl border border-blue-800   cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-xl'>
                <p className='text-4xl font-bold text-blue-500'>{text}</p>
            </div>
        </Link>
    )
}
