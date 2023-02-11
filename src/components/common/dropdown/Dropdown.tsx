import { IOption } from '../../../interfaces';
import { useEffect, useState, useRef } from 'react';
import './Dropdown.scss';
import { GoChevronDown } from 'react-icons/go';
import Panel from './Panel';

const Dropdown = ({ options, value, onChange }: any): any => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const divEl = useRef<any>();

  useEffect(() => {
    const handler = (event: { target: any }): void => {
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

  const handleOptionClick = (opt: IOption): void => {
    setIsOpen(false);
    onChange(opt);
  };

  const handleClick = (): void => {
    setIsOpen(!isOpen);
  };

  const renderedOptions = options.map((option: IOption) => {
    return (
      <div className="option rounded-3 p-1" role="button" onClick={() => handleOptionClick(option)} key={option.value}>
        {option.label}
      </div>
    );
  });

  return (
    <div ref={divEl} className="dropdown-body position-relative m-3">
      <Panel
        className="option-default d-flex justify-content-between align-items-center"
        role="button"
        onClick={handleClick}
      >
        {value?.label || 'Select...'}
        <GoChevronDown />
      </Panel>
      {isOpen && <Panel className="options-list position-absolute">{renderedOptions}</Panel>}
    </div>
  );
};

export default Dropdown;
