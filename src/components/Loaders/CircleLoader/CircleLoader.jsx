import PropTypes from 'prop-types';
import styles from './CircleLoader.module.css';

export function CircleLoader({ className }) {
  return (
    <div>
      <div className={styles[className]}></div>
    </div>
  );
}

CircleLoader.propTypes = {
  className: PropTypes.string.isRequired,
};
