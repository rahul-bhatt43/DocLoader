import React from 'react'
import Constants from '../_utils/Constants'

const Hero = () => {
  return (
    <section className="bg-gray-50">
  <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex ">
    <div className="mx-auto max-w-xl text-center">
      <h1 className="text-3xl font-extrabold sm:text-5xl">
        <strong className="font-extrabold text-primary"> Upload, save </strong> and easily <strong className="font-extrabold text-primary "> share </strong> your files in one place
      </h1>

      <p className="mt-4 sm:text-xl/relaxed">
        {Constants.desc}
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <a
          className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-500 focus:outline-none focus:ring active:bg-primary sm:w-auto"
          href="/files"
        >
          Get Started
        </a>

        <a
          className="block w-full rounded px-12 py-3 text-sm font-medium text-primary shadow hover:text-blue-500 focus:outline-none focus:ring active:text-primary sm:w-auto"
          href="#"
        >
          Learn More
        </a>
      </div>
    </div>
  </div>
</section>
  )
}

export default Hero