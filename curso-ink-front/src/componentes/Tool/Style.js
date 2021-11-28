const style = {
    paper: {
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    form: {
        width: "100%",
        marginTop: 20
    },
    submit: {
        marginTop: 15
    },
    avatar: {
        margin: 5,
        backgroundColor: "#6100AE",
        width: 100,
        height: 100
    },
    avatarSub: {
        margin: 5,
        backgroundColor: "#0FCC00",
        width: 30,
        height: 30
    },
    avatarNoSub: {
        margin: 5,
        backgroundColor: "#B40016",
        width: 30,
        height: 30
    },
    icon: {
        fontSize: 40
    },
    sub: {
        fontSize: 20
    },
    textArea: {
        ariaLabel: "minimum height",
        minRows: '3',
        resize: "vertical",
        width: '100%',
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 400
    },
    tema: {
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start"
    },
    titulos: {
        color: "#4D008A",
        marginBottom: "3%"
    },
    img: {
        maxWidth: "100%",
        maxHeight: "100%"
    },
    link: {
        color: "white",
        textDecoration: "none"
    },
    cardLink: {
        color: "black",
        textDecoration: "none"
    },
    loginLink: {
        color: "blue",
        textDecoration: "none"
    },
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'white',
        border: '2px solid #000',
        boxShadow: 24,
        p: 2,
    },
    modalPayment: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
        bgcolor: 'white',
        border: '2px solid #000',
        boxShadow: 24,
        p: 3,
    },
    inputPayment: {
        padding: 5
    },
    noContent: {
        padding: "10%"
    }
};

export default style;