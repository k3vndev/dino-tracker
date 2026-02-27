export const AppBackground = () => {
  return (
    <div className='fixed -z-10 h-screen w-screen overflow-hidden top-0 left-0'>
      {/* Dots pattern */}
      <div className='app-bg-dots-pattern absolute inset-0 size-full top-0 left-0' />

      {/* Gradient overlay */}
      <div className='absolute inset-0 size-full top-0 left-0 bg-linear-to-b from-transparent to-(--app-bg-color)/75' />
    </div>
  )
}
