import React from 'react';
import { useDrag } from 'react-dnd';
import { LucideIcon } from 'lucide-react';

interface ComponentItemProps {
  type: string;
  label: string;
  icon: LucideIcon;
  description: string;
}

export function ComponentItem({ type, label, icon: Icon, description }: ComponentItemProps) {
  const [{ isDragging }, drag] = useDrag({
    type: 'component',
    item: { type, label },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`p-3 border rounded-lg cursor-move hover:border-primary/50 transition-colors ${
        isDragging ? 'opacity-50' : ''
      } bg-card`}
    >
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-primary/10 rounded-md">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm">{label}</p>
          <p className="text-xs text-muted-foreground truncate">{description}</p>
        </div>
      </div>
    </div>
  );
}