import PropTypes from 'prop-types';
import './template_css/css/bootstrap.css';
import './template_css/scss/style.scss';
import './Grid.scss';
import './GlobalStyles.scss';

function GlobalStyles({ children }) {
    return children;
}

GlobalStyles.propTypes = {
    children: PropTypes.node.isRequired,
};

export default GlobalStyles;
