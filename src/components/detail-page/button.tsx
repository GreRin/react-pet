import React from 'react';
import withToggle from './HOC';

const ViewEditToggleExample = ({ toggle, toggleStatus, title }: any) => (
  <div>
    {toggleStatus ? <input type="text" value={title} /> : <p>{title}</p>}
    <button onClick={toggle}>{toggleStatus ? 'Cancel' : 'Edit'}</button>
  </div>
);

export default withToggle(ViewEditToggleExample);
