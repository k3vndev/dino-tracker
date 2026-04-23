export const ImageDisplay = ({ imgCSS = '' }) => (
  <div
    className='absolute size-full top-0 left-0 bg-cover bg-center opacity-15 pointer-events-none blur-[2px]'
    style={{ backgroundImage: imgCSS }}
  />
)
