import colors from './colors';

const styles = {
    card: {
        borderRadius: '5px',
        borderWidth: '0.5px',
        display: 'block',
        width: '100%',
        height: '75px',
        borderColor: colors.lightGray,
        borderStyle: 'solid',
        backgroundColor: colors.white,
    },
    navbar: {
        backgroundColor: colors.charcoal,
        borderRadius: '5px 5px 0px 0px',
        width: '100%',
        display: 'flex',
        height: '40px',
        position: 'fixed',
        top: 0,
        webkitAppRegion: 'drag',
    },
    screenWrapper: {
        backgroundColor: colors.lightGray,
        maxHeight: '100%',
        overflowY: 'scroll',
        width: '100%',
        marginTop: '38px',
        position: 'fixed',

    },
    mainLogo: {
        margin: 'auto',
        maxHeight: '100%',
        marginTop: '10px',
        marginBottom: '10px',
    },

};

export default styles;
