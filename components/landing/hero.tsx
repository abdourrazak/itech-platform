"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32 lg:py-40">
        {/* Background Gradients */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
      </div>
      
      <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium text-muted-foreground">
            La référence de la formation Tech
          </span>
        </motion.div>
        
        <motion.h1
          className="font-heading text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Deviens un expert avec <span className="text-primary">Itech</span>
        </motion.h1>
        
        <motion.p
          className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Accède à des formations de pointe en Développement Web, Data, DevOps et IA. 
          Projets réels, mentors experts et certification à la clé.
        </motion.p>
        
        <motion.div
          className="flex flex-col gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link href="/courses">
            <Button size="lg" className="gap-2 h-12 px-8 text-base">
              Découvrir les formations <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/register">
             <Button variant="outline" size="lg" className="h-12 px-8 text-base">
              Commencer gratuitement
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
