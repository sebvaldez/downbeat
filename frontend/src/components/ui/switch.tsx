"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  const [checked, setChecked] = React.useState(props.defaultChecked || false)
  
  React.useEffect(() => {
    if (props.checked !== undefined) {
      setChecked(props.checked)
    }
  }, [props.checked])

  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      style={{
        backgroundColor: checked ? 'hsl(250 70% 60%)' : 'hsl(240 8% 22%)'
      }}
      onCheckedChange={(newChecked) => {
        setChecked(newChecked)
        props.onCheckedChange?.(newChecked)
      }}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        style={{ backgroundColor: 'hsl(0 0% 98%)' }}
        className="pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
