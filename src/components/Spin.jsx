import PropTypes from 'prop-types';

export const Spin = ({ children, spinning, tip }) => {
  if (!spinning) return children;

  return (
    <div className="relative">
      <div className="opacity-50 pointer-events-none">{children}</div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          {tip && <div className="mt-2 text-sm text-gray-600">{tip}</div>}
        </div>
      </div>
    </div>
  );
};

Spin.propTypes = {
  children: PropTypes.node.isRequired,
  spinning: PropTypes.bool,
  tip: PropTypes.string,
};

Spin.defaultProps = {
  spinning: false,
  tip: '',
}; 