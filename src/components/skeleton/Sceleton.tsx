import './Skeleton.scss';
import classNames from 'classnames';

const Skeleton = ({ times, className }: any): any => {
  const outerClassNames = classNames(
    'outer-box',
    'position-relative',
    'overflow-hidden',
    'rounded-2',
    'mb-3',
    className
  );
  const innerClassNames = classNames('animate', 'position-absolute', className);

  const boxes = Array(times)
    .fill(0)
    .map((_, i) => {
      return (
        <div className={outerClassNames} key={i}>
          <div className={innerClassNames} />
        </div>
      );
    });
  return boxes;
};

export default Skeleton;
