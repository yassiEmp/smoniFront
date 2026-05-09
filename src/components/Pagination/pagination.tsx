import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
  itemsPerPageOptions?: number[];
  showItemsPerPage?: boolean;
  isMobile?: boolean;
}

export const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  itemsPerPageOptions = [5, 10, 20, 30, 50],
  showItemsPerPage = true,
  isMobile = false
}: PaginationProps) => {
  const renderPaginationButtons = () => {
    const pages: (number | string)[] = [];
    const maxButtons = isMobile ? 7 : 10;
    
    if (totalPages <= maxButtons) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);
      
      if (startPage > 2) {
        pages.push('...');
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      if (endPage < totalPages - 1) {
        pages.push('...');
      }
      
      pages.push(totalPages);
    }
    
    return pages.map((page, index) => (
      <Button
        key={index}
        variant={page === currentPage ? "default" : "outline"}
        size={isMobile ? "sm" : "default"}
        onClick={() => typeof page === 'number' ? onPageChange(page) : undefined}
        disabled={page === '...' || page === currentPage}
        className={`${isMobile ? 'px-2 py-1 text-sm' : 'px-3 py-1'} ${
          page === '...' ? 'cursor-default hover:bg-transparent' : ''
        }`}
      >
        {page}
      </Button>
    ));
  };

  if (isMobile) {
    return (
      <div className="border-t border-border px-4 py-4 bg-card">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Page {currentPage} sur {totalPages}
            </div>
            {showItemsPerPage && (
              <div className="flex items-center gap-2">
                <label className="text-sm text-muted-foreground">Par page:</label>
                <Select value={itemsPerPage.toString()} onValueChange={(value) => onItemsPerPageChange(Number(value))}>
                  <SelectTrigger className="w-16 h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {itemsPerPageOptions.map((option) => (
                      <SelectItem key={option} value={option.toString()}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {renderPaginationButtons()}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="text-center text-sm text-muted-foreground">
            {totalItems} résultat{totalItems > 1 ? 's' : ''} au total
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-t border-border px-6 py-4 bg-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="hidden text-sm text-muted-foreground md:block">
            Page {currentPage} sur {totalPages} ({totalItems} résultats)
          </div>
          {showItemsPerPage && (
            <div className="flex items-center gap-2">
              <label className="text-sm text-muted-foreground">Résultats par page:</label>
              <Select value={itemsPerPage.toString()} onValueChange={(value) => onItemsPerPageChange(Number(value))}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {itemsPerPageOptions.map((option) => (
                    <SelectItem key={option} value={option.toString()}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {renderPaginationButtons()}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};