
import { useEffect, useState, useRef } from "react";
import { ReactComponent as Chevron } from '../down-chevron.svg';
import './DropDown.scss'

export default function DropDown({value, options, onChange}){
  const [isOpen, setIsOpen] = useState(false);
  const divEl = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (!divEl.current) {
        return;
      }

      if (!divEl.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handler, true);

    return () => {
      document.removeEventListener('click', handler);
    };
  }, []);

  const handleClick = () => {
    setIsOpen (!isOpen);
  };

  const handleOptionClick = (option) => {
    setIsOpen (false);
    onChange (option);
  };

  const renderedOptions = options.map((option) => {
    return (
      <div
        className="dropdown-item"
        onClick={() => handleOptionClick(option)}
        key={option.value}
      >
        {option.label}
      </div>
    );
  });

  return (
    <div ref={divEl} className="dropdown-container">
      <div
        className="dropdown-bar"
        onClick={handleClick}
      >
        {value?.label || 'Any'}
        <Chevron className="dropdown-chevron" />
      </div>
      {isOpen && <div className="dropdown-options">{renderedOptions}</div>}
    </div>
  );
}
