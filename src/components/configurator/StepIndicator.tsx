import { Check } from "lucide-react";

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
  onStepClick: (step: number) => void;
  completedSteps: number[];
}

export function StepIndicator({ steps, currentStep, onStepClick, completedSteps }: StepIndicatorProps) {
  return (
    <div className="flex items-center w-full max-w-4xl mx-auto py-6">
      {steps.map((label, i) => {
        const isCompleted = completedSteps.includes(i);
        const isCurrent = currentStep === i;
        const isClickable = isCompleted || i <= Math.max(...completedSteps, 0) + 1;

        return (
          <div key={i} className="flex items-center flex-1 last:flex-none">
            <button
              onClick={() => isClickable && onStepClick(i)}
              disabled={!isClickable}
              className="flex flex-col items-center gap-1.5 group"
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-colors
                  ${isCurrent ? "bg-primary text-primary-foreground" : ""}
                  ${isCompleted ? "bg-primary text-primary-foreground" : ""}
                  ${!isCurrent && !isCompleted ? "bg-secondary text-muted-foreground" : ""}
                  ${isClickable && !isCurrent ? "group-hover:bg-primary/80 group-hover:text-primary-foreground cursor-pointer" : ""}
                `}
              >
                {isCompleted && !isCurrent ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span
                className={`text-xs font-medium whitespace-nowrap hidden sm:block
                  ${isCurrent ? "text-foreground" : "text-muted-foreground"}
                `}
              >
                {label}
              </span>
            </button>
            {i < steps.length - 1 && (
              <div
                className={`flex-1 h-px mx-3 ${
                  isCompleted ? "bg-primary" : "bg-border"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
