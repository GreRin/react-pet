import classNames from 'classnames';

const Panel = ({ children, className, ...rest }: any): any => {
  const finalClassNames = classNames('p-2 bg-white w-100 rounded-3', className);

  return (
    <div {...rest} className={finalClassNames}>
      {children}
    </div>
  );
};

export default Panel;
