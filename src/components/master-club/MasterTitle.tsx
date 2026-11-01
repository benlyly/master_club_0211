const GOLD_GRADIENT =
  'linear-gradient(180deg, #fceea8 0%, #f0c75e 30%, #d9a843 55%, #f4d97a 78%, #c89028 100%)'

function Ornament({ flip = false }: { flip?: boolean }) {
  return (
    <span className={`flex items-center gap-2 ${flip ? 'flex-row-reverse' : ''}`} aria-hidden="true">
      <span
        className="h-px w-5 sm:w-10 md:w-24"
        style={{
          background: `linear-gradient(${flip ? '270deg' : '90deg'}, transparent, rgba(240,199,94,0.85))`,
        }}
      />
      <span className="size-1.5 rotate-45 border border-[rgba(240,199,94,0.9)]" />
    </span>
  )
}

export function MasterTitle() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-2.5 sm:gap-4 md:gap-7">
        <Ornament />
        <h1
          className="bg-clip-text pl-[0.32em] font-serif text-[2.3rem] font-light uppercase leading-none tracking-[0.24em] text-transparent sm:text-[3rem] sm:tracking-[0.32em] md:text-[4.3rem]"
          style={{
            backgroundImage: GOLD_GRADIENT,
            WebkitTextStroke: '0.6px rgba(252,238,168,0.5)',
            filter: 'drop-shadow(0 0 22px rgba(240,199,94,0.35))',
          }}
        >
          Master
        </h1>
        <Ornament flip />
      </div>
      <span
        className="h-px w-48 md:w-80"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(240,199,94,0.6), transparent)' }}
        aria-hidden="true"
      />
    </div>
  )
}
