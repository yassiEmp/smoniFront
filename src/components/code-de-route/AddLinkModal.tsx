import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddLinkModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (linkUrl: string) => void;
}

export const AddLinkModal = ({ open, onOpenChange, onSubmit }: AddLinkModalProps) => {
  const [linkUrl, setLinkUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!linkUrl.trim()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(linkUrl.trim());
      setLinkUrl('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setLinkUrl('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-blue-600">Ajouter un lien Code de la route</DialogTitle>
          <DialogDescription>
            Ajoutez un nouveau lien vers une ressource Code de la route.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="link-url">URL du lien *</Label>
              <Input
                id="link-url"
                type="url"
                placeholder="https://exemple.com/ressource"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                required
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Annuler
            </Button>
            <Button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700"
              disabled={isSubmitting || !linkUrl.trim()}
            >
              {isSubmitting ? 'Ajout...' : 'Ajouter'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
