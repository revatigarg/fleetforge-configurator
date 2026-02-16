import {
  ConfigState,
  calculateUnitPrice,
  calculateMonthlyRecurring,
  getFleetDiscount,
} from "@/data/forkliftData";
import { Minus, Plus, TrendingUp } from "lucide-react";

interface StepFleetPricingProps {
  config: ConfigState;
  onChange: (updates: Partial<ConfigState>) => void;
}

export function StepFleetPricing({ config, onChange }: StepFleetPricingProps) {
  const unitPrice = calculateUnitPrice(config);
  const monthlyPerUnit = calculateMonthlyRecurring(config);
  const discountInfo = getFleetDiscount(config.quantity);

  const subtotal = unitPrice * config.quantity;
  const discountAmount = subtotal * discountInfo.discount;
  const totalOneTime = subtotal - discountAmount;
  const totalMonthly = monthlyPerUnit * config.quantity;

  const estimatedAnnualROI =
    config.selectedAddons.includes("telematics-hw") || config.selectedAddons.includes("telematics-sub")
      ? 4200 * config.quantity
      : 0;

  const adjustQty = (delta: number) => {
    const newQty = Math.max(1, Math.min(20, config.quantity + delta));
    onChange({ quantity: newQty });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-foreground">Fleet Quantity & Pricing</h2>
        <p className="text-muted-foreground mt-1">Select fleet size and review tiered volume pricing.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Quantity selector */}
        <div className="space-y-6">
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-sm font-semibold text-foreground mb-4">Fleet Size</h3>
            <div className="flex items-center justify-center gap-6">
              <button
                onClick={() => adjustQty(-1)}
                disabled={config.quantity <= 1}
                className="w-10 h-10 rounded-md border border-border flex items-center justify-center hover:bg-secondary disabled:opacity-30 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-4xl font-bold text-foreground w-16 text-center">{config.quantity}</span>
              <button
                onClick={() => adjustQty(1)}
                disabled={config.quantity >= 20}
                className="w-10 h-10 rounded-md border border-border flex items-center justify-center hover:bg-secondary disabled:opacity-30 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground text-center mt-3">{discountInfo.label}</p>
          </div>

          {/* Discount tiers */}
          <div className="rounded-lg border border-border bg-card p-5">
            <h4 className="text-sm font-semibold text-foreground mb-3">Volume Discount Tiers</h4>
            <div className="space-y-2">
              {[
                { range: "1 – 2 units", discount: "Standard pricing" },
                { range: "3 – 5 units", discount: "3% discount" },
                { range: "6 – 10 units", discount: "6% discount" },
                { range: "11 – 15 units", discount: "8% discount" },
                { range: "16 – 20 units", discount: "12% discount" },
              ].map((tier) => {
                const isActive =
                  config.quantity >= parseInt(tier.range) &&
                  config.quantity <= parseInt(tier.range.split("–")[1] || tier.range);
                return (
                  <div
                    key={tier.range}
                    className={`flex justify-between text-sm py-1.5 px-2 rounded ${
                      discountInfo.label.includes(tier.discount.split(" ")[0]) ? "bg-primary/5 text-primary font-medium" : "text-muted-foreground"
                    }`}
                  >
                    <span>{tier.range}</span>
                    <span>{tier.discount}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Pricing summary */}
        <div className="space-y-6">
          <div className="rounded-lg border border-border bg-card p-6 space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Pricing Breakdown</h3>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Unit price</span>
                <span className="font-medium">${unitPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">× {config.quantity} units</span>
                <span className="font-medium">${subtotal.toLocaleString()}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-success">
                  <span>Volume discount</span>
                  <span className="font-medium">-${discountAmount.toLocaleString()}</span>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-border space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-medium text-foreground">Total One-Time Cost</span>
                <span className="text-2xl font-bold text-foreground">${totalOneTime.toLocaleString()}</span>
              </div>
              {totalMonthly > 0 && (
                <div className="flex justify-between items-baseline">
                  <span className="text-sm font-medium text-foreground">Monthly Recurring</span>
                  <span className="text-lg font-bold text-foreground">${totalMonthly.toLocaleString()}/mo</span>
                </div>
              )}
            </div>
          </div>

          {estimatedAnnualROI > 0 && (
            <div className="rounded-lg border border-success/30 bg-success/5 p-5">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-success mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Estimated Annual ROI</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Projected savings from telematics across {config.quantity} unit{config.quantity > 1 ? "s" : ""}
                  </p>
                  <p className="text-xl font-bold text-success mt-1">
                    ~${estimatedAnnualROI.toLocaleString()}/year
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
