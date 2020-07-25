export const colors = {
    lightRed: "#f0a1a8",
    strongRed: "#c63c2e",
    strongGreen: "#4e8c87",
    lightGreen: "#a1f0dc"
}

const mainStyle = {
    title: {
        fontWeight: "bold",
        marginTop: "50px"
    },

    subtitle: {
        marginTop: "20px"
    },

    transactionsView: {
        marginTop: "60px"
    },

    listItem: {
        border: "solid 1px #ccc",
        borderRadius: "5px",
        marginBottom: "10px",
        padding: "10px",
    },

    itemRow: {
        margin: 0
    },

    infoResume: {
        border: "solid 1px #ccc",
        borderRadius: "5px",
    },

    selectButton: {
        height: "100%",
        backgroundColor: colors.strongGreen
    },

    modal: {
        content: {
            width: '550px',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
        }
    },

    lancamentoForm: {
        border: "solid 1px #ccc",
        borderRadius: "5px",
        padding: "10px"
    }
}

export default mainStyle;