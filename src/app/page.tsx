import Link from 'next/link'

export default function HomePage() {
  return (
    <main className='flex flex-col items-start gap-8 text-2xl'>
      <h1>Dino Tracker landing page goes here</h1>

      <Link className='bg-white text-black py-4 px-8 rounded-xl' href='/projects'>
        Start
      </Link>
    </main>
  )
}
