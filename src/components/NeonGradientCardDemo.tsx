import { NeonGradientCard } from "@/components/ui/neon-gradient-card"

export function NeonGradientCardDemo() {
  return (
    <NeonGradientCard className="max-w-sm w-64 h-40 flex items-center justify-center bg-[#171717] rounded-md">
      <span className="pointer-events-none z-10 text-center text-3xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-[#ff2975] from-35% to-[#00FFF1] md:text-5xl xl:text-6xl dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
      </span>
    </NeonGradientCard>
  )
}
