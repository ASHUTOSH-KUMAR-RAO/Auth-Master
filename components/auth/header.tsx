import { cn } from "@/lib/utils"

export const Header = ({label}:{label:string})=>{
  return (
    <div className="w-full flex flex-col items-center justify-center gap-y-4">
        <h1 className={cn("text-3xl font-semibold")}>
          🔏 Auth
        </h1>
        <p className="text-muted-foreground text-sm">
          {label}
        </p>
    </div>
  )
}
