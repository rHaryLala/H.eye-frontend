"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { HeroHeader } from "./header"
import { InfiniteSlider } from "@/components/ui/infinite-slider"
import { ProgressiveBlur } from "@/components/ui/progressive-blur"
import { motion } from "framer-motion"
import DisplayCards from "./ui/display-cards"

export default function HeroSection() {
  return (
    <>
      <HeroHeader />
      <main className="overflow-x-hidden">
        <section>
          <div className="pb-24 pt-12 md:pb-32 lg:pb-56 lg:pt-44">
            <div className="relative mx-auto flex max-w-6xl flex-col px-6 lg:block">
              <div className="mx-auto max-w-lg text-center lg:ml-0 lg:w-1/2 lg:text-left">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="mt-8 max-w-2xl text-balance text-5xl font-medium md:text-6xl lg:mt-16 xl:text-7xl"
                >
                  An eye that never sleeps
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                  className="mt-8 max-w-2xl text-pretty text-lg"
                >
                  Your security, 24/7 and effortless – our autonomous monitoring system watches over you, even while you
                  sleep.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
                  className="mt-12 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start"
                >
                  <Button asChild size="lg" className="px-5 text-base">
                    <Link href="/dashboard">
                      <span className="text-nowrap">Start to use</span>
                    </Link>
                  </Button>
                  <Button key={2} asChild size="lg" variant="ghost" className="px-5 text-base">
                    <Link href="#link">
                      <span className="text-nowrap">Request a demo</span>
                    </Link>
                  </Button>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Image
                  className="order-first ml-auto h-40 w-full object-contain lg:absolute lg:inset-0 lg:-right-10 lg:-top-32 lg:h-100 lg:w-2/3 dark:mix-blend-lighten dark:invert-0"
                  src="https://static.vecteezy.com/system/resources/thumbnails/049/731/451/small_2x/the-all-seeing-eye-camera-lens-with-transparent-background-png.png"
                  alt="Abstract Object"
                  width={500}
                  height={500}
                />
              </motion.div>
            </div>
          </div>
        </section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="bg-background pb-16 md:pb-32"
        >
          <div className="group relative m-auto max-w-6xl px-6">
            <div className="flex flex-col items-center md:flex-row">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 1, ease: "easeOut" }}
                className="md:max-w-44 md:border-r md:pr-6"
              >
                <p className="text-end text-sm">Powering the best teams</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="relative py-6 md:w-[calc(100%-11rem)]"
              >
                <InfiniteSlider speedOnHover={20} speed={40} gap={112}>
                  <div className="flex">
                    <img
                      className="mx-auto h-6 w-fit dark:invert"
                      src="https://i.ibb.co/mCctc5D8/Whats-App-Image-2025-05-19-at-15-36-25-removebg-preview.png"
                      alt="Snack Mamy Logo"
                      height="20"
                      width="auto"
                    />
                  </div>

                  <div className="flex">
                    <img
                      className="mx-auto h-10 w-fit dark:invert"
                      src="https://i.ibb.co/nN0HcdGx/Computer-1.png"
                      alt="CSD Logo"
                      height="20"
                      width="auto"
                    />
                  </div>
                  <div className="flex">
                    <img
                      className="mx-auto h-6 w-fit dark:invert"
                      src="https://html.tailus.io/blocks/customers/github.svg"
                      alt="GitHub Logo"
                      height="16"
                      width="auto"
                    />
                  </div>
                  <div className="flex">
                    <img
                      className="mx-auto h-6 w-fit dark:invert"
                      src="https://i.ibb.co/yB6ZZHhK/Computer-2.png"
                      alt="DiRoom Logo"
                      height="16"
                      width="auto"
                    />
                  </div>
                </InfiniteSlider>


                <div className="bg-linear-to-r from-background absolute inset-y-0 left-0 w-20"></div>
                <div className="bg-linear-to-l from-background absolute inset-y-0 right-0 w-20"></div>
                <ProgressiveBlur
                  className="pointer-events-none absolute left-0 top-0 h-full w-20"
                  direction="left"
                  blurIntensity={1}
                />
                <ProgressiveBlur
                  className="pointer-events-none absolute right-0 top-0 h-full w-20"
                  direction="right"
                  blurIntensity={1}
                />
              </motion.div>
            </div>
          </div>
        </motion.section>
      </main>
    </>
  )
}
