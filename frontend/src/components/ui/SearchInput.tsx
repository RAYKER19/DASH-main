interface SearchInputProps {
  placeholder?: string;
}

export function SearchInput({ placeholder = 'Buscar...' }: SearchInputProps) {
  return (
    <label className="search-input-wrap">
      <span className="search-icon">⌕</span>
      <input type="text" placeholder={placeholder} />
    </label>
  );
}
