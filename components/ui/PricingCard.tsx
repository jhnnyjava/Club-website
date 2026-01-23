'use client';

import React from 'react';
import { Card } from './Card';
import { Button } from './Button';
import { Check, ShieldCheck } from 'lucide-react';

interface PricingCardProps {
  title: string;
  price: number;
  period: string;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
  onCTAClick?: () => void;
}

export function PricingCard({
  title,
  price,
  period,
  features,
  isPopular = false,
  ctaText,
  onCTAClick,
}: PricingCardProps) {
  return (
    <Card 
      className={`relative p-8 ${isPopular ? 'border-ice-cyan shadow-cyan-glow' : ''}`}
      hover={!isPopular}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-ice-cyan text-ice-black px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide">
            Recommended
          </span>
        </div>
      )}
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold">KES {price}</span>
          <span className="text-slate-400">/ {period}</span>
        </div>
      </div>

      <div className="mb-8 space-y-3">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-ice-cyan flex-shrink-0 mt-0.5" />
            <span className="text-sm text-slate-300">{feature}</span>
          </div>
        ))}
      </div>

      <Button 
        variant={isPopular ? 'primary' : 'secondary'} 
        className="w-full mb-4"
        onClick={onCTAClick}
      >
        {ctaText}
      </Button>

      <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
        <ShieldCheck className="w-4 h-4" />
        <span>Secure M-Pesa Payment</span>
      </div>
    </Card>
  );
}
