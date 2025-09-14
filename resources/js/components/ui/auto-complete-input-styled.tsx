import * as React from "react";
import { useState, useEffect, useRef, KeyboardEvent, ChangeEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AutoCompleteInputStyledProps {
  suggestions: any[]; // Lista de sugestões, pode ser de qualquer tipo
  placeholder?: string;
  value?: any;
  onChange?: (value: any) => void;
  onSelect?: (value: any) => void;
  onNewOption?: (value: string) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  icon?: ReactNode;
  className?: string;
  inputClassName?: string;
  listClassName?: string;
  itemClassName?: string;
  activeItemClassName?: string;
  noResultsText?: string;
  customRenderOption?: (option: any) => React.ReactNode;
  showOnFocus?: boolean; // NOVO: controla se mostra sugestões ao focar (default: true)
  // darkMode?: boolean;    // NOVO: ativa modo escuro
}

export default function AutoCompleteInputStyled({
  suggestions = [],
  placeholder = "Digite para pesquisar...",
  value = null,
  onChange = () => {},
  onSelect = () => {},
  onNewOption,
  onKeyDown,
  icon,
  className = "",
  inputClassName = "",
  listClassName = "",
  itemClassName = "",
  activeItemClassName = "",
  noResultsText = "Nenhum resultado encontrado",
  customRenderOption,
  openUp = false, // NOVO: controla se abre para cima
  showOnFocus = true,
  ...props
}: AutoCompleteInputStyledProps & { openUp?: boolean }) {
  // inputValue é o nome do objeto selecionado, ou string vazia
  const [inputValue, setInputValue] = useState(value ? value.nome || "" : "");
  const [filteredSuggestions, setFilteredSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingOption, setPendingOption] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  // Flag para evitar sobrescrever inputValue logo após seleção
  const isSelectingRef = useRef(false);

  // Mantém inputValue sincronizado com value, mas só se não estiver digitando
  useEffect(() => {
    if (!isSelectingRef.current) {
      setInputValue(value ? value.nome || "" : "");
    }
    isSelectingRef.current = false;
  }, [value]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    console.log(e.target.value);
    // Só limpa seleção se o campo estiver vazio E o value não for nulo
    if (e.target.value.trim() === '' && value !== null) {
      onChange(null);
      setShowSuggestions(false);
    } else {
      // Não limpa seleção ao digitar, apenas ao apagar
      const filtered = suggestions.filter(item =>
        item.nome && item.nome.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setShowSuggestions(filtered.length > 0);
    }
  };

  const handleSuggestionClick = (suggestion: any) => {
    isSelectingRef.current = true;
    setInputValue(suggestion.nome);
    onSelect(suggestion);
    if (onChange) {
      onChange(suggestion);
    }
    setShowSuggestions(false);
    setActiveSuggestion(0);
    inputRef.current?.blur(); // Remove foco para garantir fechamento
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (onKeyDown) {
      onKeyDown(e);
      if (e.defaultPrevented) return;
    }
    if (!showSuggestions || filteredSuggestions.length === 0) return;
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveSuggestion(prev =>
          prev < filteredSuggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveSuggestion(prev =>
          prev > 0 ? prev - 1 : filteredSuggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        handleSuggestionClick(filteredSuggestions[activeSuggestion]);
        setShowSuggestions(false); // Fecha sugestões ao pressionar Enter
        break;
      case 'Escape':
        setShowSuggestions(false);
        setActiveSuggestion(0);
        break;
      default:
        break;
    }
  };

  const handleConfirmNewOption = () => {
    if (onNewOption && pendingOption) {
      onNewOption(pendingOption);
      handleSuggestionClick(pendingOption);
    }
    setShowConfirmation(false);
  };

  const handleCancelNewOption = () => {
    setShowConfirmation(false);
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (inputValue.trim() === '') {
      setFilteredSuggestions(suggestions);
      setShowSuggestions(suggestions.length > 0); // Mostra sugestões se houver
      setActiveSuggestion(0);
      return;
    }
    const filtered = suggestions.filter(item =>
      item.nome && item.nome.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredSuggestions(filtered);
    setShowSuggestions(filtered.length > 0);
    setActiveSuggestion(0);
  }, [inputValue, suggestions]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative",
        className
      )}
    >
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (showOnFocus && suggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
          placeholder={placeholder}
          className={cn(
            "border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            icon ? 'pl-10' : '',
            "dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 dark:placeholder-gray-400",
            inputClassName
          )}
        />
      </div>
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div
          className={cn(
            "absolute z-10 w-full rounded-lg shadow-lg overflow-hidden transition-all duration-300",
            "bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100",
            openUp ? "mb-1 origin-bottom" : "mt-1 origin-top",
            listClassName
          )}
          style={openUp ? { bottom: '100%', top: 'auto' } : { top: '100%', bottom: 'auto' }}
        >
          <ul className="max-h-60 overflow-y-auto">
            {filteredSuggestions.map((suggestion, index) => (
              <li
                key={suggestion.id || index}
                onClick={() => handleSuggestionClick(suggestion)}
                onMouseEnter={() => setActiveSuggestion(index)}
                className={cn(
                  "px-4 py-2 cursor-pointer transition-colors duration-200",
                  index === activeSuggestion
                    ? "bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                    : "hover:bg-gray-50 dark:hover:bg-gray-700",
                  index === activeSuggestion ? activeItemClassName : itemClassName
                )}
              >
                {customRenderOption ? customRenderOption(suggestion) : suggestion.nome}
              </li>
            ))}
          </ul>
        </div>
      )}
      {showSuggestions && filteredSuggestions.length === 0 && (
        <div className={cn(
          "absolute z-10 mt-1 w-full rounded-lg shadow-lg px-4 py-2",
          "bg-white text-gray-500 dark:bg-gray-800 dark:text-gray-400",
          listClassName
        )}>
          {noResultsText}
        </div>
      )}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-medium">Confirmação</h3>
              <button
                onClick={handleCancelNewOption}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <p className="mb-6">Você deseja cadastrar "{pendingOption}" para poder usar em futuras inserções?</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCancelNewOption}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Não
              </button>
              <button
                onClick={handleConfirmNewOption}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Sim
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}