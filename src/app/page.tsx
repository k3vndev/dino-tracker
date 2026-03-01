import Link from 'next/link'

export default function HomePage() {
  return (
    <Link className='bg-white text-black p-4 rounded-xl' href='/projects'>
      Start
    </Link>
  )
}
