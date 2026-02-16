import {
  ConfigState,
  addons,
  forkliftColors,
  calculateUnitPrice,
  calculateMonthlyRecurring,
  getFleetDiscount,
} from "@/data/forkliftData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Edit3, Save, FileText, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

interface StepSummaryProps {
  config: ConfigState;
  onEdit: (step: number) => void;
}

export function StepSummary({ config, onEdit }: StepSummaryProps) {
  const model = config.selectedModel!;
  const unitPrice = calculateUnitPrice(config);
  const monthlyPerUnit = calculateMonthlyRecurring(config);
  const discountInfo = getFleetDiscount(config.quantity);
  const subtotal = unitPrice * config.quantity;
  const discountAmount = subtotal * discountInfo.discount;
  const totalOneTime = subtotal - discountAmount;
  const totalMonthly = monthlyPerUnit * config.quantity;

  const selectedAddonsList = addons.filter((a) => config.selectedAddons.includes(a.id));

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-foreground">Order Summary</h2>
        <p className="text-muted-foreground mt-1">Review your fleet configuration before submitting.</p>
      </div>

      <div className="space-y-6">
        {/* Model & Specs */}
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground">Base Model & Specifications</h3>
            <button onClick={() => onEdit(1)} className="text-xs text-primary hover:underline flex items-center gap-1">
              <Edit3 className="w-3 h-3" /> Edit
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-6 text-sm">
            <div>
              <span className="text-muted-foreground">Model</span>
              <p className="font-medium">{model.name} – {model.series}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Capacity</span>
              <p className="font-medium">{config.capacity.toLocaleString()} lb</p>
            </div>
            <div>
              <span className="text-muted-foreground">Power</span>
              <p className="font-medium">{config.powerType}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Mast</span>
              <p className="font-medium">{config.mastHeight.label}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Tires</span>
              <p className="font-medium">{config.tireType}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Display</span>
              <p className="font-medium">{config.displayPackage}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Color</span>
              <p className="font-medium">{forkliftColors.find(c => c.value === config.color)?.label}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Environment</span>
              <p className="font-medium">{config.environment}</p>
            </div>
          </div>
        </div>

        {/* Add-ons */}
        {selectedAddonsList.length > 0 && (
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground">Add-ons</h3>
              <button onClick={() => onEdit(2)} className="text-xs text-primary hover:underline flex items-center gap-1">
                <Edit3 className="w-3 h-3" /> Edit
              </button>
            </div>
            <div className="space-y-2">
              {selectedAddonsList.map((addon) => (
                <div key={addon.id} className="flex justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span>{addon.name}</span>
                    {addon.tag && <Badge variant="secondary" className="text-xs">{addon.tag}</Badge>}
                  </div>
                  <span className="font-medium">
                    {addon.oneTimePrice > 0 && `$${addon.oneTimePrice.toLocaleString()}`}
                    {addon.monthlyPrice > 0 && `$${addon.monthlyPrice}/mo`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pricing */}
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground">Fleet Pricing</h3>
            <button onClick={() => onEdit(3)} className="text-xs text-primary hover:underline flex items-center gap-1">
              <Edit3 className="w-3 h-3" /> Edit
            </button>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Quantity</span>
              <span className="font-medium">{config.quantity} unit{config.quantity > 1 ? "s" : ""}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Unit price</span>
              <span className="font-medium">${unitPrice.toLocaleString()}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-success">
                <span>Volume discount ({(discountInfo.discount * 100).toFixed(0)}%)</span>
                <span>-${discountAmount.toLocaleString()}</span>
              </div>
            )}
          </div>
          <div className="mt-4 pt-4 border-t border-border space-y-2">
            <div className="flex justify-between items-baseline">
              <span className="font-semibold text-foreground">Total One-Time</span>
              <span className="text-2xl font-bold text-foreground">${totalOneTime.toLocaleString()}</span>
            </div>
            {totalMonthly > 0 && (
              <div className="flex justify-between items-baseline">
                <span className="font-semibold text-foreground">Monthly Recurring</span>
                <span className="text-lg font-bold text-foreground">${totalMonthly.toLocaleString()}/mo</span>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 pt-2">
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => toast.success("Configuration duplicated")}
          >
            <Copy className="w-4 h-4" /> Duplicate Build
          </Button>
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => toast.success("Draft saved successfully")}
          >
            <Save className="w-4 h-4" /> Save as Draft
          </Button>
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => toast.success("Quote request submitted")}
          >
            <FileText className="w-4 h-4" /> Request Formal Quote
          </Button>
          <Button
            className="gap-2"
            onClick={() => toast.success("Proceeding to enterprise checkout")}
          >
            <ShoppingCart className="w-4 h-4" /> Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
