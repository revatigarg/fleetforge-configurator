import { ForkliftModel, forkliftModels } from "@/data/forkliftData";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

interface StepSelectModelProps {
  selectedModel: ForkliftModel | null;
  onSelect: (model: ForkliftModel) => void;
}

export function StepSelectModel({ selectedModel, onSelect }: StepSelectModelProps) {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-foreground">Select Base Model</h2>
        <p className="text-muted-foreground mt-1">Choose the platform that best fits your operational requirements.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {forkliftModels.map((model) => {
          const isSelected = selectedModel?.id === model.id;
          return (
            <button
              key={model.id}
              onClick={() => onSelect(model)}
              className={`relative text-left rounded-lg border-2 p-6 transition-all hover:shadow-md
                ${isSelected
                  ? "border-primary bg-card shadow-md"
                  : "border-border bg-card hover:border-primary/40"
                }
              `}
            >
              {isSelected && (
                <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-primary-foreground" />
                </div>
              )}

              <div className="mb-4">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{model.series}</p>
                <h3 className="text-xl font-bold text-foreground mt-1">{model.name}</h3>
              </div>

              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{model.description}</p>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Capacity</span>
                  <span className="font-medium text-foreground">{model.capacityRange}</span>
                </div>
                <div className="flex justify-between text-sm items-center">
                  <span className="text-muted-foreground">Environment</span>
                  <div className="flex gap-1">
                    {model.environment.map((env) => (
                      <Badge key={env} variant="secondary" className="text-xs font-normal">
                        {env}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="pt-3 border-t border-border">
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm text-muted-foreground">Starting at</span>
                    <span className="text-xl font-bold text-foreground">
                      ${model.basePrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
