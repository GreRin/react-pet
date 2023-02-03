import { useState } from 'react';
import { GoChevronDown, GoChevronLeft } from 'react-icons/go';

const ExpandablePanel = ({ header, children }: any): JSX.Element => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandPanel = (): void => {
    setExpanded(!expanded);
  };

  return (
    <div className="d-flex flex-column">
      <div
        className={`user-card mt-3 p-2 w-100 d-inline-flex justify-content-between align-items-center ${
          expanded ? 'rounded-top' : 'rounded-3'
        }`}
      >
        <div className="d-inline-flex">{header}</div>
        <div className="expand-icon" onClick={handleExpandPanel}>
          {expanded ? <GoChevronDown /> : <GoChevronLeft />}
        </div>
      </div>
      {expanded && <div className="user-card p-2 w-100 rounded-bottom">{children}</div>}
    </div>
  );
};

export default ExpandablePanel;
