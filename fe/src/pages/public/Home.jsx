import { Search } from '@/components'

function Home() {
  return (
    <div className="bg-white w-full">
      <div className="w-full h-fit relative z-0">
        <img src="/banner.png" alt="banner" className="w-full h-[752px] object-cover" />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center gap-4">
          <h1 className="text-5xl text-white">Find your Dream Home</h1>
          <p className="text-main-100 text-lg flex flex-col justify-center items-center">
            <span>
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
            </span>
            <span>cubilia curae; Proin sodales ultrices nulla blandit volutpat.</span>
          </p>
        </div>
      </div>
      <Search />
      <div className="w-main mx-auto h-[500px]">content</div>
    </div>
  )
}

export default Home
