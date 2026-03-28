interface FilterButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export default function FilterButton({ label, isActive, onClick }: FilterButtonProps) {
  return (
    <button
      className={`filter-btn ${isActive ? 'filter-btn--active' : ''}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
