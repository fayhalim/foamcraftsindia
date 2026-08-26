import * as React from "react"
import { cn } from "../../lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'secondary'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-heading font-bold tracking-wide ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-eco-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-eco-primary text-white hover:bg-eco-primary/90 shadow-md hover:shadow-lg hover:-translate-y-0.5": variant === "default",
            "border border-eco-light/60 bg-white hover:bg-eco-light/20 text-eco-slate-900 hover:text-eco-primary shadow-sm hover:shadow-md hover:-translate-y-0.5": variant === "outline",
            "hover:bg-eco-light/30 hover:text-eco-primary text-eco-slate-900": variant === "ghost",
            "bg-eco-slate-100 text-eco-slate-900 hover:bg-eco-slate-200": variant === "secondary",
            "h-10 px-6 py-2": size === "default",
            "h-9 rounded-full px-4 text-xs": size === "sm",
            "h-12 rounded-full px-8 text-base": size === "lg",
            "h-10 w-10": size === "icon",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
