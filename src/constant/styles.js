export const styles = theme => ({
    rootContainer: {
        display: "flex"
    },
    menu: {
        width: 200
    },
    grow: {
        flexGrow: 1
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        height: "100vh",
        overflow: "auto"
    },
    root: {
        width: "100%"
    },
    textField: {
        margin: theme.spacing.unit,
        width: 200
    },
    button: {
        margin: theme.spacing.unit
    },
    tableRoot: {
        width: "100%",
        overflowX: "auto"
    },
    table: {
        minWidth: 700
    },
    paginationRoot: {
        flexShrink: 0,
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing.unit * 2.5,
    }
});
