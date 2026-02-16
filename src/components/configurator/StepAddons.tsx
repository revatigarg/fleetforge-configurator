import { ConfigState, addons, calculateMonthlyRecurring } from "@/data/forkliftData";
import { Badge } from "@/components/ui/badge";
import { Check, TrendingUp } from "lucide-react";

interface StepAddonsProps {
  config: ConfigState;
  onChange: (updates: Partial<ConfigState>) => void;
}

export function StepAddons({ config, onChange }: StepAddonsProps) {
  const toggleAddon = (id: string) => {
    const current = config.selectedAddons;
    const updated = current.includes(id)
      ? current.filter((a) => a !== id)
      : [...current, id];
    onChange({ selectedAddons: updated });
  };

  const hasTelematicsSub = config.selectedAddons.includes("telematics-sub");
  const hasTelematics = config.selectedAddons.includes("telematics-hw") || config.selectedAddons.includes("telematics-sub");

  const annualSavings = hasTelematics ? 4200 : 0;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-foreground">Operational Add-ons</h2>
        <p className="text-muted-foreground mt-1">Extend capabilities with monitoring, warranties, and service plans.</p>
      </div>

      <div className="space-y-4">
        {addons.map((addon) => {
          const isSelected = config.selectedAddons.includes(addon.id);
          const isForced = addon.id === "telematics-hw" && config.displayPackage === "Advanced";
          return (
            <button
              key={addon.id}
              onClick={() => !isForced && toggleAddon(addon.id)}
              disabled={isForced}
              className={`w-full text-left rounded-lg border-2 p-5 transition-all
                ${isSelected
                  ? "border-primary bg-card shadow-sm"
                  : "border-border bg-card hover:border-primary/40"
                }
                ${isForced ? "cursor-default" : ""}
              `}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className={`text-sm font-semibold ${isSelected ? "text-foreground" : "text-foreground"}`}>
                      {addon.name}
                    </h3>
                    {addon.tag && (
                      <Badge variant="secondary" className="text-xs">{addon.tag}</Badge>
                    )}
                    {isForced && (
                      <Badge variant="secondary" className="text-xs">Included with Advanced Display</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{addon.description}</p>
                </div>
                <div className="flex items-center gap-4 ml-4">
                  <div className="text-right">
                    {addon.oneTimePrice > 0 && (
                      <p className="text-sm font-semibold text-foreground">${addon.oneTimePrice.toLocaleString()}</p>
                    )}
                    {addon.monthlyPrice > 0 && (
                      <p className="text-sm font-semibold text-foreground">${addon.monthlyPrice}/mo</p>
                    )}
                  </div>
                  <div
                    className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors
                      ${isSelected
                        ? "bg-primary border-primary"
                        : "border-border"
                      }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 text-primary-foreground" />}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {hasTelematics && (
        <div className="mt-8 rounded-lg border border-success/30 bg-success/5 p-5">
          <div className="flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-success mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-foreground">Projected Annual Savings</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Fleet telematics typically reduce fuel costs by 12%, maintenance costs by 8%, and improve utilization by 15%.
              </p>
              <p className="text-2xl font-bold text-success mt-2">
                ~${annualSavings.toLocaleString()}/unit per year
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
