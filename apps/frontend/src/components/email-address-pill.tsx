'use client';

import { X } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface EmailAddressPillProps {
  email: string;
  onRemove: (email: string) => void;
}

export function EmailAddressPill({ email, onRemove }: EmailAddressPillProps) {
  return (
    <Badge variant="secondary" className="gap-1 pr-1">
      <span className="max-w-[160px] truncate">{email}</span>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-4 w-4 rounded-full hover:bg-destructive hover:text-destructive-foreground"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(email);
        }}
        aria-label={`Remove ${email}`}
      >
        <X className="h-3 w-3" />
      </Button>
    </Badge>
  );
}